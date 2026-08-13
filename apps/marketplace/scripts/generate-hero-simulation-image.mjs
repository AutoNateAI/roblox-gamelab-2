import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/assets/landing");

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set in the environment.");
}

// One-off replacement for the homepage hero background. Same dark/amber
// tech-editorial style as generate-landing-images.mjs, but this one departs
// from the site's usual "no people" convention on purpose: it needs to show
// builders at work simulating a population, not just an abstract diagram.
// Figures stay silhouetted/from-behind, matching the "no identifiable faces"
// convention already used for live-builds-spotlight.jpg.
const STYLE =
  "Dark, cinematic, professional tech-editorial illustration style. Near-black background (#060a12), warm amber/gold accent glow (#f2b134), moody directional lighting, high detail, no readable text or logos anywhere in the image.";

const spec = {
  file: "hero-simulation.jpg",
  size: "1536x1024",
  prompt: `A photo-realistic wide shot of two young builders at a dark studio desk at night, seen from behind/side so no faces are identifiable, working together at glowing screens. One screen shows a network of small glowing amber circular persona/agent nodes connected by lines — a simulated population — with a few nodes highlighted as if being tested. The other screen shows a system architecture diagram (database, API, and agent nodes) mid-build. Warm amber accent lighting, shallow depth of field, focused and energetic mood. ${STYLE} No readable text on screens, no identifiable faces.`,
};

async function generateImage({ file, size, prompt }) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-image-2",
      prompt,
      size,
      n: 1,
    }),
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
  const outFile = path.join(outDir, file);
  await sharp(buffer).jpeg({ quality: 90 }).toFile(outFile);
  console.log(`  -> ${path.relative(process.cwd(), outFile)}`);
}

await mkdir(outDir, { recursive: true });
console.log("Generating homepage hero image with gpt-image-2...");
await generateImage(spec);
console.log("Done.");
