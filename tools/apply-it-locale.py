#!/usr/bin/env python3
"""Translate src/it and locale guidelines EN→IT with base64-protected tokens."""
from __future__ import annotations

import base64
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path("/workspace/src/it")
GUIDE_OUT = Path("/workspace/content/locales/it/guidelines")

FRONT = ("title:", "description:", "heading:", "lede:", "eyebrow:")

PROTECT_RES = [
    re.compile(r"\{\{[^}]+\}\}"),
    re.compile(r"\{%[^%]+%\}"),
    re.compile(r"https?://[^\s\"')>]+"),
    re.compile(r"`[^`]+`"),
    re.compile(r"@[\w/-]+"),
    re.compile(r"/[\w./#-]+"),
    re.compile(r"<[^>]+>"),
    re.compile(r"\*\*Shellui\*\*"),
    re.compile(r"\bShellui\b"),
    re.compile(r"identity-service"),
    re.compile(r"storage-service"),
    re.compile(r"hosting-service"),
    re.compile(r"sign-in"),
    re.compile(r"signed-in"),
    re.compile(r"Apps and navigation"),
    re.compile(r"Web and desktop"),
    re.compile(r"Brand assets"),
    re.compile(r"LocalizedString"),
    re.compile(r"Supabase Auth"),
    re.compile(r"Supabase Storage"),
    re.compile(r"JSON Web Key Set \(JWKS\)"),
    re.compile(r"JSON Web Tokens \(JWTs\)"),
    re.compile(r"Model Context Protocol \(MCP\)"),
    re.compile(r"software development kit \(SDK\)"),
    re.compile(r"command-line interface \(CLI\)"),
    re.compile(r"Settings → [^.,\n]+"),
    re.compile(r"shellui\.config\.(?:json|ts)"),
    re.compile(r"@[\w./-]+"),
    re.compile(r"\{[^}]+\}"),
    re.compile(r'"[^"]*"'),
    re.compile(r"'[^']*'"),
]


def b64_protect(text: str) -> str:
    tokens: list[str] = []

    def repl(m: re.Match) -> str:
        tokens.append(m.group(0))
        enc = base64.urlsafe_b64encode(m.group(0).encode()).decode().rstrip("=")
        return f"XTK{enc}XTK"

    out = text
    for rx in PROTECT_RES:
        out = rx.sub(repl, out)
    return out, tokens


def b64_restore(text: str) -> str:
    def dec(m: re.Match) -> str:
        pad = "=" * (-len(m.group(1)) % 4)
        return base64.urlsafe_b64decode(m.group(1) + pad).decode()

    return re.sub(r"XTK([A-Za-z0-9_-]+)XTK", dec, text)


def tr(text: str) -> str:
    raw = text.strip()
    if not re.search(r"[A-Za-z]{2}", raw):
        return text
    protected, _ = b64_protect(raw)
    q = urllib.parse.quote(protected)
    url = f"https://api.mymemory.translated.net/get?q={q}&langpair=en|it"
    for attempt in range(6):
        try:
            with urllib.request.urlopen(url, timeout=60) as resp:
                data = json.load(resp)
            out = data["responseData"]["translatedText"]
            if "MYMEMORY WARNING" in out.upper():
                time.sleep(2 * (attempt + 1))
                continue
            return b64_restore(out)
        except Exception:
            time.sleep(1.5 * (attempt + 1))
    return text


def translate_front(line: str) -> str:
    if not any(line.startswith(k) for k in FRONT):
        return line
    key, _, val = line.partition(":")
    val = val.rstrip("\n")
    s = val.strip()
    if s.startswith('"') and s.endswith('"'):
        return f'{key}: "{tr(s[1:-1])}"\n'
    if s.startswith("'") and s.endswith("'"):
        return f"{key}: '{tr(s[1:-1])}'\n"
    return f"{key}: {tr(s)}\n"


def translate_line(line: str) -> str:
    s = line.strip()
    if not s or s.startswith("```") or s.startswith("# Future"):
        return line
    if s.startswith("---"):
        return line
    if "{%" in line and "<" not in line:
        return line
    if re.match(r"^[\d\s\W]+$", s):
        return line
    if s.startswith("|") and s.count("|") > 2:
        return line
    if "<" in line:

        def repl(m: re.Match) -> str:
            inner = m.group(1)
            if "{{" in inner or "{%" in inner:
                return m.group(0)
            if not re.search(r"[A-Za-z]{3}", inner):
                return m.group(0)
            return ">" + tr(inner) + "<"

        return re.sub(r">([^<>]+?)<", repl, line)
    if re.search(r"[A-Za-z]{3}", s) and not s.startswith("{"):
        translated = tr(s)
        return translated + ("\n" if line.endswith("\n") else "")
    return line


def process(path: Path) -> None:
    lines = path.read_text().splitlines(keepends=True)
    out: list[str] = []
    in_fm = fm = fence = False
    for line in lines:
        if line.strip() == "---":
            if not fm:
                in_fm = True
                fm = True
                out.append(line)
                continue
            if in_fm:
                in_fm = False
                out.append(line)
                continue
        if in_fm:
            out.append(translate_front(line) if any(line.startswith(k) for k in FRONT) else line)
            time.sleep(0.25)
            continue
        if line.strip().startswith("```"):
            fence = not fence
            out.append(line)
            continue
        if fence:
            out.append(line)
            continue
        out.append(translate_line(line))
        time.sleep(0.2)
    path.write_text("".join(out))
    print("ok", path.relative_to(path.anchor if path.is_relative_to(ROOT) else "/"), flush=True)


SKIP = {
    ROOT / "index.njk",
    ROOT / "company/contact/index.njk",
    ROOT / "company/contribute/index.md",
    ROOT / "guidelines/design/index.njk",
    ROOT / "guidelines/writing/index.njk",
    ROOT / "guidelines/web-design/index.njk",
    ROOT / "features/microfrontend/index.njk",
    ROOT / "features/ship/index.njk",
    ROOT / "features/chrome/index.njk",
    ROOT / "product/brand-assets/index.njk",
}


def main() -> None:
    for p in sorted(ROOT.rglob("*")):
        if p.suffix not in {".njk", ".md"} or p.name == "it.json" or p in SKIP:
            continue
        process(p)
    for name in ("writing.md", "web-design.md"):
        src = Path("/workspace/content/guidelines") / name
        dest = GUIDE_OUT / name
        dest.write_text(src.read_text())
        process(dest)


if __name__ == "__main__":
    main()
