import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(__dirname, "..");
const args = parseArgs(process.argv.slice(2));
const runArg = args.run || args._[0];

if (!runArg) fail("Usage: node scripts/render-ag-lab-social-short.mjs --run lab-assets/<slug>");

const runDir = path.resolve(appDir, runArg);
const manifest = JSON.parse(await readFile(path.join(runDir, "manifest.json"), "utf8"));
const graph = JSON.parse(await readFile(path.join(runDir, "data", "graph-01.json"), "utf8"));
// Chart count varies per article — read however many chart-NN.json files this
// run actually produced instead of assuming 3 (see render-ag-lab-explainer.mjs
// for the same fix and why it matters).
const { readdir } = await import("node:fs/promises");
const dataDir = path.join(runDir, "data");
const chartFiles = (await readdir(dataDir)).filter((f) => /^chart-\d+\.json$/.test(f)).sort();
const charts = await Promise.all(
  chartFiles.map((f) => readFile(path.join(dataDir, f), "utf8").then((raw) => JSON.parse(raw))),
);

const productionDir = path.join(runDir, "social-short-video");
const frameRoot = path.join(productionDir, "frames");
const audioDir = path.join(productionDir, "audio");
const sceneDir = path.join(productionDir, "scenes");
await mkdir(frameRoot, { recursive: true });
await mkdir(audioDir, { recursive: true });
await mkdir(sceneDir, { recursive: true });
await mkdir(path.join(runDir, "video"), { recursive: true });

const FPS = Number(args.fps || 18);
const W = 1080;
const H = 1920;
const voice = process.env.OPENAI_TTS_KAI_VOICE || args.voice || "marin";
const model = process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts";
const musicVolume = Number(args.musicVolume || args["music-volume"] || 0.24);
const instructions = [
  "You are Kai, the female narrator for an AutoNateAI social explainer short.",
  "Speak with bright professional energy, quick pacing, and a little playful confidence.",
  "Keep the delivery credible and business-smart while letting the punch lines breathe.",
  "Use natural conversational rhythm, but keep the spoken text clean and precise.",
].join(" ");

const scenes = buildShortScenes(charts, graph, manifest);
const rendered = [];

for (const [index, scene] of scenes.entries()) {
  const id = `${String(index + 1).padStart(2, "0")}-${scene.id}`;
  const wav = path.join(audioDir, `${id}.wav`);
  if (scene.script) await generateSpeech({ scene, wav, model, voice, instructions });
  else generateStinger(wav, scene.stinger || "hit", scene.duration);
  const audioDuration = probeDuration(wav);
  const duration = Math.max(scene.duration, audioDuration + 0.25);
  if (scene.maxDuration && duration > scene.maxDuration + 0.2) {
    fail(`${scene.id} narration is ${duration.toFixed(2)}s, over ${scene.maxDuration}s. Shorten the script.`);
  }
  const framesDir = path.join(frameRoot, id);
  await rm(framesDir, { recursive: true, force: true });
  await mkdir(framesDir, { recursive: true });
  await renderFrames({ scene, framesDir, duration });
  const video = path.join(sceneDir, `${id}.mp4`);
  encodeScene({ framesDir, wav, duration, video });
  rendered.push({ id, scene, wav, video, duration });
}

const concatFile = path.join(productionDir, "scenes.concat.txt");
await writeFile(concatFile, rendered.map((item) => `file '${item.video.replaceAll("'", "'\\''")}'`).join("\n") + "\n");

const cleanShort = path.join(runDir, "video", "explainer-short-9x16-clean.mp4");
concatScenes(rendered.map((item) => item.video), cleanShort);

const finalDuration = probeDuration(cleanShort);
const music = path.join(audioDir, "social-background-bed.wav");
generateMusicBed(music, finalDuration);

const finalFile = path.join(runDir, "video", "explainer-short-9x16.mp4");
run("ffmpeg", [
  "-y",
  "-i",
  cleanShort,
  "-i",
  music,
  "-filter_complex",
  `[0:a]volume=1.0[voice];[1:a]volume=${musicVolume}[music];[voice][music]amix=inputs=2:duration=first:dropout_transition=0[a]`,
  "-map",
  "0:v",
  "-map",
  "[a]",
  "-c:v",
  "copy",
  "-c:a",
  "aac",
  "-b:a",
  "192k",
  "-shortest",
  finalFile,
]);

