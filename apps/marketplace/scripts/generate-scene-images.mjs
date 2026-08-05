import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/assets/scenes");

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set in the environment.");
}

// Replaces the old screeps screenshot pool. These are the wide, dark,
// cinematic "scene" images cycled through as the OG-image background layer
// site-wide (see scripts/generate-og-images.mjs) and used editorially
// wherever a pack/tutorial has no dedicated hero image. No people, no
// readable text, no logos — same visual language as the landing images.
const STYLE =
  "Dark, cinematic, professional tech-editorial illustration style. Near-black background (#060a12), warm amber/gold accent glow (#f2b134), moody directional lighting, high detail, no readable text or logos anywhere in the image.";

const images = [
  {
    file: "scene-01.jpg",
    prompt: `A photo-realistic wide shot of a dark server room aisle, glowing amber status LEDs on rack after rack fading into shadow. ${STYLE} No people.`,
  },
  {
    file: "scene-02.jpg",
    prompt: `An abstract wide illustration of a multi-agent AI system: several glowing amber agent nodes passing a task between each other along connected lines, converging on a single checkmark node, dark near-black background. ${STYLE} No people, no text.`,
  },
  {
    file: "scene-03.jpg",
    prompt: `A photo-realistic close-up of a dark-themed terminal window mid-command, glowing amber cursor and abstract output lines, blurred keyboard in the foreground, shallow depth of field. ${STYLE} No readable text, no faces.`,
  },
  {
    file: "scene-04.jpg",
    prompt: `An abstract illustration of a Git branch history: glowing amber commit dots forking, diverging, and merging back into a single timeline against a near-black background, cinematic tech-editorial style. ${STYLE} No text, no people.`,
  },
  {
    file: "scene-05.jpg",
    prompt: `A photo-realistic wide shot of a dark control-room style desk with three monitors glowing amber, one showing a live system diagram, one a code editor, one a chat/community panel, evening atmosphere. ${STYLE} No readable text, no visible faces.`,
  },
  {
    file: "scene-06.jpg",
    prompt: `An abstract illustration of a civic building silhouette (columns, a dome) rendered as glowing amber wireframe, connected by circuit-like lines to a small cluster of database and API icons, dark near-black background. ${STYLE} No people, no text.`,
  },
  {
    file: "scene-07.jpg",
    prompt: `A photo-realistic close-up of a dark mechanical keyboard mid-type, glowing amber backlit keys, a blurred second monitor showing a diagram in the background, shallow depth of field. ${STYLE} No readable text, no faces.`,
  },
  {
    file: "scene-08.jpg",
    prompt: `An abstract wide illustration of a network of small glowing amber circular avatars connected by lines into a larger web, converging toward a single bright node in the center, dark near-black background, symbolizing a community forming around a shared build. ${STYLE} No readable text, no real faces.`,
  },
  {
    file: "studio-bg.jpg",
    prompt: `A photo-realistic wide shot of an empty, dark, modern studio workspace at night: two simple chairs facing a large wall-mounted display showing a faint abstract system diagram, warm amber accent lighting, soft shadows, plenty of open floor space on both sides. ${STYLE} No people, no readable text — this is an empty backdrop meant to have characters composited into it later.`,
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
console.log(`Generating ${images.length} scene images with gpt-image-2 (in parallel)...`);

await Promise.all(images.map((spec) => generateImage(spec)));

console.log("Done.");
