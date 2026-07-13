import { mkdir, readFile, rm, writeFile, cp } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  renderArticleDetail,
  renderArticles,
  renderCheckout,
  renderHome,
  renderLeague,
  renderProgramDetail,
  renderPrograms,
  renderSuccess,
} from "../src/pages.mjs";
import { articles } from "../src/data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../../..");
const publicDir = path.join(rootDir, "apps/marketplace/public");
const outDir = path.join(rootDir, "dist/site");

const programsData = JSON.parse(
  await readFile(path.join(rootDir, "data/marketplace/programs.json"), "utf8"),
);

const routes = [
  ["index.html", renderHome(programsData)],
  ["programs/index.html", renderPrograms(programsData)],
  ["articles/index.html", renderArticles()],
  ["league/index.html", renderLeague(programsData)],
  ["checkout/index.html", renderCheckout(programsData)],
  ["success/index.html", renderSuccess(programsData)],
];

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
await writeFile(
  path.join(outDir, "404.html"),
  renderHome(programsData).replace(
    "<title>AutoNateAI | AI Software Architect Path for Youth</title>",
    "<title>Page Not Found | AutoNateAI</title>",
  ),
);

console.log(
  `Exported ${routes.length + programsData.programs.length + articles.length} marketplace pages to ${path.relative(rootDir, outDir)}`,
);
