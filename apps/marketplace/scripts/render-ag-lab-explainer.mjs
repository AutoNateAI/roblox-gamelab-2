import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(__dirname, "..");
const args = parseArgs(process.argv.slice(2));
const runArg = args.run || args._[0];

if (!runArg) {
  fail("Usage: node scripts/render-ag-lab-explainer.mjs --run lab-assets/<slug>");
}

const runDir = path.resolve(appDir, runArg);
const manifest = JSON.parse(await readFile(path.join(runDir, "manifest.json"), "utf8"));
const graph = JSON.parse(await readFile(path.join(runDir, "data", "graph-01.json"), "utf8"));
// Chart count varies per article (schema.md: "one or more `chart` blocks") — read
// however many chart-NN.json files this run actually produced instead of assuming 3.
const dataDir = path.join(runDir, "data");
const chartFiles = (await readdir(dataDir)).filter((f) => /^chart-\d+\.json$/.test(f)).sort();
const charts = await Promise.all(
  chartFiles.map((f) => readFile(path.join(dataDir, f), "utf8").then((raw) => JSON.parse(raw))),
);

const productionDir = path.join(runDir, "production-video");
const frameRoot = path.join(productionDir, "frames");
const audioDir = path.join(productionDir, "audio");
const sceneDir = path.join(productionDir, "scenes");
await mkdir(frameRoot, { recursive: true });
await mkdir(audioDir, { recursive: true });
await mkdir(sceneDir, { recursive: true });
await mkdir(path.join(runDir, "video"), { recursive: true });

const FPS = Number(args.fps || 18);
const W = 1920;
const H = 1080;
const voice = process.env.OPENAI_TTS_KAI_VOICE || args.voice || "marin";
const model = process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts";
const musicVolume = Number(args.musicVolume || args["music-volume"] || 0.18);
const instructions = defaultInstructions();

const scenes = buildScenes(manifest, charts, graph);
const rendered = [];

for (const [index, scene] of scenes.entries()) {
  const id = `${String(index + 1).padStart(2, "0")}-${scene.id}`;
  const wav = path.join(audioDir, `${id}.wav`);
  if (scene.script) await generateSpeech({ scene, wav, model, voice, instructions });
  else generateStinger(wav, scene.stinger || "intro", scene.minDuration || 3);
  const audioDuration = probeDuration(wav);
  const duration = Math.max(scene.minDuration || 4, audioDuration + 0.35);
  const framesDir = path.join(frameRoot, id);
  await rm(framesDir, { recursive: true, force: true });
  await mkdir(framesDir, { recursive: true });
  await renderFrames({ scene, framesDir, duration });
  const video = path.join(sceneDir, `${id}.mp4`);
  encodeScene({ framesDir, wav, duration, video });
  rendered.push({ id, scene, wav, video, duration });
}

const concatFile = path.join(productionDir, "scenes.concat.txt");
await writeFile(
  concatFile,
  rendered.map((item) => `file '${item.video.replaceAll("'", "'\\''")}'`).join("\n") + "\n",
);

const cleanNarrated = path.join(runDir, "video", "explainer-clean.mp4");
concatScenes(rendered.map((item) => item.video), cleanNarrated);

const finalDuration = probeDuration(cleanNarrated);
const music = path.join(audioDir, "background-bed.wav");
generateMusicBed(music, finalDuration);

