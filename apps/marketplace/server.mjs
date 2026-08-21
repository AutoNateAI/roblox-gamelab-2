import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  renderArticleDetail,
  renderArticles,
  renderAbout,
  renderCommunity,
  renderConsulting,
  renderCheckout,
  renderForOrganizations,
  renderHome,
  renderLeague,
  renderProgramDetail,
  renderSuccess,
  renderTutorialDetail,
  renderTutorialPack,
  renderTutorials,
} from "./src/pages.mjs";
import { articles, tutorialPacks, tutorials } from "./src/data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");
const publicDir = path.join(__dirname, "public");
const port = Number(process.env.PORT || 4173);

loadLocalEnv(path.join(rootDir, ".env"));

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

async function readJson(relativePath) {
  const file = await readFile(path.join(rootDir, relativePath), "utf8");
  return JSON.parse(file);
}

function loadLocalEnv(filePath) {
  if (!existsSync(filePath)) return;
  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const rawValue = trimmed.slice(index + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, "");
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

async function readRequestJson(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function envValue(...keys) {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value && value !== "..." && value.toLowerCase() !== "replace_me") return value;
  }
  return "";
}

const BOOKING_WINDOW_START_MINUTES = 8 * 60;
const BOOKING_WINDOW_END_MINUTES = 18 * 60;
const BOOKING_TIME_ZONE = "America/Chicago";

// Converts a wall-clock date/time in `timeZone` into the real UTC instant it represents,
// correctly accounting for DST, without a timezone library: render an initial UTC guess back
// through the target zone, measure the drift from the intended wall time, and correct for it.
function wallTimeToUtcMs(timeZone, y, mo, d, h, mi) {
  const guessMs = Date.UTC(y, mo - 1, d, h, mi);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(guessMs));
  const get = (type) => Number(parts.find((part) => part.type === type)?.value);
  const renderedAsUtcMs = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"));
  return guessMs + (guessMs - renderedAsUtcMs);
}

// The booking form submits naive "YYYY-MM-DDTHH:mm" strings labeled as Central time.
function parseFormSubmittedCentralMs(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(String(value || ""));
  if (!match) return null;
  const [y, mo, d, h, mi] = match.slice(1).map(Number);
  return wallTimeToUtcMs(BOOKING_TIME_ZONE, y, mo, d, h, mi);
}

// Records read back from Airtable's dateTime fields are real ISO 8601 UTC instants (it does its
// own correct, DST-aware conversion from the America/Chicago field config on write).
function parseAirtableUtcMs(value) {
  const ms = Date.parse(value || "");
  return Number.isNaN(ms) ? null : ms;
}

function timeOfDayMinutes(value) {
  const match = /T(\d{2}):(\d{2})/.exec(String(value || ""));
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function bookingFitsBusinessHours(value, durationMinutes) {
  const start = timeOfDayMinutes(value);
  if (start === null) return false;
  return start >= BOOKING_WINDOW_START_MINUTES && start + durationMinutes <= BOOKING_WINDOW_END_MINUTES;
}

function intervalsOverlap(startAMs, durationAMinutes, startBMs, durationBMinutes) {
  const endAMs = startAMs + durationAMinutes * 60000;
  const endBMs = startBMs + durationBMinutes * 60000;
  return startAMs < endBMs && startBMs < endAMs;
}

async function findConflictingBooking({ apiKey, baseId, preferredDateTime, durationMinutes }) {
  const proposedStartMs = parseFormSubmittedCentralMs(preferredDateTime);
  const formula = encodeURIComponent("AND({Status}!='Cancelled',{Status}!='No-Show')");
  const listResponse = await fetch(`https://api.airtable.com/v0/${baseId}/Bookings?filterByFormula=${formula}&pageSize=100`, {
    headers: { authorization: `Bearer ${apiKey}` },
  });
  if (!listResponse.ok) {
    throw new Error("Could not check the schedule for conflicts.");
  }
  const { records = [] } = await listResponse.json();
  return records.find((record) => {
    const effectiveTime = record.fields["Confirmed Date & Time"] || record.fields["Preferred Date & Time"];
    const existingStartMs = parseAirtableUtcMs(effectiveTime);
    const existingDuration = Number(record.fields["Duration (minutes)"]) || 0;
    if (existingStartMs === null) return false;
    return intervalsOverlap(proposedStartMs, durationMinutes, existingStartMs, existingDuration);
  });
}

function squareSettings() {
  const selectedEnvironment = envValue("SQUARE_ENVIRONMENT", "SQUARE_ACTIVE_ENVIRONMENT", "MARKETPLACE_SQUARE_ENVIRONMENT");
  const environment = ["production", "prod", "live"].includes(selectedEnvironment.toLowerCase()) ? "production" : "sandbox";
  const prefix = environment === "production" ? "SQUARE_PRODUCTION" : "SQUARE_SANDBOX";
  const suffix = environment === "production" ? "PROD" : "SANDBOX";
  return {
    environment,
    applicationId: envValue(`${prefix}_APPLICATION_ID`, `SQUARE_APPLICATION_ID_${suffix}`, "SQUARE_APPLICATION_ID"),
    locationId: envValue(`${prefix}_LOCATION_ID`, `SQUARE_LOCATION_ID_${suffix}`, "SQUARE_LOCATION_ID"),
    accessToken: envValue(`${prefix}_ACCESS_TOKEN`, `SQUARE_ACCESS_TOKEN_${suffix}`, "SQUARE_ACCESS_TOKEN"),
    apiVersion: envValue("SQUARE_VERSION") || "2026-06-18",
    paymentsUrl:
      environment === "production"
        ? "https://connect.squareup.com/v2/payments"
        : "https://connect.squareupsandbox.com/v2/payments",
    locationsUrl:
      environment === "production"
        ? "https://connect.squareup.com/v2/locations"
        : "https://connect.squareupsandbox.com/v2/locations",
  };
}

function squareIsReady(settings = squareSettings()) {
  return Boolean(settings.applicationId && settings.locationId && settings.accessToken);
}

function squareCanListLocations(settings = squareSettings()) {
  return Boolean(settings.accessToken);
}

function marketplaceApiPath(pathname) {
  return pathname.replace(/^\/api\/marketplace/, "").replace(/^\/api/, "");
}

function json(response, status, payload) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(payload, null, 2));
}

