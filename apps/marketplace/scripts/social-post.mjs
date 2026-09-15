#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(__dirname, "..");
const rootDir = path.resolve(__dirname, "../../..");

await loadRootEnv();

const args = parseArgs(process.argv.slice(2));
const confirm = Boolean(args.confirm);
const platforms = parsePlatforms(args.platform || args.platforms || "facebook,linkedin");
const message = await resolveMessage(args);
const link = String(args.link || args.url || "").trim();

if (!message) {
  fail("Missing post text. Use --message \"...\" or --file path/to/post.txt");
}

const payload = { message, link };

if (!confirm) {
  console.log("Dry run only. Add --confirm to publish.");
  console.log(JSON.stringify({ platforms, payload }, null, 2));
  process.exit(0);
}

const results = [];
for (const platform of platforms) {
  if (platform === "facebook") {
    results.push(await publishFacebook(payload));
  } else if (platform === "linkedin") {
    results.push(await publishLinkedIn(payload));
  } else {
    fail(`Unknown platform: ${platform}`);
  }
}

console.log(JSON.stringify({ ok: true, results }, null, 2));

async function loadRootEnv() {
  let contents = "";
  try {
    contents = await readFile(path.join(rootDir, ".env"), "utf8");
  } catch {
    return;
  }

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^['"]|['"]$/g, "");
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

function parseArgs(rawArgs) {
  const parsed = {};
  for (let i = 0; i < rawArgs.length; i += 1) {
    const arg = rawArgs[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = rawArgs[i + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
    } else {
      parsed[key] = next;
      i += 1;
    }
  }
  return parsed;
}

function parsePlatforms(value) {
  return String(value)
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

async function resolveMessage(options) {
  if (options.message) return String(options.message).trim();
  if (options.file) return (await readFile(path.resolve(appDir, String(options.file)), "utf8")).trim();
  return "";
}

async function publishFacebook({ message, link }) {
  const pageId = env("FACEBOOK_PAGE_ID");
  const accessToken = env("FACEBOOK_PAGE_ACCESS_TOKEN");
  if (!pageId || !accessToken) {
    fail("FACEBOOK_PAGE_ID and FACEBOOK_PAGE_ACCESS_TOKEN are required for Facebook publishing.");
  }

  const params = {
    access_token: accessToken,
    message,
  };
  if (link) params.link = link;

  const data = await postForm(`https://graph.facebook.com/v25.0/${pageId}/feed`, params);
  const postId = data.id || data.post_id || "";
  return {
    platform: "facebook",
    id: postId,
    url: postId ? `https://www.facebook.com/${postId.replace("_", "/posts/")}` : "",
  };
}

async function publishLinkedIn({ message, link }) {
  const accessToken = env("LINKEDIN_ACCESS_TOKEN");
  const author = await resolveLinkedInAuthor(accessToken);
  const version = env("LINKEDIN_VERSION") || "202605";
  if (!accessToken || !author) {
    fail("LINKEDIN_ACCESS_TOKEN plus LINKEDIN_AUTHOR_URN, LINKEDIN_PERSON_ID, or LINKEDIN_ORGANIZATION_ID are required for LinkedIn publishing.");
  }

  const body = {
    author,
    commentary: message,
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false,
  };

  if (link) {
    body.content = {
      article: {
        source: link,
        title: titleFromMessage(message),
        description: descriptionFromMessage(message),
      },
    };
  }

  const response = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Linkedin-Version": version,
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  if (!response.ok) {
    fail(`LinkedIn API failed (${response.status}): ${text}`);
  }

  const id = response.headers.get("x-restli-id") || "";
  return {
    platform: "linkedin",
    id,
    url: id ? `https://www.linkedin.com/feed/update/${encodeURIComponent(id)}/` : "",
    response: text ? JSON.parse(text) : null,
  };
}

async function postForm(url, params) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.error) {
    fail(`Facebook Graph API failed (${response.status}): ${data.error?.message || JSON.stringify(data)}`);
  }
  return data;
}

function env(key) {
  return (process.env[key] || "").trim();
}

function organizationUrn(id) {
  return id ? `urn:li:organization:${id}` : "";
}

function personUrn(id) {
  return id ? `urn:li:person:${id}` : "";
}

async function resolveLinkedInAuthor(accessToken) {
  const explicit = env("LINKEDIN_AUTHOR_URN");
  if (explicit) return explicit;

  const organization = organizationUrn(env("LINKEDIN_ORGANIZATION_ID"));
  if (organization) return organization;

  const person = personUrn(env("LINKEDIN_PERSON_ID"));
  if (person) return person;

  if (!accessToken) return "";

  const discovered = await discoverLinkedInPersonId(accessToken);
  return personUrn(discovered);
}

async function discoverLinkedInPersonId(accessToken) {
  const profile = await getJson("https://api.linkedin.com/v2/me", {
    Authorization: `Bearer ${accessToken}`,
    "X-Restli-Protocol-Version": "2.0.0",
  });
  if (profile?.id) return profile.id;

  const userinfo = await getJson("https://api.linkedin.com/v2/userinfo", {
    Authorization: `Bearer ${accessToken}`,
  });
  if (userinfo?.sub) return userinfo.sub;

  return "";
}

async function getJson(url, headers) {
  const response = await fetch(url, { headers });
  if (!response.ok) return null;
  return response.json().catch(() => null);
}

function titleFromMessage(message) {
  return message.split(/\r?\n/).find(Boolean)?.slice(0, 120) || "AutoNateAI research";
}

function descriptionFromMessage(message) {
  return message.replace(/\s+/g, " ").slice(0, 240);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
