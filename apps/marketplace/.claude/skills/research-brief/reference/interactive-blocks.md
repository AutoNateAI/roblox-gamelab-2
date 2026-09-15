# ```chart / ```map fence specs

These are parsed server-side at build time (`dataBlockHtml()` in `src/pages.mjs`) into a `<figure data-chart="...">`/`<figure data-map="...">` data island, then rendered client-side by `public/app.js` — Chart.js and Leaflet are lazy-loaded from jsdelivr **only on pages that actually contain one**, the same pattern already used for ` ```mermaid ` blocks. Get the JSON wrong and the page still builds — it just shows a visible "Could not parse this block" message instead of silently failing, so always check the built HTML (Phase 4, step 3 in `SKILL.md`) rather than assuming.

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

## Both

- Keep the JSON compact — no comments (not valid JSON), no trailing commas.
- One block per fence. If you need two charts, write two ` ```chart ` fences.
- These render inside `.markdown-body`, so normal Markdown paragraphs before/after a block work as narration — write the interpretation in prose immediately around the block, don't rely on the chart to speak for itself.
