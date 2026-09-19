#!/usr/bin/env python3
"""
Generate the neon-cyberpunk newsroom set: assets/sets/bg_newsroom.png (1920x1080).

Procedural, no external art: gradient sky, city skyline with lit windows, a
retrowave perspective grid floor, a glossy anchor desk with a neon edge-light,
and a logo bug. Lower-third / caption text is drawn later, per-line, by
tools/make_episode.py on a copy of this base.

Every semi-transparent element is drawn on its own RGBA layer and merged with
Image.alpha_composite — drawing partial-alpha shapes directly onto a live RGBA
canvas doesn't blend in Pillow, it just overwrites, so this matters.

Run: python3 tools/make_background.py
"""
import random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1920, 1080
HORIZON = 620          # where sky/skyline meets the grid floor
DESK_TOP = 760          # where the desk front panel begins
random.seed(7)

CYAN = (80, 240, 230)
MAGENTA = (255, 60, 190)
AMBER = (255, 190, 90)

FONT_DIR = "/System/Library/Fonts/Supplemental/"


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def new_layer():
    return Image.new("RGBA", (W, H), (0, 0, 0, 0))


def sky_gradient():
    top = (10, 6, 28)
    mid = (40, 12, 62)
    low = (14, 8, 24)
    arr = np.zeros((HORIZON, W, 3), dtype=np.uint8)
    for y in range(HORIZON):
        t = y / HORIZON
        if t < 0.55:
            c = lerp(top, mid, t / 0.55)
        else:
            c = lerp(mid, low, (t - 0.55) / 0.45)
        arr[y, :, :] = c
    return Image.fromarray(arr, "RGB")


def add_stars(layer, n=140):
    draw = ImageDraw.Draw(layer)
    for _ in range(n):
        x = random.randint(0, W - 1)
        y = random.randint(0, int(HORIZON * 0.7))
        r = random.choice([1, 1, 1, 2])
        a = random.randint(60, 170)
        draw.ellipse([x, y, x + r, y + r], fill=(255, 255, 255, a))


