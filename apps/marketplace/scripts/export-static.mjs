import { mkdir, readFile, rm, writeFile, cp } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  renderCheckout,
  renderEvents,
  renderHome,
  renderMarketplace,
  renderProductDetail,
  renderServices,
  renderSuccess,
} from "../src/pages.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../../..");
const publicDir = path.join(rootDir, "apps/marketplace/public");
const outDir = path.join(rootDir, "dist/site");

const catalog = JSON.parse(
  await readFile(path.join(rootDir, "data/marketplace/catalog.json"), "utf8"),
);
const season = JSON.parse(
  await readFile(path.join(rootDir, "data/season-1/quests.json"), "utf8"),
);

const routes = [
  ["index.html", renderHome(catalog)],
  ["marketplace/index.html", renderMarketplace(catalog)],
  ["checkout/index.html", renderCheckout(catalog)],
  ["success/index.html", renderSuccess(catalog)],
  ["services/index.html", renderServices(catalog)],
  ["events/index.html", renderEvents(catalog)],
];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const [routePath, html] of routes) {
  const filePath = path.join(outDir, routePath);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
}

for (const product of catalog.products) {
  const filePath = path.join(outDir, "store/products", product.handle, "index.html");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, renderProductDetail(catalog, product));
}

await cp(path.join(publicDir, "styles.css"), path.join(outDir, "styles.css"));
await cp(path.join(publicDir, "app.js"), path.join(outDir, "app.js"));
await cp(path.join(publicDir, "assets"), path.join(outDir, "assets"), {
  recursive: true,
});

await mkdir(path.join(outDir, "store/products"), { recursive: true });
await writeFile(
  path.join(outDir, "store/products/index.json"),
  JSON.stringify(catalog, null, 2),
);
await mkdir(path.join(outDir, "api/gamelab/season-1"), { recursive: true });
await writeFile(
  path.join(outDir, "api/gamelab/season-1/index.json"),
  JSON.stringify(season, null, 2),
);
await writeFile(path.join(outDir, "CNAME"), "autonateai.com\n");
await writeFile(
  path.join(outDir, "404.html"),
  renderHome(catalog).replace(
    "<title>AutoNateAI GameLab | Marketplace</title>",
    "<title>Page Not Found | AutoNateAI GameLab</title>",
  ),
);

console.log(`Exported ${routes.length} marketplace pages to ${path.relative(rootDir, outDir)}`);
