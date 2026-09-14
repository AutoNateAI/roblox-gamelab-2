// Generates hero/thumbnail art for the Agricultural Economic Systems
// Intelligence Lab redesign (Regions, Organizations, Systems,
// Investigations, home, and The Lab landing). Mirrors the pattern in
// generate-site-images.mjs / generate-lab-thumbnails.mjs: OpenAI Images API,
// model gpt-image-2, saved as JPEG via sharp.
//
// Style is tuned to the new "Technical Editorial" palette (see
// public/styles.css :root tokens and stitch_autonateai_research_lab_redesign/)
// instead of the old dark-red brand style used elsewhere in this repo:
// luminous ivory/photo-realistic agricultural and financial-editorial
// imagery, emerald and river-blue accent light, no readable text or logos.
//
// Organization-profile imagery is deliberately generic/editorial — never a
// fabricated logo or a fake "photo of their office" for the real company
// (Farm Credit Southeast Missouri) profiled on /organizations.
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../public");

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set in the environment.");
}

const STYLE =
  "Photo-realistic, editorial, technical-scientific-journal style. Luminous ivory and soft daylight tones, emerald-green and river-blue accent light, crisp detail, shallow depth of field where appropriate. No readable text, no logos, no brand marks, no people's faces close-up.";

const images = [
  {
    file: "ag-lab/home-hero.jpg",
    size: "1536x1024",
    prompt: `A wide aerial photo-realistic shot of flat Mississippi River-basin farmland at the confluence of a highway, a rail line, and a river barge terminal, geometric field parcels in soybean-green and harvested-gold, soft morning light. ${STYLE}`,
  },
  {
    file: "ag-lab/regions-hero.jpg",
    size: "1536x1024",
    prompt: `A wide aerial photo-realistic shot of a U.S. agricultural river-delta landscape, patchwork of crop fields in varying greens and golds, a winding river, small farm roads, soft daylight. ${STYLE}`,
  },
  {
    file: "ag-lab/organizations-hero.jpg",
    size: "1536x1024",
    prompt: `A photo-realistic close-up of a clean modern financial-office desk scene: a stack of neutral folders, a calculator, a pen, and an out-of-focus window overlooking distant farmland, warm daylight, no readable text or logos on any object. ${STYLE}`,
  },
  {
    file: "ag-lab/systems-hero.jpg",
    size: "1536x1024",
    prompt: `An abstract photo-realistic illustration of a glowing emerald-green network diagram of connected nodes overlaid faintly on a blurred grain elevator and silo skyline at dusk, technical and editorial. ${STYLE}`,
  },
  {
    file: "ag-lab/investigations-hero.jpg",
    size: "1536x1024",
    prompt: `A photo-realistic wide aerial shot of a rice field being converted to a soybean field mid-transition, visible flood-irrigation levee lines next to dry row-crop ground, soft overcast light, documentary style. ${STYLE}`,
  },
  {
    file: "ag-lab/lab-hero.jpg",
    size: "1536x1024",
    prompt: `A photo-realistic close-up of a clean researcher's desk with a laptop showing a faint abstract network-graph diagram, a notebook, and a coffee cup, soft window light, calm and analytical mood, no readable text. ${STYLE}`,
  },
  {
    file: "regions/southeast-missouri.jpg",
    size: "1536x1024",
    prompt: `A photo-realistic aerial shot of Southeast Missouri Bootheel farmland near the Mississippi River: flat geometric fields of soybeans, cotton, and rice paddies, a levee line, a grain elevator in the distance, warm late-afternoon light. ${STYLE}`,
  },
  {
    file: "organizations/farm-credit-southeast-missouri.jpg",
    size: "1536x1024",
    prompt: `A photo-realistic wide shot of a modest brick rural financial-office building exterior with a small parking lot, set against flat farmland in the background, generic and unbranded, midday light, documentary style — no signage, no logos, no readable text anywhere. ${STYLE}`,
  },
  {
    file: "systems/agricultural-finance-and-capital.jpg",
    size: "1536x1024",
    prompt: `An abstract photo-realistic illustration of a glowing emerald-and-river-blue flow diagram — circles connected by directional lines — overlaid subtly on a blurred stack of paper loan documents and a calculator on a wooden desk. ${STYLE}`,
  },
  {
    file: "investigations/bootheel-rice-to-soybean-pivot.jpg",
    size: "1536x1024",
    prompt: `A photo-realistic aerial documentary shot showing a sharp visual boundary between a flooded rice paddy on one side and a dry green soybean field on the other, straight levee line dividing them, soft daylight. ${STYLE}`,
  },
];

async function generateImage({ file, size, prompt }) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model: "gpt-image-2", prompt, size, n: 1 }),
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
  await sharp(buffer).jpeg({ quality: 90 }).toFile(outFile);
  console.log(`  -> ${path.relative(process.cwd(), outFile)}`);
}

// Optional filter for regenerating a subset: ONLY="regions" node
// scripts/generate-ag-lab-images.mjs regenerates just files whose path
// includes that substring.
const filter = process.env.ONLY;
const jobs = filter ? images.filter((spec) => spec.file.includes(filter)) : images;

console.log(`Generating ${jobs.length} agricultural-lab image${jobs.length === 1 ? "" : "s"} with gpt-image-2 (in parallel)...`);

await Promise.all(jobs.map((spec) => generateImage(spec)));

console.log("Done.");
