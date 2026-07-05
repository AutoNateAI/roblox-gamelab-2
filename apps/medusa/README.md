# AutoNateAI GameLab Medusa backend

This is the Medusa backend target for the GameLab marketplace. It is scaffolded
separately from the Roblox package so Rojo builds stay fast and clean.

## First install

```bash
cd apps/medusa
npm install
cp .env.example .env
npm run dev
```

Use `../marketplace` as the immediate preview app while this backend is wired to
Postgres, admin users, checkout, and product seeding.
