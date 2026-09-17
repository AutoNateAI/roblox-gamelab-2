# Field shapes

## `src/data.mjs` — `investigations[]` entry

Structured, scannable metadata. Keep this flat — don't nest new sub-objects for prose that belongs in the Markdown body instead (see `bootheel-rice-to-soybean-pivot` for the reference shape, `src/data.mjs` around the `investigations` export).

```js
{
  slug: "kebab-case-slug",              // page lives at /research-and-case-studies/<slug>
  icon: "help_center",                  // Material Symbols name, existing convention
  status: "open" | "investigating" | "published",   // see investigationStatusLabels
  name: "A provocative, real, clickable QUESTION — this is the H1, the <title>, the OG title, and the card headline everywhere this entry appears. Never a flat topic label ('Bootheel Rice-to-Soybean Pivot') — a reason to click ('Congress Just Made Rice More Profitable. So Why Are Bootheel Farmers Planting Less of It?'). It has to be honestly earned by the actual research (see voice-and-evidence.md) — provocative, not clickbait; the tension in the title should be a real tension the article actually resolves or investigates, not a hook that oversells what's inside.",
  question: "The actual analytical research question, one sentence, precise — this is what renders under the H1, not the headline itself. Can be denser/more technical than `name`.",
  tagline: "One honest sentence for card previews — 'here's what we know, here's what's missing.'",
  thumbnail: "/assets/og/<slug>.jpg",                 // generated per Phase 3 below — same file also serves as the page's ogImage, no separate asset
  region: "existing-region-slug" | "",               // must match a slug in regions[] — leave "" if regions[] has no real profile for this yet (it's empty as of 2026-09-17, see data.mjs's comment above it)
  publishedDate: "YYYY-MM-DD",                        // NEW — the day this article actually went live (today, in the skill's run). Drives recency ordering on the home page's "Featured Research" row and the research hub's default sort (see renderHome/renderArticles in src/pages.mjs) — every new investigation needs one, set once, never edited on a later research pass.
  commodity: "Rice / Soybeans",                       // free text, used as a tag
  evidence: [ { label, note, url } ],                 // what got you asking the question
  stakeholders: [ "..." ],                            // who you'd want to interview
  hypothesis: "Your best guess, explicitly hedged.",
  graphLayers: { physical, capital, business, information }, // four-pillar text summary — keep short, the Mermaid diagram in the .md body carries the real detail
  dataNeeds: [ "..." ],                               // what's missing before this becomes a real answer
  artifacts: [ "..." ],                               // what you'd build once the data exists (dashboard, model, etc.)
  findings: null | "Findings text once genuinely answered — stays null until then.",
  sources: [ { label, url } ],
  sourcePath: "../content/research/<slug>.md",        // NEW — points at the long-form body
}
```

Don't add `methodology` or `implications` as new top-level fields — write them as `##` sections in the Markdown body instead. The reason: they're prose that grows with each research pass, and `data.mjs` gets unreadable fast if long strings live inline (this is exactly the problem the tutorial content already solved by keeping `content/tutorials/*.md` separate from `src/data.mjs`).

## `content/research/<slug>.md` — recommended section order

Loaded via `readResearchMarkdown()` in `src/pages.mjs`, rendered with the same hand-rolled `markdownToHtml()` used for tutorials (supports `#`-`####` headings, paragraphs, lists, tables, images, code fences, and the `chart`/`map`/`mermaid` fences below). The first `# H1` is stripped automatically (the page's own `<h1>` already shows the title) — start your actual content at `## Short Answer`.

1. `# Title` (stripped, but keep it for readability/git history)
2. `## Short Answer` — 2-4 sentences, first person, in voice (see `voice-and-evidence.md`). If status is `"open"` or `"investigating"`, say so plainly instead of writing an answer that doesn't exist yet.
3. **One or more history/context sections**, witty header of your choosing, that ground the reader in why the system looks the way it does at all (drainage history, why a crop took hold here, why a piece of infrastructure sits where it sits). Not optional filler — this is where the "dots most people don't connect" requirement starts.
4. `## How This Connects` — a ` ```graph ` block (see `reference/interactive-blocks.md`) of the physical/capital layers — this is the render of `graphLayers`, done as an actual evidence-labeled diagram instead of four text blocks. Use ` ```graph `, not ` ```mermaid `, for this section on every new investigation page — `graph` re-themes for free and can carry a live scenario slider when the research turned up a real two-point anchor to build one from; `mermaid` still exists for other content types, just not this one.
5. **One or more policy/incentive sections** — real programs, real dollar figures, real legislation names, and explicitly call out anywhere two policy levers point in different directions for the same decision-maker. This is usually the actual insight of the piece.
6. `## The Numbers So Far` — one or more ` ```chart ` blocks plus 1-2 sentences of plain-English interpretation each, always naming exactly what the numbers do and don't cover. Multiple small, honestly-labeled charts beat one chart trying to say everything.
7. `## Where This Is Happening` — a ` ```map ` block, only with genuinely verifiable coordinates (towns, facilities, where a system historically started) — never a fabricated boundary or a precise farm location
8. **A ground-truth section** if the research phase found one — an actual current, sourced, on-the-ground data point or quote (a trade-association statement, a local news report) that shows the hypothesis playing out right now, not just in national statistics
9. `## Methodology` — one honest paragraph: what sources you actually used, what you didn't (interviews not yet done, county data not yet pulled)
10. `## Moral of the Story` — required, see `voice-and-evidence.md`. Concrete, usable, per-stakeholder next steps — the section people should screenshot.
11. `## Related Research` — a short pointer sentence; the actual cross-links (related systems/orgs/region) render automatically below the Markdown body from the structured fields, don't duplicate them here

Sections 3 and 5 aren't fixed headers — name them for what they actually say (see the Bootheel reference page for real examples). The fixed-name sections (Short Answer, How This Connects, The Numbers So Far, Where This Is Happening, Methodology, Moral of the Story, Related Research) stay consistent across every article so a returning reader knows the shape.

The structured fields (`detailField*` calls in `renderInvestigationDetail`) render immediately below the Markdown body — evidence, "who we'd like to talk to," data needs, sources, and the related-entity cards. The Markdown body is the narrative; the structured fields are the spec sheet. Don't repeat the same list twice in both places.
