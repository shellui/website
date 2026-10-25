from common import *
import os as _os
A = 'file://' + _os.environ.get('BRAND_ASSETS', '/workspace/brand/assets').rstrip('/') + '/'
OKI = '<span class="ic ok"><svg width="9" height="9" viewBox="0 0 10 10"><path d="M2 5.2l2 2 4-4.4" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
NOI = '<span class="ic no"><svg width="9" height="9" viewBox="0 0 10 10"><path d="M3 3l4 4M7 3l-4 4" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg></span>'

def pg(content, num, section, cls="", chrome=True, sample=None):
    import re as _re
    rh = f'<div class="rh"><span>Shellui brand kit, {VERSION}</span><span>{_re.sub(r"^[0-9.]+\s+", "", section)}</span></div>' if chrome else ''
    ft = f'<div class="ft"><span>shellui.com, {EDITION}</span><b class="tnum">{num:02d}</b></div>' if chrome else ''
    sm = f'<div class="sample">{sample}</div>' if sample else ''
    return f'<section class="page {cls}">{rh}{sm}<div class="body">{content}</div>{ft}</section>'

def head(sec, title, lede=None):
    return f'''<div class="g" style="align-items:start"><div class="s3 sec" style="padding-top:2.5mm">{sec}</div>
<div class="s9"><h1>{title}</h1>{f'<p class="lede">{lede}</p>' if lede else ''}</div></div>'''

def ex(kind, fig, title, text, figstyle=""):
    ic = OKI if kind == 'do' else NOI
    lab = 'Do' if kind == 'do' else 'Don\'t'
    return f'<div class="ex {"do" if kind=="do" else "dont"}"><div class="fig" style="{figstyle}">{fig}</div><div class="cap">{ic}<div><b>{lab}: {title}</b><br><span class="muted">{text}</span></div></div></div>'

BLUE = "#2563eb"
def hdim(x1, x2, y, label, up=True, sw=0.25, fs=2.3):
    ty = y - 1.0 if up else y + 2.6
    return (f'<line x1="{x1}" y1="{y}" x2="{x2}" y2="{y}" stroke="{BLUE}" stroke-width="{sw}"/>'
            f'<line x1="{x1}" y1="{y-1.2}" x2="{x1}" y2="{y+1.2}" stroke="{BLUE}" stroke-width="{sw}"/>'
            f'<line x1="{x2}" y1="{y-1.2}" x2="{x2}" y2="{y+1.2}" stroke="{BLUE}" stroke-width="{sw}"/>'
            f'<text x="{(x1+x2)/2}" y="{ty}" text-anchor="middle" font-size="{fs}" fill="{BLUE}" font-weight="500" font-family="PlexKit">{label}</text>')
def vdim(y1, y2, x, label, left=True, sw=0.25, fs=2.3):
    tx = x - 1.0 if left else x + 1.0
    anc = 'end' if left else 'start'
    return (f'<line x1="{x}" y1="{y1}" x2="{x}" y2="{y2}" stroke="{BLUE}" stroke-width="{sw}"/>'
            f'<line x1="{x-1.2}" y1="{y1}" x2="{x+1.2}" y2="{y1}" stroke="{BLUE}" stroke-width="{sw}"/>'
            f'<line x1="{x-1.2}" y1="{y2}" x2="{x+1.2}" y2="{y2}" stroke="{BLUE}" stroke-width="{sw}"/>'
            f'<text x="{tx}" y="{(y1+y2)/2+0.8}" text-anchor="{anc}" font-size="{fs}" fill="{BLUE}" font-weight="500" font-family="PlexKit">{label}</text>')

