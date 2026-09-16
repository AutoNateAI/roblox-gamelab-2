// Generates the "YouTube-thumbnail style" OG cards for the highest-traffic
// pages — home and the Research & Case Studies hub (main hub + its four
// sub-hubs: Regions, Organizations, Systems, Open Questions/Investigations).
//
// Different approach from scripts/generate-og-images.mjs: instead of
// compositing a title as an SVG text overlay on top of a stock photo, this
// asks gpt-image-2 to bake the headline directly into the generated image —
// bold display type, click-worthy but not clickbait, matching the site's
// navy/gold "Technical Editorial" identity. No separate text-overlay pass.
//
// gpt-image-2 doesn't offer a native 1200x630 (OG) aspect ratio, so each
// image is generated at 1536x1024 (its widest landscape option) with the
// headline kept inside the central ~70% vertically, then center-cropped +
// resized to 1200x630 with sharp.
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { loadRootEnv } from "../src/env.mjs";

await loadRootEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../public");
const outDir = path.join(publicDir, "assets/og");

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set in the environment.");
}

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const GEN_SIZE = "1536x1024";

const STYLE =
  "Photo-realistic editorial photography, dark navy (#0e1a33) background environment with warm gold (#c9a227) accent light, cinematic and serious in tone — a research-lab-meets-agricultural-finance aesthetic, not corporate stock photography. Bold, clean, high-contrast sans-serif display type baked directly into the image as part of the scene (not a sticker or watermark), sized like a professional YouTube thumbnail headline — large, confidently readable at a glance, one strong focal point. Keep every word of the text, and the main subject, inside the central 70% of the frame vertically (leave a quiet margin top and bottom) so it survives a crop. No logos, no fabricated brand marks, no illegible or garbled text, no watermark, no border.";

const jobs = [
  {
    file: "og/default.jpg",
    prompt: `A wide editorial image for the homepage of an agricultural-economics research lab. Background: an aerial view of Mississippi River-basin farmland at dusk, geometric fields in gold and green, subtly blended into a dark navy panel. Large bold headline text reading "FARM COUNTRY RUNS ON NUMBERS. WE ACTUALLY READ THEM." with a smaller line beneath reading "AutoNateAI · Agricultural Economic Systems Intelligence Lab". ${STYLE}`,
  },
  {
    file: "og/research-and-case-studies.jpg",
    prompt: `A wide editorial image for a research hub page. Background: a researcher's desk with a county map, a ledger, and a coffee mug in warm light, fading into a dark navy panel with gold light. Large bold headline text reading "EVERY NUMBER SOURCED. EVERY GUESS CALLED OUT." with a smaller line beneath reading "AutoNateAI · Research & Case Studies". ${STYLE}`,
  },
  {
    file: "og/regions.jpg",
    prompt: `A wide editorial image for a page profiling U.S. farming regions. Background: an aerial patchwork of a river-delta farming region, winding river, geometric crop fields, fading into a dark navy panel with gold light. Large bold headline text reading "ONE REGION AT A TIME, ACTUALLY EXPLAINED" with a smaller line beneath reading "AutoNateAI · Regions". ${STYLE}`,
  },
  {
    file: "og/organizations.jpg",
    prompt: `A wide editorial image for a page profiling agricultural lenders and grain elevators. Background: a grain elevator and silos at golden hour with a grain truck, fading into a dark navy panel with gold light. Large bold headline text reading "THE LENDERS FARMERS TRUST, AUDITED IN PUBLIC" with a smaller line beneath reading "AutoNateAI · Organizations". ${STYLE}`,
  },
  {
    file: "og/systems.jpg",
    prompt: `A wide editorial image for a page explaining how agricultural business processes work step by step. Background: a combine harvester and a grain truck working a field at golden hour, fading into a dark navy panel with gold light. Large bold headline text reading "HOW A FARM LOAN ACTUALLY GETS APPROVED" with a smaller line beneath reading "AutoNateAI · Systems". ${STYLE}`,
  },
  {
    file: "og/investigations.jpg",
    prompt: `A wide editorial image for a page of open research questions. Background: a rice field mid-conversion to a soybean field, a sharp levee line dividing flooded and dry ground, fading into a dark navy panel with gold light. Large bold headline text reading "THE QUESTIONS WE HAVEN'T ANSWERED YET" with a smaller line beneath reading "AutoNateAI · Open Questions". ${STYLE}`,
  },
];

async function generateOne({ file, prompt }) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model: "gpt-image-2", prompt, size: GEN_SIZE, n: 1 }),
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

  // Center-crop the 1536x1024 (1.5:1) generation down to the 1200x630
  // (~1.905:1) OG aspect ratio, then resize to the exact target dimensions.
  const meta = await sharp(buffer).metadata();
  const srcWidth = meta.width || 1536;
  const srcHeight = meta.height || 1024;
  const targetCropHeight = Math.round(srcWidth / (OG_WIDTH / OG_HEIGHT));
  const cropHeight = Math.min(targetCropHeight, srcHeight);
  const top = Math.max(0, Math.round((srcHeight - cropHeight) / 2));

  await sharp(buffer)
    .extract({ left: 0, top, width: srcWidth, height: cropHeight })
    .resize(OG_WIDTH, OG_HEIGHT)
    .jpeg({ quality: 90 })
    .toFile(outFile);

  console.log(`  -> ${path.relative(process.cwd(), outFile)}`);
}

const filter = process.env.ONLY;
const selected = filter ? jobs.filter((job) => job.file.includes(filter)) : jobs;

console.log(`Generating ${selected.length} OG hero image${selected.length === 1 ? "" : "s"} with gpt-image-2 (text baked in, in parallel)...`);

await Promise.all(selected.map((job) => generateOne(job)));

console.log("Done.");