await writeFile(
  path.join(productionDir, "production-manifest.json"),
  `${JSON.stringify(
    {
      title: manifest.title,
      generatedAt: new Date().toISOString(),
      format: "9:16",
      fps: FPS,
      voice,
      model,
      musicVolume,
      scenes: rendered.map((item) => ({
        id: item.id,
        title: item.scene.title,
        duration: Number(item.duration.toFixed(2)),
        script: item.scene.script,
      })),
      outputs: {
        clean: path.relative(appDir, cleanShort),
        withMusic: path.relative(appDir, finalFile),
      },
    },
    null,
    2,
  )}\n`,
);

console.log(`Rendered 9:16 social short for ${manifest.title}`);
console.log(`  final: ${path.relative(process.cwd(), finalFile)}`);

// Data-driven, same principle as render-ag-lab-explainer.mjs's buildScenes:
// every scene's title/tag/script comes from this run's own chart/graph JSON
// instead of hand-authored-per-article text, so this works on any article.
// Direction Rules (ag-lab-video-director/SKILL.md) cap a short at 45s (30s
// target) — hook (3s) + cta (4s) are fixed, leaving ~38s for content scenes;
// stop adding chart scenes once that budget (minus room for the graph scene)
// is spent rather than hand-picking indices into a fixed 3-chart array.
function buildShortScenes(chartSpecs, graphSpec, manifest) {
  const scenes = [
    {
      id: "hook",
      kind: "hook",
      title: manifest.title,
      badge: truncate(manifest.title, 34).toUpperCase(),
      duration: 3,
      stinger: "hook",
    },
  ];

  const CONTENT_BUDGET = 38;
  const GRAPH_RESERVE = 9;
  let used = 0;
  chartSpecs.forEach((chart, index) => {
    if (used + 5.5 > CONTENT_BUDGET - GRAPH_RESERVE) return;
    used += 5.5;
    scenes.push({
      id: `chart-${index + 1}`,
      kind: chart.type === "line" ? "line" : "bars",
      title: truncate(chart.title || "The numbers", 42),
      icon: chart.type === "line" ? "eyes" : "smile",
      chart,
      duration: 5.5,
      maxDuration: 6,
      script: truncate(chart.title || "Here's the number that matters.", 90),
    });
  });

  scenes.push({
    id: "system-flow",
    kind: "graph",
    title: "Watch it connect",
    icon: "arrow",
    graph: graphSpec,
    duration: 9,
    maxDuration: 12,
    script: buildShortGraphScript(graphSpec),
  });

  scenes.push({
    id: "cta",
    kind: "cta",
    title: "AutoNateAI",
    duration: 4,
    maxDuration: 5,
    script: "Watch the full breakdown on YouTube and read the brief on the site.",
  });

  return scenes;
}

function buildShortGraphScript(graphSpec) {
  const nodes = graphSpec.nodes || [];
  const first = nodes[0] ? cleanNode(nodes[0].label).split(" ").slice(0, 3).join(" ") : "the signal";
  const last = nodes[nodes.length - 1] ? cleanNode(nodes[nodes.length - 1].label).split(" ").slice(0, 3).join(" ") : "the decision";
  return `Here's how it connects. ${first} flows all the way to ${last}.`;
}

function truncate(text, max) {
  const compact = String(text || "").replace(/\s+/g, " ").trim();
  return compact.length > max ? `${compact.slice(0, max - 3)}...` : compact;
}

function cleanNode(label) {
  return String(label).replace(/\n/g, " ");
}

