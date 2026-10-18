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
  renderOperatorArticleDetail,
  renderOperatorOs,
  renderPricing,
} from "../src/pages.mjs";
import { operatorArticles } from "../src/operator-os-data.mjs";
import {
  renderResearch,
  renderSeries,
  renderStartProject,
  renderStudioAbout,
  renderStudioForOrganizations,
  renderStudioHome,
  renderStudioPricing,
} from "../src/studio-pages.mjs";
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

// 2026-10-18 repositioning: AutoNateAI is a research and educational media company that builds animated series.
// The Operator OS pages (home, /operator-os, its pricing, the Operator Question articles) are ARCHIVED: their source
// stays in operator-os-pages.mjs / operator-os-data.mjs, they are no longer exported, linked or in the sitemap, and
// their old URLs get noindex redirect stubs below.
const routes = [
  ["index.html", renderStudioHome()],
  ["series/index.html", renderSeries()],
  ["research/index.html", renderResearch()],
  ["for-organizations/index.html", renderStudioForOrganizations()],
  ["pricing/index.html", renderStudioPricing()],
  ["about/index.html", renderStudioAbout()],
  ["start-a-project/index.html", renderStartProject()],
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

// Archived Operator OS URLs → the studio (noindex redirect stubs, so old links and search results still land).
await writeRedirect("operator-os", "/");
await writeRedirect("work-with-us", "/start-a-project");
await writeRedirect("research-and-case-studies", "/research");
for (const article of operatorArticles) {
  await writeRedirect(`research-and-case-studies/${article.slug}`, "/research");
}
await writeRedirect("articles", "/research");
for (const article of articles) {
  await writeRedirect(`articles/${article.handle}`, "/research");
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
  sitemapEntry("https://autonateai.com/series", "0.9"),
  sitemapEntry("https://autonateai.com/research", "0.8"),
  sitemapEntry("https://autonateai.com/for-organizations", "0.9"),
  sitemapEntry("https://autonateai.com/pricing", "0.8"),
  sitemapEntry("https://autonateai.com/about", "0.7"),
  sitemapEntry("https://autonateai.com/start-a-project", "0.9"),
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
  renderStudioHome().replace(
    "<title>AutoNateAI | Research-Driven Animated Series &amp; Educational Media</title>",
    "<title>Page Not Found | AutoNateAI</title>",
  ).replace(
    "<title>AutoNateAI | Research-Driven Animated Series & Educational Media</title>",
    "<title>Page Not Found | AutoNateAI</title>",
  ),
);

const detailPageCount = 0;

console.log(
  `Exported ${routes.length + detailPageCount} pages to ${path.relative(rootDir, outDir)}`,
);
