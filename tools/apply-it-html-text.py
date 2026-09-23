#!/usr/bin/env python3
"""Translate src/it by copying EN and replacing HTML text nodes + frontmatter."""
from __future__ import annotations

import importlib.util
import re
import time
from pathlib import Path

spec = importlib.util.spec_from_file_location("loc", Path(__file__).with_name("apply-it-locale.py"))
loc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(loc)

ROOT_EN = Path("/workspace/src")
ROOT_IT = Path("/workspace/src/it")
SKIP = {
    "index.njk",
    "company/contact/index.njk",
    "company/contribute/index.md",
    "guidelines/design/index.njk",
    "guidelines/writing/index.njk",
    "guidelines/web-design/index.njk",
    "guidelines/index.njk",
    "features/microfrontend/index.njk",
    "features/ship/index.njk",
    "features/chrome/index.njk",
    "product/brand-assets/index.njk",
}


def rel_paths():
    for en in ROOT_EN.rglob("*"):
        if en.suffix not in {".njk", ".md"}:
            continue
        rel = en.relative_to(ROOT_EN)
        if rel.parts[0] in {"it", "de", "fr", "_includes", "_data", "blocks", "islands"}:
            continue
        if en.name in {"llms.njk", "robots.njk", "sitemap.njk", "feed.njk"}:
            continue
        rs = str(rel).replace("\\", "/")
        if rs in SKIP:
            continue
        yield rel


def translate_file(rel: Path) -> None:
    en = ROOT_EN / rel
    it = ROOT_IT / rel
    text = en.read_text()
    lines = text.splitlines(keepends=True)
    out: list[str] = []
    in_fm = fm = False
    highlight = False
    for line in lines:
        if "{% highlight" in line:
            highlight = True
            out.append(line)
            continue
        if highlight:
            out.append(line)
            if "{% endhighlight" in line:
                highlight = False
            continue
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
            out.append(loc.translate_front(line) if any(line.startswith(k) for k in loc.FRONT) else line)
            time.sleep(0.2)
            continue
        if any(x in line for x in ("{%", "{{")):
            out.append(line)
            continue
        if rel.suffix == ".md" and not line.strip().startswith(("#", "-", "*", "|", ">")):
            if line.strip() and not line.strip().startswith("```"):
                out.append(loc.tr(line.rstrip("\n")) + ("\n" if line.endswith("\n") else ""))
                time.sleep(0.15)
                continue

        def repl(m: re.Match[str]) -> str:
            inner = m.group(1)
            if not re.search(r"[A-Za-z]{3}", inner):
                return m.group(0)
            return ">" + loc.tr(inner) + "<"

        out.append(re.sub(r">([^<>]+?)<", repl, line))
        time.sleep(0.08)
    it.parent.mkdir(parents=True, exist_ok=True)
    it.write_text("".join(out))
    print("ok", rel, flush=True)


def main() -> None:
    for rel in sorted(rel_paths()):
        translate_file(rel)


if __name__ == "__main__":
    main()
