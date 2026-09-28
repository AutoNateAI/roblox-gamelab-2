// Operator OS image set (2026-09-28 repositioning). Same approach as
// scripts/generate-og-hero-images.mjs — gpt-image-2.5-flare bakes the
// headline into the image, generated at 1536x1024 and center-cropped to the
// 1200x630 OG ratio — but restyled for the Operator OS palette (forest-black
// + emerald, matching public/styles.css dark tokens) and operator/cockpit
// subject matter instead of farmland.
//
// Three kinds of jobs:
//   og/*.jpg              page-level OG cards (text baked in)
//   og/<article>.jpg      one per operatorArticles entry (text baked in) —
//                         doubles as the article card thumbnail
//   operator-os/*.jpg     text-free hero/section backgrounds, kept at 3:2
//
// ONLY="pricing,rank-500" node scripts/generate-operator-os-images.mjs
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { loadRootEnv } from "../src/env.mjs";
import { operatorArticles } from "../src/operator-os-data.mjs";

await loadRootEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../public");

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("OPENAI_API_KEY is not set in the environment.");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const GEN_SIZE = "1536x1024";
const MODEL = "gpt-image-2.5-flare";
const QUALITY = "high";

const STYLE =
  "Photo-realistic editorial photography with a cinematic, grounded tone — real small-business and trades environments, not glossy corporate stock. Dark forest-black (#050b08) background panel with emerald green (#34d399) accent light and subtle glowing emerald interface/graph linework where it fits the scene. Bold, clean, high-contrast white sans-serif display type baked directly into the image as part of the composition (not a sticker or watermark), sized like a professional YouTube thumbnail headline — large and readable at a glance, one or two key words in emerald. Keep every word of the text, and the main subject, inside the central 70% of the frame vertically (quiet margin top and bottom) so it survives a crop. No logos, no fabricated brand marks, no real product UIs, no illegible or garbled text, no watermark, no border.";

const BG_STYLE =
  "Photo-realistic editorial photography, cinematic and grounded, real small-business and trades environments. Dark, moody forest-black tones with emerald green (#34d399) accent light and subtle glowing emerald interface linework. Plenty of calm negative space on the left half for page text to sit over. Absolutely no text, no letters, no numbers, no logos, no watermark, no border, no readable screen content.";

const byline = (label) => `with a smaller line beneath reading "AutoNateAI · ${label}"`;

