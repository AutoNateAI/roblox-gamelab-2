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

// Same navy/gold meme-energy style as scripts/generate-lab-thumbnails.mjs,
// applied to the 4 free-course thumbnails so they flow with the rest of the
// site instead of the old Sikeston-era photography. Nate and Kai are
// fictional narrative characters (the courses' framing device), rendered as
// simple glowing gold silhouettes — never a real photo/likeness — same
// "no readable text, no real faces" rule as every other generated image.
const STYLE =
  "Bold, punchy, meme-inspired digital illustration, exaggerated reaction-image energy, slightly humorous. Deep navy blue background (#10213f), warm metallic gold accent lighting and highlights (#c9a227), crisp white line work, high contrast, dramatic rim lighting, clean vector-ish shading. Two simple glowing gold silhouette characters (no facial detail, no real-person likeness) represent the two leads. Wide 3:2 composition. No readable text, no logos, no real faces/photoreal people anywhere in the image.";

const items = [
  {
    // Overwrites the existing file at this exact path — no data.mjs changes needed.
    file: "tutorial-pack-intro-to-javascript-for-beginners.jpg",
    prompt: `Two glowing gold silhouette characters fist-bumping over a small round cafe table in a cozy backroom meetup — one holding a glowing laptop, one holding a rolled-up napkin sketch — a single warm overhead bulb, "we're starting something" energy. ${STYLE}`,
  },
  {
    file: "tutorial-pack-prompt-and-context-engineering.jpg",
    prompt: `A glowing gold silhouette character confidently talking into the ear of a glowing gold robot, the robot visibly overwhelmed with tiny question marks and static sparks above its head, a second silhouette character face-palming in the background. ${STYLE}`,
  },
  {
    file: "tutorial-pack-relational-databases-and-graphs.jpg",
    prompt: `Two glowing gold silhouette characters in front of a chaotic wall of scattered sticky notes and tangled string, one raising a hand triumphantly as the sticky notes reorganize mid-air into a neat glowing gold grid of connected tables and graph nodes. ${STYLE}`,
  },
  {
    file: "tutorial-pack-civics-and-agentic-ai.jpg",
    prompt: `Two glowing gold silhouette characters standing before a tall glowing gold city-hall-shaped building silhouette, one holding an unrolled glowing scroll, a small lightbulb-and-gear icon floating above their heads as they sketch a system diagram together on a floating glowing panel. ${STYLE}`,
  },
];

async function generateImage({ file, prompt }) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-image-2",
      prompt,
      size: "1536x1024",
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
console.log(`Generating ${items.length} course thumbnails with gpt-image-2 (in parallel)...`);

await Promise.all(items.map((spec) => generateImage(spec)));

console.log("Done.");
