import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(__dirname, "..");

const args = parseArgs(process.argv.slice(2));
const runArg = args.run || args._[0];
if (!runArg) {
  fail("Usage: node scripts/generate-ag-lab-narration.mjs --run lab-assets/<slug>");
}

const runDir = path.resolve(appDir, runArg);
const manifestFile = path.join(runDir, "manifest.json");
const videoFile = args.video ? path.resolve(appDir, args.video) : path.join(runDir, "video", "preview.mp4");

if (!existsSync(manifestFile)) fail(`Missing manifest: ${manifestFile}`);
if (!existsSync(videoFile)) fail(`Missing video: ${videoFile}`);
if (!process.env.OPENAI_API_KEY) fail("OPENAI_API_KEY is not set.");

const manifest = JSON.parse(await readFile(manifestFile, "utf8"));
const narrationDir = path.join(runDir, "narration");
await mkdir(narrationDir, { recursive: true });

const script = args.script ? await readFile(path.resolve(appDir, args.script), "utf8") : buildDefaultScript(manifest);
const scriptFile = path.join(narrationDir, "script.txt");
const instructions = args.instructions || defaultInstructions();
const metadata = {
  generatedAt: new Date().toISOString(),
  model: process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts",
  voice: process.env.OPENAI_TTS_KAI_VOICE || args.voice || "marin",
  instructions,
  script,
};

await writeFile(scriptFile, script);

const wavFile = path.join(narrationDir, "voiceover.wav");
const previousMetadata = existsSync(path.join(narrationDir, "metadata.json"))
  ? JSON.parse(await readFile(path.join(narrationDir, "metadata.json"), "utf8"))
  : null;
const cacheHit =
  existsSync(wavFile) &&
  previousMetadata?.model === metadata.model &&
  previousMetadata?.voice === metadata.voice &&
  previousMetadata?.instructions === metadata.instructions &&
  previousMetadata?.script === metadata.script;

if (!cacheHit) {
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: metadata.model,
      voice: metadata.voice,
      input: script,
      instructions,
      response_format: "wav",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    fail(`OpenAI Speech API failed: ${response.status} ${errorText}`);
  }

  await writeFile(wavFile, Buffer.from(await response.arrayBuffer()));
}

await writeFile(path.join(narrationDir, "metadata.json"), `${JSON.stringify(metadata, null, 2)}\n`);

const narratedFile = path.join(runDir, "video", "preview-narrated.mp4");
const mux = spawnSync(
  "ffmpeg",
  [
    "-y",
    "-i",
    videoFile,
    "-i",
    wavFile,
    "-vf",
    "tpad=stop_mode=clone:stop_duration=90,format=yuv420p",
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
    "-shortest",
    narratedFile,
  ],
  { encoding: "utf8" },
);

if (mux.status !== 0) fail(mux.stderr || mux.stdout || "ffmpeg mux failed");

console.log(`Generated narration for ${manifest.title}`);
console.log(`  script: ${path.relative(process.cwd(), scriptFile)}`);
console.log(`  wav: ${path.relative(process.cwd(), wavFile)}`);
console.log(`  video: ${path.relative(process.cwd(), narratedFile)}`);

function buildDefaultScript(run) {
  return `Farm Credit Southeast Missouri is showing stress, and the signal is not subtle. Adversely classified loans moved from 4.7 percent to 7.3 percent in just six months. That is real pressure.

But here is the play: this is not just a lender story. Fuel, fertilizer, government payments, land values, and repayment capacity are all moving through the same system.

So when we map it, the question gets sharper. Where is the margin getting squeezed, and who controls the capital when producers need room to breathe? That is what the AutoNateAI Agricultural Systems Lab is built to see.`;
}

function defaultInstructions() {
  return [
    "You are Kai, the female narrator for an AutoNateAI agricultural systems explainer.",
    "Speak with a warm, confident, culturally fluent urban-professional cadence.",
    "Keep it polished and credible, like a sharp business briefing with a little conversational rhythm.",
    "Use light professional slang only where it naturally lands, such as 'here is the play', without sounding forced.",
    "Be entertaining, informative, and precise. Emphasize the numbers and the shift from article to system map.",
  ].join(" ");
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
    if (argv[i + 1] && !argv[i + 1].startsWith("--")) {
      parsed[key] = argv[++i];
    } else {
      parsed[key] = true;
    }
  }
  return parsed;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
