# ```chart / ```map / ```graph fence specs

These are parsed server-side at build time (`dataBlockHtml()` in `src/pages.mjs`) into a `<figure data-chart="...">`/`<figure data-map="...">`/`<figure data-graph="...">` data island, then rendered/enhanced client-side by `public/app.js` — Chart.js and Leaflet are lazy-loaded from jsdelivr **only on pages that actually contain one**, the same pattern already used for ` ```mermaid ` blocks. ` ```graph ` needs no external library at all (see its own section below). Get the JSON wrong and the page still builds — it just shows a visible "Could not parse this block" message instead of silently failing, so always check the built HTML (Phase 4, step 3 in `SKILL.md`) rather than assuming.

## ```chart

````
```chart
{
  "type": "bar",
  "title": "Optional chart title",
  "labels": ["Category A", "Category B"],
  "series": [
    { "name": "Series name", "data": [1, 2], "color": "#f2b134" }
  ],
  "sourceLabel": "Citation + honest caveat about what this does/doesn't show."
}
```
````

- `type`: `"bar"` or `"line"` (anything Chart.js' basic types accept — stick to these two unless you have a real reason).
- `series`: one entry per data series; omit `color` to use the site's default palette in order.
- `sourceLabel` renders as a `<figcaption>` under the chart — **always fill this in**. It's the difference between a chart and a claim; say exactly what years/geography/units the numbers cover, and flag it explicitly if you're putting two non-comparable series side by side for scale illustration only (see the Bootheel reference page).
- Never fabricate a data point to fill out a trend line. Two honest bars beat five invented ones.

## ```map

````
```map
{
  "title": "Optional map title (not currently rendered, kept for authoring clarity)",
  "center": [36.73, -89.55],
  "zoom": 9,
  "markers": [
    { "lat": 36.8834, "lng": -89.5878, "label": "Sikeston, MO — why this point matters" }
  ],
  "sourceLabel": "What this map does/doesn't represent yet."
}
```
````

- `center`/`zoom` are optional — omitted, the map centers on the first marker at zoom 7.
- Every marker needs real, verifiable `lat`/`lng` — a town, a facility, a river crossing. Never a precise coordinate for a specific farm or an invented boundary. Two or more markers auto-fit the map bounds.
- Basemap is CARTO's free light/dark tiles (no API key, theme-aware, swaps automatically with the site's dark-mode toggle) — don't add a new tile provider without checking `public/app.js` first.
- This is intentionally a point-marker map, not a choropleth. If a real county-level boundary layer becomes necessary later, that's a bigger addition (a vendored GeoJSON + fill-by-value renderer) — don't try to fake it by overloading markers.

## ```graph

**Use this for every investigation's `## How This Connects` section — not ` ```mermaid `.** Mermaid's auto-layout reads as a static print/technical diagram; ` ```graph ` is a hand-laid-out inline SVG that re-themes for free (pure CSS custom properties, no JS re-render needed on dark-mode toggle, unlike Mermaid) and can carry live scenario sliders on top of the same diagram. No external library — `graphBlockHtml()` in `src/pages.mjs` renders the full SVG + slider controls server-side (works with JS off), `public/app.js`'s graph section only adds the live recompute-on-slider-input behavior.

````
```graph
{
  "title": "How This Connects",
  "nodes": [
    { "id": "cost", "label": "Input Costs\n(fuel + fertilizer)", "rank": 0 },
    { "id": "margin", "label": "Producer Cash Margin", "rank": 1 },
    { "id": "repay", "label": "Repayment Capacity", "rank": 2 },
    { "id": "class", "label": "Adversely Classified\nLoans", "rank": 3, "output": true, "baseline": 4.7, "format": "percent", "driverInput": "cost", "driverGain": 0.026 }
  ],
  "edges": [
    { "from": "cost", "to": "margin", "evidence": "verified", "label": "ERS: fuel +28.8%, fertilizer +15.3%" },
    { "from": "margin", "to": "repay", "evidence": "estimated", "label": "Cash margin funds debt service" },
    { "from": "repay", "to": "class", "evidence": "hypothesis", "label": "Commodity-level causation not yet provable" }
  ],
  "inputs": [
    { "id": "cost", "label": "Input-cost pressure, indexed to the disclosed move", "min": 0, "max": 150, "step": 5, "default": 100, "unit": "", "verifiedAt": 100, "verifiedNote": "100 = the actual Dec'25→Jun'26 disclosed move" }
  ],
  "sourceLabel": "Illustrative linear extrapolation anchored to two real disclosed numbers, not a fitted model — see the node's driverGain math below."
}
```
````

- `nodes[].rank`: required, integer, 0-based — which left-to-right column the node sits in. Nodes sharing a rank stack vertically, auto-centered. This is a manual layout, not a computed one — keep it to what fits legibly in 3-5 ranks, 2-4 rows per rank.
- `nodes[].label`: use `\n` for manual line breaks (2-3 short lines max) — there's no automatic text wrapping.
- `nodes[].output` + `baseline` + `format` (`"percent"` or omit for a plain number) + `driverInput` (an `inputs[].id`) + `driverGain`: makes this node's value live-update as its slider. `driverGain` **must** be `(disclosed-value-at-max-observed − baseline) / verifiedAt` — i.e. computed from two real, cited numbers, never fit or guessed. The client extrapolates linearly past `verifiedAt` and visually flags that (dashed border, secondary-color value) — never let a node claim precision past what two anchor points support.
- `edges[].evidence`: `"verified"` (a disclosed/measured number drives this edge — solid, primary color), `"estimated"` (a reasoned-but-not-measured relationship — solid, secondary color), or `"hypothesis"` (plausible, not provable from public data yet — dashed, muted). Every edge needs one; unset defaults to `"hypothesis"`, which is intentionally the more conservative failure mode.
- `inputs[]`: one slider per controllable node. `verifiedAt` is the slider value that corresponds to the real disclosed anchor point (usually the *current* observed reading) — the legend renders this as "Disclosed value: …" under the slider so a reader can always see where "real" ends and "scenario" begins.
- A `graph` block with no `inputs` still renders — it's just a static (but still nicely laid-out, re-themeable) system diagram, which is fine for pages that don't have a clean two-point anchor to build a slider from.
- Never invent a `driverGain` or a coefficient dressed up as more precise than the underlying evidence — this is exactly the fabrication rule in `voice-and-evidence.md`, applied to a slider instead of a sentence.

## All three

- Keep the JSON compact — no comments (not valid JSON), no trailing commas.
- One block per fence. If you need two charts, write two ` ```chart ` fences.
- These render inside `.markdown-body`, so normal Markdown paragraphs before/after a block work as narration — write the interpretation in prose immediately around the block, don't rely on the chart to speak for itself.