const finalFile = path.join(runDir, "video", "explainer-production.mp4");
run("ffmpeg", [
  "-y",
  "-i",
  cleanNarrated,
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
        cleanNarrated: path.relative(appDir, cleanNarrated),
        withMusic: path.relative(appDir, finalFile),
      },
    },
    null,
    2,
  )}\n`,
);

console.log(`Rendered production explainer for ${manifest.title}`);
console.log(`  clean: ${path.relative(process.cwd(), cleanNarrated)}`);
console.log(`  with music: ${path.relative(process.cwd(), finalFile)}`);

// Data-driven: every scene's title/callout/script is derived from this run's
// own manifest + chart/graph JSON (each chart/graph already carries a real
// `title` and `sourceLabel`/edge `label` per reference/interactive-blocks.md)
// rather than hand-authored per article. This is what lets the same script
// run on any research-brief/daily-dossier output, not just the article it
// happened to be written against originally.
function buildScenes(manifest, chartSpecs, graphSpec) {
  const scenes = [
    {
      id: "autonateai-intro",
      kind: "bumper-intro",
      title: "AutoNateAI",
      callout: "Agricultural Systems Lab",
      badge: "NEW RESEARCH SIGNAL",
      minDuration: 3,
      stinger: "intro",
    },
    {
      id: "open",
      kind: "intro",
      title: manifest.title,
      callout: truncate(chartSpecs[0]?.title || graphSpec.title || "A new agricultural-economics finding", 70),
      minDuration: 5,
      script: `${manifest.title} That's the question this research pass set out to answer, using primary sources and an evidence-labeled system map — not a headline guess.`,
    },
  ];

  chartSpecs.forEach((chart, index) => {
    scenes.push({
      id: `chart-${index + 1}`,
      kind: "chart",
      chart,
      // Distinct from the chart's own title (already the scene's big header) —
      // a short source pointer, not a restatement. Full source detail still
      // renders in the footer via sourceFooter()/compactSource() below.
      callout: truncate((chart.sourceLabel || "").split(/(?<=[.:])\s/)[0] || "Source detail below", 48),
      minDuration: 7,
      script: buildChartScript(chart, index, chartSpecs.length),
    });
  });

  scenes.push({
    id: "system-map",
    kind: "graph",
    title: graphSpec.title || "How This Connects",
    graph: graphSpec,
    callout: "Evidence-labeled: solid = verified, dashed = still a hypothesis.",
    minDuration: 12,
    script: buildGraphScript(graphSpec),
  });

  scenes.push({
    id: "close",
    kind: "closing",
    title: "AutoNateAI Agricultural Systems Lab",
    callout: "Article -> model -> briefing -> decision intelligence",
    minDuration: 5,
    script:
      "So the article is only the first pass. The lab turns it into maps, models, charts, and briefings that a lender, co-op, or economic developer can actually discuss. That is the lane.",
  });

  scenes.push({
    id: "autonateai-outro",
    kind: "bumper-outro",
    title: "AutoNateAI",
    callout: "Read the brief. Watch the lab.",
    minDuration: 3,
    stinger: "outro",
  });

  return scenes;
}

function buildChartScript(chart, index, total) {
  const lead = index === 0 ? "First, look at the numbers." : index === total - 1 ? "One more data point worth sitting with." : "Here's the next piece of the picture.";
  const title = chart.title || "this chart";
  const note = chart.sourceLabel ? compactSource(chart.sourceLabel) : "";
  return `${lead} ${title}. ${note}`.trim();
}

function buildGraphScript(graphSpec) {
  const edges = graphSpec.edges || [];
  const verified = edges.find((e) => e.evidence === "verified");
  const hypothesis = edges.find((e) => e.evidence === "hypothesis");
  const parts = ["Here's the system behind the number — how one verified fact actually propagates into a real decision."];
  if (verified) parts.push(`The solid, verified link: ${cleanNode(verified.label || "")}.`);
  if (hypothesis) parts.push(`The dashed line is still a hypothesis, not a finding: ${cleanNode(hypothesis.label || "")}.`);
  parts.push("This is where the lab starts seeing the system, not just the headline.");
  return parts.join(" ");
}

function truncate(text, max) {
  const compact = String(text || "").replace(/\s+/g, " ").trim();
  return compact.length > max ? `${compact.slice(0, max - 3)}...` : compact;
}

