// autonateai.com/publications: a self-contained, Substack-style reading section. It has its own stylesheet and page
// shell, so nothing here touches the studio pages. A publication is one file in content/publications/ (see the README
// there); only `status: published` files are exported.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { escapeHtml } from "./components.mjs";

const SITE = "https://autonateai.com";
const BASE = "/publications";
const NAME = "Virtual Cell Lab";
const TAGLINE = "Cells, data and the models trying to predict them. Research, experiments and findings, written in the open.";
const AUTHOR = "Nathan Baker";
const YOUTUBE = "https://www.youtube.com/@AutoNateAI";
const LOGO = "/assets/brand/logo-512.png";

const FRONT_MATTER = /^---\n([\s\S]*?)\n---\n?/;
const REQUIRED = ["title", "subtitle", "date", "status"];

/** One publication file: `key: value` front matter, then the body as HTML. Fails loudly, because a bad file should stop the build. */
export function parsePublication(slug, text) {
  const match = FRONT_MATTER.exec(text);
  if (!match) throw new Error(`publications/${slug}.html has no front matter`);
  const meta = {};
  for (const line of match[1].split("\n")) {
    const at = line.indexOf(":");
    if (at > 0) meta[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }
  for (const key of REQUIRED) if (!meta[key]) throw new Error(`publications/${slug}.html is missing "${key}"`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) throw new Error(`publications/${slug}.html: date must be YYYY-MM-DD`);
  if (!["draft", "published"].includes(meta.status)) throw new Error(`publications/${slug}.html: status must be draft or published`);
  return { slug, ...meta, body: text.slice(match[0].length).trim() };
}

/** Published posts, newest first. */
export async function loadPublications(dir) {
  const files = (await readdir(dir)).filter((f) => f.endsWith(".html"));
  const posts = await Promise.all(files.map(async (f) => parsePublication(f.replace(/\.html$/, ""), await readFile(path.join(dir, f), "utf8"))));
  return posts.filter((p) => p.status === "published").sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

const longDate = (d) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const postUrl = (p) => `${BASE}/${p.slug}`;
const imageOf = (p) => p.image || (p.video ? `https://i.ytimg.com/vi/${p.video}/hqdefault.jpg` : "");

function shell({ title, description, canonical, image, body, ld }) {
  const safeTitle = escapeHtml(title), safeDescription = escapeHtml(description);
  const ogImage = image ? (image.startsWith("http") ? image : `${SITE}${image}`) : `${SITE}/assets/og/studio.jpg`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${safeTitle}</title>
<meta name="description" content="${safeDescription}" />
<meta name="robots" content="index,follow" />
<link rel="canonical" href="${SITE}${canonical}" />
<link rel="icon" type="image/svg+xml" href="/assets/brand/mark.svg" />
<link rel="alternate" type="application/rss+xml" title="${NAME}" href="${BASE}/feed.xml" />
<meta property="og:title" content="${safeTitle}" />
<meta property="og:description" content="${safeDescription}" />
<meta property="og:url" content="${SITE}${canonical}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:site_name" content="AutoNateAI" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="${BASE}/style.css" />
${ld ? `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>` : ""}
</head>
<body>
${body}
<footer class="pub-footer">
  <p>${NAME} is published by <a href="/">AutoNateAI</a>. <a href="${BASE}/feed.xml">RSS</a></p>
</footer>
</body>
</html>
`;
}

function subscribe(label = "Subscribe") {
  return `<a class="pub-subscribe" href="${YOUTUBE}" target="_blank" rel="noopener">${label}</a>`;
}

function topbar() {
  return `<header class="pub-topbar">
  <a class="pub-brand" href="${BASE}"><img src="${LOGO}" alt="" width="32" height="32" /><span>${NAME}</span></a>
  ${subscribe()}
</header>`;
}

function masthead(active) {
  const tab = (key, href, label) => `<a href="${href}"${active === key ? ' class="active" aria-current="page"' : ""}>${label}</a>`;
  return `<header class="pub-masthead">
  <img class="pub-logo" src="${LOGO}" alt="" width="72" height="72" />
  <h1><a href="${BASE}">${NAME}</a></h1>
  <p class="pub-tagline">${escapeHtml(TAGLINE)}</p>
  <p class="pub-by">By ${AUTHOR}</p>
  ${subscribe("Subscribe on YouTube")}
  <nav class="pub-tabs">${tab("home", BASE, "Home")}${tab("archive", `${BASE}/archive`, "Archive")}${tab("about", `${BASE}/about`, "About")}</nav>
</header>`;
}

function row(p) {
  const image = imageOf(p);
  return `<a class="pub-row" href="${postUrl(p)}">
    <div class="pub-row-text">
      <h3>${escapeHtml(p.title)}</h3>
      <p class="pub-sub">${escapeHtml(p.subtitle)}</p>
      <p class="pub-meta">${longDate(p.date)} · ${AUTHOR}</p>
    </div>
    ${image ? `<img src="${image}" alt="" loading="lazy" />` : ""}
  </a>`;
}

function hero(p) {
  const image = imageOf(p);
  return `<a class="pub-hero${image ? "" : " no-image"}" href="${postUrl(p)}">
    ${image ? `<img src="${image}" alt="" />` : ""}
    <div>
      <h2>${escapeHtml(p.title)}</h2>
      <p class="pub-sub">${escapeHtml(p.subtitle)}</p>
      <p class="pub-meta">${longDate(p.date)} · ${AUTHOR}</p>
    </div>
  </a>`;
}

const EMPTY = `<section class="pub-empty"><h2>The first publication is on its way.</h2><p>Season 1 starts with one cell and no biology. Subscribe to be there from the beginning.</p></section>`;

export function renderPublicationsHome(posts) {
  const [latest, ...rest] = posts;
  return shell({
    title: `${NAME} | AutoNateAI`,
    description: TAGLINE,
    canonical: BASE,
    body: `${masthead("home")}<main class="pub-main">${latest ? hero(latest) : EMPTY}${rest.length ? `<section class="pub-list"><h4>Recent posts</h4>${rest.slice(0, 12).map(row).join("")}</section>` : ""}${rest.length > 12 ? `<p class="pub-more"><a href="${BASE}/archive">See all posts</a></p>` : ""}</main>`,
  });
}

export function renderPublicationsArchive(posts) {
  return shell({
    title: `Archive | ${NAME}`,
    description: `Every post from ${NAME}.`,
    canonical: `${BASE}/archive`,
    body: `${masthead("archive")}<main class="pub-main">${posts.length ? `<section class="pub-list">${posts.map(row).join("")}</section>` : EMPTY}</main>`,
  });
}

export function renderPublicationsAbout() {
  return shell({
    title: `About | ${NAME}`,
    description: TAGLINE,
    canonical: `${BASE}/about`,
    body: `${masthead("about")}<main class="pub-main"><article class="pub-body">
      <p>${NAME} is an independent research project by ${AUTHOR}, a software engineer moving into computational biology in public.</p>
      <p>The work starts from experiments other scientists have already run. We hide the answers from a model, ask it to predict them, and check. The videos are hosted by Cellie, an animated cell. The posts here carry the full scripts, sources and findings, including the results that didn't work.</p>
      <p>Every claim is labelled by what kind of claim it is: background science, a published finding, a model's output, or our own hypothesis. A model's prediction is not a biological result, and nothing here is medical advice.</p>
      <p>This project is not affiliated with, reviewed by or endorsed by Arc Institute or any other lab or institute named in it, and its narration is AI-generated.</p>
    </article></main>`,
  });
}

export function renderPublicationPost(post) {
  const canonical = postUrl(post);
  const video = post.video
    ? `<div class="pub-video"><iframe src="https://www.youtube-nocookie.com/embed/${escapeHtml(post.video)}?rel=0&modestbranding=1" title="${escapeHtml(post.title)}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
    : "";
  return shell({
    title: `${post.title} | ${NAME}`,
    description: post.subtitle,
    canonical,
    image: imageOf(post),
    ld: {
      "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.subtitle, datePublished: post.date,
      author: { "@type": "Person", name: AUTHOR }, publisher: { "@type": "Organization", name: "AutoNateAI" }, url: `${SITE}${canonical}`,
    },
    body: `${topbar()}<main class="pub-article">
      <header>
        <h1>${escapeHtml(post.title)}</h1>
        <p class="pub-sub">${escapeHtml(post.subtitle)}</p>
        <div class="pub-byline"><img src="${LOGO}" alt="" width="40" height="40" /><div><b>${AUTHOR}</b><span>${longDate(post.date)}</span></div></div>
      </header>
      ${video}
      <article class="pub-body">${post.body}</article>
      <aside class="pub-end"><p>Follow along as the lab works through it.</p>${subscribe("Subscribe on YouTube")}<a class="pub-back" href="${BASE}">More from ${NAME}</a></aside>
    </main>`,
  });
}

export function renderPublicationsFeed(posts) {
  const items = posts.slice(0, 50).map((p) => `  <item>
    <title>${escapeHtml(p.title)}</title>
    <link>${SITE}${postUrl(p)}</link>
    <guid>${SITE}${postUrl(p)}</guid>
    <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
    <description>${escapeHtml(p.subtitle)}</description>
  </item>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${NAME}</title>
  <link>${SITE}${BASE}</link>
  <description>${escapeHtml(TAGLINE)}</description>
${items}
</channel>
</rss>
`;
}

/** Every file this section adds to the static export, as [path, content]. */
export function publicationRoutes(posts) {
  return [
    ["publications/index.html", renderPublicationsHome(posts)],
    ["publications/archive/index.html", renderPublicationsArchive(posts)],
    ["publications/about/index.html", renderPublicationsAbout()],
    ["publications/style.css", PUBLICATION_CSS],
    ["publications/feed.xml", renderPublicationsFeed(posts)],
    ...posts.map((p) => [`publications/${p.slug}/index.html`, renderPublicationPost(p)]),
  ];
}

/** Sitemap paths for this section. */
export const publicationPaths = (posts) => [BASE, `${BASE}/archive`, `${BASE}/about`, ...posts.map(postUrl)];

const PUBLICATION_CSS = `
:root { --ink: #1a1a1a; --muted: #6b6b6b; --line: #e6e6e6; --accent: #0f8f83; --accent-dark: #0b6f66; --paper: #ffffff; }
* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--paper); color: var(--ink); font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
.pub-subscribe { display: inline-block; background: var(--accent); color: #fff; font-weight: 600; font-size: 15px; padding: 10px 18px; border-radius: 8px; }
.pub-subscribe:hover { background: var(--accent-dark); }
.pub-topbar { display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; border-bottom: 1px solid var(--line); position: sticky; top: 0; background: var(--paper); z-index: 2; }
.pub-brand { display: flex; align-items: center; gap: 10px; font-family: Spectral, Georgia, serif; font-weight: 700; font-size: 20px; }
.pub-brand img { border-radius: 6px; }
.pub-masthead { text-align: center; padding: 48px 20px 0; }
.pub-logo { margin: 0 auto 16px; border-radius: 12px; }
.pub-masthead h1 { font-family: Spectral, Georgia, serif; font-size: 42px; line-height: 1.1; margin: 0 0 10px; font-weight: 700; }
.pub-tagline { color: var(--muted); font-size: 17px; line-height: 1.45; max-width: 560px; margin: 0 auto 6px; }
.pub-by { color: var(--muted); font-size: 14px; margin: 0 0 20px; }
.pub-tabs { display: flex; justify-content: center; gap: 28px; margin-top: 32px; border-bottom: 1px solid var(--line); }
.pub-tabs a { padding: 12px 2px; font-size: 15px; font-weight: 500; color: var(--muted); border-bottom: 2px solid transparent; margin-bottom: -1px; }
.pub-tabs a.active, .pub-tabs a:hover { color: var(--ink); border-bottom-color: var(--ink); }
.pub-main { max-width: 728px; margin: 0 auto; padding: 32px 20px 56px; }
.pub-sub { color: var(--muted); font-size: 17px; line-height: 1.45; margin: 0; }
.pub-meta { color: var(--muted); font-size: 13px; margin: 8px 0 0; }
.pub-hero { display: block; padding-bottom: 32px; border-bottom: 1px solid var(--line); }
.pub-hero img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 8px; margin-bottom: 18px; }
.pub-hero h2 { font-family: Spectral, Georgia, serif; font-size: 32px; line-height: 1.15; margin: 0 0 8px; }
.pub-list h4 { font-size: 13px; letter-spacing: 0.04em; color: var(--muted); font-weight: 600; margin: 28px 0 0; padding-bottom: 12px; border-bottom: 1px solid var(--line); }
.pub-row { display: flex; gap: 20px; justify-content: space-between; align-items: flex-start; padding: 20px 0; border-bottom: 1px solid var(--line); }
.pub-row h3 { font-family: Spectral, Georgia, serif; font-size: 22px; line-height: 1.2; margin: 0 0 6px; }
.pub-row img { width: 112px; height: 76px; object-fit: cover; border-radius: 6px; flex: none; }
.pub-row:hover h3, .pub-hero:hover h2 { color: var(--accent-dark); }
.pub-more { text-align: center; margin-top: 24px; font-weight: 600; }
.pub-empty { text-align: center; padding: 48px 12px; }
.pub-empty h2 { font-family: Spectral, Georgia, serif; font-size: 26px; margin: 0 0 8px; }
.pub-empty p { color: var(--muted); font-size: 17px; margin: 0; }
.pub-article { max-width: 728px; margin: 0 auto; padding: 40px 20px 56px; }
.pub-article h1 { font-family: Spectral, Georgia, serif; font-size: 40px; line-height: 1.12; margin: 0 0 10px; font-weight: 700; }
.pub-article .pub-sub { font-size: 20px; }
.pub-byline { display: flex; align-items: center; gap: 12px; margin: 22px 0; padding: 14px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); font-size: 14px; }
.pub-byline img { border-radius: 50%; }
.pub-byline span { display: block; color: var(--muted); font-size: 13px; }
.pub-video { position: relative; aspect-ratio: 16 / 9; margin-bottom: 28px; }
.pub-video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; border-radius: 8px; }
.pub-body { font-family: Spectral, Georgia, serif; font-size: 20px; line-height: 1.6; overflow-wrap: anywhere; }
.pub-body h2 { font-family: Spectral, Georgia, serif; font-size: 28px; line-height: 1.2; margin: 40px 0 12px; }
.pub-body h3 { font-family: Spectral, Georgia, serif; font-size: 23px; line-height: 1.25; margin: 32px 0 10px; }
.pub-body p, .pub-body ul, .pub-body ol { margin: 0 0 20px; }
.pub-body a { color: var(--accent-dark); text-decoration: underline; }
.pub-body code { font-family: "SF Mono", Menlo, monospace; font-size: 0.85em; background: #f3f3f1; padding: 2px 5px; border-radius: 4px; }
.pub-body pre { font-family: "SF Mono", Menlo, monospace; font-size: 16px; line-height: 1.5; background: #f3f3f1; padding: 16px 18px; border-radius: 8px; overflow-x: auto; margin: 0 0 20px; }
.pub-body table { width: 100%; border-collapse: collapse; font-family: Inter, sans-serif; font-size: 16px; line-height: 1.4; margin: 0 0 24px; }
.pub-body th, .pub-body td { text-align: left; padding: 10px 8px; border-bottom: 1px solid var(--line); vertical-align: top; }
.pub-body th { font-weight: 600; color: var(--muted); }
.pub-body small { font-family: Inter, sans-serif; font-size: 13px; color: var(--muted); }
.pub-body img { border-radius: 6px; margin: 24px auto; }
.pub-end { text-align: center; margin-top: 44px; padding-top: 32px; border-top: 1px solid var(--line); }
.pub-end p { font-family: Spectral, Georgia, serif; font-size: 20px; margin: 0 0 14px; }
.pub-back { display: block; margin-top: 16px; color: var(--muted); font-size: 14px; }
.pub-footer { border-top: 1px solid var(--line); text-align: center; color: var(--muted); font-size: 13px; padding: 24px 20px; }
.pub-footer a { text-decoration: underline; }
@media (max-width: 560px) {
  .pub-masthead h1 { font-size: 34px; }
  .pub-article h1 { font-size: 31px; }
  .pub-body { font-size: 18px; }
  .pub-hero h2 { font-size: 26px; }
  .pub-row img { width: 84px; height: 60px; }
}
`;