async function generateSpeech({ scene, wav, model, voice, instructions }) {
  const metadataFile = `${wav}.json`;
  const prior = existsSync(metadataFile) ? JSON.parse(await readFile(metadataFile, "utf8")) : null;
  const metadata = { model, voice, instructions, input: scene.script, normalized: true };
  const cacheHit =
    existsSync(wav) &&
    prior?.model === metadata.model &&
    prior?.voice === metadata.voice &&
    prior?.instructions === metadata.instructions &&
    prior?.input === metadata.input &&
    prior?.normalized;
  if (cacheHit) return;
  if (!process.env.OPENAI_API_KEY) fail("OPENAI_API_KEY is not set.");

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      voice,
      input: scene.script,
      instructions,
      response_format: "wav",
    }),
  });
  if (!response.ok) fail(`OpenAI Speech API failed: ${response.status} ${await response.text()}`);
  const rawWav = `${wav}.raw.wav`;
  await writeFile(rawWav, Buffer.from(await response.arrayBuffer()));
  run("ffmpeg", ["-y", "-i", rawWav, "-ar", "24000", "-ac", "1", wav], { quiet: true });
  await writeFile(metadataFile, `${JSON.stringify(metadata, null, 2)}\n`);
}

async function renderFrames({ scene, framesDir, duration }) {
  const total = Math.max(1, Math.ceil(duration * FPS));
  for (let i = 0; i < total; i += 1) {
    const t = i / FPS;
    const p = total <= 1 ? 1 : i / (total - 1);
    const svgText = renderScene(scene, t, p, duration);
    const svgFile = path.join(framesDir, `frame-${String(i).padStart(5, "0")}.svg`);
    const pngFile = path.join(framesDir, `frame-${String(i).padStart(5, "0")}.png`);
    await writeFile(svgFile, svgText);
    run("rsvg-convert", [svgFile, "-o", pngFile], { quiet: true });
  }
}

function encodeScene({ framesDir, wav, duration, video }) {
  run("ffmpeg", [
    "-y",
    "-framerate",
    String(FPS),
    "-i",
    path.join(framesDir, "frame-%05d.png"),
    "-i",
    wav,
    "-vf",
    "format=yuv420p",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "20",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-t",
    String(duration),
    "-shortest",
    video,
  ]);
}

function concatScenes(videos, output) {
  const inputs = videos.flatMap((video) => ["-i", video]);
  const chains = videos
    .map(
      (_, i) =>
        `[${i}:v]setpts=PTS-STARTPTS,format=yuv420p[v${i}];` +
        `[${i}:a]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo,asetpts=PTS-STARTPTS[a${i}]`,
    )
    .join(";");
  const concatInputs = videos.map((_, i) => `[v${i}][a${i}]`).join("");
  run("ffmpeg", [
    "-y",
    ...inputs,
    "-filter_complex",
    `${chains};${concatInputs}concat=n=${videos.length}:v=1:a=1[v][a]`,
    "-map",
    "[v]",
    "-map",
    "[a]",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "20",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    output,
  ]);
}

function renderScene(scene, t, p, duration) {
  if (scene.kind === "hook") return svg(renderHook(scene, t, p));
  const bg = `
    <rect width="${W}" height="${H}" fill="#f7f3e8"/>
    <rect x="0" y="0" width="${W}" height="12" fill="#184f3b"/>
    <text x="68" y="82" fill="#184f3b" font-family="Arial" font-size="31" font-weight="900">AUTONATEAI LAB</text>
  `;
  if (scene.kind === "line") return svg(bg + renderShortLine(scene, t, p, duration));
  if (scene.kind === "bars") return svg(bg + renderShortBars(scene, t, p));
  if (scene.kind === "graph") return svg(bg + renderShortGraph(scene, t, p));
  return svg(renderShortCta(scene, t, p));
}

function renderHook(scene, t, p) {
  const sweep = -260 + p * 1450;
  return `
    <rect width="${W}" height="${H}" fill="#10251e"/>
    <path d="M0 1370 C240 1230 420 1330 610 1180 C790 1040 920 1080 1080 960 L1080 1920 L0 1920 Z" fill="#184f3b"/>
    <path d="M0 1520 C240 1390 455 1480 670 1345 C850 1235 970 1290 1080 1210 L1080 1920 L0 1920 Z" fill="#d9a63a"/>
    <rect x="${sweep}" y="-120" width="200" height="2200" fill="#fffaf0" opacity="0.16" transform="rotate(-16 ${sweep + 100} 960)"/>
    <text x="66" y="520" fill="#fffaf0" font-family="Arial" font-size="112" font-weight="900">AutoNateAI</text>
    <text x="70" y="610" fill="#d9a63a" font-family="Arial" font-size="43" font-weight="900">AGRICULTURAL SYSTEMS LAB</text>
    ${emojiBadge("alert", 72, 778, 1.05, ease(clamp((t - 0.45) / 0.4)))}
    ${tag(scene.badge || "NEW RESEARCH SIGNAL", 150, 760, Math.min(900, 60 + (scene.badge || "NEW RESEARCH SIGNAL").length * 22), "#e07856", "#fffaf0", ease(clamp((t - 0.45) / 0.4)))}
    <text x="72" y="930" fill="#fffaf0" font-family="Arial" font-size="45" font-weight="800">30-ish seconds. No fluff.</text>
  `;
}

