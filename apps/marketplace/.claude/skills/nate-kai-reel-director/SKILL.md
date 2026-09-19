---
name: nate-kai-reel-director
description: Produce a Nate & Kai 9:16 vertical video (Reel/TikTok/Short) from an existing AutoNateAI research article, using the character-engine pipeline's `--format reel` path. Use this whenever the user asks for a reel, a short, a vertical video, a TikTok, or a 9:16 cut of an article — or says "the reel one" after already having a YouTube cut. Builds directly on the nate-kai-video-director skill's episode.json schema; load that skill first if you haven't already, this one only covers what's different for portrait.
---

# Nate & Kai Reel Director

Same character-engine pipeline as `nate-kai-video-director` (episode.json → OpenAI TTS + contextual gpt-image memes → rendered video), rendered with `--format reel` instead of `--format youtube`. This skill only documents what's actually different for portrait — read `nate-kai-video-director` first for the base schema, screen types, gesture reference, and render mechanics.

**Do not reuse a YouTube episode's full script for the reel.** A reel is its own tight, single-topic script, not the long-form video squeezed into a taller frame — see "One focused topic" below.

## What's different in reel

- **One focused topic, told with some depth — not a recap.** Pick the single most interesting angle in the article (the specific mechanism behind a number, not the number list) and stay on it start to finish. No side-quests into other stats the article covers — those are what the YouTube cut is for.
- **Duration: 45-55 seconds is the sweet spot, 60 seconds is the hard ceiling.** Keep each line's spoken audio under ~6 seconds for the quick back-and-forth cadence. Watch out: an "exaggerated"/comedic delivery (see Tone below) runs noticeably slower per word than plain delivery — a script that hits 40s read straight can hit 55s read with real comedic timing. Write shorter than you think you need to, render, check the actual `ffprobe` duration, and trim or restore lines from there rather than guessing twice.
- **Default tone: informal, shade-throwing, exaggerated, Black comedic voice** (AAVE, mild cursing where it lands, real roast energy) — this is the treatment that's actually worked for reels so far. Ask first only if the user's request suggests they want the more restrained professional tone instead (see `nate-kai-video-director`'s tone section). Put the direction in each line's `voice_instructions`, not in the spoken text itself, though a little profanity in the text ("damn," "dead ass") is fine and more reliable than hoping the model ad-libs one.
- **The dialogue builds curiosity — it is not the ad.** End on a line that makes people want to know more (a cliffhanger, "that's only half the story") rather than a direct pitch. The outro/CTA screen (already built, don't touch its mechanics) is the actual promotional beat — keep the promotion there, not in the jokes.
- **The screen is a picture-in-picture panel, not part of the camera shot.** In 16:9, the camera crops the speaking anchor and the shared screen together. In portrait that's impossible without a distant, tiny-subject wide shot (the screen sits ~900px outboard of each mark — see `camera.py`'s `REEL_PANEL_H` comment) — so reel instead composites the screen as a fixed panel across the top of frame, with the character cropped into the space below it. This is already fully built; you don't need to touch `camera.py` or `make_episode.py` to use it, just render with `--format reel` and it happens automatically for every line plus the intro/outro.
- **No burned-in caption bar.** Reel is audio-first — only a small brand pill and footer, no karaoke-style dialogue text. Don't add one back.
- **Camera still cuts per line, favoring whoever's speaking** — inherited automatically, same push-transition as youtube. This is what gives reel the same "quick switching" feel as the 16:9 cut; nothing to configure.
- **Reuse images across script rewrites.** If you're iterating on the dialogue but a line's visual beat hasn't changed, leave that line's `screen.prompt` and `screen.path` exactly as they were — the meme generator caches by prompt, so unchanged prompts never re-hit the image API. Only write a new prompt when the actual visual concept for that line changes. (Only regenerate images when the user actually asks for new ones — "the images are fine on this one" means don't touch them.)

## Render

```bash
OPENAI_API_KEY=<key> USE_OPENAI_TTS=true python3 character-engine/tools/make_episode.py \
  character-engine/episodes/<slug>/episode.json --format reel
```

Everything else (caching, worker parallelism, the generation-phase timing breakdown) works exactly as documented in `nate-kai-video-director`.

## QA — reel-specific checks

Do the base skill's QA pass, plus:

- **Screen panel** sits with real margin from the top edge, not touching it.
- **No screen bleed into the character region.** Look at the top-left and top-right corners of the character crop (just below the panel) on a few different lines/gestures — there should be nothing there but grid floor. If you see any sliver of color or a border line at those corners, the camera window is reaching into the shared screen's stage-space bounds again; that's `camera.single_shot_portrait`'s clamp (`screen_left`/`screen_right` vs `window["center_x"]`) — don't loosen it without re-verifying against both anchors' marks.
- **No caption bar anywhere.** If one appears, `build_line_overlay`'s reel branch has regressed.
- **Outro is vertically balanced** — the meme card and the CTA card should read as one centered group with roughly equal empty space above and below, not hugging the top with a big gap before the CTA card.
- **Actual duration via `ffprobe`** is 45-60s. If it's under 45s, lengthen a line or two (this is what "sweet spot" reactions actually looked like across real renders — see the durations above); if it's near or over 60s, trim rather than dropping the exaggerated tone.
