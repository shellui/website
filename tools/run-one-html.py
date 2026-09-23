from importlib.machinery import SourceFileLoader
from pathlib import Path

m = SourceFileLoader("h", "/workspace/tools/apply-it-html-text.py").load_module()
m.translate_file(Path("404.njk"))
print("done")
