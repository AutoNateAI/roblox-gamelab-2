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

## 8. Research Brief skill (2026-09-15) — search-based research → published page

Status: **implemented, not yet committed/deployed.** Delivers the template
work from §7's "Next" note. Reviewed a ChatGPT-drafted research-page
template against the site's actual voice/architecture and adapted it rather
than adopting it wholesale — see the skill's own reference docs for the
full rationale.

- **New skill**: `apps/marketplace/.claude/skills/research-brief/` —
  4-phase workflow (Research → Draft → Assets → Assemble & Verify), each
  phase a checkpoint. Phase 1 is genuinely search-based (WebSearch/WebFetch
  against primary sources only); nothing is drafted from the model's own
  knowledge. `reference/voice-and-evidence.md` codifies the evidence bar and
  the never-fabricate/never-name-the-Radars rules from §2 of
  `lab-operating-model.md`; `reference/schema.md` is the field-by-field
  `investigations[]` + Markdown shape; `reference/interactive-blocks.md`
  documents the new chart/map fence spec.
- **Long-form content moved out of `data.mjs`**: `investigations[]` entries
  can now carry a `sourcePath` pointing at `content/research/<slug>.md` —
  same pattern the tutorial content already used
  (`readTutorialMarkdown`/`sourcePath` in `src/pages.mjs`), now generalized
  as `readResearchMarkdown()`. Keeps `data.mjs` as scannable structured
  metadata; the narrative (short answer, methodology, implications) lives
  in its own file and reuses the existing hand-rolled `markdownToHtml()` —
  no new Markdown dependency.
