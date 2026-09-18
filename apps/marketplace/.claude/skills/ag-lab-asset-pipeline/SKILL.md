---
name: ag-lab-asset-pipeline
description: Turns a completed AutoNateAI agricultural research article into lab assets using open-source tools: Graphviz system diagrams, chart PNGs/SVGs, FFmpeg preview video, narration scaffold, and a run manifest. Use after research-brief/daily-dossier has produced a Markdown article with ```graph / ```chart / ```map blocks.
---

# Agricultural Lab Asset Pipeline

Use this after an article exists in `content/research/*.md`. The article is the
experiment spec; this skill renders the structured evidence blocks into visual
assets and a preview reel.

## Workflow

1. Check tools:

   ```bash
   npm run marketplace:ag-lab:tools
   ```

2. Run the asset workflow:

   ```bash
   npm run marketplace:ag-lab:assets -- --article content/research/<slug>.md
   ```

3. Inspect:

   ```text
   lab-assets/<slug>/manifest.json
   lab-assets/<slug>/png/
   lab-assets/<slug>/video/preview.mp4
   lab-assets/<slug>/voiceover-draft.md
   ```

4. Production explainer:

   ```bash
   npm run marketplace:ag-lab:explainer -- --run lab-assets/<slug>
   ```

   This is the preferred video path. It builds per-scene OpenAI narration,
   animated charts, animated graph flow, reusable AutoNateAI intro/outro
   bumpers, pop-up emphasis text, and a generated music bed. Final file:

   ```text
   lab-assets/<slug>/video/explainer-production.mp4
   ```

5. Social short:

   ```bash
   npm run marketplace:ag-lab:short -- --run lab-assets/<slug>
   ```

   This creates a fast 9:16 short-form cut for social teasers:

   ```text
   lab-assets/<slug>/video/explainer-short-9x16.mp4
   ```

6. Optional rough narrated preview:

   ```bash
   npm run marketplace:ag-lab:narrate -- --run lab-assets/<slug>
   ```

   This uses OpenAI `gpt-4o-mini-tts` with the female `marin` voice by
   default and writes `narration/script.txt`, `narration/voiceover.wav`, and
   `video/preview-narrated.mp4`.

7. Report what was generated and what remains missing.

## Rules

- Do not invent new evidence or upgrade uncertainty. Preserve `verified`,
  `estimated`, and `hypothesis` language from the article graph.
- Do not make publication claims from local preview assets until the article's
  sources have already cleared the research-brief evidence bar.
- Use `scripts/ag-lab-asset-workflow.mjs`; do not hand-copy JSON blocks into
  one-off files unless the script fails and the fix is documented.
- For GIS-heavy outputs, attach real spatial data first. The current workflow
  can extract and store `map` specs, but QGIS/GDAL/PostGIS cartography should
  use verified layers, not guessed geometry.
- Do not ship placeholder map/spec slides in public videos. The production
  renderer should skip placeholder maps until real geodata exists.
- For client or live-event use, treat the generated `voiceover-draft.md` as a
  first pass, then rewrite it around the audience: lender, economic developer,
  processor, co-op, farmer, or agency.

## Open-Source Tool Roles

- Graphviz: article system maps.
- FFmpeg: video assembly.
- GDAL/OGR: spatial file conversion and validation.
- QGIS: publication maps once geodata is attached.
- PostGIS/GeoServer/TerriaJS: private regional lab infrastructure.
- Blender/BlenderGIS/Bonsai: 3D terrain, infrastructure, BIM, and cinematic
  scenes.
- DSSAT/OpenDroneMap/farmOS: optional specialist agriculture lanes.
- Installed-vs-missing status lives in `docs/ag-lab-production-workflow.md`.

## Documentation

Read `docs/ag-lab-production-workflow.md` before modifying the pipeline shape.
For final videos, use the `ag-lab-video-director` skill.
