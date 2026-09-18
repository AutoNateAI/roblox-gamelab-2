---
name: ag-lab-video-director
description: Direct and render AutoNateAI Agricultural Systems Lab videos from existing lab-assets runs, including 16:9 explainers and 9:16 social shorts with reusable intro/outro bumpers, OpenAI narration, animated charts/graphs, pop text, and music mixing.
---

# Agricultural Lab Video Director

Use this after `ag-lab-asset-pipeline` has produced `lab-assets/<slug>/`.
This skill owns the final video pass, not the rough preview.

## Formats

For the 16:9 explainer:

```bash
npm run marketplace:ag-lab:explainer -- --run lab-assets/<slug>
```

Output:

```text
lab-assets/<slug>/video/explainer-production.mp4
```

For the 9:16 social short:

```bash
npm run marketplace:ag-lab:short -- --run lab-assets/<slug>
```

Output:

```text
lab-assets/<slug>/video/explainer-short-9x16.mp4
```

## Direction Rules

- Open each finished video with a reusable 3-second AutoNateAI animated intro.
- Close each finished video with a reusable AutoNateAI outro.
- Do not ship placeholder map/spec scenes, tool notes, or any screen that says to run QGIS/GDAL/PostGIS.
- Match narration to the visual beat. Generate narration per scene, then stitch scenes, instead of relying on one long narration over unrelated visuals.
- Keep background music clearly audible but under the narration. Use generated FFmpeg synth beds/stingers unless the user supplies licensed music.
- Use OpenAI `gpt-4o-mini-tts` with the female `marin` voice by default for Kai-style narration. Put delivery direction in `instructions`, not in the spoken text.

## 16:9 Explainer Taste

Use the long explainer for YouTube, client briefings, live events, and website case studies.

- Let evidence breathe, but keep every screen animated.
- Use dramatic intro/outro stingers, then switch to a steadier detail bed under the analysis.
- Prefer animated charts, progressive graph edges, node reveals, and callouts over static slides.
- Keep buyer-facing tone: lender, co-op, processor, economic developer, agency, large landowner.

## 9:16 Social Taste

Use the vertical short as the teaser, not the full briefing.

- Maximum duration: 45 seconds. Target average: about 30 seconds.
- Screen changes should happen every 3-6 seconds.
- A scene can run up to 12 seconds only when it has visible animation throughout.
- Be punchier and more entertaining than the long form while keeping the facts intact.
- Use pop text and emojis for emotional emphasis.
- Hook one focused point, then send viewers to the full YouTube video or website brief.

## Verification

After rendering, verify:

```bash
ffprobe -hide_banner lab-assets/<slug>/video/explainer-production.mp4
ffprobe -hide_banner lab-assets/<slug>/video/explainer-short-9x16.mp4
```

Sample at least one frame from the intro, a chart/graph scene, and the outro.
Check that audio streams exist, dimensions match the format, and durations match
the intended use.
