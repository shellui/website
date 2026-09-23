#!/usr/bin/env python3
"""Second pass: translate text segments between HTML tags in DE locale files."""
from __future__ import annotations

import re
from pathlib import Path

import argostranslate.translate

ROOT = Path(__file__).resolve().parents[1]
PATHS = list((ROOT / "src" / "de").rglob("*.njk")) + [
    ROOT / "src/de/pricing/index.md",
]


def tr(text: str) -> str:
    t = text.strip()
    if not t or not re.search(r"[A-Za-z]{4}", t):
        return text
    if re.search(r"[äöüÄÖÜß]", text) or re.search(
        r"\b(und|der|die|das|ist|sind|dein|deine|eine|nicht|mit|für|wird|kann|sind|auf|aus)\b",
        text,
        re.I,
    ):
        return text
    if t in {"→", "·", "&darr;"}:
        return text
    brand = []
    def stash(m):
        brand.append(m.group(0))
        return f"BRAND{len(brand)-1}"
    protected = re.sub(r"Shellui|@shellui/[a-z-]+|identity-service|storage-service|shellui\.[a-z.]+", stash, text)
    try:
        out = argostranslate.translate.translate(protected, "en", "de")
    except Exception:
        return text
    for i, b in enumerate(brand):
        out = out.replace(f"BRAND{i}", b)
    fixes = [
        ("Du rufen", "Apps rufen"),
        ("Du können", "Du kannst"),
        ("Verfolgen Du", "Verfolge"),
        ("behalten Du", "behalte"),
        ("tauschen Du", "tausche"),
        ("Setzen Du", "Setze"),
        ("Sehen Du", "Alle Funktionen ansehen"),
        ("Merkmale", "Funktionen"),
        ("Identitätsdienst", "identity-service"),
        ("Geben Du", "Gib"),
        ("Schellfisch", "Shellui"),
    ]
    for a, b in fixes:
        out = out.replace(a, b)
    # preserve leading/trailing space from original
    lead = re.match(r"^\s*", text).group(0)
    trail = re.search(r"\s*$", text).group(0)
    return lead + out.strip() + trail


def translate_mixed(html: str) -> str:
    parts = re.split(r"(<[^>]+>)", html)
    out = []
    for p in parts:
        if p.startswith("<"):
            out.append(p)
        elif re.search(r"[A-Za-z]{4}", p):
            out.append(tr(p))
        else:
            out.append(p)
    return "".join(out)


def process_file(path: Path) -> None:
    raw = path.read_text(encoding="utf-8")
    fm, body = "", raw
    if raw.startswith("---\n"):
        end = raw.find("\n---\n", 4)
        if end != -1:
            fm = raw[: end + 5]
            body = raw[end + 5 :]
    # skip nunjucks blocks and code highlights
    chunks = re.split(r"(\{%[\s\S]*?%\}|\{% highlight[\s\S]*?\{% endhighlight %\})", body)
    new_chunks = []
    for ch in chunks:
        if ch.startswith("{%"):
            new_chunks.append(ch)
        else:
            new_chunks.append(translate_mixed(ch))
    path.write_text(fm + "".join(new_chunks), encoding="utf-8")
    print("OK", path.relative_to(ROOT))


for p in PATHS:
    process_file(p)
