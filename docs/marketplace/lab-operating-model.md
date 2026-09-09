# AutoNateAI Lab — Operating Model

Status: **direction locked, implementation not started.** This document is the
implementation contract for the site rebuild. It supersedes the Consulting-first
homepage/nav that shipped in the last few days (see `ae9d358`, `046888e`,
`89c65a2`) as the target state — that work isn't wasted (About page, SEO fixes,
Consulting page itself all carry forward), but the *homepage framing and primary
nav* are changing again. See the sequencing decision in the PR/commit that
introduces this doc for what shipped first.

## 1. What AutoNateAI is becoming

Old framing: *AutoNateAI is Southeast Missouri's AI consulting and development
studio, based in Sikeston, MO.*

New framing: **AutoNateAI is Nathan Baker's independent AI, software, and
human-systems research lab.** The website is a public projection of the lab's
current research state — not a local-market consulting brochure.

Sikeston/Southeast Missouri framing comes out of the primary identity. It can
stay as historical/program detail on legacy pages (`/programs/ai-agent-systems`
etc.) but should not appear in the hero, meta description, or footer identity.

Positioning line:

> AutoNateAI is the independent AI, software, and human-systems research
> practice of Nathan Baker. Research direction is continuously informed by
> emerging software, scientific work, technical communities, and experimental
> results.

## 2. The private engine vs. the public site — the boundary rule

This is the most important rule in this document. **Never let it get blurry.**

```
PRIVATE (never exposed on the site)
────────────────────────────────────
5 daily Radars (prompts, scoring, ranking logic)
Radar_Reports/ PDFs
ChatGPT / NotebookLM synthesis conversations
Airtable "candidate" records (Status = New/Reviewing)

                    ↓ Nathan curates ↓

PUBLIC (safe to render on autonateai.com)
────────────────────────────────────
Airtable records explicitly marked public-safe
Daily Lab State (only when Publish to Site = true)
Published Lab Publications, active Projects,
running/complete Experiments, selected Sources,
selected Events, People/Companies referenced by
public records
```

Concretely:
- Never name the five radars, show radar prompts, show scoring/ranking
  formulas, or link/embed the raw PDFs on the public site.
- Claude Code (or any site build step) never reads `Radar_Reports/*.pdf`
  directly to generate page copy. That pipeline is: PDF → Nathan (+ ChatGPT /
  NotebookLM) → Airtable public-safe records → site. See §6.
- Every Airtable table that can surface publicly needs a `Status`/visibility
  field, and the site query must filter on it. Default to *not shown* until
  explicitly approved.

## 3. The five Radars (private intelligence engine)

Kept for context — this is *why* the site has fresh material, not something
the site itself talks about by name.

1. **California Network Radar** — CA companies/engineers/authors/YouTube,
   relationship-building targets.
2. **GitHub Open Source Radar** — trending/growing repos, releases, architecture.
3. **Research Paper Radar** — arXiv/papers, authors/labs, paper→code links.
4. **Events & Build Radar** — conferences, meetups, hackathons, competitions
   (merged from the old weekly competition monitor + tech events monitor).
5. **Mindfulness Tech Radar** — EEG/HRV/neurotech/contemplative research, with
   a strict evidence ladder (Peer Reviewed → Preprint → Official Technical
   Source → Company/Institute Claim → Practitioner Interpretation → Cultural/
   Spiritual Signal). Feeds the "Human Systems" research vertical.

All five write into Airtable base **AutoNateAI California Technical Network
Radar** (`appUHkTbaYBwqpQnA`) before producing a branded PDF and emailing it
to `autonate.ai@gmail.com`. Scheduled daily at 6:00 AM Central (production);
today's inaugural runs were manual (Sept 9, 2026).

Reports land in `apps/marketplace/Radar_Reports/MMDDYYYY/*.pdf` — tracked in
git (added Sept 9, 2026) so the archive persists in the repo. This folder is
Nathan's private reading material, not a site asset; nothing under it should
ever be referenced from `public/` or served by a route.

## 4. Airtable data model

Base: `AutoNateAI California Technical Network Radar` (`appUHkTbaYBwqpQnA`).

Existing radar/network tables (already live):
- `Companies`, `Publishers`, `People`, `Publications`, `Interactions`,
  `Blog Ideas`

