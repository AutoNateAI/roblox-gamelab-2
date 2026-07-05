# AutoNateAI GameLab Medusa plan

`input_repos/medusa` is the reference commerce engine. This repo now keeps the
GameLab-specific commerce boundary under `apps/marketplace` so Season 1 can move
fast without mixing generated Roblox code with a full Medusa monorepo.

## Current shape

- `apps/marketplace` runs a branded local marketplace preview.
- `data/marketplace/catalog.json` uses Medusa-style product, collection,
  variant, SKU, price, and metadata fields.
- `data/season-1/quests.json` stores the playable quest source material.
- `/api/gamelab/*` and `/store/products` are exposed by the local preview
  server.

## Medusa migration path

1. Create a dedicated Medusa backend package when checkout, admin users, and
   product editing are needed.
2. Seed Medusa products from `data/marketplace/catalog.json`.
3. Map `metadata.quest_id` to `data/season-1/quests.json` or a future quest
   database table.
4. Keep Roblox build artifacts under `roblox/` and generated place exports under
   `output/`.
5. Keep marketing/product content under `data/marketplace` so the storefront,
   Medusa admin, and outreach scripts use the same language.
