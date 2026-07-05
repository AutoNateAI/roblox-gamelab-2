# Skill: Marketplace publisher

**Purpose:** move Season 1 GameLab quest briefs into the AutoNateAI GameLab
marketplace under the `/api/gamelab` namespace and Medusa-shaped product
catalog.

## Namespace

- `GET /api/gamelab/health`
- `GET /api/gamelab/season-1`
- `GET /api/gamelab/quests`
- `GET /api/gamelab/quests/:questId`
- `POST /api/gamelab/quests`
- `POST /api/gamelab/quests/:questId/events`

## Data boundary

Use `data/season-1/quests.json` as the portable seed while the Learning Hub
Firestore database becomes the live authoring store.

## Publish checklist

1. Validate the quest has acts, zones, concepts, a capstone, and next actions.
2. Mirror the quest into `data/marketplace/catalog.json` as a product or service
   offer.
3. Call the `/api/gamelab/health` endpoint after starting the marketplace.
4. Confirm the marketplace home page renders the Season 1 offer shelf.
