---
name: daily-dossier
description: Turns Nathan's daily radar dossier into a published AutoNateAI research article wired into the Airtable agricultural knowledge graph — picks the day's question, runs it through research-brief end to end, writes findings back to Research Questions/Research Backlog/Open Questions, deploys, then mines the dossier + graph for tomorrow's backlog candidates. Use when the user says "here's the dossier" / "here's today's dossier" or otherwise hands over the daily radar synthesis and wants the research→article→Airtable→deploy loop run.
---

# Daily Dossier

The daily loop: **Dossier In → Graph Check → Article (research-brief) → Airtable Write-Back → Deploy → Backlog Refresh**. This skill is an orchestrator — it does not reimplement research/draft/asset/verify logic, it calls into `../research-brief/SKILL.md` for that and adds the Airtable graph and deploy steps around it. Load `../research-brief/reference/*.md` (voice-and-evidence, schema, interactive-blocks) exactly as that skill specifies; load `reference/airtable-graph.md` here for every Airtable read/write.

Base: `AutoNateAI Agricultural Intelligence` (`appcgGb8QHxrgrQB1`). Read/write it with the `mcp__claude_ai_Airtable__*` tools directly — there is no local script/env var for this base (unlike `AIRTABLE_BASE_ID_GAMELAB`/`_CONSULTING`/`_MARKET_MATRIX` in `.env`), and none is needed since this is an interactive per-day run, not a build-time fetch.

**The dossier is Nathan's own synthesis of the private daily Radars, not the raw Radar PDFs.** Treat it as a trusted brief, but everything in it that becomes a public claim still needs the evidence bar in `voice-and-evidence.md` — carry through whatever citation the dossier already attached to a claim, and never let a radar-internal detail (scoring, ranking, "which radar found this") leak into the public article. See `docs/marketplace/lab-operating-model.md` §2 — still binding.

## 0. Ingest dossier + graph check

1. Read the dossier Nathan pastes/drops. It should name a question of the day (or a short list — confirm with Nathan which one if ambiguous).
2. Pull current graph state before touching anything: `Research Backlog` and `Open Questions` records (via `mcp__claude_ai_Airtable__list_records_for_table`), filtered/scanned for anything matching the day's question. Also check `Research Questions` for an existing record on the same topic — this run should **update** an existing record, never create a duplicate.
3. If the dossier's question matches an existing `Research Backlog` row, that's the row this run will resolve (its `Status` moves forward at the end — see Phase 5). If it doesn't match anything in the backlog, that's fine — it becomes a new `Research Questions` record and a fresh (immediately-completed) backlog trail.
4. Show Nathan a one-line confirmation of which question you're running with and what it's linked to in the graph before starting Phase 1 — cheap checkpoint, avoids running the wrong day's question.

## 1-4. Research → Draft → Assets → Assemble & Verify

Run `../research-brief/SKILL.md` phases 1-4 exactly as written, with one adjustment to Phase 1: the dossier is your starting source list, not a blank page. Extract every sourced claim the dossier already carries (with its original URL) instead of re-deriving it from scratch, then use WebSearch/WebFetch only to close remaining gaps or verify anything the dossier asserts without a primary-source link. A dossier claim with no URL is not yet a finding — same rule as everywhere else in `voice-and-evidence.md`.

Same checkpoints as `research-brief`: show the findings list before drafting, stop after each phase. Same asset rule: one `gpt-image-2.5-flare` job added to `scripts/generate-og-hero-images.mjs`, run with `ONLY="<slug>"`.

**Model**: `gpt-image-2.5-flare` (confirmed real, released 2026-09-08 — verified via WebSearch/WebFetch against `developers.openai.com`, not assumed from conversation). Same `/v1/images/generations` endpoint, same `1536x1024` landscape size as the old `gpt-image-2`, plus a `quality` param (`low`/`medium`/`high`/`xhigh`/`max`/`auto` — the script sets `"high"`). Flare over Sunburst deliberately: Sunburst is for iterative image-editing precision, this pipeline is one-shot batch text-to-image generation, which is exactly Flare's stated use case. `high` quality now costs a fraction of what it did on `gpt-image-2` (output tokens for a 1024×1024 `high` image dropped from ~7,024 to ~1,756), so this is a real cost drop, not just a quality bump — if image cost ever needs trimming further, `medium` is the next step down before reaching for a smaller size. The very first run after this change is still a live test of the new model end to end (response shape/`b64_json` key assumed unchanged since it's the same endpoint, but not yet proven on a real call) — if `generateOne()` throws or produces a garbled image, fall back to `gpt-image-2` and flag it rather than burning the whole job list on a broken model id.

