# Voice and evidence rules

These are load-bearing, not style preferences — the site's whole credibility position is "we say exactly what we know and exactly what we don't." Violating them is worse than a bland page.

## Evidence bar

- A finding needs a URL to a primary source: a government agency (USDA NASS, Farm Credit Administration, Census, USDOT), a company's own filing/annual report/press release, an academic or extension paper, or a direct interview you actually conducted. A news article *summarizing* one of those is a pointer to go find the primary source, not the citation itself.
- National or state-level data is not county/regional data. If you only have the national number, say "national" in the sentence and in the chart label — never let a national figure imply a local one by omission. See `content/research/bootheel-rice-to-soybean-pivot.md` for the pattern (two national USDA figures, explicitly labeled as not-yet-county-level).
- No invented finding. If the research phase didn't turn up an answer, the page's `findings` field stays `null` and the status stays `"open"` — an open, honestly-labeled question is a real page on this site; a confident-sounding guess dressed as a finding is not.
- Hypotheses are allowed and encouraged, but every sentence of one must be phrased as a hypothesis ("if this holds," "this would mean," "a hypothesis to test against data, not a conclusion") — never slide from hypothesis-voice into finding-voice mid-paragraph.

## What never appears on a public page

Per `docs/marketplace/lab-operating-model.md` §2 (repo root) — this predates the agricultural pivot but the boundary rule still applies in full:
- Never name the private Radars, show their prompts, or show scoring/ranking logic.
- Never link or embed a `Radar_Reports/*.pdf` directly.
- Never present Airtable "candidate" (unreviewed) records as public content.
- Organization imagery is generic/editorial (a building, a desk) — never a fabricated logo or a photo presented as the real company's actual office.

## Voice — the narrative body specifically

The Markdown body (`content/research/<slug>.md`) is written in first person, in Nathan's actual voice: a young Black professional who grew up in Michigan, got into agriculture there, and moved to the Missouri Bootheel where his family is from — real biography, not a character (see `docs/marketplace/agricultural-intelligence-lab.md` §7 for the corrected bio). Write like that person is genuinely talking to the reader:

- Witty, confident, plainspoken — dry humor is welcome, corporate hedging is not. "I could hand you a clean headline here, and it'd be wrong" beats "It is important to note certain complicating factors."
- Never talks down to the audience (farmers, lenders, elevator operators) and never over-explains things they already know cold — explain the *connections between* the systems, not the systems themselves.
- Professional throughout — witty is a seasoning, not the whole dish. This still has to read as real research a lender or ag economist would trust, not a blog personality bit.
- The structural UI chrome around the narrative (card labels like "Where This Stands," "Sources") stays in the existing site "we" voice — that's `pages.mjs` template text, not something this skill rewrites per-article. Only the Markdown narrative body is first-person.

## Every article needs real cross-dimensional dots, not just an update

The point of view this site sells is *connecting dimensions most people don't think to connect in the same paragraph* — history, water/geology, federal policy (both the safety-net side and the demand side), trade policy, and finance, all touching one decision a real person has to make. A page that only reports "here's this year's USDA number" hasn't done the job. Before drafting, make sure the research phase actually turned up:

- **A historical fact** that changes how the reader sees the present (why does this land/system exist the way it does at all?).
- **A policy or incentive detail** with a real number and a real citation — not "policy affects this" in the abstract.
- **At least one place where two policy levers point in different directions** — that tension is usually the actual insight. If research doesn't turn one up, say so rather than manufacturing a false tension.

## Every article ends with a real "Moral of the Story"

A named `## Moral of the Story` section, near the end, before Related Research. Not a summary of what was already said — concrete, non-obvious, usable next steps, one per relevant stakeholder type, framed as "here's what to actually do with this" rather than "here's what to think about." A reader should walk away able to do something (ask their lender a specific question, look up a specific program, model a specific risk) they couldn't have named before reading. Keep the wit here too — this is the section people screenshot.

## Voice — structural labels

Plain, warm, specific — not corporate-formal. Compare the site's actual section labels to a generic research-report template:

| Generic | AutoNateAI |
|---|---|
| HYPOTHESIS | "Our Best Guess So Far" |
| WHO IS INVOLVED | "Who We'd Like to Talk To" |
| WHAT WE STILL DON'T KNOW | "What We Still Need" |
| FINDINGS | "What We Found" |

New sections you write in the Markdown body (Short Answer, Methodology, Implications) should match this register — write like you're leveling with a specific farmer, lender, or elevator operator, not addressing "stakeholders" in the abstract. First-person plural ("we," "our") is the house voice.

## Status honesty

Use the existing `investigationStatusLabels` vocabulary in `src/data.mjs` (`"open"` today; check the file for the full set before inventing a new one). Don't add a "Verified"-style status label that could overclaim confidence the research doesn't support.
