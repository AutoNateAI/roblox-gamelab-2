# Field shapes — Operator OS articles

## `src/operator-os-data.mjs` — `operatorArticles[]` entry

```js
{
  n: 7,                                   // position in the question series (Q07)
  slug: "kebab-case-slug",                // URL: /research-and-case-studies/<slug> — never change once published
  icon: "hub",                            // Material Symbols name
  title: "The question, title case — H1, <title>, OG title, card headline",
  question: "The question, sentence case",
  hook: "One sentence for cards/meta description — the tension, not a summary",
  audience: ["Contractors & Trades"],     // first entry shows on the card kicker
  queueDate: "YYYY-MM-DD",                // planned date in the 14-day queue (informational)
  ogHeadline: "SHORT OG HEADLINE",        // baked into og/<slug>.jpg by generate-operator-os-images.mjs
  ogScene: "photo scene description",     // same
  // defaults applied in the .map() at the bottom of the array:
  status: "draft" | "published",          // draft = noindex + out of sitemap + "In research" banner
  publishedDate: null | "YYYY-MM-DD",     // set when publishing
  thumbnail: "/assets/og/<slug>.jpg",
  sourcePath: "../content/operator-os/<slug>.md",
}
```

To publish, add `status: "published", publishedDate: "YYYY-MM-DD"` to that article's object literal (the `.map()` spreads the article after the defaults, so its own fields win).

## `content/operator-os/<slug>.md` — section order

The first `# H1` is stripped (the page renders its own). The page template already renders the hook under the H1 and a discovery-call CTA band + related questions after the body — don't duplicate those.

1. `# Title`
2. `## Short Answer` — 3–5 sentences. The actual answer, with the headline number, in voice. No images in this section.
3. **The scene** (name the heading for what it says, e.g. `## Tuesday, 8:47 PM, Driveway`) — the trigger moment from inside the reader's day. This is Playbook section 1 ("trigger question").
4. **Operational anatomy** (e.g. `## Where a Lead Actually Goes`) — people → information → decision → action → follow-up, as it really moves today. Include a ` ```graph ` block mapping the flow with evidence-labeled edges.
5. **The hidden tax** (e.g. `## The Math Nobody Invoices You For`) — the researched numbers: cost, time, cognitive load, with sources. At least one ` ```chart `.
6. **The system intervention** (e.g. `## What Changes When the Business Remembers`) — how conversation + structured memory + cockpit + agents changes this specific flow. Concrete: what you'd say, what gets written, what shows up, what runs automatically.
7. **Before / after** (e.g. `## Run Your Own Numbers`) — a transparent model: a Markdown table or chart with every assumption stated, and an invitation to plug in their own.
8. `## What the Research Doesn't Tell Us` — one honest paragraph of limits (short is fine).
9. `## Moral of the Story` — required; see `voice-and-evidence.md`.
10. `## Sources` — a bulleted list: `- [Publisher — Title (Year)](url)`, every source cited above.

Aim for 2–4 interactive blocks total (graph in anatomy, chart in hidden tax, optional chart in before/after). Meme images go between prose sections per SKILL.md §3.
