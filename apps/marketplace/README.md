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

## Square payment prep

Checkout stays in preview mode until Square credentials are present. To enable
the server-side payment route, set:

```bash
SQUARE_ENVIRONMENT=sandbox # or production
SQUARE_APPLICATION_ID_SANDBOX=...
SQUARE_LOCATION_ID_SANDBOX=...
SQUARE_ACCESS_TOKEN_SANDBOX=...
SQUARE_APPLICATION_ID_PROD=...
SQUARE_LOCATION_ID_PROD=...
SQUARE_ACCESS_TOKEN_PROD=...
SQUARE_VERSION=2026-06-18
```

The generic `SQUARE_APPLICATION_ID`, `SQUARE_LOCATION_ID`, and
`SQUARE_ACCESS_TOKEN` names also work if only one environment is configured.
The prefix style (`SQUARE_SANDBOX_APPLICATION_ID`,
`SQUARE_PRODUCTION_APPLICATION_ID`) is also supported.

Prepared endpoints:

- `GET /api/square/config` reports whether Square is configured.
- `GET /api/square/locations` lists Square locations for the selected
  environment when an access token is configured. Use this to find the
  `SQUARE_*_LOCATION_ID`.
- `POST /api/square/payments` accepts a Square `sourceId`, program handle, and
  offering ID, then creates the payment through Square's Payments API.
