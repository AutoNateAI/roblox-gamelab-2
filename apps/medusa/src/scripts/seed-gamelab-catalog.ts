import { readFile } from "node:fs/promises";
import path from "node:path";

type Catalog = {
  products: Array<{
    id: string;
    handle: string;
    title: string;
    variants: Array<{ sku: string; title: string; price_usd: number }>;
  }>;
};

const catalogPath = path.resolve(process.cwd(), "../../data/marketplace/catalog.json");
const catalog = JSON.parse(await readFile(catalogPath, "utf8")) as Catalog;

console.log("GameLab catalog seed preview");
for (const product of catalog.products) {
  console.log(`- ${product.handle}: ${product.title}`);
  for (const variant of product.variants) {
    console.log(`  ${variant.sku} ${variant.title} $${variant.price_usd}`);
  }
}

console.log(
  "Next: replace this preview with Medusa createProductsWorkflow once Postgres/admin are active.",
);