## Featured placement (part of Phase 2's `investigations[]` entry)

The day's Question of the Day owns the site's featured slots — the home hero, the home "Featured Research" card, and the `/research-and-case-studies` hub's banner + first grid position all key off a single explicit `featured: true` field on the `investigations[]` entry (`src/pages.mjs`: `renderHome`, `renderArticles`), not on array order or evidence length. When Phase 2 writes today's entry:

1. Set `featured: true` on today's new/updated entry.
2. Find whichever *other* entry in `investigations[]` currently has `featured: true` (there should be exactly one) and remove the field (or set `false`) from it — only one investigation should hold it at a time.

This flag is **only** set by this skill, on the day's actual Question of the Day. `dossier-second-look` (same-day follow-on articles from the rest of the dossier) must never set it — that's what keeps the day's QOTD pinned in place even as more articles get added later the same day.

## 5. Airtable write-back

Load `reference/airtable-graph.md` for exact table/field names and the linking policy (search for existing Region/Organization/System records, never fabricate a new one on the fly). In order:

1. **`Research Questions`**: create (or update, if Phase 0 found an existing record) one record mirroring the finished `investigations[]` entry — same field-by-field mapping as the existing Bootheel record (see reference doc). `Deployed` stays unchecked until Phase 6 actually ships.
2. **Link it**: `Region`, `Related Organizations`, `Related Systems` — only to records that already exist (search first; see reference doc for the "don't fabricate a node" rule).
3. **Resolve the backlog trail**: if Phase 0 found a matching `Research Backlog` row, move its `Status` forward (`Selected`/`Researching` → `Completed`) and link it to the new `Research Questions` record via `Related Research Questions`. If any linked `Open Questions` rows got answered or partially answered by this research pass, update their `Status`, fill `Answer / Current Best Evidence`, and set `Last Checked` to today — don't leave them stale once the article has real findings covering them.
4. Leave the four distribution-draft fields (`LinkedIn Draft`, `Facebook Draft`, `Email Draft`, `YouTube Script Draft`) blank — a separate downstream skill owns distribution copy, same boundary `research-brief` already draws.

## 6. Deploy

Build is already verified in Phase 4. This phase is the actual `git add`/`commit`/`push` to `main` — which is a real production deploy (`.github/workflows/deploy-gh-pages.yml` runs on every push to `main` and publishes `dist/site` straight to `autonateai.com` via GitHub Pages, no separate approval gate on the CI side). Stop and confirm with Nathan before pushing, same as `research-brief`'s "never publish/commit without being asked" — unless he's already said to go ahead in the same message. After a confirmed push, flip `Deployed` to checked and set `Page URL` on the `Research Questions` record.

## 7. Backlog refresh

Re-read the dossier (all of it, not just today's chosen question) against the **now-updated** graph — today's new `Research Questions` record, its links, and whatever Phase 5 just changed. Look for:

- Other questions/threads in the dossier that didn't become today's article.
- New entities the dossier surfaces (people, facilities, organizations) worth a `People`/`Infrastructure & Facilities` row even before a full article exists.
- Gaps the day's research pass exposed but didn't close (these become new `Open Questions`, not backlog items, if they're atomic; `Research Backlog` items if they're a research-project-sized candidate).

For each real candidate, create a `Research Backlog` and/or `Open Questions` row (`Status: Suggested` / `Open`, `Radar Date` / `Created Date` = today), linked to the relevant Region/Organization/System/Research Question — check for an existing matching row first, don't duplicate. Then report the ranked list back to Nathan in the chat (highest `Priority` first) — this phase writes candidates, it does not silently decide what tomorrow's article is. That stays Nathan's call, made against the next dossier.

## What this skill does not do

Distribution copy (LinkedIn/Facebook/email/YouTube) — separate downstream skill, same boundary as `research-brief`. Interview/relationship logging (`People`/`Interactions`/`Claims & Observations`/`Opportunities`) beyond what Phase 7 seeds as backlog candidates — those get filled in as real interactions happen, not fabricated ahead of them. Creating new `Region`/`Organization`/`System` records — flag a genuinely new node back to Nathan instead of inventing one. **Walking through the rest of the dossier conversationally and deciding whether to build same-day follow-on articles** — that's `../dossier-second-look/SKILL.md`, run after this skill finishes, once Nathan wants to dig into what Phase 7 surfaced.
