// Generates the "YouTube-thumbnail style" OG cards for the highest-traffic
// pages — home, the Research & Case Studies hub (main hub + its four
// sub-hubs: Regions, Organizations, Systems, Open Questions/Investigations),
// and every individual region/organization/system/investigation detail page
// (each gets its own image, relevant to that specific page's question —
// not a shared category card).
//
// Different approach from scripts/generate-og-images.mjs: instead of
// compositing a title as an SVG text overlay on top of a stock photo, this
// asks gpt-image-2.5-flare to bake the headline directly into the generated
// image — bold display type, click-worthy but not clickbait, matching the
// site's navy/gold "Technical Editorial" identity. No separate text-overlay
// pass.
//
// gpt-image-2.5-flare doesn't offer a native 1200x630 (OG) aspect ratio, so each
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
// gpt-image-2.5-flare (released 2026-09-08): same /v1/images/generations
// endpoint and 1536x1024 landscape size as gpt-image-2, but sharper detail
// and ~4x fewer output tokens at "high" quality (was priced per-token same
// as gpt-image-2, so this is a real cost drop, not just a quality bump).
// Flare (not Sunburst) because this is one-shot batch generation, not
// iterative image editing — Sunburst is for editing-precision workflows.
const MODEL = "gpt-image-2.5-flare";
const QUALITY = "high";

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

  // --- Per-article images: one per region/organization/system/investigation
  // detail page, each relevant to that specific page's question — not a
  // shared category card like the six above.
  {
    file: "og/bootheel-rice-to-soybean-pivot.jpg",
    prompt: `A wide editorial image about a real agricultural-economics finding. Background: an aerial documentary shot showing a sharp visual boundary between a flooded rice paddy on one side and a dry green soybean field on the other, a straight levee line dividing them, soft daylight, fading into a dark navy panel with gold light. Large bold headline text reading "RICE JUST GOT A BIGGER SAFETY NET. FARMERS ARE PLANTING LESS OF IT." with a smaller line beneath reading "AutoNateAI · Bootheel Rice-to-Soybean Pivot". ${STYLE}`,
  },
  {
    file: "og/farm-credit-semo-crop-credit-stress-2026.jpg",
    prompt: `A wide editorial image about a real agricultural-lending finding. Background: a close-up documentary shot of a farm loan ledger book and a quarterly financial statement on a wooden desk, a red pen resting on a highlighted line of numbers, a blurred green Southeast Missouri farm field visible through a window behind, warm natural light, no visible faces, fading into a dark navy panel with gold light. Large bold headline text reading "ADVERSELY CLASSIFIED LOANS JUST JUMPED 55%. HERE'S WHY." with a smaller line beneath reading "AutoNateAI · Farm Credit SEMO Crop-Credit Stress". ${STYLE}`,
  },
  {
    file: "og/southeast-missouri-biomanufacturing-feasibility.jpg",
    prompt: `A wide editorial image about a real agricultural-economics feasibility question. Background: a documentary-style split composition — on the left, a stainless-steel industrial fermentation tank and pipework inside a modern bioprocessing facility under cool working light; blended on the right into a Southeast Missouri Bootheel corn field with a grain elevator on the horizon at golden hour, the two scenes fading into one another, then into a dark navy panel with gold light. Large bold headline text reading "COULD THE BOOTHEEL BECOME A BIOMANUFACTURING REGION?" with a smaller line beneath reading "AutoNateAI · Southeast Missouri Biomanufacturing Feasibility". No logos, no readable equipment signage. ${STYLE}`,
  },
  {
    file: "og/elevator-harvest-bottleneck.jpg",
    prompt: `A wide editorial image about an open research question. Background: a line of grain trucks queued on a gravel road waiting to unload at a busy grain elevator during harvest, dust in the air, late-afternoon light, fading into a dark navy panel with gold light. Large bold headline text reading "WHY DO THE SAME ELEVATORS CHOKE EVERY HARVEST?" with a smaller line beneath reading "AutoNateAI · Open Question, Coming Soon". ${STYLE}`,
  },
  {
    file: "og/southeast-missouri.jpg",
    prompt: `A wide editorial image about a U.S. farming region. Background: an aerial shot of Southeast Missouri Bootheel farmland near the Mississippi River — flat geometric fields of soybeans, cotton, and rice paddies, a levee line, a grain elevator in the distance, warm late-afternoon light, fading into a dark navy panel with gold light. Large bold headline text reading "WHAT'S ACTUALLY HAPPENING TO FARM COUNTRY IN THE BOOTHEEL?" with a smaller line beneath reading "AutoNateAI · Southeast Missouri, Coming Soon". ${STYLE}`,
  },
  {
    file: "og/central-iowa-corn-belt.jpg",
    prompt: `A wide editorial image about a U.S. farming region. Background: an aerial shot of classic Iowa Corn Belt farmland — vast geometric cornfields in late-summer green, a farmstead with grain bins and a red barn, gravel section roads, soft midday light, fading into a dark navy panel with gold light. Large bold headline text reading "WHAT KEEPS THE IOWA CORN BELT RUNNING?" with a smaller line beneath reading "AutoNateAI · Central Iowa Corn Belt, Coming Soon". ${STYLE}`,
  },
  {
    file: "og/farm-credit-southeast-missouri.jpg",
    prompt: `A wide editorial image about an agricultural lender. Background: a modest brick rural financial-office building exterior with a small parking lot, set against flat farmland, generic and unbranded, midday light, fading into a dark navy panel with gold light. Large bold headline text reading "WHO'S ACTUALLY FINANCING BOOTHEEL FARMLAND?" with a smaller line beneath reading "AutoNateAI · Farm Credit Southeast Missouri, Coming Soon". No signage, no logos, no readable text anywhere in the photo itself. ${STYLE}`,
  },
  {
    file: "og/bootheel-grain-cooperative.jpg",
    prompt: `A wide editorial image about a grain elevator cooperative. Background: a working grain elevator and co-op complex — concrete grain silos, a truck scale, a couple of grain trucks parked nearby, flat farmland behind, generic and unbranded, midday light, fading into a dark navy panel with gold light. Large bold headline text reading "WHO RUNS THE ELEVATORS FARMERS DEPEND ON?" with a smaller line beneath reading "AutoNateAI · Grain Cooperative Profile, Coming Soon". No signage, no logos, no readable text anywhere in the photo itself. ${STYLE}`,
  },
  {
    file: "og/agricultural-finance-and-capital.jpg",
    prompt: `A wide editorial image about how farm financing works. Background: two people at a wooden desk shaking hands over a loan document and a farm ledger book, a window behind them showing green farmland, warm natural light, hands and torsos only, no visible faces, fading into a dark navy panel with gold light. Large bold headline text positioned in the upper-middle two-thirds of the frame — never the bottom edge — reading "HOW DOES A FARM LOAN ACTUALLY GET APPROVED?" with a smaller line beneath it reading "AutoNateAI · Agricultural Finance & Capital, Coming Soon", and a generous quiet margin of empty background below both lines before the bottom edge of the image. ${STYLE}`,
  },
  {
    file: "og/freight-infrastructure-storage.jpg",
    prompt: `A wide editorial image about agricultural freight and storage. Background: a loaded grain barge being pushed by a towboat on a wide river, a grain elevator and conveyor visible on the riverbank, overcast working-day light, fading into a dark navy panel with gold light. Large bold headline text reading "HOW DOES A CROP GET FROM THE FIELD TO THE BOAT?" with a smaller line beneath reading "AutoNateAI · Freight, Infrastructure & Storage, Coming Soon". ${STYLE}`,
  },
  {
    file: "og/bootheel-diesel-harvest-cost-2026.jpg",
    prompt: `A wide editorial image about a real agricultural-economics finding. Background: a documentary-style shot of a diesel fuel pump nozzle refueling a farm truck or tractor at a rural fuel stop during harvest, a rice field and grain dryer visible in the blurred background at golden hour, fading into a dark navy panel with gold light. Large bold headline text reading "DIESEL JUST HIT $6.285. WHAT DOES THAT COST A BOOTHEEL FARM?" with a smaller line beneath reading "AutoNateAI · Bootheel Diesel Harvest Cost, 2026". No logos, no readable pump signage or prices. ${STYLE}`,
  },
  {
    file: "og/central-great-plains-water-energy-irrigation-resilience-2026.jpg",
    prompt: `A wide editorial image about a real agricultural water-and-energy finding. Background: a documentary-style aerial shot of a center-pivot irrigation system watering a green circular field in the High Plains, dry golden rangeland beyond it, a single well/pump structure visible at the field's center, warm late-afternoon light, fading into a dark navy panel with gold light. Large bold headline text reading "ONE WET YEAR. DID IT ACTUALLY BUY FARMERS TIME?" with a smaller line beneath reading "AutoNateAI · Central Great Plains Water-Energy Resilience, 2026". ${STYLE}`,
  },
  {
    file: "og/florida-crispr-citrus-recovery-economics-2026.jpg",
    prompt: `A wide editorial image about a real agricultural-biotechnology finding. Background: a documentary-style shot of a young, healthy citrus tree sapling being planted in a Florida grove row, older visibly declining/sparse citrus trees blurred in the background showing the contrast, warm morning light, fading into a dark navy panel with gold light. Large bold headline text reading "FLORIDA FINALLY HAS A CRISPR CITRUS PRODUCT" with a smaller line beneath reading "AutoNateAI · Florida CRISPR Citrus Recovery Economics, 2026". No logos, no readable tags. ${STYLE}`,
  },
  {
    file: "og/bootheel-cargill-soy-crush-status-market-impact-2026.jpg",
    prompt: `A wide editorial image about a real agricultural-economics finding. Background: a documentary-style shot of an empty, undeveloped riverside industrial site near a Mississippi River grain port at dusk — bare graded ground, a lone rail spur curving toward the frame edge, a distant grain elevator and barge silhouette on the river, construction stopped, no active work visible, moody fading light, blending into a dark navy panel with gold light. Large bold headline text reading "A 62-MILLION-BUSHEL PLANT WAS PROMISED HERE. THEN IT WENT QUIET." with a smaller line beneath reading "AutoNateAI · Bootheel Soybean Crush Status, 2026". No logos, no readable signage. ${STYLE}`,
  },
  {
    file: "og/texas-high-plains-cotton-drought-shock-2026.jpg",
    prompt: `A wide editorial image about a real agricultural-economics finding. Background: a documentary-style aerial shot of a severely drought-stressed dryland cotton field on the Texas High Plains, cracked bare soil visible between stunted rows, a lush green center-pivot-irrigated circular field faintly visible in the far distance for contrast, harsh midday heat haze, fading into a dark navy panel with gold light. Large bold headline text reading "TEXAS COTTON YIELD JUST FELL 15.8%. WHO ABSORBS IT?" with a smaller line beneath reading "AutoNateAI · Texas High Plains Cotton Drought Shock, 2026". No logos, no readable signage. ${STYLE}`,
  },
  {
    file: "og/delmarva-poultry-productivity-grower-consolidation-2026.jpg",
    prompt: `A wide editorial image about a real agricultural-economics finding. Background: a documentary-style shot of a single large modern chicken house at golden hour on the Delmarva Peninsula, rows of ventilation fans visible, flat farmland stretching behind it, no people or birds visible, fading into a dark navy panel with gold light. Large bold headline text reading "40% MORE CHICKEN. 37% FEWER GROWERS. WHO WINS?" with a smaller line beneath reading "AutoNateAI · Delmarva Poultry Productivity, 2026". No logos, no readable signage. ${STYLE}`,
  },
  {
    file: "og/bootheel-irrigation-groundwater-energy-economics-2026.jpg",
    prompt: `A wide editorial image about a real agricultural water-and-energy finding. Background: a documentary-style shot of a single irrigation well pump and riser pipe standing in a green soybean field at golden hour, a center-pivot or furrow-irrigation line visible running into the crop rows, flat Bootheel river-bottom farmland stretching to the horizon, fading into a dark navy panel with gold light. Large bold headline text reading "ONE MORE IRRIGATION PASS. WHAT IS IT ACTUALLY WORTH?" with a smaller line beneath reading "AutoNateAI · Bootheel Irrigation & Groundwater Economics, 2026". No logos, no readable signage. ${STYLE}`,
  },
  {
    file: "og/central-valley-dairy-nitrogen-compliance-capital-2026.jpg",
    prompt: `A wide editorial image about a real agricultural-regulatory finding. Background: a documentary-style shot of a Central Valley California dairy manure lagoon/pond with a visible synthetic liner installation in progress, dairy barns and irrigated green cropland stretching behind it, clear California afternoon light, fading into a dark navy panel with gold light. Large bold headline text reading "CALIFORNIA JUST REWROTE THE DAIRY NITROGEN RULEBOOK" with a smaller line beneath reading "AutoNateAI · Central Valley Dairy Compliance Capital, 2026". No logos, no readable signage. ${STYLE}`,
  },
  {
    file: "og/north-dakota-soy-crush-yield-finance-2026.jpg",
    prompt: `A wide editorial image about a real agricultural-processing finding. Background: a documentary-style shot of a large modern soybean crush and refining plant complex on the North Dakota prairie at golden hour — tall grain silos, processing towers, and conveyor structures, a loaded grain truck approaching on a gravel road, flat harvested farmland stretching to the horizon, fading into a dark navy panel with gold light. Large bold headline text reading "NORTH DAKOTA BUILT THE CRUSH. THEN YIELDS FELL." with a smaller line beneath reading "AutoNateAI · North Dakota Soy Crush & Farm Finance, 2026". No logos, no readable signage. ${STYLE}`,
  },
  {
    file: "og/bootheel-rice-basis-storage-marketing-loan-2026.jpg",
    prompt: `A wide editorial image about a real agricultural-finance finding. Background: a documentary-style shot of a full rice bin/grain storage structure at golden-hour harvest time, a clipboard with a price ledger resting on a truck tailgate in the foreground (numbers not legible), flat Bootheel farmland behind, fading into a dark navy panel with gold light. Large bold headline text reading "SELL NOW, OR FINANCE THE WAIT?" with a smaller line beneath reading "AutoNateAI · Bootheel Rice Basis & Marketing Loan, 2026". No logos, no readable signage or numbers. ${STYLE}`,
  },
  {
    file: "og/michigan-apple-storage-ai-packing-margin-2026.jpg",
    prompt: `A wide editorial image about a real agricultural-economics finding. Background: a documentary-style shot of a Michigan apple orchard at golden-hour harvest, wooden bulk storage bins full of red apples in the foreground, a controlled-atmosphere storage warehouse loading dock faintly visible in the background, fading into a dark navy panel with gold light. Large bold headline text reading "A BILLION POUNDS OF APPLES. WHO ACTUALLY KEEPS THE MARGIN?" with a smaller line beneath reading "AutoNateAI · Michigan Apple Storage & AI Packing Margin, 2026". No logos, no readable signage or numbers. ${STYLE}`,
  },
  {
    file: "og/georgia-poultry-gainesville-inland-port-rail-economics-2026.jpg",
    prompt: `A wide editorial image about a real agricultural-logistics finding. Background: a documentary-style shot of a refrigerated intermodal rail container being loaded at a rural Georgia inland rail terminal at golden hour, a line of parked reefer trucks visible in the middle distance for contrast, flat North Georgia landscape behind, fading into a dark navy panel with gold light. Large bold headline text reading "GEORGIA SPENT $134M ON RAIL. POULTRY STILL MOVES BY TRUCK." with a smaller line beneath reading "AutoNateAI · Gainesville Inland Port Poultry Rail Economics, 2026". No logos, no readable signage or numbers. ${STYLE}`,
  },
  {
    file: "og/wallula-pnw-ag-export-container-economics-2026.jpg",
    prompt: `A wide editorial image about a real agricultural-logistics finding. Background: a documentary-style shot of a refrigerated or dry intermodal container being loaded onto a rail flatcar at a rural Eastern Washington inland rail terminal at golden hour, a hopper grain truck parked nearby for contrast, the Cascade foothills faintly visible in the distance, fading into a dark navy panel with gold light. Large bold headline text reading "THE EXPORT RAMP JUST MOVED 200 MILES INLAND" with a smaller line beneath reading "AutoNateAI · Wallula Inland Export Economics, 2026". No logos, no readable signage or numbers. ${STYLE}`,
  },
  {
    file: "og/wisconsin-dairy-processing-capital-export-margin-2026.jpg",
    prompt: `A wide editorial image about a real agricultural-finance finding. Background: a documentary-style shot inside a modern Wisconsin cheese production and cut-and-wrap facility, stainless steel equipment and stacked fresh cheese blocks under bright working light, a loading dock with a refrigerated export truck faintly visible through a bay door, fading into a dark navy panel with gold light. Large bold headline text reading "$1.13 BILLION IS BETTING ON CHEESE OVER WHEY" with a smaller line beneath reading "AutoNateAI · Wisconsin Dairy Processing Capital, 2026". No logos, no readable signage. ${STYLE}`,
  },
  {
    file: "og/bootheel-harvest-margin-input-fuel-2027-crop-2026.jpg",
    prompt: `A wide editorial image about a real agricultural-finance finding. Background: a documentary-style shot of a farm diesel fuel tank and a stack of fertilizer prepay invoices resting on a truck tailgate at golden-hour harvest time in the Missouri Bootheel, a rice field and grain dryer visible in the blurred background, fading into a dark navy panel with gold light. Large bold headline text reading "TWO SEASONS, ONE INVOICE PILE" with a smaller line beneath reading "AutoNateAI · Bootheel Harvest Margin Squeeze, 2026". No logos, no readable numbers or signage. ${STYLE}`,
  },
];

async function generateOne({ file, prompt }) {
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

// ONLY supports a comma-separated list of substrings, e.g.
// ONLY="southeast-missouri,central-iowa" node scripts/generate-og-hero-images.mjs
const filters = process.env.ONLY?.split(",").map((s) => s.trim()).filter(Boolean);
const selected = filters?.length ? jobs.filter((job) => filters.some((f) => job.file.includes(f))) : jobs;

console.log(`Generating ${selected.length} OG hero image${selected.length === 1 ? "" : "s"} with ${MODEL} (text baked in, in parallel)...`);

await Promise.all(selected.map((job) => generateOne(job)));

console.log("Done.");
