import { mkdir, readFile, rm, writeFile, cp } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  renderArticleDetail,
  renderArticles,
  renderAbout,
  renderCommunity,
  renderConsulting,
  renderEventDetail,
  renderEvents,
  renderCheckout,
  renderExperimentDetail,
  renderExperiments,
  renderForOrganizations,
  renderHome,
  renderInvestigationDetail,
  renderInvestigations,
  renderLab,
  renderOpenSource,
  renderOpenSourceDetail,
  renderOrganizationDetail,
  renderOrganizations,
  renderProgramDetail,
  renderProjectDetail,
  renderProjects,
  renderRegionDetail,
  renderRegions,
  renderSourceDetail,
  renderSuccess,
  renderSystemDetail,
  renderSystems,
  renderTutorialDetail,
  renderTutorialPack,
  renderTutorials,
  renderWorkWithUs,
} from "../src/pages.mjs";
import {
  articles,
  investigations,
  labEvents,
  labExperiments,
  labProjects,
  labSources,
  openSourceRepos,
  organizations,
  regions,
  systems,
  tutorialPacks,
  tutorials,
} from "../src/data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../../..");
const publicDir = path.join(rootDir, "apps/marketplace/public");
const outDir = path.join(rootDir, "dist/site");

const programsData = JSON.parse(
  await readFile(path.join(rootDir, "data/marketplace/programs.json"), "utf8"),
);

const PAGE_SIZE = 6;
const pageCount = (items) => Math.max(1, Math.ceil(items.length / PAGE_SIZE));

const routes = [
  ["index.html", renderHome(programsData)],
  ["research-and-case-studies/index.html", renderArticles()],
  ["about/index.html", renderAbout()],
  ["work-with-us/index.html", renderWorkWithUs()],
];

const TODAY = new Date().toISOString().slice(0, 10);

function sitemapEntry(url, priority = "0.7", lastmod = TODAY) {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// This site deploys as a plain static export (GitHub Pages serves
// autonateai.com directly — see .github/workflows/deploy-gh-pages.yml),
// which has no server-side redirect config, so firebase.json's
// "redirects" never actually apply in production. Old URLs need a real
// static file in place: a fast client-side redirect plus a canonical
// link, so a visitor or search engine hitting the old path still lands
// on (and re-indexes under) the new one instead of getting a 404.
function redirectPage(destinationPath) {
  const url = `https://autonateai.com${destinationPath}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Redirecting…</title>
<meta name="robots" content="noindex,follow" />
<link rel="canonical" href="${url}" />
<meta http-equiv="refresh" content="0; url=${destinationPath}" />
<script>location.replace(${JSON.stringify(destinationPath)});</script>
</head>
<body>This page has moved to <a href="${destinationPath}">${url}</a>.</body>
</html>
`;
}

async function writeRedirect(routePath, destinationPath) {
  const filePath = path.join(outDir, routePath, "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, redirectPage(destinationPath));
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const [routePath, html] of routes) {
  const filePath = path.join(outDir, routePath);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
}

// Region/organization/system/investigation detail pages all publish under
// one unified path for SEO (fourth pass) — see the matching server.mjs
// routing and firebase.json redirects for the old per-type detail URLs.
for (const region of regions) {
  const filePath = path.join(outDir, "research-and-case-studies", region.slug, "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, renderRegionDetail(region));
}

for (const organization of organizations) {
  const filePath = path.join(outDir, "research-and-case-studies", organization.slug, "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, renderOrganizationDetail(organization));
}

for (const system of systems) {
  const filePath = path.join(outDir, "research-and-case-studies", system.slug, "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, renderSystemDetail(system));
}

for (const investigation of investigations) {
  const filePath = path.join(outDir, "research-and-case-studies", investigation.slug, "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, renderInvestigationDetail(investigation));
}

// Static redirect stubs for every path this rename moved, so an already-
// shared or indexed old URL still lands on the new one instead of a 404.
await writeRedirect("articles", "/research-and-case-studies");
for (const article of articles) {
  await writeRedirect(`articles/${article.handle}`, "/research-and-case-studies");
}
await writeRedirect("regions", "/research-and-case-studies?type=Regions");
for (const region of regions) {
  await writeRedirect(`regions/${region.slug}`, `/research-and-case-studies/${region.slug}`);
}
await writeRedirect("organizations", "/research-and-case-studies?type=Organizations");
for (const organization of organizations) {
  await writeRedirect(`organizations/${organization.slug}`, `/research-and-case-studies/${organization.slug}`);
}
await writeRedirect("systems", "/research-and-case-studies?type=Systems");
for (const system of systems) {
  await writeRedirect(`systems/${system.slug}`, `/research-and-case-studies/${system.slug}`);
}
await writeRedirect("investigations", "/research-and-case-studies?type=Open%20Questions");
for (const investigation of investigations) {
  await writeRedirect(`investigations/${investigation.slug}`, `/research-and-case-studies/${investigation.slug}`);
}

await cp(path.join(publicDir, "styles.css"), path.join(outDir, "styles.css"));
await cp(path.join(publicDir, "app.js"), path.join(outDir, "app.js"));
await cp(path.join(publicDir, "assets"), path.join(outDir, "assets"), {
  recursive: true,
});

await writeFile(
  path.join(outDir, "programs.json"),
  JSON.stringify(programsData, null, 2),
);
await writeFile(path.join(outDir, "CNAME"), "autonateai.com\n");
const sitemapUrls = [
  sitemapEntry("https://autonateai.com/", "1.0"),
  sitemapEntry("https://autonateai.com/research-and-case-studies", "0.9"),
  sitemapEntry("https://autonateai.com/about", "0.8"),
  sitemapEntry("https://autonateai.com/work-with-us", "0.8"),
  ...regions.map((region) => sitemapEntry(`https://autonateai.com/research-and-case-studies/${region.slug}`, region.status === "laboratory" ? "0.9" : "0.4")),
  ...organizations.map((org) => sitemapEntry(`https://autonateai.com/research-and-case-studies/${org.slug}`, org.status === "watchlist" ? "0.4" : "0.8")),
  ...systems.map((system) => sitemapEntry(`https://autonateai.com/research-and-case-studies/${system.slug}`, "0.8")),
  ...investigations.map((investigation) => sitemapEntry(`https://autonateai.com/research-and-case-studies/${investigation.slug}`, "0.8")),
];
await writeFile(
  path.join(outDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join("\n")}
</urlset>
`,
);
await writeFile(
  path.join(outDir, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: https://autonateai.com/sitemap.xml
`,
);
await writeFile(
  path.join(outDir, "404.html"),
  renderHome(programsData).replace(
    "<title>AutoNateAI | Agricultural Economic Systems Intelligence Lab</title>",
    "<title>Page Not Found | AutoNateAI</title>",
  ),
);

const detailPageCount =
  regions.length +
  organizations.length +
  systems.length +
  investigations.length;

console.log(
  `Exported ${routes.length + detailPageCount} agricultural intelligence pages to ${path.relative(rootDir, outDir)}`,
);