def add_skyline(layer, base_y, color, jitter, win_color, seed):
    """Buildings are opaque so a direct draw is fine; windows blend against
    whatever building pixel is under them, so they go through this same layer
    but with alpha, then the whole layer is alpha_composite'd once."""
    rnd = random.Random(seed)
    draw = ImageDraw.Draw(layer)
    x = -20
    while x < W + 20:
        bw = rnd.randint(60, 140)
        bh = rnd.randint(int(jitter * 0.4), jitter)
        top = base_y - bh
        draw.rectangle([x, top, x + bw, base_y + 4], fill=color)
        rows = max(1, bh // 22)
        cols = max(1, bw // 18)
        for r in range(rows):
            for c in range(cols):
                if rnd.random() < 0.22:
                    wx = x + 6 + c * 18
                    wy = top + 8 + r * 22
                    if wx + 6 < x + bw and wy + 10 < base_y:
                        draw.rectangle([wx, wy, wx + 6, wy + 10], fill=win_color)
        x += bw + rnd.randint(6, 20)


def horizon_glow(layer):
    glow = Image.new("RGBA", (W, 260), (0, 0, 0, 0))
    d = ImageDraw.Draw(glow)
    for i in range(130):
        a = int(90 * (1 - i / 130))
        c = lerp(CYAN, MAGENTA, i / 130) if i % 2 == 0 else lerp(MAGENTA, CYAN, i / 130)
        d.line([(0, 130 - i), (W, 130 - i)], fill=c + (a,), width=2)
    glow = glow.filter(ImageFilter.GaussianBlur(18))
    layer.alpha_composite(glow, (0, HORIZON - 140))


def grid_floor(layer):
    """Retrowave perspective grid from the horizon down to the desk."""
    draw = ImageDraw.Draw(layer)
    vp = (W // 2, HORIZON - 6)
    span = DESK_TOP - HORIZON
    n_rays = 22
    for i in range(n_rays + 1):
        t = i / n_rays
        x_bottom = int(-W * 0.4 + t * W * 1.8)
        draw.line([vp, (x_bottom, DESK_TOP)], fill=CYAN + (140,), width=1)
    n_rungs = 14
    for j in range(1, n_rungs + 1):
        t = (j / n_rungs) ** 1.8
        y = int(HORIZON + t * span)
        a = int(60 + 140 * t)
        draw.line([(0, y), (W, y)], fill=MAGENTA + (min(a, 200),), width=1)


def desk(canvas):
    """Opaque desk panel — safe to draw directly on the base canvas."""
    draw = ImageDraw.Draw(canvas)
    for y in range(DESK_TOP, H):
        t = (y - DESK_TOP) / (H - DESK_TOP)
        c = lerp((18, 14, 30), (6, 4, 12), t)
        draw.line([(0, y), (W, y)], fill=c + (255,))
    edge = Image.new("RGBA", (W, 40), (0, 0, 0, 0))
    ed = ImageDraw.Draw(edge)
    for x in range(W):
        c = lerp(CYAN, MAGENTA, x / W)
        ed.line([(x, 14), (x, 22)], fill=c + (255,))
    edge = edge.filter(ImageFilter.GaussianBlur(3))
    canvas.alpha_composite(edge, (0, DESK_TOP - 12))
    # subtle reflection streaks on their own layer so the low alpha actually blends
    streaks = new_layer()
    sd = ImageDraw.Draw(streaks)
    for _ in range(10):
        x = random.randint(0, W)
        w = random.randint(40, 160)
        a = random.randint(6, 18)
        sd.polygon([(x, DESK_TOP + 10), (x + w, DESK_TOP + 10),
                    (x + w - 30, H), (x - 30, H)], fill=(255, 255, 255, a))
    canvas.alpha_composite(streaks)


def logo_bug(canvas):
    try:
        f_title = ImageFont.truetype(FONT_DIR + "Futura.ttc", 46, index=0)
        f_sub = ImageFont.truetype(FONT_DIR + "Arial Bold.ttf", 20)
    except Exception:
        f_title = ImageFont.load_default()
        f_sub = ImageFont.load_default()
    x, y = 56, 46
    glow = Image.new("RGBA", (520, 100), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.text((0, 0), "THE BRIEF", font=f_title, fill=CYAN + (255,))
    glow = glow.filter(ImageFilter.GaussianBlur(6))
    canvas.alpha_composite(glow, (x - 4, y - 4))
    draw = ImageDraw.Draw(canvas)
    draw.text((x, y), "THE BRIEF", font=f_title, fill=(235, 255, 253, 255))
    draw.text((x + 4, y + 54), "AI & TECH — TRANSLATED", font=f_sub, fill=MAGENTA + (230,))


def vignette(canvas):
    v = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(v)
    d.ellipse([-W * 0.25, -H * 0.35, W * 1.25, H * 1.25], fill=255)
    v = v.filter(ImageFilter.GaussianBlur(180))
    va = np.array(v).astype(np.float32)
    dark_amount = np.clip(90 - va * (90 / 255), 0, 90).astype(np.uint8)
    layer = new_layer()
    layer.putalpha(Image.fromarray(dark_amount, "L"))
    canvas.alpha_composite(layer)


def main():
    canvas = Image.new("RGBA", (W, H), (10, 6, 22, 255))
    sky = sky_gradient().convert("RGBA")
    canvas.alpha_composite(sky, (0, 0))

    stars = new_layer()
    add_stars(stars)
    canvas.alpha_composite(stars)

    sky_buildings = new_layer()
    add_skyline(sky_buildings, base_y=HORIZON - 40, color=(24, 16, 46, 255), jitter=210,
                win_color=(140, 230, 255, 210), seed=1)
    canvas.alpha_composite(sky_buildings)

    near_buildings = new_layer()
    add_skyline(near_buildings, base_y=HORIZON - 4, color=(14, 9, 30, 255), jitter=140,
                win_color=(255, 200, 140, 230), seed=2)
    canvas.alpha_composite(near_buildings)

    horizon_glow(canvas)

    grid = new_layer()
    grid_floor(grid)
    canvas.alpha_composite(grid)

    desk(canvas)
    logo_bug(canvas)
    vignette(canvas)

    out = canvas.convert("RGB")
    out.save("assets/sets/bg_newsroom.png")
    print("wrote assets/sets/bg_newsroom.png", out.size)


if __name__ == "__main__":
    main()
