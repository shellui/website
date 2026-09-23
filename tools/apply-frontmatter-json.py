#!/usr/bin/env python3
import json
import re
from pathlib import Path

data = json.loads(Path("/workspace/tools/it-frontmatter.json").read_text())
root = Path("/workspace/src/it")

for rel, fields in data.items():
    path = root / rel
    if not path.exists():
        continue
    text = path.read_text()
    for key, val in fields.items():
        pat = rf"^{re.escape(key)}:.*$"
        rep = f'{key}: "{val}"' if key in ("description", "heading", "lede") or "|" in val or "." in val else f"{key}: {val}"
        if key == "title" and "|" in val:
            rep = f"title: {val}"
        text, n = re.subn(pat, rep, text, count=1, flags=re.M)
    path.write_text(text)
    print("applied", rel)