Lab layer (added on top, per the Sept 9 chat that produced this doc):
- `Sources` — papers, repos, videos, datasets, blogs, docs, talks. Fields
  include `Radar` (which desk found it), `Source Type`, `Evidence Class`
  (Peer Reviewed / Preprint / Official Technical Source / Company-Institute
  Claim / Practitioner Interpretation / Cultural-Spiritual Signal /
  Unclassified), `Status` (New → Reviewing → Selected → Used → Archived),
  topics, key insight, why it matters.
- `Lab Publications` — Nathan's own finished research/analysis/architecture/
  experiment write-ups. Never auto-created from a third-party source.
- `Experiments` — Question → Hypothesis → Method → Measurements → Results →
  Limitations → Next experiment. `Status`: Running / Analyzing / Complete /
  Published. Only created when Nathan has actually started one (radar output
  can propose *candidate* experiments, but those live as text, not as rows
  in this table, until real).
- `Projects` — multi-week/month research programs that aggregate
  Publications, Experiments, Sources, repos, People, Events.
- `Events` — conferences/meetups/hackathons/competitions + AutoNateAI's own
  Saturday Lab sessions. Linked to People/Organizations/Projects.
- `Radar Runs / Daily Briefs` (to add) — one record per run: date, radar,
  query families executed, candidates inspected, verified sources, new vs.
  updated records, blind spots, PDF reference, top actions. Makes "exhaustive"
  measurable instead of an unverified claim in a prompt.
- `Daily Lab State` (to add) — the actual public/private handoff surface, one
  record per day: `Date`, `Daily Thesis`, `Current Investigation` (linked
  Project), `Study Today` / `Build Today` (linked Sources/Experiments),
  `Open Source Focus`, `Event Focus`, `Research Question`, `Lab Note`,
  `Publish to Site` (checkbox), `Website Status` (Draft/Approved/Published).
  This table contains **only** what Nathan has decided is public-safe — it
  never stores radar internals.

`People` ↔ `Publications`/`Events`, `Companies` ↔ `Publications`/`Events`,
`Projects` ↔ `Events`, and the Lab-layer tables all cross-link, so the base
functions as a small knowledge graph, not five disconnected tables.

Env var needed in `.env` / Firebase config for the site to read this base:
`AIRTABLE_BASE_ID_LAB=appUHkTbaYBwqpQnA` (parallel to the existing
`AIRTABLE_BASE_ID_CONSULTING`, `AIRTABLE_BASE_ID_GAMELAB`,
`AIRTABLE_BASE_ID_MARKET_MATRIX` pattern in `src/airtable-client.mjs` /
`server.mjs`).

## 5. Public site information architecture

Nav (target state): `Latest · Publications · Experiments · Projects ·
Open Source · Events · Learn · About`

Maps onto new `renderX` functions in `src/pages.mjs`, following the existing
pattern (`renderHome`, `renderArticles`, `renderEvents`, etc.):

- **`/` (Latest)** — living front page. Lab identity/masthead → Current
  Investigation (featured Project) → Today at the Lab (4 cards: Research /
  Open Source / Experiment / Event, pulled from most-recent public-safe
  records) → Latest Publications (unequal editorial weight: lead + secondary
  + analysis, not a uniform grid) → Running Experiments → Active Projects →
  Open Source activity → Upcoming Events → Learn preview → Nathan/About
  preview. Rebuilds `renderHome`.
- **`/publications`** — NYT/Bloomberg-style archive of `Lab Publications`
  where `Status = Published`, filterable by tags (AI Agentic Systems,
  Architecture, Open Source, Simulation, GIS, Security, Data, Neurotech,
  Mindfulness/Human Systems). Each article shows its research graph
  footer: Sources / Experiments / Code / Projects / People / Orgs /
  Related Publications. Replaces `renderArticles`/`renderArticleDetail`.
- **`/experiments`** — lab notebook. Filter by Running/Analyzing/Completed/
  Published and by domain. Detail page: Question, Hypothesis, Background,
  Sources, Method, Architecture, Environment, Data, Measurements, Results,
  Visualizations, Limitations, Code, Related Research, Next Experiment.
  New page type.
- **`/projects`** — multi-month research programs, each showing its rolled-up
  counts (experiments/publications/sources/repos/people/events) and full
  graph. New page type.
- **`/open-source`** — Studying / Building With / Contributing, one page per
  repo with why-it-matters, architecture notes, related research, experiments
  using it, maintainers. New page type.
