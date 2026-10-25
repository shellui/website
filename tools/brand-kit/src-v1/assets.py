import os, subprocess, sys
from common import *
import os as _os
OUT = _os.environ.get('BRAND_ASSETS', '/workspace/brand/assets')
H = '/workspace/brand/src-v1/html'
os.makedirs(H, exist_ok=True)
for d in ['og','social','icons','email','logo']:
    os.makedirs(f'{OUT}/{d}', exist_ok=True)

BASE = FONT_CSS + """
html,body{margin:0;overflow:hidden}
.canvas{position:relative;overflow:hidden}
.wash{position:absolute;border-radius:50%;filter:blur(90px);opacity:.75;background:radial-gradient(circle,#fbe08a 0%,#fdeeb8 45%,rgba(253,238,184,0) 70%)}
.ghost{position:absolute}
.label{font-weight:600;letter-spacing:0}
"""

def page(w, h, body, extra_css="", bg="#fff"):
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{BASE}
body{{width:{w}px;height:{h}px;background:{bg}}} .canvas{{width:{w}px;height:{h}px;background:{bg}}}{extra_css}</style></head>
<body><div class="canvas">{body}</div></body></html>"""

def render(name, w, h, html, transparent=False):
    p = f'{H}/{name.replace("/","_")}.html'
    open(p, 'w').write(html)
    out = f'{OUT}/{name}.png'
    cmd = ['google-chrome', '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
           f'--window-size={w},{h}', '--force-device-scale-factor=1', f'--screenshot={out}',
           '--virtual-time-budget=1500']
    if transparent: cmd.append('--default-background-color=00000000')
    cmd.append('file://' + p)
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    return out

# ---------- og:image 1200x630 ----------
OG_CSS = """
.pad{position:absolute;inset:72px}
.top{display:flex;align-items:center;gap:16px;font-size:24px;color:#4b5563;font-weight:500}
.top .sep{width:1px;height:28px;background:#d1d5db}
.title{position:absolute;left:72px;top:190px;width:860px;font-size:64px;line-height:1.08;font-weight:650;letter-spacing:-0.025em;color:#111827;text-wrap:balance}
.lede{position:absolute;left:72px;width:820px;font-size:26px;line-height:1.45;color:#4b5563}
.foot{position:absolute;left:72px;right:72px;bottom:64px;display:flex;justify-content:space-between;align-items:center;font-size:22px;color:#4b5563}
.pill{display:inline-flex;align-items:center;gap:10px;border:1px solid #e5e7eb;border-radius:999px;padding:8px 18px;font-size:20px;color:#4b5563;background:#fff}
.dot{width:10px;height:10px;border-radius:50%;background:#e3a512}
"""
def og_frame(top_label, title, lede, foot_left, foot_right, dark=False, title_top=190, lede_top=None, title_size=64, extra=""):
    fg = "#f9fafb" if dark else "#111827"; m = "#9ca3af" if dark else "#4b5563"
    goldc = "#e8b84a" if dark else "#e3a512"
    wash = "" if dark else ''
    if dark:
        wash = ''
    ghost = f'<div class="ghost" style="right:-40px;bottom:-150px;opacity:{0.06 if dark else 0.04}">{mark("#ffffff" if dark else "#111827", h=640)}</div>'
    lt = lede_top or (title_top + 230)
    return f"""{wash}{ghost}
<div style="position:absolute;left:72px;top:64px" class="top">{mark(goldc if dark else "#111827", h=44)}<span class="sep"></span><span style="color:{m}">{top_label}</span></div>
<div class="title" style="top:{title_top}px;color:{fg};font-size:{title_size}px">{title}</div>
{f'<div class="lede" style="top:{lt}px;color:{m}">{lede}</div>' if lede else ''}
{extra}
<div class="foot" style="color:{m}"><span>{foot_left}</span><span>{foot_right}</span></div>"""

og = {}
og['og/og-default'] = page(1200, 630, og_frame("shellui.com", "Ship sooner without rebuilding basic features",
    "Open-source web app platform with navigation, authentication, administration, and storage built in.",
    '<span style="color:#111827;font-weight:600">shellui.com</span>', '<span class="pill"><span class="dot"></span>MIT licensed</span>', title_top=168, lede_top=392), OG_CSS)
og['og/og-docs'] = page(1200, 630, og_frame("Docs", "Configure identity-service",
    "Set up sign-in, session renewal, and token verification for apps in the shell.",
    '<span style="color:#111827;font-weight:600">docs.shellui.com</span>', '<span class="mono" style="font-size:20px">Guides / Authentication</span>', title_top=210, lede_top=310,
    extra=''), OG_CSS + ".canvas{background:#f9fafb}")
og['og/og-blog'] = page(1200, 630, og_frame("Blog", "Introducing Shellui",
    "A shared shell around your product, so you ship the app and not the host chrome.",
    '<span style="color:#f9fafb;font-weight:600">Shellui team</span><span style="margin:0 12px">·</span>19 August 2026', '<span style="background:#e8b84a;color:#1a1408;font-weight:600;border-radius:999px;padding:6px 16px">Announcement</span>', dark=True, title_top=196, lede_top=318, title_size=76),
    OG_CSS + ".canvas{background:#030712}", bg="#030712")
og['og/og-changelog'] = page(1200, 630, og_frame("Changelog", "Account management and magic link login",
    None, '<span style="color:#111827;font-weight:600">shellui.com/changelog</span>', '7 October 2026', title_top=250,
    extra='<div style="position:absolute;left:72px;top:170px" class="pill"><span class="dot"></span><span class="mono" style="color:#111827;font-weight:600">v0.6.0</span></div>'
          '<div style="position:absolute;left:72px;top:420px;display:flex;gap:12px">'
          + ''.join(f'<span class="pill">{t}</span>' for t in ["Edit your name","Magic link login","settings.email","Shared upload progress"]) + '</div>'), OG_CSS)

# ---------- GitHub social preview 1280x640 ----------
gh = page(1280, 640, f"""
<div class="ghost" style="right:-30px;bottom:-170px;opacity:.05">{mark("#111827", h=700)}</div>
<div style="position:absolute;left:96px;top:150px">{wordmark("#111827", h=96)}</div>
<div style="position:absolute;left:96px;top:300px;width:820px;font-size:34px;line-height:1.35;color:#111827;font-weight:500;letter-spacing:-0.01em">Open-source microfrontend shell with shared navigation, authentication, administration, and storage.</div>
<div style="position:absolute;left:96px;bottom:96px;font-size:24px;color:#4b5563;display:flex;gap:28px"><span style="color:#111827;font-weight:600">github.com/shellui</span><span>MIT licensed</span><span>TypeScript</span></div>""")

# ---------- banners ----------
def banner(w, h, scale=1.0, avatar_safe_left=0):
    t = int(54*scale); l = int(24*scale)
    return page(w, h, f"""
<div class="ghost" style="right:{int(w*.04)}px;top:-{int(h*.35)}px;opacity:.05">{mark("#111827", h=int(h*1.7))}</div>
<div style="position:absolute;right:{int(w*0.1)}px;top:50%;transform:translateY(-50%);text-align:right;width:{int(w*.55)}px">
<div style="font-size:{t}px;line-height:1.1;font-weight:650;letter-spacing:-0.025em;color:#111827;text-wrap:balance">Ship sooner without rebuilding basic features</div>
<div style="margin-top:{int(18*scale)}px;font-size:{l}px;color:#4b5563;font-weight:500">shellui.com<span style="margin:0 {int(12*scale)}px;color:#d1d5db">|</span>github.com/shellui</div></div>""")

social = {
  'social/x-banner-1500x500': (1500, 500, banner(1500, 500, 1.0)),
  'social/linkedin-banner-1584x396': (1584, 396, banner(1584, 396, 0.86)),
  'social/linkedin-company-cover-1128x191': (1128, 191, banner(1128, 191, 0.5)),
  'social/github-social-preview-1280x640': (1280, 640, gh),
}
def avatar(size, bg, fg):
    hh = int(size*0.50)
    return page(size, size, f'<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:{bg}">{mark(fg, h=hh)}</div>', bg=bg)
for nm, bg, fg in [('dark', '#111827', '#e3a512'), ('gold', '#e3a512', '#1a1408'), ('light', '#ffffff', '#111827')]:
    social[f'social/avatar-{nm}-800'] = (800, 800, avatar(800, bg, fg))

# ---------- icons ----------
def icon(size, bg, fg, ratio, rounded=False, transparent=False):
    hh = round(size*ratio)
    r = f"border-radius:{int(size*0.2237)}px;" if rounded else ""
    bgcss = "transparent" if transparent else bg
    return page(size, size, f'<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:{bgcss};{r}">{mark(fg, h=hh)}</div>', bg="transparent" if transparent else bg)
icons = {}
for s in [16, 32, 48]:
    icons[f'icons/favicon-{s}'] = (s, s, icon(s, '#000000', '#ffffff', 0.82))
for s in [64, 180, 192, 512, 1024]:
    icons[f'icons/app-icon-{s}'] = (s, s, icon(s, '#000000', '#ffffff', 0.62))
for s in [180, 512]:
    icons[f'icons/app-icon-gold-{s}'] = (s, s, icon(s, '#111827', '#e3a512', 0.62))
icons['icons/maskable-512'] = (512, 512, icon(512, '#000000', '#ffffff', 0.44))

# ---------- email signature ----------
SIG = f"""<table cellpadding="0" cellspacing="0" border="0" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Roboto,Arial,sans-serif;color:#111827;font-size:14px;line-height:20px">
<tr><td style="padding:0 16px 0 0;vertical-align:top;border-right:1px solid #e5e7eb"><img src="https://shellui.com/img/logo.png" width="40" height="40" alt="Shellui" style="display:block;border-radius:8px"></td>
<td style="padding:0 0 0 16px;vertical-align:top">
<div style="font-weight:600;font-size:15px">Your Name</div>
<div style="color:#4b5563">Your role, Shellui</div>
<div style="margin-top:8px"><a href="https://shellui.com" style="color:#8a6300;font-weight:600;text-decoration:none">shellui.com</a><span style="color:#d1d5db"> | </span><a href="https://github.com/shellui" style="color:#4b5563;text-decoration:none">github.com/shellui</a></div>
</td></tr></table>"""
open(f'{OUT}/email/email-signature.html', 'w').write(f'<!doctype html><html><head><meta charset="utf-8"><title>Shellui email signature</title></head><body>\n<!-- Paste the table below into your mail client signature settings. Replace the logo URL if needed. -->\n{SIG}\n</body></html>\n')
SIG_PREVIEW = SIG.replace('<img src="https://shellui.com/img/logo.png" width="40" height="40" alt="Shellui" style="display:block;border-radius:8px">',
    f'<div style="width:40px;height:40px;border-radius:8px;background:#000;display:flex;align-items:center;justify-content:center">{mark("#fff", h=26)}</div>')
email = {'email/email-signature-preview': (720, 200, page(720, 200, f'<div style="position:absolute;left:40px;top:40px;transform:scale(1.4);transform-origin:0 0">{SIG_PREVIEW}</div>'))}

# ---------- logo exports ----------
def logo_png(name, w, h, inner, bg="transparent"):
    return (name, w, h, page(w, h, f'<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">{inner}</div>', bg=bg))
logos = [
  logo_png('logo/shellui-wordmark-ink-2048', 2048, 540, wordmark('#111827', w=2048)),
  logo_png('logo/shellui-wordmark-white-2048', 2048, 540, wordmark('#ffffff', w=2048)),
  logo_png('logo/shellui-mark-ink-1024', int(1024*MK_RATIO), 1024, mark('#111827', h=1024)),
  logo_png('logo/shellui-mark-gold-1024', int(1024*MK_RATIO), 1024, mark('#e3a512', h=1024)),
  logo_png('logo/shellui-mark-white-1024', int(1024*MK_RATIO), 1024, mark('#ffffff', h=1024)),
]

if __name__ == '__main__':
    for k, v in og.items(): render(k, 1200, 630, v)
    for k, (w, h, v) in {**social, **email}.items(): render(k, w, h, v)
    for k, (w, h, v) in icons.items(): render(k, w, h, v)
    for (k, w, h, v) in logos: render(k, w, h, v, transparent=True)
    # SVG exports
    hdr = '<?xml version="1.0" encoding="UTF-8"?>\n'
    for c, n in [('#111827', 'ink'), ('#ffffff', 'white')]:
        open(f'{OUT}/logo/shellui-wordmark-{n}.svg', 'w').write(hdr + wordmark(c))
    for c, n in [('#111827', 'ink'), ('#e3a512', 'gold'), ('#ffffff', 'white')]:
        open(f'{OUT}/logo/shellui-mark-{n}.svg', 'w').write(hdr + mark(c))
    open(f'{OUT}/icons/favicon.svg', 'w').write(hdr + f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><style>rect{{fill:#000}} path{{fill:#fff}}</style><rect width="64" height="64" rx="12"/><svg x="13.6" y="5.76" width="36.8" height="52.48" viewBox="{MK_VB}">{MK.replace("fill=\"currentColor\"", "")}</svg></svg>')
    from PIL import Image
    ims = [Image.open(f'{OUT}/icons/favicon-{s}.png').convert('RGBA') for s in (16, 32, 48)]
    ims[2].save(f'{OUT}/icons/favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)], append_images=ims[:2])
    print('done')