def bar_chart(data, w=170, h=62, highlight=None, unit="", ymax=None, title=None, fs=2.6):
    # data: list of (label, value)
    left, bottom, top = 10, 8, 4
    ph = h - bottom - top; pw = w - left - 2
    ymax = ymax or max(v for _, v in data) * 1.15
    n = len(data); bw = pw / n * 0.62; gap = pw / n
    s = [f'<svg viewBox="0 0 {w} {h}" width="{w}mm" height="{h}mm" xmlns="http://www.w3.org/2000/svg" font-family="PlexKit">']
    for i in range(5):
        v = ymax * i / 4; y = top + ph - ph * i / 4
        s.append(f'<line x1="{left}" x2="{w-2}" y1="{y:.2f}" y2="{y:.2f}" stroke="{"#9ca3af" if i==0 else "#e5e7eb"}" stroke-width="{0.3 if i==0 else 0.2}"/>')
        s.append(f'<text x="{left-1.5}" y="{y+0.9:.2f}" font-size="{fs*0.85}" fill="#4b5563" text-anchor="end">{v:,.0f}{unit}</text>'.replace(',', "'"))
    for i, (lab, v) in enumerate(data):
        x = left + gap * i + (gap - bw) / 2; bh = ph * v / ymax; y = top + ph - bh
        col = "#e3a512" if lab == highlight else "#9ca3af"
        s.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="{bw:.2f}" height="{bh:.2f}" fill="{col}" rx="0.4"/>')
        s.append(f'<text x="{x+bw/2:.2f}" y="{h-bottom+4:.2f}" font-size="{fs*0.85}" fill="#4b5563" text-anchor="middle">{lab}</text>')
        if lab == highlight:
            s.append(f'<text x="{x+bw/2:.2f}" y="{y-1.4:.2f}" font-size="{fs}" fill="#111827" font-weight="600" text-anchor="middle">{v:,.0f}{unit}</text>'.replace(',', "'"))
    s.append('</svg>')
    return ''.join(s)

def line_chart(series, labels, w=170, h=60, fs=2.6, ymax=None):
    left, bottom, top, right = 10, 8, 4, 24
    ph = h - bottom - top; pw = w - left - right
    ymax = ymax or max(max(v) for _, v, _ in series) * 1.15
    n = len(labels)
    s = [f'<svg viewBox="0 0 {w} {h}" width="{w}mm" height="{h}mm" xmlns="http://www.w3.org/2000/svg" font-family="PlexKit">']
    for i in range(5):
        v = ymax * i / 4; y = top + ph - ph * i / 4
        s.append(f'<line x1="{left}" x2="{left+pw}" y1="{y:.2f}" y2="{y:.2f}" stroke="{"#9ca3af" if i==0 else "#e5e7eb"}" stroke-width="{0.3 if i==0 else 0.2}"/>')
        s.append(f'<text x="{left-1.5}" y="{y+0.9:.2f}" font-size="{fs*0.85}" fill="#4b5563" text-anchor="end">{v:.0f}</text>')
    for i, lab in enumerate(labels):
        x = left + pw * i / (n - 1)
        s.append(f'<text x="{x:.2f}" y="{h-bottom+4:.2f}" font-size="{fs*0.85}" fill="#4b5563" text-anchor="middle">{lab}</text>')
    for name, vals, col in series:
        pts = ' '.join(f'{left + pw*i/(n-1):.2f},{top + ph - ph*v/ymax:.2f}' for i, v in enumerate(vals))
        s.append(f'<polyline points="{pts}" fill="none" stroke="{col}" stroke-width="{0.7 if col=="#e3a512" else 0.45}" stroke-linejoin="round"/>')
        lx = left + pw; ly = top + ph - ph * vals[-1] / ymax
        s.append(f'<circle cx="{lx:.2f}" cy="{ly:.2f}" r="0.8" fill="{col}"/>')
        s.append(f'<text x="{lx+2:.2f}" y="{ly+0.9:.2f}" font-size="{fs*0.9}" fill="{"#111827" if col=="#e3a512" else "#4b5563"}" font-weight="{600 if col=="#e3a512" else 400}">{name}</text>')
    s.append('</svg>')
    return ''.join(s)
