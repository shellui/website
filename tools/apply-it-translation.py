#!/usr/bin/env python3
"""Safe IT translation: frontmatter + visible text nodes (Argos offline)."""
from __future__ import annotations

import re
import sys
from pathlib import Path

import argostranslate.translate

ROOT = Path(__file__).resolve().parents[1]
IT_SRC = ROOT / "src" / "it"
IT_GUIDELINES = ROOT / "content" / "locales" / "it" / "guidelines"

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

TAGS = ("h1", "h2", "h3", "h4", "p", "span", "a", "button", "li", "dt", "dd", "th", "td", "time", "label", "figcaption", "option", "title")


def protect(text: str) -> tuple[str, list[str]]:
    slots: list[str] = []
    patterns = [
        r"```[\s\S]*?```",
        r"`[^`\n]+`",
        r"\{%[\s\S]*?%\}",
        r"\{\{[\s\S]*?\}\}",
        r"https?://[^\s\"'<>]+",
        r"mailto:[^\s\"'<>]+",
        r"/[a-zA-Z0-9_./-]+",
    ]

    def stash(m: re.Match[str]) -> str:
        slots.append(m.group(0))
        return f"XTK{len(slots) - 1:04d}XTK"

    out = text
    for pat in patterns:
        out = re.sub(pat, stash, out)
    return out, slots


def restore(text: str, slots: list[str]) -> str:
    for i, val in enumerate(slots):
        for token in (
            f"XTK{i:04d}XTK",
            f"__PH{i}__",
            f" PH{i} ",
            f" PH{i}>",
            f"< PH{i} ",
        ):
            text = text.replace(token, val)
        text = re.sub(rf"\bPH{i}\b", val, text)
    return text


def translate_en_it(text: str) -> str:
    text = text.strip()
    if not text or not re.search(r"[A-Za-z]{3}", text):
        return text
    protected, slots = protect(text)
    if not re.search(r"[A-Za-z]{3}", protected):
        return text
    try:
        out = argostranslate.translate.translate(protected, "en", "it")
    except Exception as exc:  # noqa: BLE001
        print("err", text[:50], exc, file=sys.stderr)
        return text
    out = restore(out, slots)
    fixes = [
        ("identità-servizio", "identity-service"),
        ("servizio di identità", "identity-service"),
        ("magazzino", "storage-service"),
        ("Parco giochi", "Playground"),
        ("Condividi su Twitter", "Funzionalità"),
        ("Umans", "Humans"),
        ("Shell UI", "Shellui"),
    ]
    for a, b in fixes:
        out = out.replace(a, b)
    return out


def translate_frontmatter(fm: str) -> str:
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
        if m.group(2) == "title" and "| Shellui" in val:
            left, _, _right = val.partition("|")
            tr = f"{translate_en_it(left.strip())} | Shellui"
        else:
            tr = translate_en_it(val)
        out.append(f"{prefix}{quote}{tr}{quote}")
    return "\n".join(out)


def translate_tag_text(html: str) -> str:
    in_highlight = False
    lines_out = []
    for line in html.split("\n"):
        if "{% highlight" in line:
            in_highlight = True
            lines_out.append(line)
            continue
        if in_highlight:
            lines_out.append(line)
            if "{% endhighlight" in line:
                in_highlight = False
            continue
        lines_out.append(translate_line_tags(line))
    return "\n".join(lines_out)


def translate_line_tags(line: str) -> str:
    for tag in TAGS:
        pattern = rf"(<{tag}\b[^>]*>)([\s\S]*?)(</{tag}>)"

        def repl(m: re.Match[str]) -> str:
            open_, inner, close = m.group(1), m.group(2), m.group(3)
            if "{%" in inner or "{{" in inner or not re.search(r"[A-Za-z]{3}", inner):
                return m.group(0)
            if inner.strip().startswith("<"):
                return m.group(0)
            tr = translate_en_it(inner.strip())
            lead = re.match(r"^\s*", inner).group(0)
            trail = re.search(r"\s*$", inner).group(0)
            return f"{open_}{lead}{tr}{trail}{close}"

        line = re.sub(pattern, repl, line, flags=re.IGNORECASE)
    line = re.sub(
        r'(aria-label=")([^"]+)(")',
        lambda m: m.group(1) + translate_en_it(m.group(2)) + m.group(3),
        line,
    )
    return line


def translate_markdown_body(body: str) -> str:
    lines_out = []
    in_fence = False
    for line in body.split("\n"):
        if line.strip().startswith("```"):
            in_fence = not in_fence
            lines_out.append(line)
            continue
        if in_fence or line.strip().startswith("{#") or line.strip().startswith("{%"):
            lines_out.append(line)
            continue
        if line.startswith("|") or (line.strip().startswith("- ") and "`" in line):
            if re.search(r"[A-Za-z]{4}", line) and "`" not in line:
                lines_out.append(translate_en_it(line))
            else:
                lines_out.append(line)
            continue
        if re.match(r"^#{1,6}\s", line) or (line.strip() and re.search(r"[A-Za-z]{4}", line)):
            if line.strip().startswith(">"):
                lines_out.append("> " + translate_en_it(line.lstrip("> ").strip()))
            elif not line.strip().startswith("|"):
                lines_out.append(translate_en_it(line))
            else:
                lines_out.append(line)
            continue
        lines_out.append(line)
    return "\n".join(lines_out)


def process(path: Path) -> None:
    raw = path.read_text(encoding="utf-8")
    fm, body = "", raw
    if raw.startswith("---\n"):
        end = raw.find("\n---\n", 4)
        if end != -1:
            fm = raw[4:end]
            body = raw[end + 5 :]
    new_fm = translate_frontmatter(fm) if fm else ""
    if path.suffix == ".md":
        new_body = translate_markdown_body(body)
    else:
        new_body = translate_tag_text(body)
    out = f"---\n{new_fm}\n---\n{new_body}" if fm else new_body
    path.write_text(out, encoding="utf-8")
    print("OK", path.relative_to(ROOT))


def main() -> None:
    paths = []
    for p in sorted(IT_SRC.rglob("*")):
        if p.suffix not in {".njk", ".md"} or p.name == "it.json":
            continue
        rel = str(p.relative_to(IT_SRC)).replace("\\", "/")
        if rel in SKIP:
            continue
        paths.append(p)
    for p in sorted(IT_GUIDELINES.glob("*.md")):
        if p.name != "design.md":
            paths.append(p)
    for p in paths:
        process(p)


if __name__ == "__main__":
    main()
