---
name: research-brief
description: Turns one AutoNateAI Operator OS question (an operational bottleneck contractors, operators, and small-business owners feel — follow-up, quoting, prospect ranking, owner attention, AI adoption) into a published, deeply researched article at /research-and-case-studies/<slug> — search-based research, a first-person Markdown write-up built to make the target operator recognize their own business, interactive charts/graphs, meme visual breaks, and the operatorArticles entry flipped to published. Use when the user names one of the 14 operator questions (or a new one) and wants the real article written.
---

# Research Brief — Operator OS edition

Rewritten 2026-09-28 when AutoNateAI repositioned from agricultural research to the **Operator OS** (conversational AI operating systems for contractors, operators, and small businesses). The old ag version is in git history; don't resurrect its bio, region, or commodity fields.

One question in, one published article out: **Research → Draft → Visuals → Publish**. Every article exists to do one job — make a specific operator read it and think *"that's my business, and I didn't know it was costing me that much"* — then offer the discovery call. It is research first and sales second; the sale only works because the research is real.

## 0. Know the reader before you search

Every question in `src/operator-os-data.mjs` (`operatorArticles`) has an `audience` tag. Before researching, write down (scratch, not the page):
- **Who exactly** is reading — e.g. "an HVAC owner with 3 trucks who still quotes from the cab of his truck at 9 PM," not "small businesses."
- **The moment they feel it** — the specific night, call, or lost job where this question stops being abstract.
- **What they already believe** — usually "I need more leads" or "I just need a better CRM." The article has to earn the right to move them off it.

## 1. Research (search-based, real)

WebSearch/WebFetch only — no generation from memory. Every number gets a URL you actually loaded. Aim for 8–15 solid sources per article, prioritized:

1. **Primary data**: U.S. Census / BLS / SBA Office of Advocacy, U.S. Chamber of Commerce reports, Federal Reserve Small Business Credit Survey, trade associations (ACCA, NECA, PHCC, NAR, NARPM), academic papers (HBR/MIT Sloan/lead-response studies, cognitive-load and task-switching research — APA, Gloria Mark's attention research, Sophie Leroy's "attention residue").
2. **Industry benchmarks with disclosed methodology**: ServiceTitan / Housecall Pro / Jobber annual reports, InsideSales/XANT lead-response studies, Salesforce "State of" reports, Gartner/Forrester public summaries — cite them as the vendor's own survey, never as neutral fact.
3. **Real operator voices**: trade-publication interviews (Contracting Business, ACHR News, EC&M, Inman), forum threads only as color, never as a statistic.

Rules (full list in `reference/voice-and-evidence.md`):
- Vendor stats are labeled as vendor stats ("per ServiceTitan's own 2025 survey of its customers").
- Old stats are labeled with their year. The famous "respond in 5 minutes" study is from 2007/2011 — say so, then explain why it still matters or doesn't.
- If there's no hard number for the exact question, **build a transparent model** (Section 5 of the article) with every assumption stated, instead of borrowing a number that doesn't fit.

Output: a scratch findings list `{ claim, url, year }`. Keep it in your scratchpad; you don't need to stop for approval unless a source looks shaky — the user has asked for these to be researched and shipped one at a time.

## 2. Draft

Write `content/operator-os/<slug>.md` (replace the scaffold entirely — including its HTML comment). Section order and requirements are in `reference/schema.md`; voice in `reference/voice-and-evidence.md`; chart/graph JSON in `reference/interactive-blocks.md` (load it before writing any fence).

Target length: **2,000–3,200 words** of prose plus 2–4 interactive blocks. Deep, not padded — every section should either hand the reader a number, a mechanism, or a thing to do.

## 3. Visuals

The OG/thumbnail image already exists (`public/assets/og/<slug>.jpg`, from `scripts/generate-operator-os-images.mjs`). Don't regenerate it unless the article's angle changed enough that the headline no longer fits.

Then run a lighter **meme visual pass** (see `../meme-visual-pass/SKILL.md` for mechanics — manifest → `node scripts/generate-meme-images.mjs --manifest <file>`) with these Operator OS overrides:
- **4–5 images per article**, not 9. Files at `meme/<slug>-01.jpg` …
- Scenes come from the trades/small-business world of *this* article (a truck cab, a job site, a shop office, a kitchen-table invoice pile) and riff on a specific fact or number from the paragraph they sit in.
- Accent colors: emerald green and forest black (the site's palette), not navy/gold.
- Vary the people across the set (race, gender, age); no real people, no brands.
- Insert them as `![alt](/assets/meme/<slug>-NN.jpg)` lines in prose-heavy stretches, never adjacent to a chart/graph fence and never inside the Short Answer.

## 4. Publish

1. In `src/operator-os-data.mjs`, set the article's `status: "published"` and `publishedDate: "<today YYYY-MM-DD>"`. That alone flips the page to `index,follow`, adds Article JSON-LD, and puts it in the sitemap. If research sharpened the angle, you may also tighten `hook` (one sentence, card-length) — keep `title`/`slug` stable (the slug is the URL).
2. `node --check src/operator-os-data.mjs` and `npm run marketplace:build` from the repo root — no errors.
3. In `dist/site/research-and-case-studies/<slug>/index.html`: confirm `content="index,follow"`, count `research-chart`/`research-graph` data islands, and grep for `data-block-error` (must be zero). Confirm every `/assets/meme/<slug>-*.jpg` referenced exists.
4. Commit only this article's files (the Markdown, `operator-os-data.mjs`, its meme images) with a message like `Publish Operator Question 07: <short title>` and the repo's Co-Authored-By trailer. Pushing to `main` deploys (GitHub Pages workflow). The user has asked for each article to be pushed as it's finished — do that without re-asking; don't watch the deploy run.

## Reference files

| Need | Load |
|---|---|
| Voice, evidence bar, what never appears publicly | `reference/voice-and-evidence.md` |
| Article section order + the `operatorArticles` fields | `reference/schema.md` |
| ` ```chart ` / ` ```graph ` / ` ```map ` JSON spec | `reference/interactive-blocks.md` |
