# Agricultural Systems Lab Production Workflow

This workflow turns a completed AutoNateAI agricultural research article into
lab assets: system graphs, charts, narration scaffolds, and preview video.

The article remains the first-pass research product. The lab workflow treats
the article as an experiment specification and extracts the fenced JSON blocks
already embedded in the Markdown.

## Command

```bash
npm run marketplace:ag-lab:assets -- --article content/research/farm-credit-semo-crop-credit-stress-2026.md
```

Outputs land in:

```text
apps/marketplace/lab-assets/<article-slug>/
```

Key outputs:

- `manifest.json` — inventory of extracted data and generated files.
- `data/` — source graph/chart/map JSON plus Graphviz DOT files.
- `svg/` — vector assets for docs, slides, and web.
- `png/` — video/presentation-ready rasters.
- `video/preview.mp4` — FFmpeg preview reel.
- `video/explainer-production.mp4` — directed production cut with segmented
  narration, animated charts/graph, reusable intro/outro bumpers, callouts, and
  a generated music bed.
- `video/explainer-short-9x16.mp4` — vertical social cut with fast scene
  changes, emoji callouts, and a reusable short-form outro.
- `voiceover-draft.md` — narration scaffold for a Modern-Marvels-style explainer.

## Tool Layers

Installed/checked by the repo workflow:

| Layer | Tool | Used for |
| --- | --- | --- |
| Graph rendering | Graphviz | Converts article system graphs into SVG/PNG assets. |
| Media assembly | FFmpeg | Stitches assets into a preview video. |
| GIS conversion | GDAL/OGR | Validates and converts spatial data. |
| GIS processing | QGIS / `qgis_process` | Runs headless geoprocessing and publication map workflows. |
| Spatial database | PostgreSQL/PostGIS | Stores and queries geometry-backed lab data. |
| 3D runtime | Blender | Provides the base 3D renderer for later BlenderGIS/Bonsai scenes. |

Optional heavier tools:

| Layer | Tool | When to use |
| --- | --- | --- |
| Web GIS | GeoServer / TerriaJS | Interactive lab exhibits. |
| 3D scenes | BlenderGIS / Bonsai | Terrain, infrastructure, and facility visualizations inside Blender. |
| Crop simulation | DSSAT | Crop/yield scenario modeling. |
| Drone imagery | OpenDroneMap | Orthophotos, terrain, and 3D reconstruction. |
| Farm data model | farmOS | Farm operations reference model and private records system. |
| Experimental simulator | AgroEcoSim | Procedural plant/soil/weather experiments. |

## Installation Status

| Tool | Status | Notes |
| --- | --- | --- |
| Graphviz | Installed | `dot` available. |
| FFmpeg | Installed | Preview and narrated videos generated. |
| GDAL/OGR | Installed | `gdalinfo` and `ogr2ogr` available. |
| QGIS CLI | Installed | Use the QGIS app binary path plus `PROJ_DATA`, shown below. |
| PostgreSQL/PostGIS | Installed | PostgreSQL 17 + PostGIS 3.6.4 smoke-tested. |
| Blender | Installed | CLI available. |
| Docker | Installed | Available for service-style tools. |
| GeoServer | Not installed | Best next Docker service when publishing WMS/WFS layers. |
| TerriaJS | Not installed | Best after GeoServer or static GeoJSON layers exist. |
| DSSAT | Not installed | Add when a crop-simulation case study needs soil/weather/management inputs. |
| BlenderGIS | Not installed | Add inside Blender when real terrain/GIS-to-3D scenes are needed. |
| farmOS | Not installed | Add when modeling actual farm operations/records. |
| OpenDroneMap | Not installed | Add when drone imagery enters the workflow. |
| AgroEcoSim | Not installed | Experimental; clone/run only for plant/soil simulation tests. |

Run the local check:

```bash
npm run marketplace:ag-lab:tools
```

Install the light CLI tier:

```bash
npm run marketplace:ag-lab:tools -- --install-light
```

## Local Install Notes

The current Mac lab uses:

- QGIS app CLI:
  `/Applications/QGIS-final-4_2_2.app/Contents/MacOS/qgis_process`
- QGIS PROJ database:
  `/Applications/QGIS-final-4_2_2.app/Contents/Resources/qgis/proj`
- PostgreSQL 17:
  `/opt/homebrew/opt/postgresql@17/bin`
- PostGIS 3.6.4, installed through Homebrew and verified in a local database.

For QGIS CLI commands that warn about `proj.db`, run with:

```bash
PROJ_DATA=/Applications/QGIS-final-4_2_2.app/Contents/Resources/qgis/proj \
  /Applications/QGIS-final-4_2_2.app/Contents/MacOS/qgis_process --version
```

The PostGIS smoke-test database is:

```text
autonate_ag_lab_test
```

It has the `postgis` extension enabled and has been verified with a geometry
centroid query.

## Production Pattern

1. Publish or complete the research article.
2. Run `marketplace:ag-lab:assets` against the article to extract structured data and still assets.
3. For a rough internal preview only, inspect `video/preview.mp4`.
4. For a production explainer, run the directed renderer:

   ```bash
   npm run marketplace:ag-lab:explainer -- --run lab-assets/<slug>
   ```

   This creates `video/explainer-production.mp4`. It adds 3-second AutoNateAI
   intro/outro screens, generated dramatic stingers, segmented OpenAI narration,
   animated evidence visuals, and an audible generated music bed.

5. For a 9:16 social teaser, run:

   ```bash
   npm run marketplace:ag-lab:short -- --run lab-assets/<slug>
   ```

   This creates `video/explainer-short-9x16.mp4`. The short-form rule is:
   maximum 45 seconds, target about 30 seconds, 3-6 second screen changes, and
   up to 12 seconds only when a scene has continuous animation.

6. Use `voiceover-draft.md` as a scratch narration pass, or run the older single-track OpenAI narration only for quick checks:

   ```bash
   npm run marketplace:ag-lab:narrate -- --run lab-assets/<slug>
   ```

7. Promote `video/explainer-production.mp4` into YouTube, LinkedIn, live briefings, or a client case-study deck. Use `video/explainer-short-9x16.mp4` on TikTok, Reels, Shorts, and other vertical feeds to pull viewers into the full briefing.

Do not ship the rough preview video if it contains placeholder map/spec slides.
The directed renderer should skip placeholders until real QGIS/GDAL/PostGIS
cartography is attached.

## Evidence Rule

The asset workflow does not invent new findings. It only renders structured
claims already present in the article. If a graph edge is marked `hypothesis`,
the visualization must preserve that uncertainty in the narration and final
presentation.

## Buyer-Facing Use

This workflow is designed for lender, economic-development, co-op, processor,
and regional stakeholder briefings. The public article proves the reasoning.
The lab assets make the system visible. A private engagement can then add
client-specific territory, portfolio, parcel, facility, or operating data.

## Video Director Skill

Repo agents should use `.claude/skills/ag-lab-video-director/SKILL.md` when
making final videos from an existing lab-assets run. That skill captures the
production rules: no placeholder tool screens, reusable AutoNateAI bumpers,
scene-level narration, audible generated music, animated visuals, and vertical
short-form pacing.