- **`/events`** — "Where AutoNateAI is showing up" (selected external events)
  + "AutoNateAI Lab Sessions" (own Saturday virtual sessions, Google Meet).
  Rebuilds `renderEvents`.
- **`/learn`** — the four existing free courses (`content/tutorials/*`),
  reframed as "Learn from the Lab" rather than a program funnel. Mostly
  `renderTutorials`/`renderTutorialPack`/`renderTutorialDetail` as-is, minus
  Sikeston-cohort language.
- **`/about`** — Nathan's career/philosophy. Keep the UMich/Microsoft/Citi/
  Veterans United/Atomic Object/AutoNateAI credibility, drop the
  "we teach builders" instructor-first opening line in favor of
  "I build and study software systems." `Work With Me` (Architecture / AI
  Engineering / Technical Consulting) becomes a quiet subsection here, not a
  nav-level identity. Existing `renderAbout`.

`Consulting` and `For Organizations` are demoted from primary nav to a
`Work With Me` link/section (likely inside `/about` or its own low-nav page)
— they keep working, they just stop being the front door. Confirm exact
placement before touching `navItems` in `src/data.mjs` (see open decision in
chat).

Visual system: Bloomberg information density × scientific-journal
credibility × modern AI lab. Near-black/charcoal base, warm off-white reading
surfaces for long-form, thin structural borders, editorial serif for
headlines, precise sans-serif for UI/metadata, monospace for experiment IDs
and technical state (`EXP-024`, repo names, measurements). No gradients,
glassmorphism, or stock "AI" imagery — diagrams, real data, code, and source
material are the visuals. Evidence-class badges (`● PEER REVIEWED`,
`◐ PREPRINT`, `◆ TECHNICAL SOURCE`, `△ INSTITUTE CLAIM`, `○ PRACTITIONER`,
`◇ CULTURAL/SPIRITUAL`) render wherever a Source is cited.

## 6. Daily workflow (Nathan's loop)

```
06:00  5 Radars run → Airtable updated → 5 PDFs emailed to
       autonate.ai@gmail.com, saved to Radar_Reports/MMDDYYYY/
06:30+ Nathan uploads the 5 PDFs to a ChatGPT or NotebookLM conversation
       → asks "what converged across today's radars?"
       → decides what to study/build/test/write/attend
       → tells ChatGPT to update today's Daily Lab State record
       (Publish to Site = true on what's public-safe)
Later  Claude Code reads Airtable public-safe state (Daily Lab State,
       Projects, Experiments, Sources, Events, Lab Publications) —
       never the PDFs directly — and the site reflects it.
```

Site update cadence differs by page: `/` changes daily (Daily Lab State),
`/experiments` and `/open-source` change when something real starts/updates,
`/publications` and `/projects` change when something is actually finished
or started, `/learn` and `/about` are close to static.

## 7. Sequencing / what's actually built vs. planned

- [x] Airtable base + Lab-layer tables (Sources, Lab Publications,
      Experiments, Projects, Events) — built in ChatGPT, Sept 9, 2026.
- [x] Five Radars updated to write Airtable first, then PDF + email.
- [x] Inaugural radar runs (manual) — Sept 9, 2026, seeded in
      `Radar_Reports/09092026/`.
- [x] Radar_Reports tracked in git.
- [x] Nav rebuilt (Sept 9, 2026): `navItems` in `src/data.mjs` is now
      `Latest · Publications · Experiments · Projects · Open Source ·
      Events · Learn · About`. Consulting/For Organizations demoted to
      `/about#work-with-me` (still fully live at `/consulting`,
      `/for-organizations`, `/programs/:handle` — just out of primary nav).
- [x] `renderHome` rebuilt around Current Investigation / Today at the Lab /
      Active Projects / Experiments & Open Source / Learn / Publications,
      driven by new `src/data.mjs` exports: `currentInvestigation`,
      `labProjects`, `labExperiments`, `openSourceRepos`, `eventSignals`.
      These are **hand-seeded placeholders** (see the file's own comment
      block) — real content once `Daily Lab State`/`Experiments`/`Projects`
      exist in Airtable, same field shapes.
- [x] New pages: `/experiments`, `/projects`, `/open-source` — `renderX`
      functions in `src/pages.mjs`, wired into `server.mjs` and
      `scripts/export-static.mjs` (routes + sitemap + nav).
