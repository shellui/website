"""Recolor the Shellui mark on the Introducing Shellui og:image PNGs.

The 1200x630 og PNGs for this post were exported without a generator in
this repo, so this script swaps the brand mark color in place. The mark is
black (ink) on the light image and white on the dark image, matching the
"Shellui" wordmark next to it.

Usage: python3 tools/og/recolor-blog-og-mark.py
"""
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
TOKENS = json.loads((ROOT / "tokens/tokens.json").read_text())


def hex_rgb(value):
    value = value.lstrip("#")
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


SOURCE = hex_rgb(TOKENS["gold"]["brand"]["$value"])
INK = (3, 7, 18)
WHITE = (255, 255, 255)
# Mark bounding box (x0, y0, x1, y1) in the 1200x630 layout, with margin.
BOX = (90, 90, 130, 138)
TARGETS = {
    "img/blog/introducing-shellui-1200x630.png": INK,
    "img/blog/introducing-shellui-1200x630-dark.png": WHITE,
}


def recolor(path, target):
    im = Image.open(path).convert("RGB")
    px = im.load()
    x0, y0, x1, y1 = BOX
    # Background sample just outside the mark.
    bg = px[x0 - 4, y0 - 4]
    span = (SOURCE[0] - SOURCE[2]) - (bg[0] - bg[2])
    for y in range(y0, y1):
        for x in range(x0, x1):
            r, g, b = px[x, y]
            t = ((r - b) - (bg[0] - bg[2])) / span
            if t <= 0.05:
                continue
            t = min(t, 1.0)
            px[x, y] = tuple(
                round(bg[i] * (1 - t) + target[i] * t) for i in range(3)
            )
    im.save(path, optimize=True)


for rel, color in TARGETS.items():
    recolor(ROOT / rel, color)
    print(f"recolored {rel}")
