# AutoNateAI — Agricultural Economic Systems Intelligence Lab

Status: **implemented 2026-09-14.** This document records the current locked
direction for autonateai.com and supersedes the general-lab framing in
`lab-operating-model.md` as the site's primary identity — that document's
private/public boundary rule (§2) and "never claim more activity than
actually happened" rule still apply in full; nothing here relaxes them.

## 1. What changed

Old framing (`lab-operating-model.md`, shipped `a5cd6a1`/`7ac843b`/`18ec704`):
*AutoNateAI is Nathan Baker's independent AI, software, and human-systems
research lab* — general-purpose, navy/gold theme, content model of
Projects/Experiments/Open Source/Sources/Events.

New framing: **AutoNateAI is an agricultural economic-intelligence and
technology lab.** Agriculture is the anchor for regional economic-
development research across the U.S. — production, capital/finance,
freight/infrastructure, processing/market access, policy, economic
development, technology, and the businesses that connect them. Southeast
Missouri is the recurring laboratory Nathan can physically validate; the
same methodology extends to other U.S. agricultural regions one real
research pass at a time.

The general-lab content model (Projects/Experiments/Open Source/Sources/
Events) is not deleted — it's the methodology layer, now reachable at
`/lab` instead of the homepage. See `lab-operating-model.md` for its own
operating rules (the five Radars, the Airtable data model, the public/
private boundary).

## 2. New content model

Four new entity types, each with a list page and SEO detail pages, in
`src/data.mjs` / `src/pages.mjs` (same `renderX()`/`renderXDetail()`
pattern as the existing lab content):

- **Regions** (`/regions`, `regions[]`) — a geography (county, corridor,
  delta, belt). `status: "laboratory"` (actively profiled, validated
  in-person) vs. `"watchlist"` (named, not yet researched).
- **Organizations** (`/organizations`, `organizations[]`) — a real
  organization as an economic-system node: role in the graph, verified
  public figures with sources, never fabricated or presented as insider
  information. Imagery is generic/editorial, never a fabricated logo.
- **Systems** (`/systems`, `systems[]`) — a pipeline (Production & Food,
  Finance & Capital, Freight/Infrastructure/Storage, Processing & Market
  Access, …) run through the same four-pillar lens every time: Business
  Analysis, Data Intelligence, Systems Mapping, AI & Automation.
- **Investigations** (`/investigations`, `investigations[]`) — the
  Business Question Queue. `status: "open" | "investigating" | "published"`.
  An investigation stays `"open"` — hypothesis and evidence public, no
  fabricated finding — until real research actually produces one.

Primary nav (`navItems` in `src/data.mjs`): `Intelligence(/) · Regions ·
Systems · Organizations · Research & Case Studies (/articles) · The Lab
(/lab) · Work With Us`. Tutorials, Consulting, Events, Community, and For
Organizations keep their routes unchanged, moved to the footer.

## 3. Seed content (2026-09-14 launch)

One fully-researched flagship entry per entity type, one honest
`"Watchlist"`/placeholder entry per type proving the pattern — no
agricultural radar has produced daily content yet, so nothing claims a
live automated pipeline:

- Region: **Southeast Missouri (The Bootheel)**.
- Organization: **Farm Credit Southeast Missouri** — sourced from its own
  public annual reports, the Farm Credit Administration public directory,
  and the Farm Credit Council's Missouri state page. FY2023 figures;
  verify against the current annual report before treating them as
  current.
- System: **Agricultural Finance & Capital**.
- Investigation: **Bootheel Rice-to-Soybean Pivot** — grounded in real
  USDA NASS acreage data (national Acreage report and Rice Outlook), with
  county-level SEMO data explicitly flagged as a gap still to pull. Status
  `"open"`.

## 4. Images

`scripts/generate-ag-lab-images.mjs` (model `gpt-image-2`, same pattern as
`generate-site-images.mjs`) generated hero/thumbnail art for the new pages
in the new "Technical Editorial" visual style — luminous ivory/emerald/
river-blue, photo-realistic, no readable text or logos. Organization
imagery is deliberately generic (a building exterior, a desk) rather than
a fabricated photo of the real company's actual office or logo.

## 5. Visual system

Re-themed `public/styles.css` root tokens from navy/gold to the palette in
the Google Stitch redesign mockups (`stitch_autonateai_research_lab_redesign/`
— 5 reference pages: homepage, SE Missouri region portal, Farm Credit SEMO
org node, Ag Finance systems deep-dive, Bootheel rice investigation).
Emerald primary, river-blue secondary, ivory surfaces in light mode; a few
new component classes (`.stage-stepper`, `.fact-list`, `.portfolio-mix-*`)
extend the existing card/badge/table vocabulary rather than replacing it.
Kept the existing hand-rolled CSS-custom-property architecture — no
Tailwind CDN — to match the rest of the codebase and avoid FOUC.

## 6. Out of scope (for a future pass)

- No live Airtable integration for regions/organizations/systems/
  investigations — hardcoded in `data.mjs`, same as the existing lab
  arrays. No agricultural radar Airtable base exists yet.
- `/about`, `/consulting`, `/for-organizations`, `/tutorials`, `/programs`
  content itself wasn't rewritten — only nav/footer placement changed.
- Only Southeast Missouri and one organization/system/investigation are
  real research; everything else is a watchlist placeholder until a real
  research pass fills it in.
