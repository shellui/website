#!/usr/bin/env python3
import importlib.util
import time
from pathlib import Path

spec = importlib.util.spec_from_file_location("loc", Path(__file__).with_name("apply-it-locale.py"))
loc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(loc)

root = Path("/workspace/src/it")
skip_paths = {
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

for p in sorted(root.rglob("*")):
    if p.suffix not in {".njk", ".md"} or p.name == "it.json":
        continue
    rel = str(p.relative_to(root)).replace("\\", "/")
    if rel in skip_paths:
        continue
    lines = p.read_text().splitlines(keepends=True)
    out = []
    in_fm = fm = False
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
        if in_fm and any(line.startswith(k) for k in loc.FRONT):
            out.append(loc.translate_front(line))
            time.sleep(0.15)
        else:
            out.append(line)
    p.write_text("".join(out))
    print("fm", rel, flush=True)
