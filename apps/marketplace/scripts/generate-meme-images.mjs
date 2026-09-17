// Generates the inline "meme-style" contextual images the meme-visual-pass
// skill scatters through a finished research article's Markdown body — a
// deliberately different register from scripts/generate-og-hero-images.mjs's
// photo-realistic, text-baked-in OG cards. Same model/endpoint, different
// aesthetic (bold 2D illustration, not photo-real), different aspect (square,
// not widescreen), and a dynamic job list read from a manifest file instead
// of a hardcoded array, since the prompts are written per-article by whoever
// (Claude, following the skill) has just read that article.
//
// Usage:
//   node scripts/generate-meme-images.mjs --manifest <path-to-json>
//
// Manifest shape: an array of { file, prompt } objects, e.g.
//   [{ "file": "meme/some-slug-01.jpg", "prompt": "..." }, ...]
// `file` is relative to public/assets/ (mirrors the og/<slug>.jpg convention
// — these land at public/assets/meme/<slug>-<NN>.jpg).
//
// Generates every job in parallel (Promise.allSettled, so one bad prompt
// doesn't take down the rest of the batch) and reports per-job success/failure.
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { loadRootEnv } from "../src/env.mjs";

await loadRootEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../public");

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set in the environment.");
}

const manifestFlagIndex = process.argv.indexOf("--manifest");
const manifestPath = manifestFlagIndex !== -1 ? process.argv[manifestFlagIndex + 1] : null;
if (!manifestPath) {
  throw new Error("Usage: node scripts/generate-meme-images.mjs --manifest <path-to-json>");
}

const jobs = JSON.parse(await readFile(manifestPath, "utf8"));
if (!Array.isArray(jobs) || !jobs.length) {
  throw new Error(`Manifest at ${manifestPath} must be a non-empty JSON array of { file, prompt }.`);
}
for (const job of jobs) {
  if (!job.file || !job.prompt) {
    throw new Error(`Manifest entry missing "file" or "prompt": ${JSON.stringify(job)}`);
  }
}

const GEN_SIZE = "1024x1024";
// gpt-image-2.5-flare — same model as generate-og-hero-images.mjs (see that
// file for the released-2026-09-08 confirmation). "medium" here, not "high":
// this is 9+ images per article instead of 1 per page, and a meme doesn't
// need max fidelity to land — bump to "high" per-job by editing the
// manifest's prompts to note it if a specific image is worth the spend.
const MODEL = "gpt-image-2.5-flare";
const QUALITY = "medium";

console.log(`Generating ${jobs.length} meme image(s) with ${MODEL} (${QUALITY}, ${GEN_SIZE}, in parallel)...`);

const results = await Promise.allSettled(
  jobs.map(async ({ file, prompt }) => {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model: MODEL, prompt, size: GEN_SIZE, quality: QUALITY, n: 1 }),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(`${file}: OpenAI API error ${response.status} — ${JSON.stringify(payload)}`);
    }

    const b64 = payload.data?.[0]?.b64_json;
    if (!b64) {
      throw new Error(`${file}: no image data in response — ${JSON.stringify(payload)}`);
    }

    const buffer = Buffer.from(b64, "base64");
    const outFile = path.join(publicDir, "assets", file);
    await mkdir(path.dirname(outFile), { recursive: true });
    await sharp(buffer).jpeg({ quality: 88 }).toFile(outFile);
    console.log(`  -> public/assets/${file}`);
    return file;
  }),
);

const failures = results.filter((r) => r.status === "rejected");
results.forEach((r, i) => {
  if (r.status === "rejected") console.error(`  FAILED ${jobs[i].file}: ${r.reason?.message || r.reason}`);
});

console.log(`Done. ${results.length - failures.length}/${results.length} succeeded.`);
if (failures.length) process.exitCode = 1;
