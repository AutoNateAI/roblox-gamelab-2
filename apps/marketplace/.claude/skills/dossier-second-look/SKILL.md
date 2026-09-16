---
name: dossier-second-look
description: A conversational walk through the rest of today's dossier after daily-dossier has already published the Question of the Day — discuss what else is in it, and optionally turn one or more of those threads into same-day follow-on articles. Use when Nathan says something like "let's go through the rest of the dossier" / "what else was interesting in there" after a daily-dossier run, not for the first article of the day (that's daily-dossier).
---

# Dossier Second Look

`daily-dossier` already ran today: one article is published, `featured: true` is set on it, and Phase 7 wrote a ranked list of other candidates into `Research Backlog`/`Open Questions`. This skill is what happens next — a discussion, not a pipeline. Don't run this as a rigid phase sequence; talk through the dossier with Nathan like a colleague looking at the same document, and only reach for `research-brief` once something specific is worth a real page.

## 1. Ground the conversation

Pull the ranked candidate list Phase 7 of `daily-dossier` just wrote (`Research Backlog` + `Open Questions`, filtered to today's `Radar Date`/`Created Date`), and skim the rest of the dossier for anything that list might have under-weighted — a stray quote, a regional deep-dive, a number that didn't make today's article. Bring both to the conversation. This is exploratory: ask what caught Nathan's eye, don't just recite the ranked list top-to-bottom and wait for a yes/no.

## 2. If something's worth an article

Run `../research-brief/SKILL.md` phases 1-4 exactly as that skill specifies (same checkpoints, same evidence bar, same `\`\`\`chart`/`\`\`\`map`/`\`\`\`graph` fences — see `../research-brief/reference/interactive-blocks.md`). The dossier is still your starting source list the same way it is for `daily-dossier`.

**The one rule that matters here**: the new `investigations[]` entry does **not** get `featured: true`. The day's Question of the Day keeps that slot — see `../daily-dossier/SKILL.md`'s "Featured placement" section for why. A same-day second (or third) article is a real, fully-published page; it's just not the pinned one. If Nathan explicitly asks to *replace* the featured slot with this instead, that's a deliberate override — move the flag by hand (set it here, clear it from today's original QOTD entry) rather than doing it automatically.

## 3. Airtable + deploy

Same as `daily-dossier` Phase 5 (write/update the `Research Questions` record, resolve the `Research Backlog`/`Open Questions` rows this closes, link Region/Organization/System) and Phase 6 (confirm before `git push` — still a real production deploy). Load `../daily-dossier/reference/airtable-graph.md` for the exact field mapping, same as `daily-dossier` does.

## 4. No forced Phase 7

Don't automatically re-run a backlog-mining pass after a second-look article the way `daily-dossier` does after the Question of the Day — that's the top-level daily loop's job, not every article's. If the conversation naturally surfaces a new candidate worth logging, add it; don't manufacture one to fill out a ritual.

## What this skill does not do

Pick the Question of the Day — that's `daily-dossier`, run first, once per day, per dossier. Distribution copy — same boundary as `research-brief`/`daily-dossier`. Automatically deciding to publish — this whole skill exists because publishing more same-day content is Nathan's call after a real conversation, not a default action.