async function generateSpeech({ scene, wav, model, voice, instructions }) {
  const metadataFile = `${wav}.json`;
  const prior = existsSync(metadataFile) ? JSON.parse(await readFile(metadataFile, "utf8")) : null;
  const metadata = { model, voice, instructions, input: scene.script, normalized: true };
  if (
    existsSync(wav) &&
    prior?.model === model &&
    prior?.voice === voice &&
    prior?.instructions === instructions &&
    prior?.input === scene.script &&
    !prior?.normalized
  ) {
    normalizeWav(wav);
    await writeFile(metadataFile, `${JSON.stringify(metadata, null, 2)}\n`);
    return;
  }
  const cacheHit =
    existsSync(wav) &&
    prior?.model === metadata.model &&
    prior?.voice === metadata.voice &&
    prior?.instructions === metadata.instructions &&
    prior?.input === metadata.input;
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

function normalizeWav(wav) {
  const normalized = `${wav}.normalized.wav`;
  run("ffmpeg", ["-y", "-i", wav, "-ar", "24000", "-ac", "1", normalized], { quiet: true });
  run("mv", [normalized, wav], { quiet: true });
}

async function renderFrames({ scene, framesDir, duration }) {
  const total = Math.max(1, Math.ceil(duration * FPS));
  for (let i = 0; i < total; i += 1) {
    const t = i / FPS;
    const p = total <= 1 ? 1 : i / (total - 1);
    const svg = renderScene(scene, t, p, duration);
    const svgFile = path.join(framesDir, `frame-${String(i).padStart(5, "0")}.svg`);
    const pngFile = path.join(framesDir, `frame-${String(i).padStart(5, "0")}.png`);
    await writeFile(svgFile, svg);
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
  const bg = `
    <rect width="${W}" height="${H}" fill="#f7f3e8"/>
    <rect x="0" y="0" width="${W}" height="8" fill="#184f3b"/>
    <text x="86" y="72" fill="#184f3b" font-family="Arial" font-size="24" font-weight="700">AUTONATEAI AGRICULTURAL SYSTEMS LAB</text>
  `;
  if (scene.kind === "bumper-intro") return svg(renderBumperIntro(scene, t, p));
  if (scene.kind === "bumper-outro") return svg(renderBumperOutro(scene, t, p));
  if (scene.kind === "intro") return svg(bg + renderIntro(scene, t, p, duration));
  if (scene.kind === "chart") return svg(bg + renderChartScene(scene, t, p, duration));
  if (scene.kind === "graph") return svg(bg + renderGraphScene(scene, t, p, duration));
  return svg(bg + renderClosing(scene, t, p, duration));
}

function renderBumperIntro(scene, t, p) {
  const flash = Math.sin(t * 22) > 0 ? 0.08 : 0;
  const sweep = -420 + p * 2550;
  return `
    <rect width="${W}" height="${H}" fill="#10251e"/>
    <rect width="${W}" height="${H}" fill="#e07856" opacity="${flash}"/>
    <path d="M0 770 C420 620 720 770 1040 580 C1370 390 1580 460 1920 265 L1920 1080 L0 1080 Z" fill="#184f3b"/>
    <path d="M0 870 C390 740 740 845 1110 700 C1430 575 1640 640 1920 500 L1920 1080 L0 1080 Z" fill="#d9a63a" opacity="0.88"/>
    <rect x="${sweep}" y="-120" width="320" height="1320" fill="#fffaf0" opacity="0.13" transform="rotate(-18 ${sweep + 160} 540)"/>
    <text x="96" y="315" fill="#fffaf0" font-family="Arial" font-size="138" font-weight="900">AutoNateAI</text>
    <text x="106" y="405" fill="#d9a63a" font-family="Arial" font-size="48" font-weight="800">AGRICULTURAL SYSTEMS LAB</text>
    ${pill(scene.badge || "NEW RESEARCH SIGNAL", 108, 530, 40 + (scene.badge || "NEW RESEARCH SIGNAL").length * 19, "#e07856", "#fffaf0", ease(clamp((t - 0.45) / 0.5)))}
    <text x="108" y="690" fill="#fffaf0" font-family="Arial" font-size="38" font-weight="700">Research -> models -> briefings -> decisions</text>
  `;
}

function renderBumperOutro(scene, t, p) {
  const pulse = 0.9 + 0.08 * Math.sin(t * 5);
  return `
    <rect width="${W}" height="${H}" fill="#10251e"/>
    <circle cx="1560" cy="220" r="${260 + p * 160}" fill="#184f3b" opacity="0.45"/>
    <circle cx="250" cy="850" r="${220 + p * 120}" fill="#d9a63a" opacity="0.35"/>
    <g transform="translate(96,285) scale(${pulse})">
      <text x="0" y="0" fill="#fffaf0" font-family="Arial" font-size="122" font-weight="900">AutoNateAI</text>
      <text x="5" y="90" fill="#d9a63a" font-family="Arial" font-size="44" font-weight="800">AGRICULTURAL SYSTEMS LAB</text>
    </g>
    ${pill(scene.callout, 108, 565, 610, "#fffaf0", "#10251e", ease(clamp((t - 0.35) / 0.65)))}
    <text x="108" y="745" fill="#fffaf0" font-family="Arial" font-size="40" font-weight="700">Full briefings. Better questions. Sharper decisions.</text>
  `;
}

function renderIntro(scene, t, p) {
  const rise = ease(clamp((t - 0.5) / 1.1));
  const calloutWidth = Math.min(1700, 60 + String(scene.callout || "").length * 17);
  return `
    <path d="M0 780 C380 630 700 770 990 610 C1290 445 1530 510 1920 350 L1920 1080 L0 1080 Z" fill="#2f7c59" opacity="0.72"/>
    <path d="M0 875 C380 725 710 850 1030 730 C1330 620 1580 680 1920 520 L1920 1080 L0 1080 Z" fill="#d9a63a" opacity="0.7"/>
    ${textBlock(scene.title, 86, 190, 58, 1500, "#10251e", 1.15)}
    ${pill(scene.callout, 92, 600 - 26 * rise, calloutWidth, "#e07856", "#fffaf0", 1)}
    ${textBlock("A narrated systems briefing from the article's structured evidence.", 92, 735, 34, 980, "#10251e", 1.2)}
  `;
}

function renderClosing(scene, t) {
  const steps = ["Article", "Model", "Briefing", "Decision intelligence"];
  const body = steps
    .map((step, index) => {
      const x = 155 + index * 420;
      const active = t > 0.7 + index * 0.45;
      const scale = active ? 1 : 0.85;
      return `
        <g transform="translate(${x},390) scale(${scale})">
          <rect x="0" y="0" width="300" height="150" rx="22" fill="${active ? "#184f3b" : "#dfe9e3"}" stroke="#9fb3a7" stroke-width="4"/>
          <text x="150" y="88" text-anchor="middle" fill="${active ? "#fffaf0" : "#184f3b"}" font-family="Arial" font-size="30" font-weight="700">${escapeXml(step)}</text>
        </g>
        ${index < steps.length - 1 ? `<path d="M${x + 320} 465 L${x + 400} 465" stroke="#d9a63a" stroke-width="10" stroke-linecap="round"/>` : ""}
      `;
    })
    .join("");
  return `
    ${textBlock(scene.title, 86, 190, 78, 1220, "#10251e", 1.08)}
    ${body}
    ${pill("Built for lender, co-op, processor, and economic-development briefings.", 86, 780, 1020, "#d9a63a", "#10251e", clamp((t - 2.6) / 0.8))}
  `;
}

function renderChartScene(scene, t, p, duration) {
  const chart = scene.chart;
  const chartP = ease(clamp((t - 0.45) / Math.max(2.2, duration * 0.42)));
  const calloutP = ease(clamp((t - duration * 0.48) / 0.7));
  return `
    ${textBlock(chart.title, 86, 128, 54, 1500, "#10251e", 1.08)}
    ${chart.type === "bar" ? renderBarChart(chart, chartP) : renderLineChart(chart, chartP)}
    ${renderLegend(chart)}
    ${pill(scene.callout, 92, 910, 1080, "#184f3b", "#fffaf0", calloutP)}
    ${sourceFooter(chart.sourceLabel)}
  `;
}

function renderLineChart(chart, progress) {
  const plot = { x: 150, y: 210, w: 1450, h: 555 };
  const all = chart.series.flatMap((s) => s.data);
  const min = Math.min(0, ...all);
  const max = Math.max(...all) * 1.12;
  const range = max - min || 1;
  let body = chartFrame(plot);
  for (const [i, label] of chart.labels.entries()) {
    const x = plot.x + (i / (chart.labels.length - 1)) * plot.w;
    body += `<text x="${x}" y="${plot.y + plot.h + 38}" text-anchor="middle" fill="#53665e" font-family="Arial" font-size="26" font-weight="700">${escapeXml(label)}</text>`;
  }
  chart.series.forEach((series, sIndex) => {
    const color = series.color || ["#437aa5", "#d9a63a", "#2f7c59"][sIndex % 3];
    const points = series.data.map((value, i) => {
      const x = plot.x + (i / (chart.labels.length - 1)) * plot.w;
      const y = plot.y + plot.h - ((value - min) / range) * plot.h;
      return { x, y, value };
    });
    const visibleSegments = Math.max(0, Math.min(points.length - 1, progress * (points.length - 1)));
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i += 1) {
      const segmentP = clamp(visibleSegments - (i - 1));
      if (segmentP <= 0) break;
      const prev = points[i - 1];
      const next = points[i];
      const x = prev.x + (next.x - prev.x) * segmentP;
      const y = prev.y + (next.y - prev.y) * segmentP;
      d += ` L ${x} ${y}`;
    }
    body += `<path d="${d}" fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`;
    points.forEach((point, i) => {
      const pointP = ease(clamp(progress * points.length - i));
      if (pointP <= 0) return;
      body += `<circle cx="${point.x}" cy="${point.y}" r="${8 + 3 * pointP}" fill="${color}" opacity="${pointP}"/>`;
      if (progress > 0.83) {
        body += `<text x="${point.x}" y="${point.y - 20}" text-anchor="middle" fill="#10251e" font-family="Arial" font-size="24" font-weight="700">${escapeXml(String(point.value))}</text>`;
      }
    });
  });
  return body;
}

function renderBarChart(chart, progress) {
  const plot = { x: 160, y: 215, w: 1450, h: 540 };
  const series = chart.series;
  const all = series.flatMap((s) => s.data);
  const max = Math.max(...all, 1) * 1.14;
  const min = Math.min(0, ...all);
  const range = max - min || 1;
  let body = chartFrame(plot);
  const groupW = plot.w / chart.labels.length;
  const barW = (groupW * 0.66) / series.length;
  chart.labels.forEach((label, i) => {
    const groupX = plot.x + i * groupW + groupW * 0.17;
    series.forEach((s, sIndex) => {
      const value = s.data[i];
      if (value === undefined) return;
      const order = i * series.length + sIndex;
      const barP = ease(clamp(progress * chart.labels.length * series.length - order * 0.55));
      const x = groupX + sIndex * barW;
      const zeroY = plot.y + plot.h - ((0 - min) / range) * plot.h;
      const y = plot.y + plot.h - ((value - min) / range) * plot.h;
      const h = Math.abs(zeroY - y) * barP;
      const drawY = value >= 0 ? zeroY - h : zeroY;
      const color = s.color || (value >= 0 ? "#d9a63a" : "#b65c43");
      body += `<rect x="${x}" y="${drawY}" width="${barW * 0.82}" height="${h}" rx="10" fill="${color}"/>`;
      if (barP > 0.75) body += `<text x="${x + (barW * 0.82) / 2}" y="${drawY - 16}" text-anchor="middle" fill="#10251e" font-family="Arial" font-size="24" font-weight="700">${value}</text>`;
    });
    body += textBlock(label, groupX - 40, plot.y + plot.h + 50, 22, groupW + 40, "#53665e", 1.12);
  });
  return body;
}

// Positions every node from its own `rank` (see reference/interactive-blocks.md:
// nodes[].rank is required on every graph block) instead of a hardcoded
// per-article id->coordinate map, so this renders any graph, any node count,
// any number of ranks — not just the specific 6-node/4-rank graph this scene
// was originally built against.
function layoutGraph(graph) {
  const ranks = {};
  for (const node of graph.nodes) {
    const r = node.rank ?? 0;
    (ranks[r] ||= []).push(node);
  }
  const rankKeys = Object.keys(ranks).map(Number).sort((a, b) => a - b);
  const top = 230;
  const bottom = 950;
  const rowH = rankKeys.length > 1 ? (bottom - top) / (rankKeys.length - 1) : 0;
  const boxH = Math.max(64, Math.min(102, rowH - 26 || 102));
  const left = 130;
  const right = 1790;
  const pos = {};
  rankKeys.forEach((r, ri) => {
    const nodesInRank = ranks[r];
    const colW = (right - left) / nodesInRank.length;
    const boxW = Math.max(210, Math.min(330, colW - 40));
    const y = rankKeys.length > 1 ? top + rowH * ri : top;
    nodesInRank.forEach((node, ci) => {
      const cx = left + colW * ci + colW / 2;
      pos[node.id] = { x: cx - boxW / 2, y, w: boxW, h: boxH };
    });
  });
  return pos;
}

function renderGraphScene(scene, t, p, duration) {
  const graph = scene.graph;
  const layout = layoutGraph(graph);
  const edges = graph.edges.map((e, i) => ({ ...e, showAt: 1.7 + i * 0.55 }));
  const nodes = graph.nodes.map((n, i) => ({ ...n, showAt: i < 3 ? 0.45 + i * 0.35 : 1.5 + i * 0.3 }));
  const calloutWidth = Math.min(1700, 60 + String(scene.callout || "").length * 14);
  let body = `${textBlock(scene.title || "How This Connects", 86, 128, 46, 1600, "#10251e", 1.08)}`;
  for (const edge of edges) {
    const a = layout[edge.from];
    const b = layout[edge.to];
    const ep = ease(clamp((t - edge.showAt) / 0.7));
    if (!a || !b || ep <= 0) continue;
    const color = edge.evidence === "verified" ? "#2f7c59" : edge.evidence === "estimated" ? "#d9a63a" : "#e07856";
    const ax = a.x + a.w / 2;
    const ay = a.y + a.h;
    const bx = b.x + b.w / 2;
    const by = b.y;
    const x2 = ax + (bx - ax) * ep;
    const y2 = ay + (by - ay) * ep;
    body += `<path d="M${ax} ${ay} C${ax} ${ay + 60}, ${bx} ${by - 60}, ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${edge.evidence === "hypothesis" ? "14 12" : "none"}"/>`;
    if (ep > 0.2) {
      const dotP = (t * 0.6) % 1;
      const dx = ax + (bx - ax) * dotP;
      const dy = ay + (by - ay) * dotP;
      body += `<circle cx="${dx}" cy="${dy}" r="7" fill="${color}" opacity="0.8"/>`;
    }
  }
  for (const node of nodes) {
    const np = ease(clamp((t - node.showAt) / 0.45));
    if (np <= 0) continue;
    const box = layout[node.id];
    if (!box) continue;
    const y = box.y + (1 - np) * 20;
    const fill = node.output ? "#184f3b" : "#fffaf0";
    const text = node.output ? "#fffaf0" : "#10251e";
    const fontSize = Math.max(15, Math.round(box.h * 0.185));
    body += `<g opacity="${np}" transform="translate(${box.x},${y}) scale(${0.92 + np * 0.08})">
      <rect width="${box.w}" height="${box.h}" rx="16" fill="${fill}" stroke="#9fb3a7" stroke-width="3"/>
      ${textBlock(cleanNode(node.label), 16, Math.round(box.h * 0.36), fontSize, box.w - 26, text, 1.05)}
    </g>`;
  }
  body += graphCallout(scene.callout, 86, 166, calloutWidth, ease(clamp((t - duration + 2.5) / 0.7)));
  return body;
}

function chartFrame(plot) {
  let body = `<rect x="${plot.x}" y="${plot.y}" width="${plot.w}" height="${plot.h}" rx="18" fill="#fffaf0" stroke="#d7ded8" stroke-width="3"/>`;
  for (let i = 1; i < 4; i += 1) {
    const y = plot.y + (plot.h / 4) * i;
    body += `<line x1="${plot.x + 28}" y1="${y}" x2="${plot.x + plot.w - 28}" y2="${y}" stroke="#d7ded8" stroke-width="2"/>`;
  }
  body += `<line x1="${plot.x + 45}" y1="${plot.y + plot.h - 45}" x2="${plot.x + plot.w - 45}" y2="${plot.y + plot.h - 45}" stroke="#9fb3a7" stroke-width="4"/>`;
  return body;
}

function renderLegend(chart) {
  return chart.series
    .map((series, i) => {
      const color = series.color || ["#437aa5", "#d9a63a", "#2f7c59"][i % 3];
      return `<g transform="translate(${86 + i * 460},850)">
        <rect width="30" height="22" rx="5" fill="${color}"/>
        <text x="44" y="22" fill="#10251e" font-family="Arial" font-size="24">${escapeXml(series.name)}</text>
      </g>`;
    })
    .join("");
}

function sourceFooter(source) {
  return `<text x="86" y="1046" fill="#66776f" font-family="Arial" font-size="20">${escapeXml(compactSource(source))}</text>`;
}

function pill(text, x, y, width, fill, color, opacity = 1) {
  const h = 76;
  const p = clamp(opacity);
  return `<g opacity="${p}" transform="translate(${x},${y + (1 - p) * 18})">
    <rect width="${width}" height="${h}" rx="22" fill="${fill}"/>
    <text x="34" y="49" fill="${color}" font-family="Arial" font-size="31" font-weight="700">${escapeXml(text)}</text>
  </g>`;
}

function graphCallout(text, x, y, width, opacity = 1) {
  const p = clamp(opacity);
  return `<g opacity="${p}" transform="translate(${x},${y + (1 - p) * 14})">
    <rect width="${width}" height="56" rx="18" fill="#184f3b"/>
    <text x="28" y="38" fill="#fffaf0" font-family="Arial" font-size="27" font-weight="700">${escapeXml(text)}</text>
  </g>`;
}

function textBlock(text, x, y, size, maxWidth, color, lineHeight = 1.14) {
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
  return `<text x="${x}" y="${y}" fill="${color}" font-family="Arial" font-size="${size}" font-weight="700">${lines
    .slice(0, 5)
    .map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : size * lineHeight}">${escapeXml(line)}</tspan>`)
    .join("")}</text>`;
}

function cleanNode(label) {
  return String(label).replace(/\n/g, " ");
}

function shortEdge(label) {
  return String(label || "")
    .replace("ERS: ", "")
    .replace("FC SEMO: ", "")
    .replace("Commodity-level causation not yet provable", "Causation still unproven");
}

function compactSource(source = "") {
  const compact = source.replace(/\s+/g, " ");
  if (compact.startsWith("Farm Credit Southeast Missouri, Q1 2026 and Q2 2026")) {
    return "Source: Farm Credit Southeast Missouri Q1/Q2 2026 stockholder reports; period-end figures from association filings.";
  }
  if (compact.startsWith("Farm Credit Southeast Missouri, 2025 Annual Report")) {
    return "Source: Farm Credit Southeast Missouri 2025 Annual Report, five-year financial summary.";
  }
  if (compact.startsWith("USDA ERS Farm Sector Income Forecast")) {
    return "Source: USDA ERS Farm Sector Income Forecast, Sep 3 2026; national figures, not SEMO-specific.";
  }
  return compact.length > 104 ? `${compact.slice(0, 101)}...` : compact;
}

function generateMusicBed(file, duration) {
  run("ffmpeg", [
    "-y",
    "-f",
    "lavfi",
    "-i",
    `aevalsrc=0.18*sin(2*PI*55*t)+0.08*sin(2*PI*110*t)+0.035*sin(2*PI*220*t):s=44100:d=${duration}`,
    "-af",
    "afade=t=in:st=0:d=1.5,afade=t=out:st=" + Math.max(0, duration - 2).toFixed(2) + ":d=2",
    file,
  ]);
}

function generateStinger(file, type, duration) {
  const expr =
    type === "outro"
      ? `0.22*sin(2*PI*82*t)*exp(-0.35*t)+0.13*sin(2*PI*164*t)+0.07*sin(2*PI*328*t)`
      : `0.28*sin(2*PI*(70+38*t)*t)+0.16*sin(2*PI*140*t)+0.09*sin(2*PI*280*t)`;
  run("ffmpeg", [
    "-y",
    "-f",
    "lavfi",
    "-i",
    `aevalsrc=${expr}:s=44100:d=${duration}`,
    "-af",
    `afade=t=in:st=0:d=0.08,afade=t=out:st=${Math.max(0, duration - 0.45).toFixed(2)}:d=0.45`,
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

function defaultInstructions() {
  return [
    "You are Kai, the female narrator for an AutoNateAI agricultural systems explainer.",
    "Speak with a warm, confident, culturally fluent urban-professional cadence.",
    "Keep it polished and credible, like a sharp business briefing with a little conversational rhythm.",
    "Use light professional slang only where it naturally lands, such as 'here is the play', without sounding forced.",
    "Be entertaining, informative, and precise. Leave small pauses after key numbers so on-screen callouts can land.",
  ].join(" ");
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
  if (result.status !== 0) {
    fail(result.stderr || result.stdout || `${command} failed`);
  }
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
