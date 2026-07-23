import { mkdir, readFile, rm, writeFile, cp } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  renderArticleDetail,
  renderArticles,
  renderAbout,
  renderCommunity,
  renderCheckout,
  renderHome,
  renderLeague,
  renderProgramDetail,
  renderSuccess,
  renderTutorialDetail,
  renderTutorials,
} from "../src/pages.mjs";
import { articles, tutorials } from "../src/data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../../..");
const publicDir = path.join(rootDir, "apps/marketplace/public");
const outDir = path.join(rootDir, "dist/site");

const programsData = JSON.parse(
  await readFile(path.join(rootDir, "data/marketplace/programs.json"), "utf8"),
);

const routes = [
  ["index.html", renderHome(programsData)],
  ["programs/index.html", renderProgramDetail(programsData, programsData.programs[0])],
  ["articles/index.html", renderArticles()],
  ["tutorials/index.html", renderTutorials()],
  ["community/index.html", renderCommunity()],
  ["about/index.html", renderAbout()],
  ["league/index.html", renderLeague(programsData)],
  ["checkout/index.html", renderCheckout(programsData)],
  ["success/index.html", renderSuccess(programsData)],
];

function sitemapEntry(url, priority = "0.7") {
  return `  <url>
    <loc>${url}</loc>
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

for (const tutorial of tutorials) {
  const filePath = path.join(outDir, "tutorials", tutorial.handle, "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, renderTutorialDetail(tutorial));
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
  sitemapEntry("https://autonateai.com/programs/ai-software-architect", "0.9"),
  sitemapEntry("https://autonateai.com/league", "0.8"),
  sitemapEntry("https://autonateai.com/tutorials", "0.8"),
  sitemapEntry("https://autonateai.com/community", "0.8"),
  sitemapEntry("https://autonateai.com/about", "0.8"),
  sitemapEntry("https://autonateai.com/articles", "0.7"),
  ...tutorials.map((tutorial) => sitemapEntry(`https://autonateai.com/tutorials/${tutorial.handle}`, "0.6")),
  ...articles.map((article) => sitemapEntry(`https://autonateai.com/articles/${article.handle}`, "0.6")),
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
    "<title>AutoNateAI | Workforce Systems Programming Lab</title>",
    "<title>Page Not Found | AutoNateAI</title>",
  ),
);

console.log(
  `Exported ${routes.length + programsData.programs.length + articles.length + tutorials.length} marketplace pages to ${path.relative(rootDir, outDir)}`,
);
