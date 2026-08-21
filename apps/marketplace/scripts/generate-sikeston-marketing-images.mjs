import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Uses OpenAI's image *edit* endpoint (gpt-image-2, multi-image reference input) to
// composite Nathan's real headshot and the real (empty) Sikeston classroom into new
// photorealistic marketing shots. This is the first script in this repo to use
// /v1/images/edits rather than /v1/images/generations — the earlier scripts
// (generate-site-images.mjs, generate-scene-images.mjs) are text-to-image only.
//
// Deliberately does NOT reference classroom-cohort.jpg (the real group photo with
// real students) as an input image — those are real, identifiable people who never
// consented to appearing in synthetic marketing renders. Every generated image below
// asks for fictional, generic, diverse students instead. Nathan's own likeness is
// fine to reuse since it's his own business and he supplied the reference himself.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const outDir = path.join(publicDir, "assets/landing");
const sikestonDir = path.join(publicDir, "assets/sikeston");

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set in the environment.");
}

const REFERENCE_IMAGES = [
  path.join(publicDir, "assets/nathan-baker.jpeg"),
  path.join(sikestonDir, "classroom-empty-ref.jpg"),
];

const STYLE =
  "Photorealistic, natural documentary photography style, shot on a full-frame camera, soft even classroom lighting, shallow depth of field, warm and professional, no text overlays, no logos, no watermarks.";

const GUARDRAIL =
  "The instructor's face and build should closely match the reference headshot. The students in the room are entirely fictional, generic people (not based on any specific real individual) — a natural mix of Black, white, Latino, Asian, and Indian adults. No real business names, brand logos, or readable signage anywhere in the frame.";

const images = [
  {
    file: "sikeston-hero-teaching.jpg",
    size: "1536x1024",
    prompt: `A wide photorealistic shot of a man matching the reference headshot teaching a small in-person class in the reference modern classroom (exposed ceiling, large monitor screen, laptops on tables). He stands at the front gesturing toward the screen while 6-8 diverse adult students and young professionals sit at laptops, engaged and taking notes. Daytime, warm natural light through the window. ${STYLE} ${GUARDRAIL}`,
  },
  {
    file: "sikeston-mentoring.jpg",
    size: "1536x1024",
    prompt: `A photorealistic medium shot inside the reference classroom: the man from the reference headshot leaning in beside a seated adult student at a laptop, pointing at the screen, one-on-one mentoring moment, both smiling slightly, engaged conversation. Soft daylight. ${STYLE} ${GUARDRAIL}`,
  },
  {
    file: "sikeston-presenting-fullbody.jpg",
    size: "1024x1536",
    prompt: `A full-body photorealistic shot of the man from the reference headshot standing confidently at the front of the reference classroom in business-casual attire (button-up shirt, jeans), one hand gesturing toward the large wall monitor showing a faint abstract system diagram, a row of diverse adult students visible at tables in the foreground, out of focus. ${STYLE} ${GUARDRAIL}`,
  },
  {
    file: "sikeston-internal-tool-laptop.jpg",
    size: "1536x1024",
    prompt: `A photorealistic close-up, over-the-shoulder shot of a laptop screen on a classroom table showing a simple, clean internal business dashboard UI (generic bar charts, a customer list, a status board) with a warm amber accent color, no real company names or logos, blurred hands typing, the reference classroom softly out of focus in the background. ${STYLE} No faces visible in this shot.`,
  },
  {
    file: "sikeston-group-collaboration.jpg",
    size: "1536x1024",
    prompt: `A photorealistic wide shot of the reference classroom during a hands-on work session: several diverse adult students and young professionals at laptops in small clusters, collaborating and pointing at screens, the man from the reference headshot walking between tables in the background helping a group. Natural daylight, candid documentary feel. ${STYLE} ${GUARDRAIL}`,
  },
  {
    file: "sikeston-organizations-handshake.jpg",
    size: "1536x1024",
    prompt: `A photorealistic shot inside the reference classroom of the man from the reference headshot shaking hands with a professionally dressed adult (a stand-in for a local employer), both smiling, a laptop open on the table beside them showing a faint generic dashboard UI, warm daylight, documentary style. ${STYLE} ${GUARDRAIL}`,
  },
];

function guessMimeType(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  return "application/octet-stream";
}

async function editImage({ file, size, prompt }) {
  const form = new FormData();
  form.set("model", "gpt-image-2");
  form.set("prompt", prompt);
  form.set("size", size);
  form.set("n", "1");

  for (const refPath of REFERENCE_IMAGES) {
    const buffer = await readFile(refPath);
    form.append("image[]", new Blob([buffer], { type: guessMimeType(refPath) }), path.basename(refPath));
  }

  const response = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}` },
    body: form,
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
  await sharp(buffer).jpeg({ quality: 92 }).toFile(outFile);
  console.log(`  -> ${path.relative(rootDir, outFile)}`);
}

await mkdir(outDir, { recursive: true });

console.log(`Generating ${images.length} Sikeston marketing images with gpt-image-2 (image edit, multi-reference)...`);

// Validate the edit endpoint works with one image before spending the full batch.
const [first, ...rest] = images;
await editImage(first);

for (const image of rest) {
  await editImage(image);
}

console.log("Done.");
