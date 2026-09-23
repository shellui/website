#!/usr/bin/env python3
"""Translate only frontmatter + safe prose lines (never Nunjucks/HTML attrs)."""
from __future__ import annotations

import importlib.util
from pathlib import Path

spec = importlib.util.spec_from_file_location("loc", Path(__file__).with_name("apply-it-locale.py"))
loc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(loc)

ROOT = Path("/workspace/src/it")
SKIP = {
    ROOT / "index.njk",
    ROOT / "company/contact/index.njk",
    ROOT / "company/contribute/index.md",
    ROOT / "guidelines/design/index.njk",
    ROOT / "guidelines/writing/index.njk",
    ROOT / "guidelines/web-design/index.njk",
    ROOT / "guidelines/index.njk",
    ROOT / "features/microfrontend/index.njk",
    ROOT / "features/ship/index.njk",
    ROOT / "features/chrome/index.njk",
    ROOT / "product/brand-assets/index.njk",
}


def safe_line(line: str) -> str:
    if any(x in line for x in ("{%", "{{", "}}", "%}", "XTK")):
        return line
    if "class=" in line or "href=" in line or "aria-" in line or "viewBox" in line:
        return line
    if line.strip().startswith(("{", "}", "|", "# Future", "```")):
        return line
    if line.strip().startswith('"') and ": " in line and "shellui" in line:
        return line
    return loc.translate_line(line)


def process(path: Path) -> None:
    import time

    lines = path.read_text().splitlines(keepends=True)
    out = []
    in_fm = fm = fence = highlight = False
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
        if line.strip().startswith("```"):
            fence = not fence
            out.append(line)
            continue
        if fence:
            out.append(line)
            continue
        out.append(safe_line(line))
        time.sleep(0.12)
    path.write_text("".join(out))
    print("ok", path.relative_to(ROOT))


def main() -> None:
    for p in sorted(ROOT.rglob("*")):
        if p.suffix not in {".njk", ".md"} or p.name == "it.json" or p in SKIP:
            continue
        process(p)


if __name__ == "__main__":
    main()