- [x] `/articles` (Publications), `/events` (Lab Sessions + "Signals
      AutoNateAI Is Watching"), and `/about` (opens "I build and study
      software systems," new `#work-with-me` section) copy updated to Lab
      framing. Footer/meta identity (`src/components.mjs`) no longer leads
      with Sikeston/Southeast Missouri.
- [x] `scripts/export-static.mjs` static build verified end-to-end (51 pages,
      dev-server smoke test on all changed/new routes — no runtime errors).
- [ ] `Radar Runs / Daily Briefs` table (coverage/exhaustiveness tracking).
- [ ] `Daily Lab State` table (public/private handoff surface) — once this
      exists, `currentInvestigation`/`labProjects`/`labExperiments`/
      `openSourceRepos`/`eventSignals` in `data.mjs` should become a fetch
      from Airtable instead of a hand-edited array. Same shapes, so this is
      a data-source swap, not a template rewrite.
- [ ] `AIRTABLE_BASE_ID_LAB` wired into `.env` + `src/airtable-client.mjs`
      consumer.
- [ ] Visual system (serif/sans/mono type scale, evidence badges beyond the
      reused `.status-pill`, editorial card hierarchy) — today's build
      intentionally reused existing tokens/classes (Space Grotesk/Inter/
      JetBrains Mono, `.industry-card`, `.value-grid`, `.status-pill`) rather
      than introducing a new type system, to ship the IA/content pivot
      without a parallel CSS rewrite. Revisit once real Lab content exists.
- [ ] Regenerate OG images for `/experiments`, `/projects`, `/open-source`
      (currently fall back to `DEFAULT_OG_IMAGE`) — see
      `scripts/generate-og-images.mjs`.
- [ ] Resubmit sitemap in Google Search Console once this deploys (see
      `docs/marketplace/google-search-console-setup.md`) — new routes and
      the homepage title/description both changed.

## 8. Sept 9 second pass — real content, visual system, Sikeston removal

- [x] **Sikeston fully removed** from every rendered page (`src/`, `content/`)
      — verified via a post-build grep of `dist/site`. The only surviving
      mentions are the real, dated, located cohort logistics
      (`liveSchedule`/`cohortNote`/`meetingFrequency` in
      `data/marketplace/programs.json`, surfaced only in the hidden
      checkout/success JSON data island) — a real in-person program really
      does meet at Center Street Station, Sikeston, MO, so that fact stayed;
      marketing copy referencing it did not. `scripts/generate-og-images.mjs`
      text updated too, but the actual OG `.jpg` files still need a real
      regeneration run (not done — costs a gpt-image-2 call per image).
- [x] **Color system**: white/navy/gold (light) and black/navy/gold (dark) —
      `:root` tokens in `public/styles.css`. Button fills deliberately invert
      by mode (navy-on-white in light, gold-on-navy in dark) rather than
      using one fixed brand color, so both poles stay legible. No leftover
      hardcoded red hex anywhere in the stylesheet (verified by grep).
- [x] **Typography**: added Fraunces (serif) for `h1`/`h2` editorial
      headlines; Space Grotesk stays on `h3`/`h4` (structural/card titles);
      Inter/JetBrains Mono unchanged. Loaded via the existing Google Fonts
      `<link>` in `pageShell` (`src/components.mjs`).
- [x] **Evidence-ladder badges** (`.evidence-badge[data-evidence=...]`) —
      6 classes, color-as-signal not color-as-grade. Wired into
      `labSources`/`sourceCard` and used on `/` ("What I'm Reading") and
      `/articles#reading` ("Research Desk").
- [x] **Real content replaced the hand-seeded placeholders** from the first
      pass — every project/experiment/repo/source/event now traces to an
      actual Airtable record or radar-PDF page (Sept 9 run): read all 5
      Radar_Reports PDFs directly (90 pages) and queried the Airtable base
      (`Sources` — 76 records, `Events` — 18 records, `Daily Lab State` — the
      real Sept 9 record) via the Airtable MCP tools. `labSources`,
      `labEvents`, `labExperiments` (from the Research Paper Radar's
      candidate-experiment queue), and `openSourceRepos` in `src/data.mjs`
      are the curated, real subset now rendered — every URL is a verified
      field value or PDF-visible link, never invented.
- [x] **`/events` rebuilt** per explicit feedback that it wasn't doing what
      was asked: now two clearly separated real sections — "Where I'm
      Showing Up" (agent/software events) and "Human Systems Signals"
      (mindfulness/neurotech events), both from `labEvents` — plus
      "AutoNateAI Lab Sessions" (the real recurring build sessions,
      condensed behind a `<details>` for the full rotation instead of
      dominating the page).
- [ ] Airtable's `Daily Lab State` record has `Website Status: Draft` (not
      `Published`) — this pass rendered it anyway on Nathan's explicit
      instruction in-session. Once the daily workflow is running
      unattended, the site's data layer should actually respect that field
      before rendering a day's state publicly.
