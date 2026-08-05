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

const STYLE =
  "Dark, cinematic, professional tech-editorial illustration style. Near-black background (#060a12), warm amber/gold accent glow (#f2b134), moody directional lighting, high detail, no readable text or logos anywhere in the image.";

const images = [
  {
    file: "api-data-model.jpg",
    size: "1536x1024",
    prompt: `A close-up photo-realistic shot of a dark monitor screen displaying a database schema and API endpoint diagram: table outlines with connecting lines, endpoint icons, bracket shapes, glowing amber highlights on a dark background, shallow depth of field, blurred desk in the foreground. ${STYLE} No readable text, no faces.`,
  },
  {
    file: "agent-review.jpg",
    size: "1536x1024",
    prompt: `A close-up photo-realistic shot of a dark-themed code editor showing a diff view with an AI chat panel open beside it, glowing amber and muted red/green highlight bars, soft cursor glow, blurred keyboard in the foreground. ${STYLE} No readable text, no faces.`,
  },
  {
    file: "rfp-document.jpg",
    size: "1536x1024",
    prompt: `A photo-realistic angled shot of a printed document on a dark wooden desk beside an open laptop showing a glowing amber outline checklist, a pen resting on the document, warm desk lamp lighting. ${STYLE} No readable text on the document or screen, no faces.`,
  },
  {
    file: "community-discord.jpg",
    size: "1536x1024",
    prompt: `A photo-realistic close-up of a dark-themed chat and community app interface on a monitor, glowing amber message bubbles and small abstract circular avatar icons, warm ambient lighting, shallow depth of field. ${STYLE} No readable text, no real faces.`,
  },
  {
    file: "learning-path.jpg",
    size: "1536x1024",
    prompt: `A photo-realistic angled shot of an open laptop on a desk showing a glowing amber step-by-step checklist UI, a notebook and pen and a cup of coffee nearby, warm cozy lighting, shallow depth of field. ${STYLE} No readable text, no faces.`,
  },
  {
    file: "success-confirmed.jpg",
    size: "1536x1024",
    prompt: `A photo-realistic close-up of a dark monitor screen showing a glowing amber checkmark inside a circle, a faint system diagram fading into the background, clean and professional, warm ambient desk lighting. ${STYLE} No readable text, no faces.`,
  },
  {
    file: "tutorial-pack-prompt-and-context-engineering.jpg",
    size: "1536x1024",
    prompt: `An abstract photo-realistic illustration of two speech-bubble shapes connected by a glowing amber neural network pattern, symbolizing a conversation between a person and an AI agent, dark near-black background, cinematic lighting. ${STYLE} No readable text, no faces.`,
  },
  {
    file: "tutorial-pack-relational-databases-and-graphs.jpg",
    size: "1536x1024",
    prompt: `An abstract illustration split between a grid of glowing amber database table rows on one side and a connected node-and-edge graph on the other, dark near-black background, cinematic tech-editorial style. ${STYLE} No readable text, no faces.`,
  },
  {
    file: "tutorial-pack-civics-and-agentic-ai.jpg",
    size: "1536x1024",
    prompt: `An abstract illustration of a simple civic building silhouette, like a courthouse, connected by glowing amber circuit lines to a small network of AI agent nodes, dark near-black background, cinematic tech-editorial style. ${STYLE} No readable text, no people.`,
  },
  {
    file: "tutorial-pack-intro-to-javascript-for-beginners.jpg",
    size: "1536x1024",
    prompt: `An abstract illustration of a glowing amber terminal cursor blinking beside a curly-brace bracket shape that opens into a small constellation of connected nodes, like a single line of code branching into a whole system, dark near-black background, cinematic tech-editorial style. ${STYLE} No readable text, no people.`,
  },
  {
    file: "hero-panel-two-builders.jpg",
    size: "1536x1024",
    prompt: `A photo-realistic wide shot of two empty modern desk setups facing each other in a dark studio, each with a glowing monitor showing a faint code editor and system diagram, warm amber accent lighting, a shared whiteboard between them with faint glowing sketch lines, cinematic. ${STYLE} No people, no readable text — an empty scene meant to have characters composited in later.`,
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
  const outFile = path.join(outDir, file);
  await sharp(buffer).jpeg({ quality: 90 }).toFile(outFile);
  console.log(`  -> ${path.relative(process.cwd(), outFile)}`);
}

await mkdir(outDir, { recursive: true });
console.log(`Generating ${images.length} site images with gpt-image-2 (in parallel)...`);

await Promise.all(images.map((spec) => generateImage(spec)));

console.log("Done.");
