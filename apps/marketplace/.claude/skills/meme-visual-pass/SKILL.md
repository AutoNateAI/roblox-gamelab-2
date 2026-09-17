---
name: meme-visual-pass
description: A second pass over a finished AutoNateAI research article — reads it top to bottom and scatters ~9 contextual, meme-style illustrated images through the info-heavy prose sections for visual/educational breaks, generated in parallel with gpt-image-2.5-flare and inserted as real Markdown images. Use right after research-brief/daily-dossier has produced (or on an already-published) content/research/<slug>.md, before it ships — a polish pass, not one of the core four phases.
---

# Meme Visual Pass

Research articles on this site are dense: a short answer, history/context, a `graph` diagram, policy prose, charts, a map, methodology, moral of the story. The charts/map/graph blocks already give the reader a visual break — everything *around* them is a wall of text. This skill's whole job is breaking that up with images that are funny enough to make someone want to keep scrolling, but specific enough to the article that they actually teach something instead of being generic filler.

Run this after the article's Markdown body is finished (new or already-published) and before it's pushed live. It only touches `content/research/<slug>.md` and adds files under `public/assets/meme/` — it never touches `src/data.mjs`, the site's structured fields, or Airtable.

## 1. Read the whole article first

Read `content/research/<slug>.md` start to finish before placing anything. You're building a mental map of: where the prose-heavy stretches are (Short Answer, history/context, policy/incentive sections, ground-truth section, Methodology, Moral of the Story), and where the article already has a visual break (a ` ```chart `/` ```map `/` ```graph ` fence, a table).

## 2. Pick ~9 insertion points

