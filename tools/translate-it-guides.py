#!/usr/bin/env python3
import importlib.util
from pathlib import Path

spec = importlib.util.spec_from_file_location("tip", Path(__file__).with_name("translate-it-pages.py"))
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

GUIDES = Path("/workspace/content/guidelines")
OUT = Path("/workspace/content/locales/it/guidelines")

for name in ("writing.md", "web-design.md"):
    src = GUIDES / name
    dest = OUT / name
    dest.write_text(src.read_text())
    mod.translate_file(dest)
    print("guide", name, flush=True)
