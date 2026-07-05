# AutoNateAI GameLab Marketplace

This app is the repo-local marketplace shell for Season 1 Roblox GameLab work.
It uses a Medusa-inspired catalog boundary now, so the offers, product handles,
collections, variants, and metadata are ready to move into a real Medusa backend
when we wire payments/admin.

## Dev loop

```bash
npm run marketplace:dev
```

Open `http://localhost:4173`.

## API namespace

- `GET /api/gamelab/health`
- `GET /api/gamelab/season-1`
- `GET /api/gamelab/quests`
- `GET /store/products`

## Data

- `data/season-1/quests.json` is the quest-building source of truth.
- `data/marketplace/catalog.json` is the Medusa-shaped commerce catalog.