function renderShortLine(scene, t, p, duration) {
  const chart = scene.chart;
  const progress = ease(clamp((t - 0.45) / 2.2));
  const plot = { x: 86, y: 560, w: 900, h: 620 };
  const line = renderLineChart(chart, plot, progress);
  const tagText = truncate(chart.labels?.[chart.labels.length - 1] || "Latest reading", 34);
  return `
    ${emojiBadge(scene.icon, 70, 168, 1, 1)}
    ${textBlock(scene.title, 145, 205, 60, 850, "#10251e", 1.05)}
    ${tag(tagText, 70, 405, Math.min(950, 60 + tagText.length * 22), "#184f3b", "#fffaf0", ease(clamp((t - 0.7) / 0.5)))}
    ${line}
    ${popText("Straight from the source.", 118, 1290, 860, ease(clamp((t - duration + 1.7) / 0.35)), "doc")}
  `;
}

function renderShortBars(scene, t, p) {
  const chart = scene.chart;
  const progress = ease(clamp((t - 0.45) / 2.6));
  const tagText = truncate((chart.sourceLabel || "").split(/(?<=[.:])\s/)[0] || "Real numbers, not vibes", 34);
  return `
    ${emojiBadge(scene.icon, 70, 150, 1, 1)}
    ${textBlock(scene.title, 145, 190, 60, 850, "#10251e", 1.04)}
    ${tag(tagText, 70, 390, Math.min(950, 60 + tagText.length * 20), "#184f3b", "#fffaf0", ease(clamp((t - 0.65) / 0.45)))}
    ${renderBarChart(chart, { x: 92, y: 595, w: 900, h: 680 }, progress)}
    ${popText("Real numbers, not vibes.", 112, 1365, 850, ease(clamp((t - 4.1) / 0.4)))}
  `;
}

