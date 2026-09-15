# AutoNateAI — Agricultural Economic Systems Intelligence Lab

Status: **implemented 2026-09-14, refined 2026-09-15 (see §7).** This
document records the current locked direction for autonateai.com and
supersedes the general-lab framing in `lab-operating-model.md` as the
site's primary identity — that document's private/public boundary rule
(§2) and "never claim more activity than actually happened" rule still
apply in full; nothing here relaxes them.

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

Primary nav (`navItems` in `src/data.mjs`) at launch: `Intelligence(/) ·
Regions · Systems · Organizations · Research & Case Studies (/articles) ·
The Lab (/lab) · Work With Us`. **Superseded 2026-09-14/15 — see §7 below**:
nav is now just four items, and Regions/Systems/Organizations/The Lab are
footer links / in-page filters, not primary nav. Tutorials, Consulting,
Events, Community, and For Organizations keep their routes unchanged,
still reachable from the footer.

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
- `/consulting`, `/for-organizations`, `/tutorials`, `/programs` content
  itself wasn't rewritten — only nav/footer placement changed. (`/about`
  **was** rewritten in the §7 round below.)
- Only Southeast Missouri and one organization/system/investigation are
  real research; everything else is a watchlist placeholder until a real
  research pass fills it in.

## 7. Second round (2026-09-14/15) — copy cleanup, Work With Us, URL/SEO rework

Status: **implemented, merged to `main`, deployed live** (PRs #11-#15).
Follow-up round after real-site feedback — most changes below are copy/UX
polish plus one real bug fix, not a positioning change; the agricultural
identity from §1-6 stands.

**Real bio correction** (was wrong on the live About page): Nathan grew up
in **Michigan** — that's where he first got into agriculture. His family
is from the Missouri Bootheel; he spent every summer there growing up and
has recently moved back. He did **not** grow up in Sikeston/the Bootheel.
Fixed everywhere the About page's hero, founder card, spotlight section,
and FAQ previously said otherwise.

**Nav/footer, corrected from §2 above**: primary nav is now exactly
`Intelligence(/) · Research & Case Studies · Work With Us · About` —
Regions/Systems/Organizations/Investigations/Lab are footer links and
in-page filters only. Footer's "Research & Case Studies" column is a
single link (no sub-list); the old "More" column is gone, replaced with
just "Work With Us" and "About Nathan." The Discord button was removed
from the navbar entirely.

**New `/work-with-us` page**: a standalone contact form for agribusiness
targets (org type, need, project details) that builds a `mailto:` link on
submit and opens the visitor's email client with everything pre-filled —
no backend, no Airtable. Has its own generated hero image and a generated
side-panel image; deliberately does not duplicate Nathan's photo/bio from
`/about`. Every "Work With Us" link site-wide now points here instead of
the old `/about#work-with-me` anchor.

**About page rework**: mission section retitled, "Where This Is Headed"
roadmap and "Letter from Nathan" sections removed entirely, a redundant
"Free Technical Courses"/org-logo-cloud/engineering-discipline block
removed, Work With Us section reduced to one card+button linking to the
new page, FAQ broadened to national scope (added "Do you only cover
Southeast Missouri? No.") with the bio fix applied, new generated image
for the "Tech and Business Analytics, Pointed at Agriculture" section.

**URL/SEO restructuring**: `/articles` → `/research-and-case-studies`, and
every region/organization/system/investigation detail page moved from
`/regions/<slug>`, `/organizations/<slug>`, etc. to a unified
`/research-and-case-studies/<slug>` — one canonical URL per piece of
research. The bare listing pages (`/regions`, `/organizations`, `/systems`,
`/investigations`) are unchanged.

**Infrastructure correction — important if touching routing again**: this
site's actual production host is **GitHub Pages**
(`.github/workflows/deploy-gh-pages.yml`, auto-deploys on every push to
`main`), serving the static export from `scripts/export-static.mjs`.
`firebase.json`'s `redirects` config is **not live** for the main site —
relying on it for the URL rename above shipped as real 404s in production
until caught same-session. The actual fix is static redirect stub files
(`writeRedirect()` in `export-static.mjs`: canonical link + meta-refresh +
JS `location.replace`) generated at every old path. Verify against the
GitHub Pages deploy, not `firebase.json`, if this comes up again.

**Full OG (social-preview) image audit**: `scripts/generate-og-images.mjs`
still had pre-agriculture-pivot copy ("Independent AI, Software & Human
Systems Lab," "Welcome to My Lab") on the Home/About/Research-hub cards —
fixed. 8 pages (Regions, Organizations, Systems, Investigations, Lab,
Projects, Experiments, Open Source) had no `ogImage` set at all and were
silently falling back to a mismatched default — each now reuses its own
already-displayed hero photo.

**Mobile CSS fix**: `.two-col`/`.form-stack` (shared with the Consulting
booking form) had bare `1fr` grid tracks and unconstrained form controls —
a `<select>` with long option text could force the grid wider than the
viewport, which `body`'s `overflow-x: hidden` turned into clipped content
rather than a scrollbar. Fixed with `minmax(0, 1fr)` tracks and explicit
`width: 100%; min-width: 0` on form inputs/selects/textareas.

**Next**: user is pausing further site changes to build a repeatable
research template offline, then plans to return asking for Claude Code
skills to help produce both the research and its webpage — no template
shape confirmed yet as of this writing.
