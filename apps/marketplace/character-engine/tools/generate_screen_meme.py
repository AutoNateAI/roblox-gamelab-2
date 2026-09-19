#!/usr/bin/env python3
"""
tools/generate_screen_meme.py — contextual cartoon-meme images for the shared
screen, generated with gpt-image-2.5-flare (same model/endpoint as the site's
scripts/generate-meme-images.mjs, which the meme-visual-pass skill uses to
scatter meme images through the research articles themselves).

Why this exists: screen_graphics.py's fallback for an uncited banter line with
no explicit `screen` spec used to be the branded "THE BRIEF" standby card —
correct in that it isn't a caption echoing the dialogue, but a static idle
card is dead air on a screen the audience's eye keeps going to. A contextual
meme keeps that same "always something worth looking at" guarantee without
resorting to captions, and it's actual content, not a placeholder.

v10: this used to generate at 1536x1024 and center-crop to the screen bezel's
exact aspect so it could drop in full-bleed with no letterboxing. That meant
(a) every generation paid for the model's biggest/slowest landscape size, and
(b) build_meme_card then hard-resized to the box's exact pixels — fine when
the crop had already forced the aspect to match, but the crop itself risked
trimming a caption that sat too close to the edge. Simpler now: no crop at
all — build_meme_card scales the raw generation to fit inside whatever box
it's placed in (the dialogue screen bezel, or the intro/outro card), padding
the rest with the same background every other card type uses. Never
distorted, never crops a caption.

v11: gpt-image-2.5-flare (unlike dall-e-2/gpt-image-1) isn't limited to the
three fixed size presets (1024x1024 / 1536x1024 / 1024x1536) — it accepts an
arbitrary WIDTHxHEIGHT as long as both dimensions are multiples of 16 and the
aspect ratio is between 1:3 and 3:1 (confirmed against OpenAI's current API
reference). GEN_SIZE below is computed to exactly match make_stage.SCREEN_W /
SCREEN_H's 1.625:1 ratio — the box most of these drop into — so a v10-style
square generation no longer needs a big pillarbox to fit it; it also happens
to be fewer total pixels than 1024x1024, so this isn't a size/speed
trade-off, just a better-fitting shape for the same cost. The intro/outro
cards are a wider box (~2.3:1) and will still pillarbox some — one GEN_SIZE
for every job keeps this simple; a future version could pass a per-job size
if that gap is worth closing.

Usage:
    python3 tools/generate_screen_meme.py --manifest jobs.json
    python3 tools/generate_screen_meme.py --prompt "..." --out path/to/file.png

Manifest shape: a JSON array of {"out": "<path>", "prompt": "<...>"} objects.
Paths are resolved relative to the current working directory if not absolute.
Jobs run in parallel (like the .mjs sibling's Promise.allSettled) — one bad
prompt doesn't sink the batch.

Caching: writes a "<out>.json" sidecar recording {model, quality, prompt}. A
re-run with the same prompt for the same output path is a no-op unless
--force is passed — episode re-renders (which call screen_content_for_line
every frame) never need to hit the API twice for the same line.
"""
import argparse
import base64
import io
import json
import os
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from PIL import Image

REPO = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO / "tools"))
import make_stage as stage  # noqa: E402


def _nearest_multiple_of_16(value):
    return max(16, round(value / 16) * 16)


def _gen_size_matching(target_w, target_h, base=768):
    """Smallest-practical WIDTHxHEIGHT (both /16, per gpt-image-2.5-flare's
    arbitrary-resolution support) that exactly matches target_w:target_h."""
    height = _nearest_multiple_of_16(base)
    width = _nearest_multiple_of_16(height * target_w / target_h)
    return f"{width}x{height}"


MODEL = "gpt-image-2.5-flare"
GEN_SIZE = _gen_size_matching(stage.SCREEN_W, stage.SCREEN_H)
QUALITY = "medium"
RETRYABLE_HTTP_CODES = {429, 500, 502, 503, 529}
STYLE_LOCK = (
    "Bold, vibrant 2D digital-illustration meme in a modern animated-cartoon style "
    "(not photorealistic). Thick clean outlines, punchy saturated colors, exaggerated "
    "expressions, dynamic comic-panel energy. No logos, no fabricated brand marks, no "
    "real named public figures, no illegible or garbled text — spell out exactly what "
    "any on-image caption reads. This gets scaled down to fit inside a display area "
    "without cropping, so keep the whole composition — including any caption — "
    "comfortably centered with a little breathing room on every side, not bleeding off "
    "the edge of the canvas."
)


