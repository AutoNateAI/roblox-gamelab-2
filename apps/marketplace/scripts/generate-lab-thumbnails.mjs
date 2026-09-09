import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outRoot = path.join(__dirname, "../public/assets/thumbnails");

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set in the environment.");
}

// AutoNateAI Lab thumbnail style — navy/gold/white brand (see public/styles.css
// :root tokens), meme-energy/clickbait framing per Nathan's request: punchy,
// a little funny, exaggerated reaction-image composition, digital illustration
// (never photoreal faces), no readable text or logos anywhere in the image —
// gpt-image-2 renders garbled text, and these double as OG share images.
const STYLE =
  "Bold, punchy, meme-inspired digital illustration, exaggerated reaction-image energy, slightly humorous. Deep navy blue background (#10213f), warm metallic gold accent lighting and highlights (#c9a227), crisp white line work, high contrast, dramatic rim lighting, clean vector-ish shading. Wide 3:2 composition. No readable text, no logos, no real faces/photoreal people anywhere in the image.";

const items = [
  // ---- Projects (3) ----
  {
    file: "projects/inspectable-agent-systems.jpg",
    prompt: `A giant glowing gold magnifying glass hovering over a tangled black-box AI brain made of circuitry, cracking it open to reveal a clean glowing gold internal graph structure underneath — the mess made legible. Exaggerated "gotcha" energy. ${STYLE}`,
  },
  {
    file: "projects/human-systems.jpg",
    prompt: `A cartoon EEG headband perched on top of a glowing gold brain, with one readout line labeled by a big gold checkmark and another wobbly readout line getting a big skeptical gold question mark stamped on it — evidence-ladder energy, some signals trusted, some questioned. ${STYLE}`,
  },
  {
    file: "projects/spatial-simulation-systems.jpg",
    prompt: `A glowing gold robot hand placing tiny glowing map pins and miniature buildings onto a giant unfolding navy-and-gold wireframe map/grid, like a strategy-game god's-eye view, small delivery-truck and road icons scattered across it. ${STYLE}`,
  },

  // ---- Open Source repos (9) ----
  {
    file: "open-source/semantica.jpg",
    prompt: `A giant glowing gold spiderweb-shaped knowledge graph physically eating a pile of loose scattered sticky notes and index cards, absorbing them into its structured nodes, comic "om nom nom" devouring energy. ${STYLE}`,
  },
  {
    file: "open-source/openviking.jpg",
    prompt: `A stout glowing gold viking-helmet-shaped database vault with a big open lid, memory/RAG/skill icons (a brain, a magnifying glass, a wrench) marching single-file into it like they're boarding a ship. ${STYLE}`,
  },
  {
    file: "open-source/browser-use-pi.jpg",
    prompt: `A tiny scrappy gold robot no bigger than a browser-window icon, wearing a boxing glove, standing triumphantly on top of a much larger deflated/collapsed grey robot labeled with a giant complexity gear icon — small-but-mighty underdog energy. ${STYLE}`,
  },
  {
    file: "open-source/hermes-agent.jpg",
    prompt: `A many-armed glowing gold robot octopus wearing a tiny winged messenger-god helmet, each arm juggling a different icon (a lock, a browser window, a calendar, a gear), calm and in total control amid the chaos. ${STYLE}`,
  },
  {
    file: "open-source/tradingagents.jpg",
    prompt: `A boardroom table of small glowing gold robot figures arguing dramatically over a floating holographic stock candlestick chart, two pointing at opposite directions on the chart, comic debate energy. ${STYLE}`,
  },
  {
    file: "open-source/pydantic-ai-harness.jpg",
    prompt: `A crisp glowing gold harness/exoskeleton frame snapping perfectly around a soft blob-shaped AI character like a seatbelt clicking shut, a satisfied checkmark popping up above it — snug, typed, safe. ${STYLE}`,
  },
  {
    file: "open-source/context-mode.jpg",
    prompt: `A giant overstuffed glowing gold suitcase visibly bursting at the seams being squeezed down by a comic trash-compactor press into a small tidy glowing gold cube, papers flying everywhere mid-squeeze. ${STYLE}`,
  },
  {
    file: "open-source/needle.jpg",
    prompt: `A tiny glowing gold robot the size of a phone confidently flexing a bicep on top of a switched-off, much larger cloud-shaped server rack, "tiny but scrappy" energy, a single sewing needle icon planted like a flag beside it. ${STYLE}`,
  },
  {
    file: "open-source/plannerforge.jpg",
    prompt: `A glowing gold anvil-and-hammer forge station stamping out miniature toy self-driving cars one after another onto a conveyor belt, each car popping out with a tiny checkmark or a tiny "X" stamped on its hood. ${STYLE}`,
  },

  // ---- Experiments (7) ----
  {
    file: "experiments/procedural-graph-runtime.jpg",
    prompt: `A glowing gold flowchart/graph literally growing new branching nodes in real time like a plant sprouting new leaves, a tiny gardener robot pruning one questionable branch with comic focus. ${STYLE}`,
  },
  {
    file: "experiments/independent-test-agent.jpg",
    prompt: `Two glowing gold robot referees standing back-to-back with crossed arms and sunglasses, one holding a red penalty flag over a piece of code, deliberately not looking at each other — independent-judgment energy. ${STYLE}`,
  },
  {
    file: "experiments/revocable-memory-graph.jpg",
    prompt: `A glowing gold vault door slamming shut on one specific labeled memory-orb rolling away in a huff, while a cluster of other memory-orbs stay safely glowing on a shelf behind protective glass. ${STYLE}`,
  },
  {
    file: "experiments/agentic-simulation-foundry.jpg",
    prompt: `A glowing gold toy factory conveyor belt stamping out a self-driving car, then a delivery truck, then a tiny building, from the exact same stamping machine — same tool, wildly different outputs, comic assembly-line energy. ${STYLE}`,
  },
  {
    file: "experiments/safety-judge-stress-lab.jpg",
    prompt: `A glowing gold judge's gavel character wearing a tiny robe getting comically dizzy and cross-eyed as a swirl of identical-looking documents in slightly different fonts spin around it — being tricked by disguises. ${STYLE}`,
  },
  {
    file: "experiments/context-graph-vs-context-database.jpg",
    prompt: `A glowing gold spiderweb-graph character and a glowing gold filing-cabinet-database character standing in classic arm-wrestle pose on a table, sparks flying, both flexing hard, evenly matched. ${STYLE}`,
  },
  {
    file: "experiments/temporal-gis-narratives.jpg",
    prompt: `A glowing gold map that keeps rewriting itself like a flipbook — ghostly translucent past versions of a city block layered behind the current glowing version, a thin gold thread stitching all the versions together in order. ${STYLE}`,
  },

  // ---- Sources / reading list (12) ----
  {
    file: "sources/procedural-graphs-paper.jpg",
    prompt: `A glowing gold open research paper transforming mid-air into a 3D branching flowchart rising off the page like a pop-up book, dramatic "aha" lightbulb energy. ${STYLE}`,
  },
  {
    file: "sources/execcritic-paper.jpg",
    prompt: `A glowing gold robot wearing a tiny graduation cap grading another robot's homework with a big red-gold checkmark, red pen still smoking from how fast it graded. ${STYLE}`,
  },
  {
    file: "sources/plannerforge-paper.jpg",
    prompt: `A glowing gold stamping press turning a plain grey toy car into a glowing gold labeled "test scenario" toy car on a conveyor belt, sparks flying comic-style. ${STYLE}`,
  },
  {
    file: "sources/meclear-paper.jpg",
    prompt: `A glowing gold pair of scales weighing one heavy "keep memory" orb against one heavy "delete memory" orb, perfectly balanced, a tiny robot judge scratching its head above it. ${STYLE}`,
  },
  {
    file: "sources/consumer-neurofeedback-meta-analysis.jpg",
    prompt: `A glowing gold EEG headband on a cartoon brain with a big dramatic gold question-mark hovering directly above it instead of a checkmark, a chart in the background showing a very modest small bump. ${STYLE}`,
  },
  {
    file: "sources/eeg-oscillatory-correlates-review.jpg",
    prompt: `A glowing gold brain with three different colored wave patterns (labeled only by shape, not text) pulsing out of it in sync, each wave slightly different depending on a tiny mood-icon floating nearby — mood changes the wave. ${STYLE}`,
  },
  {
    file: "sources/hrv-coherence-frequencies-study.jpg",
    prompt: `A glowing gold heart icon conducting an orchestra of tiny pulsing wave-lines like a maestro with a baton, a massive stadium crowd of a million tiny glowing dots cheering in the background — huge dataset energy. ${STYLE}`,
  },
  {
    file: "sources/writer-agent-memory.jpg",
    prompt: `A glowing gold filing cabinet robot character efficiently stamping and filing floating task-cards into perfectly labeled drawers mid-air, satisfied smug expression. ${STYLE}`,
  },
  {
    file: "sources/langchain-multi-agent-context.jpg",
    prompt: `A glowing gold parent robot handing an identical glowing gold mini-robot child a folder of "family context" before it runs off to do a task, a little wave goodbye, warm comic energy. ${STYLE}`,
  },
  {
    file: "sources/arcade-skills-over-mcp.jpg",
    prompt: `Two glowing gold robot hands trying to shake on a handshake but their glove shapes don't quite match yet, one hand slightly bigger, comic almost-fit energy, small sparks where they don't align. ${STYLE}`,
  },
  {
    file: "sources/muse-headband-review.jpg",
    prompt: `A glowing gold cartoon reviewer character wearing an EEG headband, one eyebrow raised skeptically, holding up a large gold star rating card that's clearly only two and a half stars out of five. ${STYLE}`,
  },
  {
    file: "sources/brain-on-meditation-dispenza.jpg",
    prompt: `A glowing gold brain meditating cross-legged mid-air, surrounded by swirling sparkly cosmic energy clouds and tiny stars, a single small skeptical gold magnifying glass floating just outside the swirl looking in. ${STYLE}`,
  },

  // ---- Events (14) ----
  {
    file: "events/ccare-compassion-conversation.jpg",
    prompt: `A glowing gold heart character sitting cross-legged across from a glowing gold brain character, both leaning in for an intense but friendly conversation, a small speech-bubble heart floating between them. ${STYLE}`,
  },
  {
    file: "events/berkeley-law-ai-institute.jpg",
    prompt: `A glowing gold gavel stamping a glowing gold robot's hand with an official permission stamp, a tiny scroll of rules unrolling beside them, courtroom-meets-server-room energy. ${STYLE}`,
  },
  {
    file: "events/buddha-brain-bach.jpg",
    prompt: `A glowing gold brain meditating peacefully while a tiny golden treble clef and musical notes float out of a nearby cartoon piano, big Big Sur cliffside silhouette in the background. ${STYLE}`,
  },
  {
    file: "events/microsoft-agent-a-thon.jpg",
    prompt: `A glowing gold architect robot in a hard hat standing proudly next to a glowing blueprint hologram of interconnected agent boxes, sleeves rolled up, ready to build. ${STYLE}`,
  },
  {
    file: "events/gsa-mcp-hackathon.jpg",
    prompt: `A glowing gold robot in a tiny government-official sash plugging a glowing plug labeled with a generic gear icon into a giant official-looking building-shaped socket, sparks of excitement. ${STYLE}`,
  },
  {
    file: "events/stanford-hai-instacart.jpg",
    prompt: `A glowing gold shopping-cart robot handing off a grocery bag to a glowing gold human-shaped silhouette worker, both giving each other a respectful nod, "handoff" energy, not replacement. ${STYLE}`,
  },
  {
    file: "events/the-ai-conference-2026.jpg",
    prompt: `A massive glowing gold crowd of tiny robot and human silhouettes packed into a huge stadium-style hall, one giant glowing "Day Zero" spotlight beam cutting through the middle of the crowd. ${STYLE}`,
  },
  {
    file: "events/world-model-spatial-intelligence.jpg",
    prompt: `A glowing gold brain wearing tiny 3D glasses staring in awe at a miniature glowing globe/world floating and slowly rotating above its open palm, sparkles of realization around its head. ${STYLE}`,
  },
  {
    file: "events/empirical-methods-age-of-ai.jpg",
    prompt: `A glowing gold magnifying glass hovering dramatically over a pile of scattered data points, one specific data point circled in gold with a tiny "verified" checkmark stamped beside it. ${STYLE}`,
  },
  {
    file: "events/science-of-consciousness-2026.jpg",
    prompt: `A glowing gold brain floating cross-legged above a swirling galaxy of tiny stars and question marks, half of it rendered as clean glowing circuitry, half as soft swirling cosmic mist — science meets mystery. ${STYLE}`,
  },
  {
    file: "events/odsc-west-2026.jpg",
    prompt: `A glowing gold robot standing at a lectern in front of a wall of floating bar charts and scatter plots, chest puffed out proudly, one chart slightly crooked behind it for comic effect. ${STYLE}`,
  },
  {
    file: "events/berkeley-neuroscience-conference.jpg",
    prompt: `A glowing gold brain wearing tiny lab goggles getting its picture taken by a swarm of tiny camera-flash icons from a crowd of excited conference-attendee silhouettes. ${STYLE}`,
  },
  {
    file: "events/nasa-space-apps-challenge.jpg",
    prompt: `A glowing gold rocket-shaped robot planting a tiny flag on a glowing wireframe globe covered in map-pin icons, a countdown-clock icon ticking beside it, mission-deadline energy. ${STYLE}`,
  },
  {
    file: "events/hackstorm-physical-ai-hackathon.jpg",
    prompt: `A glowing gold robot arm mid-assembly, sparks flying, snapping the final gear piece onto a half-built small robot body on a workbench, a lightning-bolt "storm" icon crackling overhead. ${STYLE}`,
  },
];

const CONCURRENCY = 8;

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
  const outFile = path.join(outRoot, file);
  await mkdir(path.dirname(outFile), { recursive: true });
  await sharp(buffer).jpeg({ quality: 88 }).toFile(outFile);
  console.log(`  -> ${path.relative(process.cwd(), outFile)}`);
}

async function runWithConcurrency(list, limit, worker) {
  let cursor = 0;
  let failed = 0;
  async function next() {
    while (cursor < list.length) {
      const index = cursor++;
      try {
        await worker(list[index]);
      } catch (err) {
        failed++;
        console.error(`FAILED: ${err.message}`);
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, list.length) }, next));
  return failed;
}

await mkdir(outRoot, { recursive: true });
console.log(`Generating ${items.length} AutoNateAI Lab thumbnails with gpt-image-2 (concurrency ${CONCURRENCY})...`);

const failed = await runWithConcurrency(items, CONCURRENCY, generateImage);

console.log(failed ? `Done with ${failed} failure(s) — see FAILED lines above.` : "Done. All thumbnails generated.");
if (failed) process.exitCode = 1;