- **Two new fenced-code-block types**, ` ```chart ` and ` ```map `, added to
  `codeBlockHtml()` in `src/pages.mjs`. They parse a JSON spec into a
  `data-chart`/`data-map` attribute at build time; `public/app.js`
  lazy-loads Chart.js and Leaflet from jsdelivr **only on pages that
  actually use one** — exactly the existing Mermaid pattern
  (` ```mermaid ` → `<pre class="mermaid">`, lazy ESM import), extended
  rather than replaced. Maps use CARTO's free light/dark basemap tiles, no
  API key, theme-aware (swaps with the existing dark-mode toggle, same as
  Mermaid's theme vars). A malformed chart/map block degrades to a visible
  `.data-block-error` message instead of failing the static build.
- **One end-to-end test entry**: `content/research/bootheel-rice-to-soybean-pivot.md`
  wired to the existing `bootheel-rice-to-soybean-pivot` investigation via
  `sourcePath`. Content is bounded strictly to the two USDA NASS figures
  already cited in that investigation's `evidence[]` (national soybean
  acreage +5% to 85.4M, national rice harvested area -121K to 2.647M) —
  no new claims, explicit "national, not county-level" caveats throughout,
  implications section hedged as "if this holds locally." Verified via
  `node scripts/export-static.mjs` (succeeds) and grepping the built
  `dist/site/research-and-case-studies/bootheel-rice-to-soybean-pivot/index.html`
  for `research-chart`/`research-map`/`pre class="mermaid"` — all three
  rendered as real data islands, not raw code blocks.
- **Out of scope, on purpose**: no live Airtable/Radar wiring (still the
  manual one-question-in loop from §6 of `lab-operating-model.md`); no
  distribution automation (LinkedIn/Facebook/email/YouTube) — that should
  be a separate downstream skill consuming a finished `investigations[]`
  entry, not folded into this one; no county-level choropleth map (the
  `map` fence is point-markers only — a real boundary layer is a bigger
  follow-up if it turns out to be needed); SEO/redirect cleanup explicitly
  excluded per user instruction (handled separately, same session, via
  Codex — see commit `8951067`).
- **Not done yet**: nothing in this round has been committed or deployed —
  `git status` still shows the changed files. User should review the
  rendered page (or ask for a dev-server look) before deciding to ship it.

## 9. Real end-to-end run + `Research Questions` Airtable table (2026-09-15)

Two things happened after the user reviewed §8's build and asked for a real
run plus new voice/format requirements:

- **Voice and format requirements folded into the skill** (durable, applies
  to every future run, not just this one): `reference/voice-and-evidence.md`
  now specifies the narrative voice — first person, Nathan's real bio (young
  Black professional, Michigan-raised, moved to the Bootheel where his
  family is from), witty but professional. `reference/schema.md` now
  requires a history/context section, a policy/incentive section (call out
  explicitly wherever two policy levers point in different directions), and
  a named `## Moral of the Story` section with concrete per-stakeholder
  takeaways, on every article.
- **A genuine end-to-end research pass** on `bootheel-rice-to-soybean-pivot`
  — 8 WebSearches + 5 WebFetches against primary/trade sources (USDA NASS,
  FSA/CRS, EPA/Federal Register via Holland & Knight, farmdoc daily, USA
  Rice Federation, Brownfield Ag News, USGS/academic groundwater research,
  the Little River Drainage District's own history). Real finds: the Little
  River Drainage District (1907-1928) engineered the Bootheel's farmland out
  of swamp; the shared Mississippi River Valley Alluvial Aquifer has been
  declining since large-scale pumping began near Stuttgart, AR in the early
  1900s; H.R. 1 (the One Big Beautiful Bill Act, Jul 2025) raised the rice
  PLC reference price 20.7% ($14.00 → $16.90/cwt); EPA's final 2026-2027 RFS
  rule pulls ~17% more soybean oil into biofuel; the China soybean deal
  still runs ~14% below the five-year average with a 13% tariff standing;
  and Missouri's 2026 rice acreage already came in below average, with USA
  Rice's own regional contact attributing it to "market issues" on the
  record. `content/research/bootheel-rice-to-soybean-pivot.md` rewritten in
  full with this material; `investigations[]` entry in `src/data.mjs`
  updated to match (`status` moved from `"open"` to `"investigating"`,
  `findings` no longer `null`, `evidence`/`sources` expanded to 6/10 real
  citations). Rebuilt via `scripts/export-static.mjs` and verified in the
  already-running local dev server (port 4173) — 3 charts, 1 map, 1 mermaid
  diagram, 0 parse errors.
- **New Airtable table**: `Research Questions` in the
  `AutoNateAI California Technical Network Radar` base
  (`appUHkTbaYBwqpQnA`, table `tblqCcZMkhdRM63RI`) — the `ResearchQuestion`
  object from the Sept 15 ChatGPT planning conversation, flattened into
  Airtable fields (Question, Short Answer, Status, Confidence, Region,
  Commodities, Stakeholders, Hypothesis, Historical Context, Policy &
  Incentive Signals, Findings, What's Still Needed, Moral of the Story,
  Evidence & Sources, Mermaid Diagram, Chart/Map Specs as JSON, Page URL,
  Source File Path, Deployed checkbox, Created/Updated At, and four blank
  distribution-draft fields for LinkedIn/Facebook/Email/YouTube). Chose
  this base over creating a new one because it already hosts the Lab-layer
  tables (`Sources`, `Lab Publications`, `Experiments`, `Projects`,
  `Daily Lab State`) this table is a peer of, per `lab-operating-model.md`
  §4. One record created (`recNZVcbi79n1zDCR`) for the Bootheel
  investigation, `Deployed` left unchecked since nothing is committed yet.
  Distribution-draft fields deliberately left blank — no distribution copy
  has been written; that's out of scope for this skill (see its own "What
  this skill does not do" section).
- **Not done**: no linked-record relationships to the base's existing
  `Sources` table (would mean creating 10 new Source records to match;
  citations live as a single formatted text field on the Research Questions
  record for now) — revisit if/when this table gets more than a couple of
  records and cross-referencing sources across articles starts to matter.
  No Airtable → site sync in either direction yet; the site still reads only
  from `src/data.mjs`/`content/research/*.md`, and this table is a
  documentation/research-ops record of that content, not (yet) its source
  of truth.

## 10. Real bugs from user QA + dedicated Airtable base (2026-09-15, later same day)

User read the live page and found three real problems plus asked for two
structural changes. All fixed/shipped in this pass:

- **Root cause of "Mermaid didn't render and no assets loaded" (real bug,
  not a viewing-method issue as first suspected)**: `public/app.js` had
  **two** top-level `function loadScript(...)` declarations — the new one
  this session added for lazy-loading Chart.js/Leaflet, and a pre-existing
  one used by the Square checkout flow. `app.js` loads as
  `<script type="module">`, where a duplicate top-level function
  declaration is a `SyntaxError` that silently kills the *entire* script —
  explaining why Mermaid, the charts, and the map all failed together with
  no console-visible symptom from the server side (curl/HTML checks all
  showed 200s and correct markup, because the bug only manifests at
  browser-side JS parse time). Fixed by renaming the new one to
  `loadExternalScript` and updating its two call sites. Verified with
  `node --input-type=module --check < public/app.js` in addition to the
  normal `node --check` (which treats the file as a script and would not
  have caught this) — that combined check is now the standard verification
  step for this file going forward.
- **Charts had unbounded/infinite height, page unscrollable**: a classic
  Chart.js gotcha — with `responsive:true`/`maintainAspectRatio:false`,
  Chart.js measures the canvas's *immediate parent* to size itself; the
  fixed height was on the canvas itself (`.research-chart canvas`), not a
  dedicated parent, so the resize observer fed back into its own
  measurement and grew without bound. Fixed by wrapping the canvas in a new
  `.chart-canvas-wrap` div that carries the fixed height
  (`dataBlockHtml()` in `src/pages.mjs`, CSS in `public/styles.css`) — the
  canvas itself now has no explicit CSS height, matching Chart.js' own
  documented fix for this exact issue.
- **Dev server doesn't hot-reload**: discovered mid-session that
  `server.mjs` caches its `pages.mjs`/`data.mjs` ESM imports per process —
  edits to those files require killing and restarting the `node server.mjs`
  process (static files like `app.js`/`styles.css` **do** reflect
  immediately, no restart needed for those). Worth remembering for any
  future session working against the local dev server rather than a fresh
  `export-static.mjs` build.
- **Breadcrumb fix**: investigation detail pages had an extra
  `Open Questions → /investigations` breadcrumb segment pointing at a route
  the Sept 15 SEO cleanup (commit `8951067`) already removed from
  `server.mjs`'s page routes — dead link, and redundant with
  "Research & Case Studies" besides. Removed; investigation breadcrumbs now
  match the same 3-level pattern (`Home / Research & Case Studies /
  <title>`) already used by regions/organizations/systems.
- **Titles are now provocative real questions, not topic labels**: per
  explicit feedback that "Bootheel Rice-to-Soybean Pivot" wouldn't make
  anyone want to click. `investigation.name` — which is the H1, `<title>`,
  and OG title everywhere via the existing `pageShell()` call, so no
  render-code changes were needed — is now the headline
  ("Congress Just Made Rice More Profitable. So Why Are Bootheel Farmers
  Planting Less of It?"); the precise analytical `question` field is
  unchanged and still renders as the subhead. OG description already used
  `investigation.question` (also a question) — satisfied automatically.
  `reference/schema.md` in the skill now requires every future `name` to be
  an honestly-earned provocative question — applied to `investigations[]`
  only (regions/organizations/systems are profile pages, not
  question-driven pieces, and weren't touched).
- **New dedicated Airtable base**: `AutoNateAI Agricultural Intelligence`
  (`appcgGb8QHxrgrQB1`, workspace `Research`) with four tables — `Research
  Questions` (`tblCN6mQPRuEj2c8B`), `Regions` (`tblFmdBIxpHh4Wc5E`),
  `Organizations` (`tbl0NtYc3GzyL27Qn`), `Systems` (`tblP2xPeUAdBRuzRB`) —
  replacing the `Research Questions` table originally (and mistakenly)
  added to the general-purpose `AutoNateAI California Technical Network
  Radar` base two sections ago; that table was deleted after migrating.
  `Research Questions` has real `multipleRecordLinks` fields to all three
  other tables (Airtable auto-created the inverse link fields on
  Regions/Organizations/Systems). Seeded with the real content already live
  on the site: one Region (Southeast Missouri), one Organization (Farm
  Credit Southeast Missouri), one System (Agricultural Finance & Capital),
  and the Bootheel Research Question record, linked to all three.
  Renaming/duplicating the *old* California base itself (Nathan separately
  asked about this) isn't possible through the available Airtable MCP tools
  (no base-level rename or duplicate operation) — flagged back to Nathan to
  do directly in the Airtable UI if still wanted; this new base sidesteps
  the need for agricultural work specifically.
