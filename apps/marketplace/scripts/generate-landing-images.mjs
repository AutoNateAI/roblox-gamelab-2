import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/assets/landing");

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set in the environment.");
}

const STYLE =
  "Dark, cinematic, professional tech-editorial illustration style. Near-black background (#060a12), warm amber/gold accent glow (#f2b134), moody directional lighting, high detail, no readable text or logos anywhere in the image.";

const images = [
  {
    file: "hero-bg.jpg",
    size: "1536x1024",
    prompt: `An abstract wide illustration of a software system architecture: glowing amber network nodes and connection lines forming a diagram of a database, an API layer, and an AI agent, set against a near-black background with a subtle blueprint and circuit-board texture. ${STYLE} No people.`,
  },
  {
    file: "what-they-build.jpg",
    size: "1536x1024",
    prompt: `A photo-realistic close-up of a developer's dark desk at night: a laptop screen glowing with a system architecture diagram (database, API, and AI agent nodes connected by lines) next to a second monitor showing a dark-themed code editor. ${STYLE} Shallow depth of field. No visible faces, no readable text on screens.`,
  },
  {
    file: "design-build-ship.jpg",
    size: "1536x1024",
    prompt: `A photo-realistic wide shot from behind/side of a focused developer at a multi-monitor desk setup in a dark room: one screen shows a live system architecture diagram being drawn, another shows code. ${STYLE} Evening atmosphere, cinematic lighting. No visible face, no readable text on screens.`,
  },
  {
    file: "live-builds-spotlight.jpg",
    size: "1536x1024",
    prompt: `A photo-realistic wide shot of a small team on a screen-share video call collaboratively building software: a shared screen shows a live system diagram and a code editor side by side. ${STYLE} Energetic, focused mood. No readable text on screens, no identifiable faces.`,
  },
];

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
console.log(`Generating ${images.length} landing page images with gpt-image-2 (in parallel)...`);

await Promise.all(images.map((spec) => generateImage(spec)));

console.log("Done.");
