#!/usr/bin/env python3
"""Translate src/de Nunjucks: frontmatter + visible tag text (Argos)."""
from __future__ import annotations

import re
import sys
from pathlib import Path

import argostranslate.translate

ROOT = Path(__file__).resolve().parents[1]
DE = ROOT / "src" / "de"

FM_KEYS = {
    "title",
    "description",
    "heading",
    "lede",
    "eyebrow",
    "imageAlt",
    "authorRole",
    "category",
}

TAGS = (
    "h1",
    "h2",
    "h3",
    "h4",
    "p",
    "a",
    "button",
    "li",
    "dt",
    "dd",
    "th",
    "td",
    "time",
    "label",
    "figcaption",
    "title",
)


def tr(text: str) -> str:
    text = text.strip()
    if not text or not re.search(r"[A-Za-z]{3}", text):
        return text
    slots: list[str] = []

    def stash(m: re.Match[str]) -> str:
        slots.append(m.group(0))
        return f"ZZZSLOT{len(slots) - 1:04d}ZZZ"

    protected = text
    for pat in [r"\{\{[^}]+\}\}", r"\{%[^%]+%\}", r"`[^`]+`"]:
        protected = re.sub(pat, stash, protected)
    try:
        out = argostranslate.translate.translate(protected, "en", "de")
    except Exception as e:  # noqa: BLE001
        print("err", text[:40], e, file=sys.stderr)
        return text
    for i, val in enumerate(slots):
        out = out.replace(f"ZZZSLOT{i:04d}ZZZ", val)
    fixes = [
        ("Schiff früher", "Schneller liefern"),
        ("Offener Spielplatz", "Playground öffnen"),
        ("Beginn", "Loslegen"),
        ("Kopie", "Kopieren"),
        ("Lesen Sie das Changelog", "Changelog lesen"),
        ("Kontaktieren Sie uns", "Kontakt"),
        ("Quelle auf GitHub", "Quellcode auf GitHub"),
        ("Ihr ", "Dein "),
        ("Ihre ", "Deine "),
        ("Ihrem ", "Deinem "),
        ("Ihren ", "Deinen "),
        ("Sie ", "Du "),
        ("Geben Sie diese Anweisung an Ihren Agenten", "Gib deinem Agenten diese Anweisung"),
    ]
    for a, b in fixes:
        out = out.replace(a, b)
    return out


def fm_translate(fm: str) -> str:
    out = []
    for line in fm.split("\n"):
        m = re.match(r"^(\s*([\w-]+):\s*)(.*)$", line)
        if not m or m.group(2) not in FM_KEYS:
            out.append(line)
            continue
        prefix, rest = m.group(1), m.group(3).strip()
        quote = ""
        val = rest
        if (val.startswith('"') and val.endswith('"')) or (
            val.startswith("'") and val.endswith("'")
        ):
            quote = val[0]
            val = val[1:-1]
        if m.group(2) == "title" and "Shellui" in val and "|" in val:
            left, _, right = val.partition("|")
            if "Shellui" in left:
                tr_title = tr(left.strip())
                val = f"{tr_title} | Shellui"
            else:
                val = f"{left.strip()} | {tr(right.strip())}"
        else:
            val = tr(val)
        out.append(f"{prefix}{quote}{val}{quote}")
    return "\n".join(out)


def body_translate(body: str) -> str:
    for tag in TAGS:
        pat = rf"(<{tag}\b[^>]*>)([\s\S]*?)(</{tag}>)"

        def repl(m: re.Match[str]) -> str:
            open_, inner, close = m.group(1), m.group(2), m.group(3)
            if 'aria-hidden="true"' in open_ and tag == "span":
                return m.group(0)
            if "{%" in inner or "{{" in inner:
                return m.group(0)
            if inner.strip().startswith("<"):
                return m.group(0)
            if not re.search(r"[A-Za-z]{3}", inner):
                return m.group(0)
            lead = re.match(r"^\s*", inner).group(0)
            trail = re.search(r"\s*$", inner).group(0)
            core = inner.strip()
            if core in ("→", "·"):
                return m.group(0)
            return f"{open_}{lead}{tr(core)}{trail}{close}"

        body = re.sub(pat, repl, body, flags=re.IGNORECASE)
    body = re.sub(
        r'(aria-label=")([^"]+)(")',
        lambda m: m.group(1) + tr(m.group(2)) + m.group(3),
        body,
    )
    # Alpine x-text strings
    body = re.sub(
        r"x-text=\"([^\"]+)\"",
        lambda m: f'x-text="{tr(m.group(1))}"' if re.search(r"[A-Za-z]{3}", m.group(1)) else m.group(0),
        body,
    )
    # Mixed nunjucks text lines
    body = re.sub(
        r"(v\{\{ productVersion \}\}) is out",
        r"\1 ist da",
        body,
    )
    return body


def process(path: Path) -> None:
    raw = path.read_text(encoding="utf-8")
    fm, body = "", raw
    if raw.startswith("---\n"):
        end = raw.find("\n---\n", 4)
        if end != -1:
            fm = raw[4:end]
            body = raw[end + 5 :]
    new = f"---\n{fm_translate(fm)}\n---\n{body_translate(body)}" if fm else body_translate(body)
    path.write_text(new, encoding="utf-8")
    print("OK", path.relative_to(ROOT))


def main() -> None:
    for p in sorted(DE.rglob("*.njk")):
        process(p)
    pricing = DE / "pricing" / "index.md"
    if pricing.exists():
        raw = pricing.read_text(encoding="utf-8")
        fm, body = "", raw
        if raw.startswith("---\n"):
            end = raw.find("\n---\n", 4)
            fm = raw[4:end]
            body = raw[end + 5 :]
        pricing.write_text(
            f"---\n{fm_translate(fm)}\n---\n{body_translate(body)}",
            encoding="utf-8",
        )
        print("OK", pricing.relative_to(ROOT))


if __name__ == "__main__":
    main()
