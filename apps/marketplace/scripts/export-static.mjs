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
  renderOpenSource,
  renderOpenSourceDetail,
  renderProgramDetail,
  renderProjectDetail,
  renderProjects,
  renderSourceDetail,
  renderSuccess,
  renderTutorialDetail,
  renderTutorialPack,
  renderTutorials,
} from "../src/pages.mjs";
import { articles, labEvents, labExperiments, labProjects, labSources, openSourceRepos, tutorialPacks, tutorials } from "../src/data.mjs";

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
  ["programs/index.html", renderProgramDetail(programsData, programsData.programs[0])],
  ["articles/index.html", renderArticles()],
  ["experiments/index.html", renderExperiments()],
  ["projects/index.html", renderProjects()],
  ["open-source/index.html", renderOpenSource()],
  ["tutorials/index.html", renderTutorials()],
  ["community/index.html", renderCommunity()],
  ["about/index.html", renderAbout()],
  ["consulting/index.html", renderConsulting(programsData)],
  ["events/index.html", renderEvents()],
  ["for-organizations/index.html", renderForOrganizations(programsData)],
  ["checkout/index.html", renderCheckout(programsData)],
  ["success/index.html", renderSuccess(programsData)],
];

// Paginated listings: page 1 is the bare route above; page 2+ gets its own
// "<section>/page/<n>/index.html" (mirrors server.mjs's routing).
const paginatedSections = [
  { dir: "articles", items: articles.filter((a) => a.handle !== "systems-thinking-through-code"), render: renderArticles },
  { dir: "experiments", items: labExperiments, render: renderExperiments },
  { dir: "open-source", items: openSourceRepos, render: renderOpenSource },
];
for (const { dir, items, render } of paginatedSections) {
  const pages = pageCount(items);
  for (let page = 2; page <= pages; page++) {
    routes.push([`${dir}/page/${page}/index.html`, render(page)]);
  }
}

const TODAY = new Date().toISOString().slice(0, 10);

function sitemapEntry(url, priority = "0.7", lastmod = TODAY) {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const [routePath, html] of routes) {
  const filePath = path.join(outDir, routePath);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
}

for (const article of articles) {
  const filePath = path.join(outDir, "articles", article.handle, "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, renderArticleDetail(article));
}

for (const project of labProjects) {
  const filePath = path.join(outDir, "projects", project.slug, "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, renderProjectDetail(project));
}

for (const experiment of labExperiments) {
  const filePath = path.join(outDir, "experiments", experiment.slug, "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, renderExperimentDetail(experiment));
}

for (const repo of openSourceRepos) {
  const filePath = path.join(outDir, "open-source", repo.slug, "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, renderOpenSourceDetail(repo));
}

for (const event of labEvents) {
  const filePath = path.join(outDir, "events", event.slug, "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, renderEventDetail(event));
}

for (const source of labSources) {
  const filePath = path.join(outDir, "sources", source.slug, "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, renderSourceDetail(source));
}

for (const pack of tutorialPacks) {
  const packFilePath = path.join(outDir, "tutorials", pack.handle, "index.html");
  await mkdir(path.dirname(packFilePath), { recursive: true });
  await writeFile(packFilePath, renderTutorialPack(pack));

  for (const tutorial of tutorials.filter((item) => item.pack === pack.handle)) {
    const filePath = path.join(outDir, "tutorials", pack.handle, tutorial.handle, "index.html");
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, renderTutorialDetail(pack, tutorial));
  }
}

for (const program of programsData.programs) {
  const filePath = path.join(outDir, "programs", program.handle, "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, renderProgramDetail(programsData, program));
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
  sitemapEntry("https://autonateai.com/articles", "0.9"),
  sitemapEntry("https://autonateai.com/experiments", "0.8"),
  sitemapEntry("https://autonateai.com/projects", "0.8"),
  sitemapEntry("https://autonateai.com/open-source", "0.8"),
  sitemapEntry("https://autonateai.com/events", "0.8"),
  sitemapEntry("https://autonateai.com/tutorials", "0.8"),
  sitemapEntry("https://autonateai.com/about", "0.7"),
  sitemapEntry("https://autonateai.com/consulting", "0.6"),
  sitemapEntry("https://autonateai.com/for-organizations", "0.6"),
  sitemapEntry("https://autonateai.com/community", "0.6"),
  sitemapEntry("https://autonateai.com/programs/ai-agent-systems", "0.5"),
  ...tutorialPacks.map((pack) => sitemapEntry(`https://autonateai.com/tutorials/${pack.handle}`, "0.7")),
  ...tutorials.map((tutorial) =>
    sitemapEntry(`https://autonateai.com/tutorials/${tutorial.pack}/${tutorial.handle}`, tutorial.draft ? "0.3" : "0.6"),
  ),
  ...articles.map((article) =>
    sitemapEntry(`https://autonateai.com/articles/${article.handle}`, "0.6", article.dateModified || article.datePublished || TODAY),
  ),
  ...labProjects.map((project) => sitemapEntry(`https://autonateai.com/projects/${project.slug}`, "0.7")),
  ...labExperiments.map((experiment) => sitemapEntry(`https://autonateai.com/experiments/${experiment.slug}`, "0.7")),
  ...openSourceRepos.map((repo) => sitemapEntry(`https://autonateai.com/open-source/${repo.slug}`, "0.7")),
  ...labEvents.map((event) => sitemapEntry(`https://autonateai.com/events/${event.slug}`, "0.6", event.start)),
  ...labSources.map((source) => sitemapEntry(`https://autonateai.com/sources/${source.slug}`, "0.6")),
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
Disallow: /checkout
Disallow: /success

Sitemap: https://autonateai.com/sitemap.xml
`,
);
await writeFile(
  path.join(outDir, "404.html"),
  renderHome(programsData).replace(
    "<title>AutoNateAI | Nathan Baker's AI, Software & Human Systems Lab</title>",
    "<title>Page Not Found | AutoNateAI</title>",
  ),
);

const detailPageCount =
  labProjects.length + labExperiments.length + openSourceRepos.length + labEvents.length + labSources.length;

console.log(
  `Exported ${routes.length + programsData.programs.length + articles.length + tutorialPacks.length + tutorials.length + detailPageCount} marketplace pages to ${path.relative(rootDir, outDir)}`,
);