// Picks one representative node per rank (see reference/interactive-blocks.md:
// nodes[].rank) instead of a hardcoded 5-node id map, so this works on any
// graph — a 9:16 short only has room for a short vertical chain, not the
// full diagram (that's what the 16:9 explainer's system-map scene is for).
function renderShortGraph(scene, t) {
  const graph = scene.graph;
  const byRank = {};
  for (const node of graph.nodes) {
    const r = node.rank ?? 0;
    if (!(r in byRank)) byRank[r] = node;
  }
  const rankKeys = Object.keys(byRank).map(Number).sort((a, b) => a - b).slice(0, 5);
  const top = 520;
  const bottom = 1365;
  const step = rankKeys.length > 1 ? (bottom - top) / (rankKeys.length - 1) : 0;
  const picked = rankKeys.map((r, i) => ({
    ...byRank[r],
    x: 340,
    y: rankKeys.length > 1 ? top + step * i : top,
    showAt: 0.45 + i * 0.85,
  }));
  const firstShort = picked[0] ? cleanNode(picked[0].label).split(" ").slice(0, 2).join(" ") : "the signal";
  const lastShort = picked[picked.length - 1] ? cleanNode(picked[picked.length - 1].label).split(" ").slice(0, 2).join(" ") : "the decision";
  const chainText = truncate(`${firstShort} -> ... -> ${lastShort}`, 40);
  let body = `
    ${emojiBadge(scene.icon, 70, 150, 1, 1)}
    ${textBlock(scene.title, 145, 190, 60, 850, "#10251e", 1.04)}
    ${tag(chainText, 70, 365, Math.min(940, 60 + chainText.length * 17), "#184f3b", "#fffaf0", ease(clamp((t - 0.55) / 0.45)))}
  `;
  for (let i = 1; i < picked.length; i += 1) {
    const a = picked[i - 1];
    const b = picked[i];
    const realEdge = (graph.edges || []).find((e) => e.from === a.id && e.to === b.id);
    const color = realEdge?.evidence === "verified" ? "#2f7c59" : realEdge?.evidence === "hypothesis" ? "#e07856" : "#d9a63a";
    const showAt = b.showAt - 0.3;
    const ep = ease(clamp((t - showAt) / 0.65));
    if (ep <= 0) continue;
    const x1 = a.x + 175;
    const y1 = a.y + 70;
    const x2 = x1 + (b.x + 175 - x1) * ep;
    const y2 = y1 + (b.y + 70 - y1) * ep;
    body += `<path d="M${x1} ${y1} C${x1} ${y1 + 120}, ${x2} ${y2 - 120}, ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round"/>`;
    body += `<circle cx="${x2}" cy="${y2}" r="15" fill="${color}"/>`;
  }
  for (const node of picked) {
    const np = ease(clamp((t - node.showAt) / 0.42));
    if (np <= 0) continue;
    body += `<g opacity="${np}" transform="translate(${node.x},${node.y + (1 - np) * 22}) scale(${0.9 + np * 0.1})">
      <rect width="350" height="140" rx="28" fill="${node.output ? "#184f3b" : "#fffaf0"}" stroke="#9fb3a7" stroke-width="5"/>
      ${textBlock(cleanNode(node.label), 26, 55, 27, 300, node.output ? "#fffaf0" : "#10251e", 1.05)}
    </g>`;
  }
  body += popText("Now that is the movie.", 126, 1630, 820, ease(clamp((t - (0.45 + picked.length * 0.85) - 1.0) / 0.4)), "movie");
  return body;
}

function renderShortCta(scene, t, p) {
  return `
    <rect width="${W}" height="${H}" fill="#10251e"/>
    <circle cx="855" cy="310" r="${240 + p * 120}" fill="#184f3b" opacity="0.55"/>
    <circle cx="165" cy="1540" r="${210 + p * 80}" fill="#d9a63a" opacity="0.4"/>
    <text x="70" y="470" fill="#fffaf0" font-family="Arial" font-size="98" font-weight="900">AutoNateAI</text>
    <text x="74" y="560" fill="#d9a63a" font-family="Arial" font-size="39" font-weight="900">AGRICULTURAL SYSTEMS LAB</text>
    ${tag("Watch the full breakdown", 76, 760, 750, "#fffaf0", "#10251e", ease(clamp((t - 0.4) / 0.45)))}
    ${tag("Read the brief on the site", 76, 900, 700, "#e07856", "#fffaf0", ease(clamp((t - 0.95) / 0.45)))}
    ${emojiBadge("money", 76, 1140, 0.95, 1)}
    <text x="150" y="1190" fill="#fffaf0" font-family="Arial" font-size="48" font-weight="800">Maps. Models. Money questions.</text>
  `;
}

function renderLineChart(chart, plot, progress) {
  const values = chart.series[0].data;
  const min = 0;
  const max = Math.max(...values, 1) * 1.2;
  let body = chartFrame(plot);
  const points = values.map((value, i) => {
    const x = plot.x + (i / (values.length - 1)) * plot.w;
    const y = plot.y + plot.h - ((value - min) / (max - min)) * plot.h;
    return { x, y, value };
  });
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const seg = clamp(progress * (points.length - 1) - (i - 1));
    if (seg <= 0) break;
    const prev = points[i - 1];
    const next = points[i];
    d += ` L ${prev.x + (next.x - prev.x) * seg} ${prev.y + (next.y - prev.y) * seg}`;
  }
  body += `<path d="${d}" fill="none" stroke="#e07856" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`;
  points.forEach((point, i) => {
    const pp = ease(clamp(progress * points.length - i));
    if (pp <= 0) return;
    body += `<circle cx="${point.x}" cy="${point.y}" r="${16 * pp}" fill="#e07856"/>`;
    if (pp > 0.75) body += `<text x="${point.x}" y="${point.y - 30}" text-anchor="middle" fill="#10251e" font-family="Arial" font-size="34" font-weight="900">${point.value}</text>`;
  });
  return body;
}

