import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parents[2]
TOKENS_PATH = REPO / "tokens" / "tokens.json"

# Version label shown in the kit. Change this one line to "v1" for release.
VERSION = "v1"
EDITION = "October 2026"

WM = (ROOT / "wm_inner.svg").read_text()
MK = (ROOT / "mk_inner.svg").read_text()
# Mark tight crop (same official paths, only the viewBox is cropped)
MK_VB = "291.78 199.02 493.40 681.33"
MK_RATIO = 493.40 / 681.33
WM_RATIO = 1024 / 270


def _load_token_colors():
    data = json.loads(TOKENS_PATH.read_text())
    g = data["gold"]
    c = data["canvas"]
    return dict(
        gold=g["brand"]["$value"].lower(),
        ink=g["text"]["$value"].lower(),
        ongold=g["on"]["$value"].lower(),
        dgold=g["textDark"]["$value"].lower(),
        fg=c["foreground"]["$value"].lower(),
        mfg=c["mutedForeground"]["$value"].lower(),
        border=data["structure"]["border"]["$value"].lower(),
        muted=c["muted"]["$value"].lower(),
        sec=data["semantic"]["secondary"]["$value"].lower(),
        dbg=c["background"]["dark"].lower(),
        dcard=data["structure"]["card"]["dark"].lower(),
        dmfg=c["mutedForeground"]["dark"].lower(),
        dborder=data["structure"]["border"]["dark"].lower(),
        ok="#15803d",
        bad="#b91c1c",
        wash="#fdf6e3",
    )


C = _load_token_colors()

def wordmark(color="#111827", h=None, w=None, cls="", style=""):
    sz = (f'height="{h}"' if h else "") + (f' width="{w}"' if w else "")
    inner = WM.replace("currentColor", color)
    return f'<svg class="wm {cls}" style="{style}" viewBox="0 0 1024 270" {sz} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shellui">{inner}</svg>'


def mark(color="#111827", h=None, w=None, cls="", style="", tight=True):
    vb = MK_VB if tight else "0 0 1080 1080"
    sz = (f'height="{h}"' if h else "") + (f' width="{w}"' if w else "")
    inner = MK.replace("currentColor", color)
    return f'<svg class="mk {cls}" style="{style}" viewBox="{vb}" {sz} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shellui mark">{inner}</svg>'


def mark_paths(color):
    return MK.replace("currentColor", color)


_font_base = f"file://{ROOT}/fonts"
FONT_CSS = f"""
@font-face{{font-family:"InterKit";font-weight:400;src:url("{_font_base}/Inter-400.ttf")}}
@font-face{{font-family:"InterKit";font-weight:500;src:url("{_font_base}/Inter-500.ttf")}}
@font-face{{font-family:"InterKit";font-weight:600;src:url("{_font_base}/Inter-600.ttf")}}
@font-face{{font-family:"InterKit";font-weight:650;src:url("{_font_base}/Inter-650.ttf")}}
@font-face{{font-family:"SerifKit";font-weight:400;font-style:normal;src:url("{_font_base}/SourceSerif4SmText-Regular.ttf")}}
@font-face{{font-family:"SerifKit";font-weight:400;font-style:italic;src:url("{_font_base}/SourceSerif4SmText-It.ttf")}}
@font-face{{font-family:"SerifKit";font-weight:600;font-style:normal;src:url("{_font_base}/SourceSerif4SmText-Semibold.ttf")}}
@font-face{{font-family:"SerifKit";font-weight:700;font-style:normal;src:url("{_font_base}/SourceSerif4SmText-Semibold.ttf")}}
@font-face{{font-family:"PlexKit";font-weight:400;font-style:normal;src:url("{_font_base}/PlexSans-400.ttf")}}
@font-face{{font-family:"PlexKit";font-weight:400;font-style:italic;src:url("{_font_base}/PlexSans-400i.ttf")}}
@font-face{{font-family:"PlexKit";font-weight:300;src:url("{_font_base}/PlexSans-300.ttf")}}
@font-face{{font-family:"PlexKit";font-weight:500;src:url("{_font_base}/PlexSans-500.ttf")}}
@font-face{{font-family:"PlexKit";font-weight:600;src:url("{_font_base}/PlexSans-600.ttf")}}
@font-face{{font-family:"PlexKit";font-weight:650;src:url("{_font_base}/PlexSans-600.ttf")}}
@font-face{{font-family:"PlexKit";font-weight:700;src:url("{_font_base}/PlexSans-700.ttf")}}
@font-face{{font-family:"RobotoKit";font-weight:600;src:url("{_font_base}/Roboto-600.ttf")}}
@font-face{{font-family:"PlexMonoKit";font-weight:400;src:url("file:///usr/share/fonts/truetype/sand-box/google/IBM Plex Mono/IBMPlexMono-Regular.ttf")}}
@font-face{{font-family:"PlexMonoKit";font-weight:600;src:url("file:///usr/share/fonts/truetype/sand-box/google/IBM Plex Mono/IBMPlexMono-SemiBold.ttf")}}
:root{{--gold:{C['gold']};--ink:{C['ink']};--ongold:{C['ongold']};--fg:{C['fg']};--mfg:{C['mfg']};--border:{C['border']};--muted:{C['muted']};--sec:{C['sec']};--dbg:{C['dbg']};--dgold:{C['dgold']};--ok:{C['ok']};--bad:{C['bad']};--wash:{C['wash']}}}
*{{box-sizing:border-box;margin:0;padding:0}}
html{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{font-family:"InterKit",system-ui,sans-serif;font-optical-sizing:auto;color:var(--fg);font-feature-settings:"cv11" 1,"ss01" 0;text-rendering:geometricPrecision}}
.mono,code{{font-family:"PlexMonoKit",ui-monospace,monospace}}
.tnum{{font-variant-numeric:tabular-nums}}
"""