function html(response, status, payload) {
  response.writeHead(status, {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(payload);
}

async function staticFile(response, pathname) {
  const cleanPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.join(publicDir, cleanPath);
  if (!filePath.startsWith(publicDir)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file = await readFile(filePath);
    response.writeHead(200, {
      "content-type": contentTypes[path.extname(filePath)] || "application/octet-stream",
    });
    response.end(file);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);
  const apiPath = marketplaceApiPath(url.pathname);

  try {
    const pageRoutes = new Set(["/", "/about", "/programs", "/articles", "/tutorials", "/community", "/live-builds", "/consulting", "/for-organizations", "/checkout", "/success"]);
    if (pageRoutes.has(url.pathname)) {
      const programsData = await readJson("data/marketplace/programs.json");
      if (url.pathname === "/programs") {
        html(response, 200, renderProgramDetail(programsData, programsData.programs[0]));
        return;
      }
      const renderers = {
        "/": renderHome,
        "/about": renderAbout,
        "/articles": renderArticles,
        "/tutorials": renderTutorials,
        "/community": renderCommunity,
        "/live-builds": renderLeague,
        "/consulting": renderConsulting,
        "/for-organizations": renderForOrganizations,
        "/checkout": renderCheckout,
        "/success": renderSuccess,
      };
      html(response, 200, renderers[url.pathname](programsData));
      return;
    }

    if (url.pathname.startsWith("/articles/")) {
      const handle = url.pathname.split("/").filter(Boolean).at(-1);
      const article = articles.find((item) => item.handle === handle);
      if (!article) {
        json(response, 404, { error: "Article not found" });
        return;
      }
      html(response, 200, renderArticleDetail(article));
      return;
    }

    if (url.pathname.startsWith("/tutorials/")) {
      const segments = url.pathname.split("/").filter(Boolean);
      const packHandle = segments[1];
      const pack = tutorialPacks.find((item) => item.handle === packHandle);
      if (!pack) {
        json(response, 404, { error: "Tutorial pack not found" });
        return;
      }
      if (segments.length === 2) {
        html(response, 200, renderTutorialPack(pack));
        return;
      }
      const tutorialHandle = segments[2];
      const tutorial = tutorials.find((item) => item.pack === pack.handle && item.handle === tutorialHandle);
      if (!tutorial) {
        json(response, 404, { error: "Tutorial not found" });
        return;
      }
      html(response, 200, renderTutorialDetail(pack, tutorial));
      return;
    }

    if (url.pathname.startsWith("/programs/")) {
      const handle = url.pathname.split("/").filter(Boolean).at(-1);
      const programsData = await readJson("data/marketplace/programs.json");
      const program = programsData.programs.find((item) => item.handle === handle);
      if (!program) {
        json(response, 404, { error: "Program not found" });
        return;
      }
      html(response, 200, renderProgramDetail(programsData, program));
      return;
    }

    if (url.pathname === "/api/gamelab/health") {
      json(response, 200, {
        ok: true,
        service: "autonateai-gamelab-marketplace",
        namespace: "/api/gamelab",
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (apiPath === "/square/config") {
      const settings = squareSettings();
      json(response, 200, {
        enabled: squareIsReady(settings),
        canListLocations: squareCanListLocations(settings),
        environment: settings.environment,
        applicationId: settings.applicationId || null,
        locationId: settings.locationId || null,
      });
      return;
    }

    if (apiPath === "/square/locations") {
      const settings = squareSettings();
      if (!squareCanListLocations(settings)) {
        json(response, 503, { error: "Square access token is not configured." });
        return;
      }

      const squareResponse = await fetch(settings.locationsUrl, {
        headers: {
          "authorization": `Bearer ${settings.accessToken}`,
          "Square-Version": settings.apiVersion,
        },
      });
      const payload = await squareResponse.json();
      json(response, squareResponse.ok ? 200 : squareResponse.status, payload);
      return;
    }

    if (apiPath === "/square/payments" && request.method === "POST") {
      const settings = squareSettings();
      if (!squareIsReady(settings)) {
        json(response, 503, { error: "Square is not configured." });
        return;
      }

      const body = await readRequestJson(request);
      const programsData = await readJson("data/marketplace/programs.json");
      const program = programsData.programs.find((item) => item.handle === body.programHandle);
      const offering = program?.offerings?.find((item) => item.id === body.offeringId) || program?.offerings?.[0];
      if (!program || !offering || !body.sourceId) {
        json(response, 400, { error: "Missing program, offering, or Square source token." });
        return;
      }
      const buyerName = String(body.buyer?.cardholderName || body.buyer?.buyerName || "").trim();
      const buyerEmail = String(body.buyer?.buyerEmail || "").trim();
      const noteParts = [`${program.name} - ${offering.name}`, buyerName ? `Cardholder: ${buyerName}` : ""].filter(
        Boolean,
      );

      const squareResponse = await fetch(settings.paymentsUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${settings.accessToken}`,
          "Square-Version": settings.apiVersion,
        },
        body: JSON.stringify({
          idempotency_key: randomUUID(),
          source_id: body.sourceId,
          location_id: settings.locationId,
          amount_money: {
            amount: Math.round(Number(offering.price) * 100),
            currency: "USD",
          },
          buyer_email_address: buyerEmail || undefined,
          note: noteParts.join(" | "),
          reference_id: `${program.handle}:${offering.id}`,
        }),
      });

      const payload = await squareResponse.json();
      json(response, squareResponse.ok ? 200 : squareResponse.status, payload);
      return;
    }

    if (apiPath === "/consulting/booking" && request.method === "POST") {
      const apiKey = envValue("AIRTABLE_API_KEY");
      const baseId = envValue("AIRTABLE_BASE_ID_CONSULTING");
      if (!apiKey || !baseId) {
        json(response, 503, { error: "Booking is not configured." });
        return;
      }

      const body = await readRequestJson(request);
      const name = String(body.name || "").trim();
      const email = String(body.email || "").trim();
      const callType = body.callType === "Follow-up" ? "Follow-up" : body.callType === "Discovery" ? "Discovery" : "";
      const duration = String(body.duration || "").trim();
      const preferredDateTime = String(body.preferredDateTime || "").trim();
      const validDurations = callType === "Discovery" ? ["15", "30"] : ["30", "45", "60", "90", "120"];

      if (!name || !email || !callType || !validDurations.includes(duration) || !preferredDateTime) {
        json(response, 400, {
          error: `Missing or invalid booking details. ${callType || "Each"} calls must be one of: ${validDurations.join(", ")} minutes.`,
        });
        return;
      }

      const durationMinutes = Number(duration);
      const alternateDateTime = String(body.alternateDateTime || "").trim();
      const preferredMs = parseFormSubmittedCentralMs(preferredDateTime);
      if (preferredMs === null || preferredMs < Date.now()) {
        json(response, 400, { error: "Preferred time must be a valid date and time in the future." });
        return;
      }
      if (!bookingFitsBusinessHours(preferredDateTime, durationMinutes)) {
        json(response, 400, { error: "Preferred time must start and end between 8:00 AM and 6:00 PM Central." });
        return;
      }
      if (alternateDateTime && !bookingFitsBusinessHours(alternateDateTime, durationMinutes)) {
        json(response, 400, { error: "Alternate time must start and end between 8:00 AM and 6:00 PM Central." });
        return;
      }

      try {
        const conflict = await findConflictingBooking({ apiKey, baseId, preferredDateTime, durationMinutes });
        if (conflict) {
          json(response, 409, { error: "That time is already booked. Please choose a different time." });
          return;
        }
      } catch (error) {
        json(response, 502, { error: error.message });
        return;
      }

      const fields = {
        "Full Name": name,
        "Email": email,
        "Organization": String(body.organization || "").trim() || undefined,
        "Call Type": callType,
        "Duration (minutes)": duration,
        "Preferred Date & Time": preferredDateTime,
        "Alternate Date & Time": alternateDateTime || undefined,
        "Their Timezone": body.timezone || undefined,
        "What do you want out of this call?": String(body.goals || "").trim() || undefined,
        "Project / Organization Context": String(body.context || "").trim() || undefined,
        "How did you hear about us?": body.howHeard || undefined,
        "Status": "Requested",
      };

      const airtableResponse = await fetch(`https://api.airtable.com/v0/${baseId}/Bookings`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ fields, typecast: true }),
      });

      const payload = await airtableResponse.json();
      if (!airtableResponse.ok) {
        json(response, airtableResponse.status, { error: payload.error?.message || "Booking failed." });
        return;
      }
      json(response, 200, { ok: true });
      return;
    }

    if (url.pathname === "/programs.json") {
      json(response, 200, await readJson("data/marketplace/programs.json"));
      return;
    }

    await staticFile(response, url.pathname);
  } catch (error) {
    json(response, 500, { error: error.message });
  }
});

server.listen(port, () => {
  console.log(`AutoNateAI marketplace running at http://localhost:${port}`);
});