def run_job(prompt, out_path, api_key, force=False):
    out_path = Path(out_path)
    meta_path = out_path.with_suffix(out_path.suffix + ".json")
    # v10: GEN_SIZE wasn't part of the cache key, so changing it (as this same
    # version bump did, 1536x1024 -> 1024x1024) silently kept serving images
    # generated at the old size/crop instead of regenerating under the new
    # pipeline — same class of bug as make_episode.py's render_version gap.
    expected_meta = {"model": MODEL, "quality": QUALITY, "size": GEN_SIZE, "prompt": prompt}
    if not force and out_path.exists() and meta_path.exists():
        try:
            if json.loads(meta_path.read_text()) == expected_meta:
                return f"cache hit: {out_path}"
        except Exception:
            pass

    full_prompt = f"{STYLE_LOCK} {prompt}"
    body = json.dumps({"model": MODEL, "prompt": full_prompt, "size": GEN_SIZE,
                        "quality": QUALITY, "n": 1}).encode("utf-8")
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=body,
        headers={"content-type": "application/json", "authorization": f"Bearer {api_key}"},
        method="POST",
    )
    # v9: retry with backoff on 429/5xx — the worker pool below now scales to
    # the episode's job count instead of a fixed cap of 8, so a burst hitting
    # a rate limit is expected at higher line counts, not a rare fluke.
    delay = 1.5
    payload = None
    max_attempts = 5
    for attempt in range(max_attempts):
        try:
            with urllib.request.urlopen(req, timeout=180) as resp:
                payload = json.loads(resp.read().decode("utf-8"))
            break
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")
            if exc.code in RETRYABLE_HTTP_CODES and attempt < max_attempts - 1:
                time.sleep(delay)
                delay *= 2
                continue
            raise RuntimeError(f"{out_path}: OpenAI API error {exc.code} — {detail}") from None

    b64 = (payload.get("data") or [{}])[0].get("b64_json")
    if not b64:
        raise RuntimeError(f"{out_path}: no image data in response — {payload}")

    out_path.parent.mkdir(parents=True, exist_ok=True)
    raw = Image.open(io.BytesIO(base64.b64decode(b64))).convert("RGB")
    raw.save(out_path)
    meta_path.write_text(json.dumps(expected_meta, indent=2) + "\n")
    return f"generated: {out_path}"


def extract_episode_jobs(episode_path):
    """episode.json's own `screen` specs are the single source of truth for
    what each line's meme should be — a line just declares
    {"type": "meme", "prompt": "...", "path": "..."} same as it would declare
    a real chart/image, and this pulls exactly the ones that still need
    generating (make_episode.py calls this same extraction before every
    render, so a line whose image is already cached costs nothing here).

    v10: also picks up top-level `intro_meme` / `outro_meme` ({"prompt":...,
    "path":...}, no "type" needed since there's only one kind at that level) —
    the bookend shots get a contextual meme the same way every dialogue line
    already does."""
    ep = json.loads(episode_path.read_text())
    jobs = []
    for line in ep.get("lines", []):
        spec = line.get("screen")
        if isinstance(spec, dict) and spec.get("type") == "meme" and spec.get("prompt") and spec.get("path"):
            jobs.append({"prompt": spec["prompt"], "out": spec["path"]})
    for key in ("intro_meme", "outro_meme"):
        spec = ep.get(key)
        if isinstance(spec, dict) and spec.get("prompt") and spec.get("path"):
            jobs.append({"prompt": spec["prompt"], "out": spec["path"]})
    return jobs


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", help="JSON file: [{\"out\": ..., \"prompt\": ...}, ...]")
    parser.add_argument("--episode", help="episode.json — extracts a job from every line whose "
                                           "`screen` is {\"type\": \"meme\", \"prompt\": ..., \"path\": ...}")
    parser.add_argument("--prompt", help="Single job: the prompt")
    parser.add_argument("--out", help="Single job: output PNG path")
    parser.add_argument("--force", action="store_true", help="Regenerate even if cached")
    args = parser.parse_args()

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        sys.exit("OPENAI_API_KEY is not set.")

    if args.manifest:
        jobs = json.loads(Path(args.manifest).read_text())
    elif args.episode:
        jobs = extract_episode_jobs(Path(args.episode))
    elif args.prompt and args.out:
        jobs = [{"prompt": args.prompt, "out": args.out}]
    else:
        sys.exit("Usage: --manifest jobs.json OR --episode episode.json OR --prompt '...' --out path.png")

    if not jobs:
        print("No meme jobs found (no line has screen.type == \"meme\" with a \"prompt\").")
        return

    print(f"Generating {len(jobs)} screen meme(s) with {MODEL} ({QUALITY}, {GEN_SIZE}, in parallel)...")
    failures = 0
    # v9: was capped at 8 regardless of job count, so a 14-image episode ran
    # two waves instead of one. One thread per job — same reasoning as
    # batch_openai_tts.py's worker count: these are network-bound waits, not
    # CPU-bound work, and run_job now retries with backoff on 429/5xx so
    # firing every job at once is safe, not just fast.
    with ThreadPoolExecutor(max_workers=len(jobs)) as pool:
        futures = {pool.submit(run_job, job["prompt"], job["out"], api_key, args.force): job for job in jobs}
        for future in as_completed(futures):
            job = futures[future]
            try:
                print(f"  {future.result()}")
            except Exception as exc:
                failures += 1
                print(f"  FAILED {job['out']}: {exc}")

    print(f"Done. {len(jobs) - failures}/{len(jobs)} succeeded.")
    if failures:
        sys.exit(1)


if __name__ == "__main__":
    main()
