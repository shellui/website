#!/usr/bin/env python3
"""Translate user-facing English in src/it pages to Italian (MyMemory API)."""
from __future__ import annotations

import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path("/workspace/src/it")
SKIP = {"it.json"}

FRONT_KEYS = ("title:", "description:", "heading:", "lede:", "eyebrow:")

KEEP = re.compile(
    r"(\{\{[^}]+\}\}|\{%[^%]+%\}|https?://[^\s\"')>]+|`[^`]+`|@[\w/-]+|"
    r"/[\w./#-]+|\*\*Shellui\*\*|\bShellui\b|\b[a-z]+(?:-[a-z0-9]+)+\b|"
    r"<[^>]+>|\"[^\"]*\"|'[^']*'|\{[^}]+\}|&[a-z]+;)"
)


def mymemory(text: str) -> str:
    q = urllib.parse.quote(text.strip())
    url = f"https://api.mymemory.translated.net/get?q={q}&langpair=en|it"
    for attempt in range(6):
        try:
            with urllib.request.urlopen(url, timeout=60) as resp:
                data = json.load(resp)
            out = data["responseData"]["translatedText"]
            if out.upper().startswith("MYMEMORY WARNING"):
                time.sleep(2 * (attempt + 1))
                continue
            return out
        except Exception:
            time.sleep(1.5 * (attempt + 1))
    return text


def translate_text(text: str) -> str:
    if not text or not re.search(r"[A-Za-z]{2}", text):
        return text
    parts: list[str] = []
    last = 0
    for m in KEEP.finditer(text):
        if m.start() > last:
            chunk = text[last : m.start()]
            if chunk.strip():
                parts.append(mymemory(chunk))
                time.sleep(0.25)
            else:
                parts.append(chunk)
        parts.append(m.group(0))
        last = m.end()
    if last < len(text):
        chunk = text[last:]
        if chunk.strip() and re.search(r"[A-Za-z]{2}", chunk):
            parts.append(mymemory(chunk))
            time.sleep(0.25)
        else:
            parts.append(chunk)
    return "".join(parts)


def translate_line(line: str) -> str:
    stripped = line.strip()
    if any(stripped.startswith(k) for k in FRONT_KEYS):
        key, _, val = line.partition(":")
        val = val.strip()
        if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
            quote = val[0]
            inner = val[1:-1]
            return f"{key}: {quote}{translate_text(inner)}{quote}\n"
        return f"{key}: {translate_text(val.strip())}\n"

    if stripped.startswith("```") or stripped.startswith("#") and stripped.startswith("##"):
        return line
    if "{%" in line and "{{" not in line and "<" not in line:
        return line
    if not re.search(r"[A-Za-z]{3}", line):
        return line
    if "class=" in line and "<" in line:

        def repl(m: re.Match[str]) -> str:
            inner = m.group(1)
            if "{{" in inner or "{%" in inner:
                return m.group(0)
            if not re.search(r"[A-Za-z]{3}", inner):
                return m.group(0)
            return ">" + translate_text(inner) + "<"

        return re.sub(r">([^<>]+)<", repl, line)
    if line.startswith("    ") and "{{" in line:
        return line
    return translate_text(line.rstrip("\n")) + ("\n" if line.endswith("\n") else "")


def translate_file(path: Path) -> None:
    raw = path.read_text()
    lines = raw.splitlines(keepends=True)
    out: list[str] = []
    in_fm = False
    fm_done = False
    in_fence = False

    for line in lines:
        if line.strip() == "---":
            if not fm_done and not in_fm:
                in_fm = True
                out.append(line)
                continue
            if in_fm:
                in_fm = False
                fm_done = True
                out.append(line)
                continue
        if in_fm:
            out.append(translate_line(line) if any(line.strip().startswith(k) for k in FRONT_KEYS) else line)
            continue
        if line.strip().startswith("```"):
            in_fence = not in_fence
            out.append(line)
            continue
        if in_fence:
            out.append(line)
            continue
        if line.lstrip().startswith("# Future screenshot"):
            out.append(line)
            continue
        out.append(translate_line(line))

    path.write_text("".join(out))
    print("ok", path.relative_to(ROOT), flush=True)


def main() -> None:
    skip_paths = {
        ROOT / "index.njk",
        ROOT / "guidelines/design/index.njk",
        ROOT / "guidelines/writing/index.njk",
        ROOT / "guidelines/web-design/index.njk",
        ROOT / "company/contact/index.njk",
        ROOT / "company/contribute/index.md",
    }
    files = sorted(
        p
        for p in ROOT.rglob("*")
        if p.suffix in {".njk", ".md"} and p.name not in SKIP and p not in skip_paths
    )
    for p in files:
        translate_file(p)


if __name__ == "__main__":
    main()