function renderBarChart(chart, plot, progress) {
  const series = chart.series;
  const all = series.flatMap((s) => s.data);
  const min = Math.min(0, ...all);
  const max = Math.max(...all) * 1.15;
  const groupW = plot.w / chart.labels.length;
  const barW = (groupW * 0.7) / series.length;
  let body = chartFrame(plot);
  chart.labels.forEach((label, i) => {
    const groupX = plot.x + i * groupW + groupW * 0.15;
    series.forEach((s, sIndex) => {
      const value = s.data[i];
      if (value === undefined) return;
      const order = i * series.length + sIndex;
      const bp = ease(clamp(progress * chart.labels.length * series.length - order * 0.45));
      const x = groupX + sIndex * barW;
      const zeroY = plot.y + plot.h - ((0 - min) / (max - min)) * plot.h;
      const y = plot.y + plot.h - ((value - min) / (max - min)) * plot.h;
      const h = Math.abs(zeroY - y) * bp;
      const drawY = value >= 0 ? zeroY - h : zeroY;
      const color = s.color || (value >= 0 ? "#d9a63a" : "#e07856");
      body += `<rect x="${x}" y="${drawY}" width="${barW * 0.82}" height="${h}" rx="18" fill="${color}"/>`;
      if (bp > 0.75) body += `<text x="${x + (barW * 0.82) / 2}" y="${drawY - 20}" text-anchor="middle" fill="#10251e" font-family="Arial" font-size="30" font-weight="900">${value}</text>`;
    });
    body += `<text x="${groupX + (groupW * 0.7) / 2}" y="${plot.y + plot.h + 62}" text-anchor="middle" fill="#53665e" font-family="Arial" font-size="24" font-weight="900">${escapeXml(truncate(label, 16))}</text>`;
  });
  return body;
}

function chartFrame(plot) {
  return `<rect x="${plot.x}" y="${plot.y}" width="${plot.w}" height="${plot.h}" rx="28" fill="#fffaf0" stroke="#d7ded8" stroke-width="4"/>
  <line x1="${plot.x + 42}" y1="${plot.y + plot.h - 56}" x2="${plot.x + plot.w - 42}" y2="${plot.y + plot.h - 56}" stroke="#9fb3a7" stroke-width="5"/>`;
}

function tag(text, x, y, width, fill, color, opacity = 1) {
  const p = clamp(opacity);
  return `<g opacity="${p}" transform="translate(${x},${y + (1 - p) * 22})">
    <rect width="${width}" height="92" rx="28" fill="${fill}"/>
    <text x="36" y="59" fill="${color}" font-family="Arial" font-size="36" font-weight="900">${escapeXml(text)}</text>
  </g>`;
}

function popText(text, x, y, width, opacity = 1, icon = "alert") {
  const p = clamp(opacity);
  return `<g opacity="${p}" transform="translate(${x},${y}) scale(${0.88 + p * 0.12})">
    <rect width="${width}" height="118" rx="34" fill="#10251e"/>
    ${emojiBadge(icon, 34, 29, 0.72, 1)}
    <text x="104" y="72" fill="#fffaf0" font-family="Arial" font-size="38" font-weight="900">${escapeXml(text)}</text>
  </g>`;
}