const jobs = [
  {
    file: "og/default.jpg",
    prompt: `A wide editorial image for the homepage of a company that installs conversational AI operating systems for small businesses. Background: a Black contractor in a work jacket standing in a tidy shop office, talking into a phone, while a large monitor behind them shows a clean dark operations cockpit with a glowing relationship graph and task columns. Large bold headline text reading "RUN YOUR BUSINESS BY TALKING TO IT." ${byline("The Operator OS")}. ${STYLE}`,
  },
  {
    file: "og/operator-os.jpg",
    prompt: `A wide editorial image explaining a system architecture. Background: a dark workspace where a phone showing a chat conversation, a structured database, and a wall-sized operations cockpit are connected by flowing emerald light lines into one system. Large bold headline text reading "CONVERSATION. MEMORY. COCKPIT. AGENTS." ${byline("How the Operator OS Works")}. ${STYLE}`,
  },
  {
    file: "og/pricing.jpg",
    prompt: `A wide editorial image for a pricing page. Background: a clean desk in a small business office with a signed one-page proposal, a pen, and a laptop showing a dark operations dashboard, warm practical light with emerald accents. Large bold headline text reading "WHAT AN OPERATOR OS COSTS" ${byline("Pricing")}. ${STYLE}`,
  },
  {
    file: "og/research-and-case-studies.jpg",
    prompt: `A wide editorial image for a research hub about how small businesses actually operate. Background: a whiteboard in a contractor's office covered in a hand-drawn workflow map — boxes and arrows from lead to quote to job to follow-up — with emerald glowing overlay lines tracing the flow. Large bold headline text reading "THE QUESTIONS OPERATORS ACTUALLY FEEL" ${byline("Research & Case Studies")}. ${STYLE}`,
  },
  {
    file: "og/about.jpg",
    prompt: `A wide editorial image for the about page of an AI systems architect. Background: a software engineer's workstation seen from behind the chair — no face visible — with a terminal on one screen and a dark operations cockpit showing a relationship graph on the other, late evening light. Large bold headline text reading "WE ARCHITECT IT. YOU OPERATE IT." ${byline("About Nathan Baker")}. ${STYLE}`,
  },
  {
    file: "og/work-with-us.jpg",
    prompt: `A wide editorial image for a discovery-call booking page. Background: two people at a small table mid-conversation over coffee, one pointing at a laptop showing a dark operations cockpit, hands and torsos only, no faces visible, warm cafe light. Large bold headline text reading "IS YOUR BUSINESS READY FOR AN OPERATOR OS?" ${byline("Book a Discovery Call")}. ${STYLE}`,
  },

  // Text-free backgrounds.
  { file: "operator-os/home-hero.jpg", bg: true, prompt: `A wide cinematic scene: a small trades business office at dawn — a work truck visible through the window, a desk with a laptop and a phone, and a wall monitor glowing with an abstract emerald relationship-graph visualization. ${BG_STYLE}` },
  { file: "operator-os/architecture-hero.jpg", bg: true, prompt: `A wide cinematic abstract scene: layers of translucent dark glass panels stacked in depth, each faintly glowing with emerald network nodes and connection lines, like a system architecture made physical. ${BG_STYLE}` },
  { file: "operator-os/pricing-hero.jpg", bg: true, prompt: `A wide cinematic scene: a quiet small-business office desk at golden hour with a notebook, a pen, and a closed laptop, soft emerald light from a monitor off to the side. ${BG_STYLE}` },
  { file: "operator-os/work-with-us-hero.jpg", bg: true, prompt: `A wide cinematic scene: a cozy coffee-shop corner table with two coffee cups and an open laptop, empty chairs, warm light and a faint emerald glow from the screen. ${BG_STYLE}` },
  { file: "operator-os/research-hero.jpg", bg: true, prompt: `A wide cinematic scene: a contractor's shop office whiteboard covered in abstract hand-drawn boxes and arrows (no readable words), a clipboard and a tape measure on the table in front. ${BG_STYLE}` },
  { file: "operator-os/operators-spotlight.jpg", bg: true, prompt: `A square-feeling cinematic portrait-style scene of a Black electrician in work clothes standing beside a service van, holding a phone and smiling slightly, face turned away from camera, evening light with emerald accent. ${BG_STYLE}` },

  ...operatorArticles.map((article) => ({
    file: `og/${article.slug}.jpg`,
    prompt: `A wide editorial image for an article asking "${article.question}" Background: ${article.ogScene}, fading into a dark forest-black panel with emerald light. Large bold headline text reading "${article.ogHeadline}" ${byline(`Operator Question ${String(article.n).padStart(2, "0")}`)}. ${STYLE}`,
  })),
];

async function generateOne({ file, prompt, bg }) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: MODEL, prompt, size: GEN_SIZE, quality: QUALITY, n: 1 }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(`${file}: OpenAI API error ${response.status} — ${JSON.stringify(payload)}`);
  const b64 = payload.data?.[0]?.b64_json;
  if (!b64) throw new Error(`${file}: no image data in response`);

  const buffer = Buffer.from(b64, "base64");
  const outFile = path.join(publicDir, "assets", file);
  await mkdir(path.dirname(outFile), { recursive: true });

  if (bg) {
    await sharp(buffer).resize(1536, 1024).jpeg({ quality: 84 }).toFile(outFile);
  } else {
    const meta = await sharp(buffer).metadata();
    const srcWidth = meta.width || 1536;
    const srcHeight = meta.height || 1024;
    const cropHeight = Math.min(Math.round(srcWidth / (OG_WIDTH / OG_HEIGHT)), srcHeight);
    const top = Math.max(0, Math.round((srcHeight - cropHeight) / 2));
    await sharp(buffer)
      .extract({ left: 0, top, width: srcWidth, height: cropHeight })
      .resize(OG_WIDTH, OG_HEIGHT)
      .jpeg({ quality: 90 })
      .toFile(outFile);
  }
  console.log(`  -> ${path.relative(process.cwd(), outFile)}`);
}

const filters = process.env.ONLY?.split(",").map((s) => s.trim()).filter(Boolean);
const selected = filters?.length ? jobs.filter((job) => filters.some((f) => job.file.includes(f))) : jobs;

console.log(`Generating ${selected.length} Operator OS image${selected.length === 1 ? "" : "s"} with ${MODEL}...`);

// Small concurrency pool rather than all-at-once so a rate limit doesn't
// fail the whole batch; failures are reported, not fatal.
const failures = [];
const queue = [...selected];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const job = queue.shift();
      try {
        await generateOne(job);
      } catch (error) {
        failures.push(job.file);
        console.error(`  !! ${error.message.slice(0, 300)}`);
      }
    }
  }),
);

console.log(failures.length ? `Done with ${failures.length} failure(s): ${failures.join(", ")}` : "Done.");
