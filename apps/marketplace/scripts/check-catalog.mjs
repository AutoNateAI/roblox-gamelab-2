import { readFile } from "node:fs/promises";

const catalog = JSON.parse(await readFile("data/marketplace/catalog.json", "utf8"));
const season = JSON.parse(await readFile("data/season-1/quests.json", "utf8"));

const productHandles = new Set();
const errors = [];

for (const product of catalog.products || []) {
  if (!product.title || !product.handle) {
    errors.push("Every product needs a title and handle.");
  }
  if (productHandles.has(product.handle)) {
    errors.push(`Duplicate product handle: ${product.handle}`);
  }
  productHandles.add(product.handle);
  if (!Array.isArray(product.variants) || product.variants.length === 0) {
    errors.push(`${product.handle} needs at least one variant.`);
  }
}

for (const quest of season.quests || []) {
  if (!quest.id || !quest.title || !Array.isArray(quest.acts)) {
    errors.push(`Invalid Season 1 quest: ${quest.id || "missing-id"}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Catalog OK: ${catalog.products.length} products, ${season.quests.length} quests.`);