Default target is 9 images for a full-length article (matches the existing 3 articles' length) — fewer for a shorter piece, don't force 9 into something that doesn't have 9 good spots. For each:

- **Skip** anywhere immediately before/after an existing chart/map/graph fence — that spot already has a visual break, another image right next to it is clutter, not relief.
- **Skip** inside the `## Short Answer` section itself — that's the reader's first real content, let it land clean before the jokes start. The first image can go right after Short Answer ends.
- **Never** break a table or a fenced block (` ``` `) mid-block to insert an image.
- **Prefer** the prose-heavy sections named above — that's the actual problem this skill solves.
- Space them out reading top to bottom — don't cluster three in one section and leave another bone-dry.

## 3. Write one prompt per spot

Every prompt must be **specific to that exact point in the article** — the number, org, place, program, or claim being discussed right there. A generic "farmer looking at a field" image is a failure; the test-square example below is the bar:

> "Bold, vibrant 2D digital-illustration meme in a modern animated-cartoon style (not photorealistic): a Black farmer in Southeast Missouri stares in exaggerated disbelief at a grain elevator that has a tiny corn cob wearing a lab coat and safety goggles standing next to it, gesturing at a beaker of golden liquid labeled 'PROTEIN'. Bold white meme-style caption text with black outline at the top reads 'WHEN YOUR CORN GETS A CHEMISTRY DEGREE'. Punchy saturated colors, thick clean outlines, dynamic comic-panel energy, subtle navy-and-gold color accents. No logos, no real brand marks, no illegible text."

Every prompt needs, in this shape:

1. **Style lock, every time**: "Bold, vibrant 2D digital-illustration meme in a modern animated-cartoon style (not photorealistic)" — deliberately the opposite register from `scripts/generate-og-hero-images.mjs`'s photo-real hero cards, so a reader instantly reads "meme break" vs. "article photo." Thick clean outlines, punchy saturated colors, exaggerated expressions/reactions, dynamic comic-panel energy. A light nod to the site's navy/gold accent colors is welcome, not required.
2. **The actual joke/scene**, built from a real fact in that part of the article — a specific number, an org's name, a place, a program deadline, a piece of equipment, a policy tension. Read `reference/voice-and-evidence.md` (in `../research-brief/`) if you need a refresher on the site's dry, confident, never-corporate voice — the humor should sound like that person made the joke, not a generic meme account.
3. **A baked-in caption**, ≤8 words, bold meme-font style (classic top or bottom placement, state which), witty and specific — never a restatement of the article's own section heading.
4. **If a person appears**, vary race/ethnicity across the set of ~9 images for the article — don't make every depicted person the same race. Not every image needs a person; plenty of good meme beats are object/scene-only (a corn cob in a lab coat, a filing cabinet crying, a calendar with a deadline circled in red).
5. **Hard no's**, every prompt: no logos or fabricated brand marks, no depicting a real named public figure's actual likeness (an archetype — "a farmer," "a lender," "a scientist" — is fine; a specific real CEO or Nathan himself is not), no text you haven't fully specified (an unconstrained prompt risks garbled baked text — say exactly what the caption reads).

## 4. Generate all of them in one parallel batch

Write a manifest JSON to your scratchpad directory — an array of `{ file, prompt }`, where `file` is `meme/<slug>-01.jpg` through `meme/<slug>-NN.jpg` (zero-padded, matches the `og/<slug>.jpg` convention one level over):

```json
[
  { "file": "meme/<slug>-01.jpg", "prompt": "..." },
  { "file": "meme/<slug>-02.jpg", "prompt": "..." }
]
```

Then run, once, from `apps/marketplace/`:

```bash
node scripts/generate-meme-images.mjs --manifest /path/to/manifest.json
```

This calls `gpt-image-2.5-flare` for every job **in parallel** (`Promise.allSettled` — one bad prompt doesn't sink the batch), at `1024x1024`/`medium` quality (deliberately lighter than the hero images' `high` — this is 9+ images per article, not 1 per page, and a meme doesn't need max fidelity to land), and saves each to `public/assets/meme/<file>`. It reports per-job success/failure — if any job fails, look at the reported error, fix that one prompt, and re-run just that job (a 1-entry manifest) rather than re-running the whole batch.

## 5. Insert into the Markdown

For each generated image, add one line at its chosen spot (blank line before and after, matching every other block type in this Markdown dialect):

```markdown
![Short, literal alt text describing the image](/assets/meme/<slug>-01.jpg "Optional caption line, only if it adds something beyond the alt text")
```

The renderer (`markdownToHtml()` in `src/pages.mjs`) turns this into a `<figure class="markdown-figure">` with the image and, if you supplied the quoted caption, a `<figcaption>` underneath — you don't need to (and shouldn't) also write the meme's caption a second time as a figcaption, since it's already baked into the image itself. Leave the third `"..."` argument off unless you have something genuinely additional to say (a source note, a "yes, really" aside) — most of these images don't need one.

## 6. Rebuild and verify

1. `node scripts/export-static.mjs` from `apps/marketplace/` — no errors, no missing-asset warnings.
2. Open `dist/site/research-and-case-studies/<slug>/index.html` and confirm the `<figure class="markdown-figure">` count matches the number of images you placed, and that none of them sit inside a `.data-block-error` or broken block.
3. Spot-check at least one generated file (`public/assets/meme/<slug>-01.jpg`) actually looks right — a garbled-text or off-brief image should be regenerated (fix the prompt, re-run that one manifest entry), not shipped.

## 7. Report before it ships

List what you inserted — "after [section/paragraph], because [the specific fact it's riffing on]" — for every image, and flag anything you skipped or couldn't place well. This is a checkpoint, same as `research-brief`'s "never publish/commit without being asked": don't commit or push as part of this skill unless the article was already being published in the same request.

## Re-running on an article that already has memes

Check the Markdown for existing `/assets/meme/<slug>-*.jpg` references before starting. If they're already there, this article's already had its pass — don't duplicate. If Nathan explicitly asks for a refresh, remove the old image lines and old files first, then run the full workflow again rather than layering a second set on top.

## What this skill does not do

Doesn't touch `src/data.mjs`, the `investigations[]` structured fields, or Airtable — those are `research-brief`/`daily-dossier`'s job. Doesn't generate the article's hero/OG image (that's `scripts/generate-og-hero-images.mjs`, a different aesthetic on purpose — photo-real, not meme). Doesn't write or edit article prose — if a spot needs a sentence of setup for a joke to land, flag it, don't silently rewrite the article body.