- [ ] Visual QA was done at the code/token level only (no screenshot tool
      available in this session) — grep-verified no orphaned red hex, dev
      server smoke-tested on every route (200s, no `undefined` leaks), full
      `scripts/export-static.mjs` build succeeded. Worth an actual visual
      pass (browser or `/design`-style review) before a wide announcement.

## 9. Sept 9 third pass — content library: detail pages, thumbnails, pagination

Shipped per explicit feedback that the site read as "landing-page-ish" —
every Lab entity now has its own real detail page and thumbnail, structured
like a research/tech blog (NYT/Bloomberg content-library model), not just
card grids.

- [x] **Detail pages for every Lab entity**: `/projects/:slug`,
      `/experiments/:slug`, `/open-source/:slug`, `/events/:slug`,
      `/sources/:slug` (new — the Publications "What I'm Reading"/Research
      Desk items). Each is a real, shareable, SEO'd page: breadcrumbs,
      thumbnail, full `detail-field-grid` (experiments get Question/
      Hypothesis/Background/Method/Measurement/Artifact/Limitations;
      open-source gets Activity/What to Study/Why It Matters/Action; sources
      get Key Insight/What's Supported/Caveat; events get Action/Networking
      Plan + Cost/Prize Notes), external link to the real source, and a
      "Related" grid linking back to the same project's other
      experiments/repos/sources. `og:image` is the entity's own thumbnail —
      built specifically so individual pages are shareable to specific
      people/orgs.
- [x] **45 AutoNateAI-branded thumbnails**, generated via `gpt-image-2` in
      parallel (`scripts/generate-lab-thumbnails.mjs`, concurrency 8,
      ~16MB total under `public/assets/thumbnails/<type>/<slug>.jpg`):
      3 projects, 9 open-source repos, 7 experiments, 12 sources, 14 events.
      Navy/gold meme-energy style, no readable text/logos (gpt-image-2
      renders garbled text), each prompt genuinely tailored to its content.
      Re-run the script (same concurrency pattern) to regenerate or extend —
      it's additive-safe, just add entries to both `items` in the script and
      the matching `thumbnail` field in `data.mjs`, they're cross-verified
      to match 1:1 before every build.
  - **Not delivered: animation.** Nathan asked for "animated" thumbnails —
    gpt-image-2 only produces static images and no video/GIF-generation
    tool was available this session. Compensated with a CSS hover-zoom on
    every `.card-thumbnail` (see `public/styles.css`) as a motion touch, but
    genuinely animated thumbnails are still open — would need a different
    tool/API.
- [x] **Real navy/gold/white brand carried through** the new thumbnails —
    generated using the same hex values as the `:root` CSS tokens (§Sept 9
    second pass), so they read as one system with the rest of the site.
- [x] **A 3rd Active Project**: "Spatial & Simulation Systems" (real, not
      padding — grounded in PlannerForge, Mireye, NASA Space Apps, HackStorm)
      so the homepage's "What's Forming Right Now" now shows 3 cards, not 2.
- [x] **Events page**: removed the "AutoNateAI Lab Sessions" section
      entirely (the old 3-day-a-week Industry Build Lab kickoff/rotation
      block) per explicit feedback — `industryWeeks`/`kickoffSession`/
      `buildLabInfo` and the now-dead `industryWeekCalendarCard` helper were
      removed from `src/pages.mjs` (data itself untouched in `data.mjs` in
      case another page needs it later). `/events` is now purely the two
      real research-desk sections (Agent Systems & Software / Human Systems
      Signals), each card linking to a real detail page.
- [x] **Pagination**, real not theoretical: `paginate()`/`paginationNav()`
      in `src/pages.mjs`, wired into `/experiments` (7 items, 6/page),
      `/open-source` (9 items, 6/page), and `/articles` main grid (8 items,
      6/page) — each genuinely produces a page 2 today. Page-2+ URLs are
      `noindex,follow` (avoid duplicate-content indexing) and both
      `server.mjs` and `scripts/export-static.mjs` serve
      `<section>/page/<n>`. **Not paginated on purpose**: `/projects` (3
      items — no real need yet) and `/events` (14 items across 2 sections —
      reasonable on one page; forcing shared pagination across two
      differently-sized sections would've been architecturally awkward for
      no real payoff yet). Publications' Research Desk reading-list
      sub-section is also unpaginated (12 items, fits fine) — revisit all of
      these thresholds as content actually grows.
