import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(__dirname, "..");
const defaultOutDir = path.join(appDir, "lab-assets");

const args = parseArgs(process.argv.slice(2));
const sourceArg = args.article || args._[0];

if (!sourceArg) {
  fail("Usage: node scripts/ag-lab-asset-workflow.mjs --article content/research/<slug>.md [--video]");
}

const sourceFile = path.resolve(appDir, sourceArg);
if (!existsSync(sourceFile)) {
  fail(`Article not found: ${sourceFile}`);
}

const markdown = await readFile(sourceFile, "utf8");
const slug = path.basename(sourceFile, path.extname(sourceFile));
const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() || titleCase(slug);
const outDir = path.resolve(appDir, args.out || path.join(defaultOutDir, slug));
const blocks = extractDataBlocks(markdown);

await mkdir(outDir, { recursive: true });
await mkdir(path.join(outDir, "data"), { recursive: true });
await mkdir(path.join(outDir, "svg"), { recursive: true });
await mkdir(path.join(outDir, "png"), { recursive: true });
await mkdir(path.join(outDir, "video"), { recursive: true });

const assets = [];
const manifest = {
  slug,
  title,
  source: path.relative(appDir, sourceFile),
  generatedAt: new Date().toISOString(),
  toolchain: detectToolchain(),
  counts: {
    graphs: blocks.graph.length,
    charts: blocks.chart.length,
    maps: blocks.map.length,
  },
  assets,
};

