#!/usr/bin/env python3
"""Translate markdown locale files (prose only, preserve coit/links)."""
from __future__ import annotations

import re
import sys
from pathlib import Path

import argostranslate.translate

ROOT = Path(__file__).resolve().parents[1]


def protect(line: str, slots: list[str]) -> str:
    patterns = [
        r"```[\s\S]*?```",
        r"`[^`]+`",
        r"\[[^\]]+\]\([^)]+\)",
        r"https?://[^\s)>\"]+",
        r"`[^`]*`",
    ]

    def stash(m: re.Match[str]) -> str:
        slots.append(m.group(0))
        return f"XTK{len(slots) - 1:04d}XTK"

    out = line
    for _ in range(3):
        for pat in [r"`[^`]+`", r"\[[^\]]+\]\([^)]+\)", r"https?://[^\s)>\"]+"]:
            out = re.sub(pat, stash, out)
    return out


def restore(text: str, slots: list[str]) -> str:
    for i, val in enumerate(slots):
        text = text.replace(f"XTK{i:04d}XTK", val)
        text = re.sub(rf"\bPH{i}\b", val, text)
    return text


def tr(line: str) -> str:
    if not re.search(r"[A-Za-z]{4}", line):
        return line
    slots: list[str] = []
    p = protect(line, slots)
    if not re.search(r"[A-Za-z]{4}", p):
        return line
    try:
        out = argostranslate.translate.translate(p, "en", "it")
    except Exception as e:  # noqa: BLE001
        print("err", e, file=sys.stderr)
        return line
    out = restore(out, slots)
    fixes = [
        ("kratzen", "scrapen"),
        ("Kratzen", "Scrapen"),
        ("Schiffe heute", "was heute ausgeliefert wird"),
        ("Der Gastgeber", "The Host"),
        ("Markt Ideen", "Marketplace-Ideen"),
        ("Marktplace", "Marketplace"),
        ("Benutzeroberfläche", "UI"),
        ("Spielplatz", "Playground"),
        ("Geschwister", "Sibling"),
        ("Publikum", "Zielgruppe"),
    ]
    for a, b in fixes:
        out = out.replace(a, b)
    return out


def translate_md(path: Path) -> None:
    raw = path.read_text(encoding="utf-8")
    fm, body = "", raw
    if raw.startswith("---\n"):
        end = raw.find("\n---\n", 4)
        if end != -1:
            fm = raw[4:end]
            body = raw[end + 5 :]
    fm_lines = []
    for line in fm.split("\n"):
        if line.startswith("title:"):
            val = line.split(":", 1)[1].strip()
            fm_lines.append(f"title: {tr(val)}")
        elif line.startswith("description:"):
            val = line.split(":", 1)[1].strip()
            fm_lines.append(f"description: {tr(val)}")
        else:
            fm_lines.append(line)
    new_fm = "\n".join(fm_lines)
    out_lines = []
    in_fence = False
    for line in body.split("\n"):
        if line.strip().startswith("```"):
            in_fence = not in_fence
            out_lines.append(line)
            continue
        if in_fence or not line.strip():
            out_lines.append(line)
            continue
        if line.startswith("|") and "|" in line[1:]:
            # table: translate header cells only if text
            if re.match(r"^\|[-:\s|]+\|$", line.strip()):
                out_lines.append(line)
            else:
                cells = line.split("|")
                new_cells = []
                for c in cells:
                    if re.search(r"[A-Za-z]{3}", c) and "`" not in c:
                        new_cells.append(tr(c))
                    else:
                        new_cells.append(c)
                out_lines.append("|".join(new_cells))
            continue
        out_lines.append(tr(line))
    path.write_text(f"---\n{new_fm}\n---\n" + "\n".join(out_lines), encoding="utf-8")
    print("OK", path)


def main() -> None:
    for p in [
        ROOT / "content/locales/it/guidelines/design.md",
        ROOT / "content/locales/it/guidelines/web-design.md",
        ROOT / "content/locales/it/guidelines/writing.md",
        ROOT / "src/it/blog/introducing-shellui.md",
        ROOT / "src/it/company/contribute/index.md",
        ROOT / "src/it/company/legal/index.md",
    ]:
        translate_md(p)


if __name__ == "__main__":
    main()