- [x] **Mobile**: content-heavy Lab grids (`.lab-grid`, applied alongside
      `.industry-grid` on every Lab listing/section) become horizontal
      swipeable card shelves at ≤760px instead of a long vertical stack —
      mirrors the existing `.pack-grid` carousel pattern. Plain
      `.industry-grid` usage elsewhere (Consulting's industries/org-examples
      grids) is untouched and keeps its original stack-to-1-column
      behavior.
- [x] Verified: `node --check` on every changed file; a 62-route smoke test
      covering every new listing/pagination/detail route (all 200, no
      `undefined` leaks); a full `scripts/export-static.mjs` build (99
      static pages, up from 51) with automated checks that every `og:image`
      and every `/assets/thumbnails/...` `<img>` reference resolves to a
      real file on disk (0 missing across 100 and 191 references
      respectively).
- [ ] Existing `articles`/Publications entries already had thumbnails and
      detail pages from before this pass (`articleCard`/
      `renderArticleDetail`) — untouched, already met the bar.
- [ ] `paginatedSections` in `scripts/export-static.mjs` hardcodes the same
      `"systems-thinking-through-code"` featured-article exclusion that
      `renderArticles` uses internally, to keep the page-count math in sync.
      If the featured article ever changes, update both places.

## 10. Sept 9 fourth pass — fixed OG images, course thumbnails, Nathan's photo

`scripts/generate-og-images.mjs` was still on the *old* red/black/white SVG
template and Sikeston photo pool (its text had been updated in an earlier
pass, but the actual color hex codes and background images never were) —
that's why the homepage/course/About share cards still looked old after
everything else changed. Fixed for real this time:

- [x] SVG compositor recolored to navy/gold (`#0e1a33` panel, `#c9a227`/
      `#e0b93a` gold accents, `#f6f7fb` title text) — matches `public/
      styles.css` tokens exactly. `BACKGROUND_POOL` now cycles the existing
      `sceneShots` (already gold-accented, non-Sikeston, no people/text) via
      `src/data.mjs`, replacing the old Sikeston photo array.
- [x] Homepage (`default.jpg`) and About (`about.jpg`) OG cards now
      composite Nathan's real photo (`public/assets/nathan-baker.jpeg`) —
      `focusTop: true` keeps his face in frame — instead of the generic
      scene pool. Ran `scripts/generate-og-images.mjs` (free — local Resvg/
      sharp compositing, no API calls) to regenerate all 38 composited OGs.
- [x] Homepage hero: added a small `.lab-byline` (Nathan's real photo,
      circular, 52px + name/title) right under the H1 — "so you can see who
      Nathan Baker is" without a full founder-card takeover. H1 changed
      from "AutoNateAI is Nathan Baker's research practice." to
      "Welcome to my lab." (title/`og:title` updated to match:
      "AutoNateAI | Welcome to My Lab").
- [x] 4 new course thumbnails (`scripts/generate-course-thumbnails.mjs`,
      gpt-image-2, parallel) overwrite the existing
      `public/assets/landing/tutorial-pack-*.jpg` files in place — no
      `data.mjs` path changes needed. Navy/gold meme style matching the Lab
      thumbnails; Nate and Kai (the courses' fictional framing characters)
      rendered as simple glowing silhouettes, never a real-person likeness.
      `renderTutorialPack`/`renderTutorialDetail` now point `ogImage`
      directly at `pack.heroImage` instead of the old SVG-composited
      `/assets/og/tutorial-pack-*.jpg` (better quality, one less thing to
      keep in sync — those composited files still get generated as a
      harmless fallback, just unused).
- [ ] The per-program OG cards (`ai-agent-systems.jpg` etc.), Consulting,
      For Organizations, Community, and per-tutorial-lesson OGs still cycle
      the generic `sceneShots` pool rather than anything content-specific —
      fine for now, revisit if those pages ever want their own dedicated
      art the way Lab entities and courses do.

This doc should be updated as each box gets checked, and whenever a scope
decision changes (e.g. exactly where Consulting lives in the new nav).