await writeFile(path.join(outDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const coverSvg = renderCoverSvg(title, slug);
await writeAsset("cover", coverSvg);

for (const [index, graph] of blocks.graph.entries()) {
  const base = `graph-${String(index + 1).padStart(2, "0")}`;
  await writeFile(path.join(outDir, "data", `${base}.json`), `${JSON.stringify(graph, null, 2)}\n`);
  const dot = graphToDot(graph);
  await writeFile(path.join(outDir, "data", `${base}.dot`), dot);

  const dotResult = spawnSync("dot", ["-Tsvg", path.join(outDir, "data", `${base}.dot`)], {
    encoding: "utf8",
  });

  if (dotResult.status === 0 && dotResult.stdout.trim()) {
    await writeAsset(base, dotResult.stdout);
  } else {
    const fallbackSvg = renderGraphFallbackSvg(graph);
    await writeAsset(base, fallbackSvg, {
      note: "Graphviz dot was unavailable or failed; used built-in fallback renderer.",
      stderr: dotResult.stderr,
    });
  }
}

for (const [index, chart] of blocks.chart.entries()) {
  const base = `chart-${String(index + 1).padStart(2, "0")}`;
  await writeFile(path.join(outDir, "data", `${base}.json`), `${JSON.stringify(chart, null, 2)}\n`);
  await writeAsset(base, renderChartSvg(chart));
}

for (const [index, map] of blocks.map.entries()) {
  const base = `map-${String(index + 1).padStart(2, "0")}`;
  await writeFile(path.join(outDir, "data", `${base}.json`), `${JSON.stringify(map, null, 2)}\n`);
  await writeAsset(base, renderMapPlaceholderSvg(map));
}

const voiceover = buildVoiceoverDraft(title, blocks);
await writeFile(path.join(outDir, "voiceover-draft.md"), voiceover);

const videoManifest = buildVideoManifest(title, blocks, assets);
await writeFile(path.join(outDir, "video-manifest.json"), `${JSON.stringify(videoManifest, null, 2)}\n`);

if (args.video !== false) {
  const videoResult = await renderPreviewVideo(outDir, assets);
  manifest.previewVideo = videoResult;
}

await writeFile(path.join(outDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(path.join(outDir, "README.md"), renderRunReadme(manifest));

console.log(`Generated agricultural lab assets for "${title}"`);
console.log(`  ${path.relative(process.cwd(), outDir)}`);
console.log(`  graphs: ${blocks.graph.length}, charts: ${blocks.chart.length}, maps: ${blocks.map.length}`);
if (manifest.previewVideo?.ok) {
  console.log(`  preview video: ${path.relative(process.cwd(), path.join(outDir, "video", "preview.mp4"))}`);
}

async function writeAsset(base, svg, extra = {}) {
  const svgFile = path.join(outDir, "svg", `${base}.svg`);
  const pngFile = path.join(outDir, "png", `${base}.png`);
  await writeFile(svgFile, svg);
  await svgToPng(svg, svgFile, pngFile);
  assets.push({
    id: base,
    svg: path.relative(appDir, svgFile),
    png: path.relative(appDir, pngFile),
    ...extra,
  });
}

async function svgToPng(svg, svgFile, pngFile) {
  if (commandExists("rsvg-convert")) {
    const result = spawnSync("rsvg-convert", [svgFile, "-o", pngFile], { encoding: "utf8" });
    if (result.status === 0) return;
  }
  await sharp(Buffer.from(svg)).png().toFile(pngFile);
}

async function renderPreviewVideo(dir, assetList) {
  if (!commandExists("ffmpeg")) {
    return { ok: false, reason: "ffmpeg not found on PATH" };
  }
  const pngs = assetList.map((asset) => path.join(appDir, asset.png)).filter((file) => existsSync(file));
  if (!pngs.length) {
    return { ok: false, reason: "no PNG assets were generated" };
  }

  const concatFile = path.join(dir, "video", "preview.concat.txt");
  const lines = [];
  for (const png of pngs) {
    lines.push(`file '${png.replaceAll("'", "'\\''")}'`);
    lines.push("duration 3.2");
  }
  lines.push(`file '${pngs[pngs.length - 1].replaceAll("'", "'\\''")}'`);
  await writeFile(concatFile, `${lines.join("\n")}\n`);

  const outFile = path.join(dir, "video", "preview.mp4");
  const result = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      concatFile,
      "-vf",
      "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p",
      "-r",
      "30",
      outFile,
    ],
    { encoding: "utf8" },
  );

  return result.status === 0
    ? { ok: true, file: path.relative(appDir, outFile) }
    : { ok: false, reason: result.stderr || result.stdout || "ffmpeg failed" };
}

function extractDataBlocks(md) {
  const blocks = { chart: [], graph: [], map: [] };
  const fence = /```(chart|graph|map)\s*\n([\s\S]*?)```/g;
  let match;
  while ((match = fence.exec(md))) {
    const [, kind, raw] = match;
    try {
      blocks[kind].push(JSON.parse(raw));
    } catch (error) {
      throw new Error(`Could not parse ${kind} block near byte ${match.index}: ${error.message}`);
    }
  }
  return blocks;
}

function graphToDot(spec) {
  const lines = [
    "digraph G {",
    "  graph [rankdir=TB, bgcolor=transparent, pad=0.25, nodesep=0.6, ranksep=0.85];",
    "  node [shape=box, style=\"rounded,filled\", fontname=\"Arial\", fontsize=13, margin=\"0.12,0.08\", color=\"#9fb3a7\", fillcolor=\"#f7f3e8\", fontcolor=\"#17231d\"];",
    "  edge [fontname=\"Arial\", fontsize=10, color=\"#6f8377\", fontcolor=\"#41524a\", arrowsize=0.75];",
  ];

  for (const node of spec.nodes || []) {
    const attrs = {
      label: node.label || node.id,
      fillcolor: node.output ? "#184f3b" : "#f7f3e8",
      fontcolor: node.output ? "#ffffff" : "#17231d",
      color: node.output ? "#184f3b" : "#9fb3a7",
    };
    lines.push(`  ${dotId(node.id)} [${dotAttrs(attrs)}];`);
  }

  for (const edge of spec.edges || []) {
    const color = edge.evidence === "verified" ? "#1f7a4d" : edge.evidence === "estimated" ? "#b88318" : "#b65c43";
    const style = edge.evidence === "hypothesis" ? "dashed" : "solid";
    lines.push(
      `  ${dotId(edge.from)} -> ${dotId(edge.to)} [${dotAttrs({
        label: edge.label || "",
        color,
        fontcolor: color,
        style,
      })}];`,
    );
  }

  lines.push("}");
  return `${lines.join("\n")}\n`;
}

function renderCoverSvg(heading, slugText) {
  return svgFrame(`
    <rect width="1600" height="900" fill="#f7f3e8"/>
    <rect x="0" y="0" width="1600" height="900" fill="#10251e"/>
    <path d="M0 620 C260 540 450 690 720 570 C990 450 1160 520 1600 380 L1600 900 L0 900 Z" fill="#2f7c59" opacity="0.55"/>
    <path d="M0 700 C260 620 490 750 780 660 C1060 575 1260 625 1600 500 L1600 900 L0 900 Z" fill="#d9a63a" opacity="0.55"/>
    <text x="96" y="140" fill="#d9a63a" font-size="30" font-family="Arial" font-weight="700">AUTONATEAI AGRICULTURAL SYSTEMS LAB</text>
    ${multilineText(heading, 96, 265, 72, 860, "#fffaf0", 1.08)}
    <text x="96" y="780" fill="#c7d3cb" font-size="30" font-family="Arial">${escapeXml(slugText)}</text>
  `);
}

function renderChartSvg(spec) {
  const width = 1600;
  const height = 900;
  const plot = { x: 120, y: 170, w: 1320, h: 530 };
  const labels = spec.labels || [];
  const series = spec.series || [];
  const values = series.flatMap((item) => item.data || []);
  const min = Math.min(0, ...values);
  const max = Math.max(1, ...values);
  const range = max - min || 1;
  const palette = ["#2f7c59", "#d9a63a", "#437aa5", "#b65c43", "#6f5b96"];

  let body = `
    <rect width="${width}" height="${height}" fill="#f7f3e8"/>
    <text x="80" y="82" fill="#17231d" font-size="42" font-family="Arial" font-weight="700">${escapeXml(spec.title || "Research Chart")}</text>
    <line x1="${plot.x}" y1="${plot.y + plot.h}" x2="${plot.x + plot.w}" y2="${plot.y + plot.h}" stroke="#9fb3a7" stroke-width="2"/>
  `;

  if (spec.type === "line") {
    for (const [sIndex, item] of series.entries()) {
      const points = (item.data || []).map((value, i) => {
        const x = plot.x + (labels.length <= 1 ? plot.w / 2 : (i / (labels.length - 1)) * plot.w);
        const y = plot.y + plot.h - ((value - min) / range) * plot.h;
        return `${x},${y}`;
      });
      body += `<polyline points="${points.join(" ")}" fill="none" stroke="${item.color || palette[sIndex % palette.length]}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
      for (const point of points) {
        const [x, y] = point.split(",");
        body += `<circle cx="${x}" cy="${y}" r="8" fill="${item.color || palette[sIndex % palette.length]}"/>`;
      }
    }
  } else {
    const groupW = plot.w / Math.max(labels.length, 1);
    const barW = Math.min(62, (groupW - 24) / Math.max(series.length, 1));
    for (const [i] of labels.entries()) {
      for (const [sIndex, item] of series.entries()) {
        const value = item.data?.[i] ?? 0;
        const barH = ((value - min) / range) * plot.h;
        const x = plot.x + i * groupW + 12 + sIndex * barW;
        const y = plot.y + plot.h - barH;
        body += `<rect x="${x}" y="${y}" width="${barW - 4}" height="${barH}" rx="5" fill="${item.color || palette[sIndex % palette.length]}"/>`;
        body += `<text x="${x + (barW - 4) / 2}" y="${Math.max(y - 10, plot.y + 18)}" text-anchor="middle" fill="#17231d" font-size="22" font-family="Arial" font-weight="700">${escapeXml(String(value))}</text>`;
      }
    }
  }

  for (const [i, label] of labels.entries()) {
    const x = plot.x + (i + 0.5) * (plot.w / Math.max(labels.length, 1));
    body += multilineText(label, x - 85, plot.y + plot.h + 48, 19, 170, "#41524a", 1.15);
  }

  let legendY = 745;
  for (const [sIndex, item] of series.entries()) {
    const color = item.color || palette[sIndex % palette.length];
    body += `<rect x="90" y="${legendY - 20}" width="28" height="18" rx="4" fill="${color}"/>`;
    body += `<text x="132" y="${legendY - 4}" fill="#17231d" font-size="24" font-family="Arial">${escapeXml(item.name || `Series ${sIndex + 1}`)}</text>`;
    legendY += 34;
  }

  if (spec.sourceLabel) {
    body += multilineText(spec.sourceLabel, 820, 795, 18, 650, "#5f6d66", 1.14);
  }

  return svgFrame(body, width, height);
}

function renderGraphFallbackSvg(spec) {
  const width = 1600;
  const height = 900;
  const nodes = spec.nodes || [];
  const ranks = new Map();
  for (const node of nodes) {
    const rank = Number(node.rank || 0);
    if (!ranks.has(rank)) ranks.set(rank, []);
    ranks.get(rank).push(node);
  }
  const sortedRanks = Array.from(ranks.keys()).sort((a, b) => a - b);
  const positions = new Map();
  for (const [rIndex, rank] of sortedRanks.entries()) {
    const row = ranks.get(rank);
    for (const [i, node] of row.entries()) {
      positions.set(node.id, {
        x: ((i + 1) / (row.length + 1)) * width,
        y: 170 + rIndex * (580 / Math.max(sortedRanks.length - 1, 1)),
      });
    }
  }
  let body = `<rect width="${width}" height="${height}" fill="#f7f3e8"/>`;
  body += `<text x="80" y="80" fill="#17231d" font-size="42" font-family="Arial" font-weight="700">${escapeXml(spec.title || "System Graph")}</text>`;
  for (const edge of spec.edges || []) {
    const a = positions.get(edge.from);
    const b = positions.get(edge.to);
    if (!a || !b) continue;
    const color = edge.evidence === "verified" ? "#1f7a4d" : edge.evidence === "estimated" ? "#b88318" : "#b65c43";
    body += `<line x1="${a.x}" y1="${a.y + 42}" x2="${b.x}" y2="${b.y - 42}" stroke="${color}" stroke-width="5" stroke-linecap="round" opacity="0.8"/>`;
  }
  for (const node of nodes) {
    const pos = positions.get(node.id);
    if (!pos) continue;
    const fill = node.output ? "#184f3b" : "#fffaf0";
    const text = node.output ? "#ffffff" : "#17231d";
    body += `<rect x="${pos.x - 125}" y="${pos.y - 45}" width="250" height="90" rx="14" fill="${fill}" stroke="#9fb3a7" stroke-width="3"/>`;
    body += multilineText(node.label || node.id, pos.x - 108, pos.y - 18, 22, 216, text, 1.05);
  }
  if (spec.sourceLabel) body += multilineText(spec.sourceLabel, 80, 810, 20, 1380, "#5f6d66", 1.16);
  return svgFrame(body, width, height);
}

function renderMapPlaceholderSvg(spec) {
  return svgFrame(`
    <rect width="1600" height="900" fill="#f7f3e8"/>
    <text x="80" y="96" fill="#17231d" font-size="46" font-family="Arial" font-weight="700">${escapeXml(spec.title || "Map Layer")}</text>
    <rect x="80" y="150" width="1440" height="620" rx="18" fill="#d9e5df" stroke="#9fb3a7" stroke-width="3"/>
    <path d="M130 615 C330 500 480 555 660 430 C840 300 1000 360 1210 250 C1320 195 1430 205 1500 170" fill="none" stroke="#437aa5" stroke-width="20" opacity="0.65"/>
    <path d="M180 690 L470 380 L710 640 L980 300 L1390 690 Z" fill="none" stroke="#2f7c59" stroke-width="5" opacity="0.6"/>
    <text x="110" y="835" fill="#41524a" font-size="26" font-family="Arial">Map spec extracted. Use QGIS/GDAL/PostGIS for publication cartography once live spatial layers are attached.</text>
  `);
}

function buildVoiceoverDraft(heading, blocks) {
  const lines = [
    `# Voiceover Draft: ${heading}`,
    "",
    "This is a rough narration scaffold generated from the article's structured lab blocks.",
    "",
  ];
  for (const graph of blocks.graph) {
    lines.push(`## ${graph.title || "System Graph"}`);
    lines.push("This system map shows the actors, signals, and bottlenecks that turn a research article into an experiment.");
    for (const edge of graph.edges || []) {
      lines.push(`- ${edge.from} -> ${edge.to}: ${edge.label || edge.evidence || "relationship"}`);
    }
    lines.push("");
  }
  for (const chart of blocks.chart) {
    lines.push(`## ${chart.title || "Chart"}`);
    lines.push(`Use this visual to ground the story in numbers. Source note: ${chart.sourceLabel || "source label missing"}`);
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

function buildVideoManifest(heading, blocks, assetList) {
  return {
    title: heading,
    style: "Modern-Marvels-inspired agricultural systems briefing; grounded, sourced, and branded.",
    sequence: assetList.map((asset, index) => ({
      order: index + 1,
      asset: asset.png,
      durationSeconds: index === 0 ? 4 : 3.2,
      narrationCue:
        asset.id === "cover"
          ? "Open with the core question and the region/system being investigated."
          : "Explain what this visual proves, what is still estimated, and what decision-maker should ask next.",
    })),
    counts: {
      graphs: blocks.graph.length,
      charts: blocks.chart.length,
      maps: blocks.map.length,
    },
  };
}

function renderRunReadme(run) {
  return `# ${run.title}

Generated from \`${run.source}\`.

## Outputs

- \`manifest.json\` — machine-readable run inventory.
- \`data/\` — extracted chart/graph/map JSON plus Graphviz DOT where relevant.
- \`svg/\` — vector assets.
- \`png/\` — presentation/video-ready raster exports.
- \`video/preview.mp4\` — stitched preview when FFmpeg is available.
- \`voiceover-draft.md\` — first narration scaffold for long-form or short-form video.

## Toolchain

\`\`\`json
${JSON.stringify(run.toolchain, null, 2)}
\`\`\`
`;
}

function detectToolchain() {
  const alternatives = {
    qgis_process: ["/Applications/QGIS-final-4_2_2.app/Contents/MacOS/qgis_process"],
    psql: ["/opt/homebrew/opt/postgresql@17/bin/psql", "/opt/homebrew/opt/postgresql@16/bin/psql"],
    createdb: ["/opt/homebrew/opt/postgresql@17/bin/createdb", "/opt/homebrew/opt/postgresql@16/bin/createdb"],
  };
  return Object.fromEntries(
    ["dot", "ffmpeg", "gdalinfo", "ogr2ogr", "qgis_process", "blender", "docker", "psql", "createdb", "postgis"].map((cmd) => [
      cmd,
      commandExists(cmd, alternatives[cmd]),
    ]),
  );
}

function commandExists(command, alternatives = []) {
  if (spawnSync("zsh", ["-lc", `command -v ${shellQuote(command)}`], { encoding: "utf8" }).status === 0) {
    return true;
  }
  return alternatives.some((candidate) => spawnSync("test", ["-x", candidate]).status === 0);
}

function parseArgs(argv) {
  const parsed = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) {
      parsed._.push(arg);
      continue;
    }
    const key = arg.slice(2);
    if (key.startsWith("no-")) {
      parsed[key.slice(3)] = false;
    } else if (argv[i + 1] && !argv[i + 1].startsWith("--")) {
      parsed[key] = argv[++i];
    } else {
      parsed[key] = true;
    }
  }
  return parsed;
}

function dotId(id) {
  return `"${String(id).replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;
}

function dotAttrs(attrs) {
  return Object.entries(attrs)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}=${dotId(value)}`)
    .join(", ");
}

function svgFrame(body, width = 1600, height = 900) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${body}
</svg>
`;
}

function multilineText(text, x, y, fontSize, maxWidth, fill, lineHeight = 1.2) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const approxChars = Math.max(8, Math.floor(maxWidth / (fontSize * 0.58)));
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > approxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return `<text x="${x}" y="${y}" fill="${fill}" font-size="${fontSize}" font-family="Arial" font-weight="700">${lines
    .slice(0, 8)
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : fontSize * lineHeight}">${escapeXml(line)}</tspan>`)
    .join("")}</text>`;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function shellQuote(value) {
  return `'${String(value).replaceAll("'", "'\\''")}'`;
}

function titleCase(value) {
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