function emojiBadge(type, x, y, scale = 1, opacity = 1) {
  const p = clamp(opacity);
  const icon = {
    alert: `<circle cx="30" cy="30" r="30" fill="#e07856"/><text x="30" y="43" text-anchor="middle" fill="#fffaf0" font-family="Arial" font-size="40" font-weight="900">!</text>`,
    doc: `<rect x="7" y="3" width="46" height="56" rx="8" fill="#fffaf0" stroke="#10251e" stroke-width="4"/><path d="M38 4 L53 19 L39 19 Z" fill="#d9a63a"/><line x1="17" y1="31" x2="43" y2="31" stroke="#184f3b" stroke-width="5"/><line x1="17" y1="43" x2="38" y2="43" stroke="#184f3b" stroke-width="5"/>`,
    smile: `<circle cx="30" cy="30" r="30" fill="#d9a63a"/><circle cx="20" cy="25" r="5" fill="#10251e"/><circle cx="41" cy="25" r="5" fill="#10251e"/><path d="M18 39 Q30 50 43 39" fill="none" stroke="#10251e" stroke-width="5" stroke-linecap="round"/>`,
    arrow: `<circle cx="30" cy="30" r="30" fill="#184f3b"/><path d="M15 31 H42 M32 19 L44 31 L32 43" fill="none" stroke="#fffaf0" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`,
    eyes: `<ellipse cx="20" cy="30" rx="13" ry="18" fill="#fffaf0"/><ellipse cx="42" cy="30" rx="13" ry="18" fill="#fffaf0"/><circle cx="24" cy="31" r="6" fill="#10251e"/><circle cx="46" cy="31" r="6" fill="#10251e"/>`,
    movie: `<rect x="5" y="13" width="50" height="36" rx="7" fill="#d9a63a"/><path d="M16 13 L23 49 M33 13 L40 49" stroke="#10251e" stroke-width="5"/><circle cx="16" cy="8" r="7" fill="#fffaf0"/><circle cx="33" cy="8" r="7" fill="#fffaf0"/><circle cx="50" cy="8" r="7" fill="#fffaf0"/>`,
    money: `<rect x="4" y="12" width="54" height="36" rx="8" fill="#2f7c59"/><circle cx="31" cy="30" r="11" fill="#d9a63a"/><text x="31" y="38" text-anchor="middle" fill="#10251e" font-family="Arial" font-size="22" font-weight="900">$</text>`,
  }[type] || "";
  return `<g opacity="${p}" transform="translate(${x},${y}) scale(${scale})">${icon}</g>`;
}

function textBlock(text, x, y, size, maxWidth, color, lineHeight = 1.12) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const approx = Math.max(8, Math.floor(maxWidth / (size * 0.55)));
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > approx && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return `<text x="${x}" y="${y}" fill="${color}" font-family="Arial" font-size="${size}" font-weight="900">${lines
    .slice(0, 5)
    .map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : size * lineHeight}">${escapeXml(line)}</tspan>`)
    .join("")}</text>`;
}

function generateMusicBed(file, duration) {
  run("ffmpeg", [
    "-y",
    "-f",
    "lavfi",
    "-i",
    `aevalsrc=0.2*sin(2*PI*88*t)+0.11*sin(2*PI*176*t)+0.045*sin(2*PI*(352+10*sin(2*PI*0.5*t))*t):s=44100:d=${duration}`,
    "-af",
    `afade=t=in:st=0:d=0.5,afade=t=out:st=${Math.max(0, duration - 1).toFixed(2)}:d=1`,
    file,
  ]);
}

function generateStinger(file, type, duration) {
  run("ffmpeg", [
    "-y",
    "-f",
    "lavfi",
    "-i",
    `aevalsrc=0.28*sin(2*PI*(75+44*t)*t)+0.16*sin(2*PI*150*t)+0.09*sin(2*PI*300*t):s=44100:d=${duration}`,
    "-af",
    `afade=t=in:st=0:d=0.08,afade=t=out:st=${Math.max(0, duration - 0.35).toFixed(2)}:d=0.35`,
    file,
  ]);
}

function probeDuration(file) {
  const result = spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=nk=1:nw=1", file], {
    encoding: "utf8",
  });
  if (result.status !== 0) fail(result.stderr || `Could not probe ${file}`);
  return Number(result.stdout.trim());
}

function svg(body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${body}</svg>`;
}

function ease(x) {
  const t = clamp(x);
  return t * t * (3 - 2 * t);
}

function clamp(x) {
  return Math.max(0, Math.min(1, Number(x) || 0));
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function run(command, argv, options = {}) {
  const result = spawnSync(command, argv, { encoding: "utf8", stdio: options.quiet ? "pipe" : "inherit" });
  if (result.status !== 0) fail(result.stderr || result.stdout || `${command} failed`);
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
    if (argv[i + 1] && !argv[i + 1].startsWith("--")) parsed[key] = argv[++i];
    else parsed[key] = true;
  }
  return parsed;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
