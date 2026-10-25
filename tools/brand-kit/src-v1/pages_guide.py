from kit_parts import *

SW = [  # name, token, hex, rgb, cmyk, role, text color on swatch
 ("Ink", "foreground", "#111827", "17 24 39", "80 71 60 84", "Text, rules, dark fills", "#fff"),
 ("Canvas", "background", "#ffffff", "255 255 255", "0 0 0 0", "Page, cards", "#111827"),
 ("Brand gold", "primary", "#e3a512", "227 165 18", "11 38 100 0", "Fills, rules, the logo. Never text", "#1a1408"),
 ("Gold ink", "primary-ink", "#8a6300", "138 99 0", "39 57 100 25", "Gold text and links on light", "#fff"),
 ("Slate", "muted-foreground", "#4b5563", "75 85 99", "76 64 46 31", "Secondary text, captions", "#fff"),
 ("Border", "border", "#e5e7eb", "229 231 235", "9 7 5 0", "Hairlines, table rules", "#111827"),
 ("Mist", "muted", "#f9fafb", "249 250 251", "1 1 1 0", "Quiet wells, callouts", "#111827"),
 ("On gold", "primary-foreground", "#1a1408", "26 20 8", "68 66 71 85", "Text on gold fills", "#fff"),
 ("Night", "background (dark)", "#030712", "3 7 18", "76 69 63 88", "Dark pages, slides, dark og:images", "#fff"),
 ("Gold tint", "flat tint, print only", "#fdf6e3", "253 246 227", "0 2 11 0", "Print only: flat fill behind callouts. Never a gradient", "#111827"),
 ("Dark slate", "muted-foreground (dark)", "#9ca3af", "156 163 175", "42 32 25 0", "Secondary text on dark, chart series", "#111827"),
 ("Dark gold", "primary (dark)", "#e8b84a", "232 184 74", "9 29 89 0", "Gold text, links, and fills on dark screens", "#1a1408"),
]

DL = 'shellui.com/guidelines/brand'
FILES = 'shellui.com/brand-assets/'
def cover(n):
    c = f'''<div style="position:absolute;right:-28mm;bottom:-48mm;">{mark("#f3f3f4", h="250mm")}</div>
<div style="position:absolute;left:20mm;top:20mm">{wordmark("#111827", h="9mm")}</div>
<div style="position:absolute;left:20mm;top:112mm;width:150mm">
<div class="sec" style="font-size:10.5pt">Print and digital guidelines</div>
<div style="font-size:54pt;line-height:58pt;font-weight:650;letter-spacing:-0.03em;margin-top:4mm">Brand kit</div>
<p class="lede" style="font-size:14pt;line-height:20pt;margin-top:6mm;max-width:118mm">Rules, logo files, and templates for anyone who writes, designs, or prints for Shellui: partners, designers, press, and contributors.</p></div>
<div style="position:absolute;left:20mm;bottom:26mm;right:20mm" class="g">
<div class="s3 small"><b style="color:#111827">Version</b><br>{VERSION}</div>
<div class="s3 small"><b style="color:#111827">Edition</b><br>{EDITION}</div>
<div class="s3 small"><b style="color:#111827">Guidelines</b><br>{DL}</div>
<div class="s3 small"><b style="color:#111827">Files</b><br>{FILES}</div></div>'''
    return f'<section class="page">{c}</section>'

TOC = [
 ("Rules", [("0", "About this kit", "intro"), ("1", "Brand foundations at a glance", "foundations"), ("2", "Logo", "logo"), ("2.1", "Logo do and don't", "logo-dd"), ("3", "Color", "color"),
            ("3.1", "Contrast and accessible gold", "color-dd"), ("3.2", "Print color, paper, and dark pages", "print"), ("4", "Typography for print", "type"), ("4.1", "Typography for screens", "type-web"), ("4.2", "Typography do and don't", "type-dd"),
            ("5", "Spacing system", "spacing"), ("5.1", "Margins, gutters, and padding", "margins"), ("5.2", "Vertical rhythm", "rhythm"), ("6", "Layout grids", "grid"),
            ("7", "Imagery and charts", "imagery"), ("7.1", "Screenshots and backgrounds", "imagery2")]),
 ("Print templates", [("8.1", "Report cover", "t-cover"), ("8.2", "Report body: text and headings", "t-body"), ("8.3", "Report body: table and chart", "t-data"),
            ("8.4", "Report body: figure and screenshot", "t-figs"), ("8.5", "Letterhead", "t-letter"), ("8.6", "Quote and invoice", "t-invoice"), ("8.7", "Product sheet", "t-sheet"), ("8.8", "Proposal", "t-proposal"), ("8.9", "Presentation, 16:9", "t-slide1")]),
 ("Digital", [("9", "og:image templates", "og"), ("10", "Social profiles and GitHub", "social"), ("10.1", "Email signature and app icons", "icons")]),
 ("Reference", [("11", "One-page cheat sheet", "cheat"), ("12", "Changelog", "open")]),
]

def toc(pages):
    def grp(g, items):
        r = f'<div class="sec" style="margin-top:7mm;margin-bottom:1mm">{g}</div>'
        for n, t, k in items:
            r += f'<div style="display:flex;align-items:baseline;gap:3mm;padding:1.4mm 0;border-bottom:0.4pt solid #e5e7eb;font-size:9.5pt;line-height:13pt"><span class="tnum muted" style="width:8mm">{n}</span><span style="flex:1">{t}</span><span class="tnum" style="font-weight:600">{pages[k]:02d}</span></div>'
        return r
    left = grp(*TOC[0])
    right = grp(*TOC[1]) + grp(*TOC[2]) + grp(*TOC[3])
    how = f'''<div class="g pair blk" style="margin-bottom:0"><div class="s6 box"><h4>How to use this kit</h4><ul class="l small" style="color:#111827"><li>Need a value fast: use the cheat sheet on page {pages["cheat"]:02d}</li><li>Do and don't pairs: a green check marks correct use, a red cross a mistake</li>
<li>Templates use sample data. Anything marked "example" or set in a dashed box is a placeholder</li><li>Logo files, icons, and social images: see the download on page {pages["intro"]:02d}</li></ul></div>
<div class="s6 box"><h4>New in {VERSION}</h4><ul class="l small" style="color:#111827"><li>Brand gold #E3A512 for fills and the logo, dark gold #E8B84A on dark screens</li><li>Gold text #8A6300 on light, #E8B84A on dark screens</li><li>Pantone references and paper</li><li>Plex in print, system fonts on the website</li><li>Flat print; gold wash on the web only</li><li>Dark pages allowed in print</li><li>No logo lockup</li></ul></div></div>'''
    return pg(head("Contents", "What this kit covers", "Rules first, then templates you can copy. Full history on the changelog page.") + f'<div class="g pair"><div class="s6">{left}</div><div class="s6">{right}</div></div>' + how, pages['toc'], "Contents")

def foundations(n):
    sw = ''.join(f'''<div style="display:flex;gap:3mm;align-items:center;padding:1.5mm 0;border-bottom:0.4pt solid #e5e7eb"><div style="width:9mm;height:9mm;border-radius:1.5mm;background:{h};border:0.4pt solid #e5e7eb;flex:none"></div>
<div style="flex:1;min-width:0"><div style="font-weight:600;font-size:8.5pt;line-height:11pt">{nm}</div><div class="tiny mono">{h.upper()}  ·  RGB {rgb}<br>CMYK {cm}</div></div></div>''' for nm, tok, h, rgb, cm, role, tc in [SW[0], SW[1], SW[2], SW[3], SW[4], SW[5]])
    scale = ''.join(f'<div style="display:flex;align-items:baseline;gap:3mm;padding:1mm 0;border-bottom:0.4pt solid #e5e7eb"><span class="tiny tnum" style="width:21mm;flex:none">{s}</span><span style="font-size:{pt}pt;line-height:{lh}pt;font-weight:{w};letter-spacing:{ls};white-space:nowrap;overflow:hidden">{t}</span></div>'
        for s, pt, lh, w, ls, t in [("Display 40/46", 26, 30, 600, "-0.015em", "Brand kit"), ("H1 26/32", 20, 24, 600, "-0.01em", "Ship sooner"), ("H2 15/20", 15, 20, 600, "0", "Section heading"), ("H3 11.5/15.5", 11.5, 15.5, 600, "0", "Subsection heading"), ("Body 10.5/17", 10.5, 17, 400, "0", "Body text in IBM Plex Sans"), ("Table 8.5/12.5", 8.5, 12.5, 400, "0", "Table text, same family"), ("Caption 8/12", 8, 12, 400, "0", "Captions and notes"), ("Folio 7.5/10", 7.5, 10, 400, "0", "Running heads, folios")])
    cols = ''.join(f'<rect x="{6+i*(26/3+6)*0.36:.2f}" y="6" width="{(26/3)*0.36:.2f}" height="{255*0.36:.2f}" fill="#fdf6e3"/>' for i in range(12))
    grid = f'''<svg viewBox="0 0 88 120" width="50mm" height="68.2mm"><rect x="0" y="0" width="{210*0.36+12}" height="{297*0.36+12}" fill="none"/>
<g transform="translate(5,5)"><rect x="0" y="0" width="{210*0.36}" height="{297*0.36}" fill="#fff" stroke="#9ca3af" stroke-width="0.25"/>
<g transform="translate({20*0.36},{20*0.36})">{''.join(f'<rect x="{i*(26/3+6)*0.36:.2f}" y="0" width="{(26/3)*0.36:.2f}" height="{255*0.36:.2f}" fill="#fdf6e3"/>' for i in range(12))}
<rect x="0" y="8" width="{110*0.36:.2f}" height="2.2" fill="#111827"/>{''.join(f'<rect x="0" y="{14+i*2.4}" width="{(170 if i%5!=4 else 110)*0.36:.2f}" height="0.8" fill="#9ca3af"/>' for i in range(14))}</g></g>
{hdim(5, 5+20*0.36, 3.4, "20", fs=2.2)}{hdim(5+20*0.36, 5+20*0.36+170*0.36, 3.4, "170 mm text, full width", fs=2.2)}
{vdim(5, 5+20*0.36, 3.6, "20", fs=2.2)}</svg>'''
    logo = f'''<div style="display:grid;grid-template-columns:1fr 1fr;gap:8mm">
<div class="box" style="padding:0;height:36mm;display:flex;align-items:center;justify-content:center;background:#fff;border:0.4pt solid #e5e7eb;position:relative"><div style="position:relative;padding:4mm;outline:0.4pt dashed #2563eb">{wordmark("#111827", h="8mm")}</div></div>
<div class="box" style="padding:0;height:36mm;display:flex;align-items:center;justify-content:center;background:#111827"><div style="padding:4mm;outline:0.4pt dashed #60a5fa">{mark("#e3a512", h="16mm")}</div></div></div>
<p class="small" style="margin-top:2mm">Clear space on every side: half the wordmark height (dashed line). Wordmark for documents, mark for icons and small spaces. Minimum width 18 mm print, 72 px screen.</p>'''
    c = head("1  Foundations", "Brand foundations at a glance", "One page with the decisions that matter most. Detailed rules and do and don't examples follow in sections 2 to 7.") + f'''
<div class="g pair" style="margin-top:10mm;row-gap:10mm">
<div class="s6"><h3 style="margin-top:0">Logo usage and clear space</h3><div style="margin-top:3mm">{logo}</div></div>
<div class="s6"><h3 style="margin-top:0">Core colors</h3><div style="margin-top:2mm">{sw}</div><p class="small" style="margin-top:2mm">Gold stays scarce: one accent per page. Gold text is #8A6300 on light, #E8B84A on dark screens.</p></div>
<div class="s6"><h3 style="margin-top:0">Type scale for print (pt)</h3><div style="margin-top:2mm">{scale}</div><p class="small" style="margin-top:2mm">Website: system font stack. Generated screen images (og:images, social, icons, email): Inter. Print: IBM Plex Sans, with IBM Plex Mono for code.</p></div>
<div class="s6"><h3 style="margin-top:0">A4 grid</h3><div style="display:flex;gap:3mm;margin-top:2mm"><div style="flex:none">{grid}</div><div class="small" style="padding-top:6mm">12 columns, 8.67 mm<br>Gutter 6 mm<br>Margins 20, bottom 22<br>Text: full width, 170 mm<br>Long prose: 2 columns of 81 mm<br>Feature: label 3 + content 9</div></div></div>
</div>'''
    return pg(c, n, "1  Foundations")

def logo_page(n):
    # clear space diagram, wordmark H=14mm => W=53.1mm ; x = 7
    H = 14; W = H * WM_RATIO; x = H / 2
    ox, oy = 18, 12
    d = f'''<svg viewBox="0 0 {W+2*x+36} {H+2*x+20}" width="{W+2*x+36}mm" height="{H+2*x+20}mm" font-family="PlexKit">
<rect x="{ox}" y="{oy}" width="{W+2*x}" height="{H+2*x}" fill="#eff6ff" stroke="#2563eb" stroke-width="0.25" stroke-dasharray="1 0.8"/>
<rect x="{ox+x}" y="{oy+x}" width="{W}" height="{H}" fill="#fff"/>
<svg x="{ox+x}" y="{oy+x}" width="{W}" height="{H}" viewBox="0 0 1024 270">{WM.replace("currentColor","#111827")}</svg>
{hdim(ox, ox+x, oy-3, "x")}{hdim(ox+x, ox+x+W, oy-3, f"{W:.1f} mm at {H} mm height")}{vdim(oy+x, oy+x+H, ox-3, "H")}{vdim(oy, oy+x, ox-3, "x")}
<text x="{ox}" y="{oy+H+2*x+6}" font-size="2.5" fill="#2563eb" font-weight="500">x = H / 2. Keep text, edges, and other logos outside the blue area.</text></svg>'''
    mh = 26; mw = mh * MK_RATIO; mx = mw / 2
    d2 = f'''<svg viewBox="0 0 {mw+2*mx+20} {mh+2*mx+14}" width="{mw+2*mx+20}mm" height="{mh+2*mx+14}mm" font-family="PlexKit">
<rect x="12" y="8" width="{mw+2*mx}" height="{mh+2*mx}" fill="#eff6ff" stroke="#2563eb" stroke-width="0.25" stroke-dasharray="1 0.8"/>
<rect x="{12+mx}" y="{8+mx}" width="{mw}" height="{mh}" fill="#fff"/>
<svg x="{12+mx}" y="{8+mx}" width="{mw}" height="{mh}" viewBox="{MK_VB}">{MK.replace("currentColor","#111827")}</svg>
{hdim(12, 12+mx, 5, "y")}{hdim(12+mx, 12+mx+mw, 5, "W")}{vdim(8+mx, 8+mx+mh, 9, "")}
<text x="12" y="{8+mh+2*mx+5}" font-size="2.5" fill="#2563eb" font-weight="500">y = W / 2</text></svg>'''
    variants = ''.join(f'''<div><div style="height:22mm;border-radius:2mm;background:{bg};{"border:0.4pt solid #e5e7eb;" if bg=="#ffffff" else ""}display:flex;align-items:center;justify-content:center">{art}</div><div class="small" style="margin-top:1.5mm"><b style="color:#111827">{t}</b><br>{d}</div></div>'''
        for bg, art, t, d in [("#ffffff", wordmark("#111827", h="7mm"), "Wordmark, ink", "Default on white and light gray"),
                              ("#111827", wordmark("#ffffff", h="7mm"), "Wordmark, white", "On ink, night, and photos with a dark area"),
                              ("#ffffff", mark("#111827", h="14mm"), "Mark, ink", "Small spaces, nav, footers"),
                              ("#111827", mark("#e3a512", h="14mm"), "Mark, gold on ink", "Avatars and app icons"),
                              ("#000000", mark("#ffffff", h="14mm"), "Icon, white on black", "Current favicon and app icon"),
                              ("#e3a512", mark("#1a1408", h="14mm"), "Mark, on gold", "Stickers and merch only")])
    c = head("2  Logo", "Logo", "Shellui has two marks: the wordmark and the S mark. Use the official files from the download. Do not redraw, retype, or combine them: v1 has no lockup.") + f'''
<div class="g feature" style="margin-top:6mm"><div class="s3"><h3 style="margin-top:0">Clear space</h3><p class="small" style="margin-top:1.5mm">Measure clear space from the logo itself, never from the file bounds.</p></div>
<div class="s6">{d}</div><div class="s3">{d2}</div></div>
<div class="g feature" style="margin-top:6mm"><div class="s3"><h3 style="margin-top:0">Approved versions</h3><p class="small" style="margin-top:1.5mm">Six versions cover every case. If none fits the background, change the background.</p></div>
<div class="s9" style="display:grid;grid-template-columns:repeat(3,1fr);gap:4mm">{variants}</div></div>
<div class="g feature" style="margin-top:6mm"><div class="s3"><h3 style="margin-top:0">Size and placement</h3><p class="small" style="margin-top:1.5mm">Body pages carry no logo, only the running head.</p></div>
<div class="s9"><table class="t t-tight"><thead><tr><th>Use</th><th>Version</th><th>Size</th><th>Position</th></tr></thead><tbody>
<tr><td>Report cover</td><td>Wordmark</td><td>9 mm high</td><td>Top left, on the margins</td></tr>
<tr><td>Letters, quotes</td><td>Wordmark</td><td>6 mm high</td><td>Top left, on the margins</td></tr>
<tr><td>Slides</td><td>Mark</td><td>6 mm high</td><td>Top left, 12 mm in</td></tr>
<tr><td>og:image, social</td><td>Mark</td><td>44 px high</td><td>Top left, 72 px in</td></tr>
<tr><td>Minimum, wordmark</td><td>Wordmark</td><td>18 mm, 72 px wide</td><td>Smaller: use the mark</td></tr><tr><td>Minimum, mark</td><td>Mark</td><td>4 mm, 16 px high</td><td>Favicon size</td></tr></tbody></table></div></div>'''
    return pg(c, n, "2  Logo")

def logo_dd(n):
    W = lambda c, h="9mm", s="": wordmark(c, h=h, style=s)
    rows = [
     ex('do', W("#111827"), "use the official wordmark", "Ink on white, with full clear space."),
     ex('dont', W("#111827", s="transform:scaleX(1.45)"), "stretch or squash", "Scale only with the aspect ratio locked."),
     ex('do', W("#ffffff"), "use white on ink or night", "#111827 or #030712 behind the white wordmark.", "background:#111827"),
     ex('dont', W("#e3a512"), "set the wordmark in gold on white", "Contrast is 2.2:1. A gold logo goes on ink or night only.",),
     ex('do', f'<div style="display:flex;gap:6mm;align-items:center">{mark("#111827", h="14mm")}<div style="width:14mm;height:14mm;border-radius:3mm;background:#000;display:flex;align-items:center;justify-content:center">{mark("#fff", h="9mm")}</div></div>', "use the mark alone in small spaces", "Favicons, avatars, the site nav."),
     ex('dont', f'<div style="display:flex;gap:3mm;align-items:center">{mark("#111827", h="9mm")}{W("#111827", h="7mm")}</div>', "invent a lockup", "v1 has no lockup. Use the mark and the wordmark separately."),
     ex('do', f'<img src="file:///workspace/brand/src-v1/img/zurich.jpg" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.45)"><div style="position:absolute;left:0;right:0;top:25%;bottom:25%;background:rgba(3,7,18,.55)"></div><div style="position:relative">{W("#ffffff")}</div>', "place it on a calm, dark area", "Darken photos until the logo passes 4.5:1."),
     ex('dont', f'<div style="position:absolute;inset:0;background:linear-gradient(120deg,#22d3ee,#a855f7,#f97316)"></div><div style="position:relative;filter:drop-shadow(1mm 1mm 1mm rgba(0,0,0,.5));transform:rotate(-8deg)">{W("#ffffff")}</div>', "add effects", "No gradients, shadows, outlines, or rotation."),
    ]
    c = head("2.1  Logo", "Logo do and don't", "Each pair shows a correct use next to the mistake it replaces.") + f'<div class="dd" style="margin-top:8mm">{"".join(rows)}</div>'
    return pg(c, n, "2  Logo")

def color_page(n):
    big = ''.join(f'''<div><div class="sw" style="background:{h};{"border:0.4pt solid #e5e7eb;" if h in ("#ffffff","#f9fafb","#e5e7eb") else ""}height:22mm;padding:2.5mm;color:{tc}"><div style="font-weight:600;font-size:8.5pt;line-height:11pt">{nm}</div><div class="mono" style="font-size:7pt;line-height:9pt;opacity:.9">{tok}</div></div>
<div class="mono" style="font-size:7pt;line-height:10pt;margin-top:1.5mm">HEX {h.upper()}<br>RGB {rgb}<br>CMYK {cm}</div><div class="tiny" style="margin-top:0.8mm">{role}</div></div>''' for nm, tok, h, rgb, cm, role, tc in SW)
    prop = '<div style="display:flex;height:9mm;border-radius:1.5mm;overflow:hidden;border:0.4pt solid #e5e7eb"><div style="flex:70;background:#fff"></div><div style="flex:18;background:#111827"></div><div style="flex:6;background:#4b5563"></div><div style="flex:4;background:#f9fafb;border-left:0.4pt solid #e5e7eb"></div><div style="flex:2;background:#e3a512"></div></div><div class="tiny" style="display:flex;margin-top:1mm"><span style="flex:70">Canvas 70%</span><span style="flex:18">Ink 18%</span><span style="flex:6">Slate</span><span style="flex:4"></span><span style="flex:2;white-space:nowrap;text-align:right">Gold 2%</span></div>'
    c = head("3  Color", "Color", "A white canvas, ink text, and one gold accent. Brand gold #E3A512 fills shapes and the logo; gold text is #8A6300 on light and #E8B84A on dark.") + f'''
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5mm 4mm;margin-top:7mm">{big}</div>
<div class="g" style="margin-top:7mm"><div class="s3"><h3 style="margin-top:0">Proportion</h3><p class="small" style="margin-top:1.5mm">Approximate share of a typical page.</p></div><div class="s9">{prop}</div></div>
<div class="g" style="margin-top:6mm"><div class="s3"><h3 style="margin-top:0">Print notes</h3></div><div class="s9 small" style="color:#111827">
<ul class="l" style="margin-top:0"><li style="margin-top:0">CMYK values come from an ICC conversion from sRGB with a generic CMYK profile, relative colorimetric. Ask your printer for their profile and a proof before a large run.</li>
<li>Print body text in 100% K, and slate text in 70% K, to avoid registration blur at small sizes.</li><li>Pantone references, paper, and dark pages: see the next page.</li></ul></div></div>'''
    return pg(c, n, "3  Color")

def color_dd(n):
    pairs = [("#111827", "#ffffff", "Ink on canvas", "17.7:1", "AAA"), ("#4b5563", "#ffffff", "Slate on canvas", "7.6:1", "AAA"),
             ("#8a6300", "#ffffff", "Gold ink on canvas", "5.4:1", "AA"), ("#8a6300", "#f9fafb", "Gold ink on mist", "5.2:1", "AA"),
             ("#e3a512", "#ffffff", "Brand gold as text", "2.2:1", "Fail"), ("#1a1408", "#e3a512", "On gold, on a gold fill", "8.4:1", "AAA"),
             ("#f9fafb", "#030712", "Mist on night", "19.3:1", "AAA"), ("#9ca3af", "#030712", "Dark slate on night", "7.9:1", "AAA"),
             ("#8a6300", "#030712", "Gold ink on night", "3.7:1", "Fail"), ("#e8b84a", "#030712", "Dark gold text on night, screen", "10.9:1", "AAA")]
    rows = ''.join(f'<tr><td><span style="display:inline-block;padding:0.6mm 2mm;border-radius:1mm;background:{bg};color:{fg};font-weight:600;border:0.4pt solid #e5e7eb">Aa {fg.upper()}</span></td><td>{t}</td><td class="r tnum">{r}</td><td class="r" style="font-weight:600;color:{"#b91c1c" if s=="Fail" else "#15803d"}">{s}</td></tr>' for fg, bg, t, r, s in pairs)
    btn = lambda bg, fg, t="Get started": f'<span style="display:inline-block;border-radius:1.5mm;background:{bg};color:{fg};font-weight:600;font-size:9pt;padding:2.5mm 3.5mm">{t}</span>'
    dd = [ex('do', btn("#e3a512", "#1a1408"), "use on-gold text on gold fills", "#1A1408 on #E3A512 reads at 8.4:1."),
          ex('dont', btn("#e3a512", "#ffffff"), "put white text on gold", "White on brand gold is 2.2:1 and fails AA."),
          ex('do', '<div style="font-size:10pt;line-height:14pt;width:70mm;color:#111827">Read the <span style="color:#8a6300;font-weight:600;text-decoration:underline;text-underline-offset:0.6mm">changelog</span> for what shipped in v0.6.0.</div>', "use gold ink for gold text", "Links and labels on light backgrounds use #8A6300."),
          ex('dont', '<div style="font-size:10pt;line-height:14pt;width:70mm;color:#e3a512">Read the changelog for what shipped in v0.6.0. Brand gold body text is hard to read.</div>', "set text in brand gold", "Keep #E3A512 for fills, bars, rules, and the logo.")]
    c = head("3.1  Color", "Contrast and accessible gold", "Every text pair must reach WCAG AA: 4.5:1 for body text, 3:1 for text from 18 pt, or 14 pt bold.") + f'''
<div class="g" style="margin-top:6mm"><div class="s3"><h3 style="margin-top:0">Rules</h3><p class="small" style="margin-top:1.5mm">Gold text is #8A6300 on light backgrounds. #E3A512 is for fills and the logo, never text. Gold text on dark screens, such as the website in dark mode, is #E8B84A. In print, dark pages carry no gold text.</p></div>
<div class="s9"><table class="t t-tight"><thead><tr><th>Sample</th><th>Pair</th><th class="r">Ratio</th><th class="r">WCAG</th></tr></thead><tbody>{rows}</tbody></table></div></div>
<div class="dd dd-tight" style="margin-top:6mm">{"".join(dd)}</div>'''
    return pg(c, n, "3  Color")

def print_page(n):
    pms = [("#e3a512", "Brand gold", "#E3A512", "PANTONE 124 C", "1.4", "2007 C, 1.7", "PANTONE 7405 U", "4.1", "3514 U, 4.8"),
           ("#8a6300", "Gold ink", "#8A6300", "PANTONE 4027 C", "4.1", "1265 C, 4.9", "PANTONE 7405 U", "9.8", "Verify against swatch")]
    pr = ''.join(f'<tr><td><span style="display:inline-block;width:3.2mm;height:3.2mm;border-radius:0.6mm;background:{sw};vertical-align:-0.6mm;margin-right:1.5mm"></span><b style="font-weight:600">{nm}</b><br><span class="mono" style="font-size:7.5pt">{hx}</span></td><td><b style="font-weight:600">{c}</b><br><span class="muted">Next: {ca}</span></td><td class="r tnum">{dc}</td><td><b style="font-weight:600">{u}</b><br><span class="muted">Next: {ua}</span></td><td class="r tnum">{du}</td></tr>' for sw, nm, hx, c, dc, ca, u, du, ua in pms)
    night = lambda inner: f'<div style="position:absolute;inset:0;background:#030712"></div><div style="position:relative;width:72mm">{inner}</div>'
    good = night('<div style="height:1mm;width:16mm;background:#e3a512;border-radius:0.5mm"></div><div style="color:#f9fafb;font-weight:650;font-size:12pt;line-height:15pt;margin-top:2mm">Ship sooner without rebuilding basic features</div><div style="color:#9ca3af;font-size:7.5pt;margin-top:1mm">Mist and dark slate text, gold as a rule.</div>')
    bad = night('<div style="color:#8a6300;font-weight:650;font-size:12pt;line-height:15pt">Ship sooner without rebuilding basic features</div><div style="color:#4b5563;font-size:7.5pt;margin-top:1mm">Gold ink and slate text on night.</div>')
    c = head("3.2  Color", "Print color, paper, and dark pages", "Spot color references for the two golds, the paper to print on, and when a dark page works in print.") + f'''
<h3 style="margin-top:8mm">Pantone references</h3>
<table class="t t-tight" style="margin-top:3mm"><thead><tr><th>Color</th><th>Closest Pantone Coated</th><th class="r">ΔE00</th><th>Closest Pantone Uncoated</th><th class="r">ΔE00</th></tr></thead><tbody>{pr}</tbody></table>
<p class="fcap">Closest matches by CIEDE2000 between the sRGB value and the digital Pantone Solid Coated and Solid Uncoated libraries (swatches.page HEX to Pantone converter, October 2026). <b style="color:#111827">Confirm against a physical swatch book and a printed proof.</b></p><p class="small" style="margin-top:2mm">Under 2 is hard to see; above 5 reads as a different color. Gold ink has no close uncoated spot match: on uncoated stock print it in CMYK and check the proof.</p>
<div class="g pair" style="margin-top:8mm"><div class="s6"><h3 style="margin-top:0">Paper</h3><ul class="l small" style="color:#111827"><li>Uncoated, bright white</li><li>About 120 g/m² for reports and letterhead</li><li>About 300 g/m² for covers and cards</li><li>Uncoated paper prints gold duller and type slightly heavier: specify the U references and proof first</li></ul></div>
<div class="s6"><h3 style="margin-top:0">Dark pages: when they work</h3><ul class="l small" style="color:#111827"><li>Covers, section openers, slides, and one-message pages</li><li>Showcase pages for dark UI screenshots</li><li>Not for long reading, forms, or pages people write on</li><li>One dark page sets a moment; a dark document tires the eye</li></ul></div></div>
<h3>Dark pages: what to watch</h3><ul class="l small" style="color:#111827;columns:2;column-gap:8mm"><li style="break-inside:avoid">Ink: night converts to 296% total ink. Ask your printer for its coverage limit and a rich black build, above all on uncoated stock</li><li style="break-inside:avoid">Contrast: mist on night reads 19.3:1, dark slate 7.9:1. Gold ink on night is 3.7:1 and fails</li><li style="break-inside:avoid">In print, gold on dark is a fill, rule, or the mark in #E3A512, never text</li><li style="break-inside:avoid">Reversed type: at least 9 pt and weight 400; avoid hairline rules under 0.5 pt</li></ul>
<div class="dd dd-tight" style="margin-top:6mm">{ex("do", good, "keep text light and gold as a fill", "Mist text at 19.3:1, a gold rule, generous margins.")}{ex("dont", bad, "set gold ink or slate text on night", "Gold ink on night is 3.7:1; slate is 2.7:1.")}</div>'''
    return pg(c, n, "3  Color")

def intro(n):
    pack = [("Logo", "Wordmark and mark in ink, white, and gold. SVG and PNG"), ("Icons", "Favicons, app icons, maskable icon"), ("og:image", "Four link preview images, 1200 x 630"), ("Social", "Avatars, X and LinkedIn banners, GitHub preview"), ("Email", "HTML email signature")]
    pk = ''.join(f'<tr><td style="font-weight:600">{a}</td><td>{b}</td></tr>' for a, b in pack)
    c = head("0  About", "About this kit", "How Shellui looks and reads in print and on screen, so that everything made for Shellui looks like it comes from one place.") + f'''
<div class="g pair" style="margin-top:8mm"><div class="s6"><h3 style="margin-top:0">Who it is for</h3><p>Partners, designers, press, and contributors who write about Shellui, design for it, or print for it. Sections 1 to 7 hold the rules, section 8 has print templates to copy, and sections 9 and 10 cover digital assets.</p></div>
<div class="s6"><h3 style="margin-top:0">Download the assets</h3><p>The guidelines live at {DL}, with links to this PDF and the asset zip. The files themselves are served from {FILES}. The zip mirrors the <code>brand-assets/</code> folders named in this kit.</p></div></div>
<h3>What the pack contains</h3><table class="t t-tight" style="margin-top:3mm"><tbody>{pk}</tbody></table>
<div class="box blk" style="margin-bottom:0"><h3 style="margin-top:0">Using the Shellui logo</h3><ul class="l" style="color:#111827"><li>Use the official files, at the sizes and clear space in section 2</li><li>Do not alter the logo: no redrawing, recoloring, stretching, effects, or lockups with other marks</li><li>Do not use the logo in a way that suggests Shellui endorses, sponsors, or partners with you unless it does</li><li>Questions about a use: open an issue at github.com/shellui</li></ul></div>'''
    return pg(c, n, "0  About")

def type_page(n):
    spec = [("Display", "Plex Sans", "40 / 46", "600", 40, 46, 600, "-0.015em", "Brand kit", ""),
            ("H1", "Plex Sans", "26 / 32", "600", 26, 32, 600, "-0.01em", "Ship sooner", ""),
            ("Lede", "Plex Sans", "12 / 18", "400 slate", 12, 18, 400, "0", "Open-source web app platform.", "color:#4b5563;"),
            ("H2", "Plex Sans", "15 / 20", "600", 15, 20, 600, "-0.005em", "Configure the iframe SDK", ""),
            ("H3", "Plex Sans", "11.5 / 15.5", "600", 11.5, 15.5, 600, "0", "Caveats on a custom domain", ""),
            ("H4", "Plex Sans", "10 / 14", "600", 10, 14, 600, "0", "Starting the SDK", ""),
            ("Body", "Plex Sans", "10.5 / 17", "400", 10.5, 17, 400, "0", "Call init before the shell sends settings. Your app then reads the theme and locale from the shell.", ""),
            ("Table", "Plex Sans", "8.5 / 12.5", "400, tabular", 8.5, 12.5, 400, "0", "identity-service  ·  Python  ·  CHF 2'551.15", ""),
            ("Caption", "Plex Sans", "8 / 12", "400 slate", 8, 12, 400, "0", "Figure 1. Features removed per app. Example data.", "color:#4b5563;"),
            ("Folio", "Plex Sans", "7.5 / 10", "400 slate", 7.5, 10, 400, "0", "Running heads and page numbers", "color:#4b5563;"),
            ("Code", "Plex Mono", "8.5 / 13", "400", 8.5, 13, 400, "0", "<span class=mono>await init({ clientId: your_client_id_here })</span>", "")]
    rows = ''.join(f'''<div class="g" style="padding:1.1mm 0;border-bottom:0.4pt solid #e5e7eb;align-items:baseline"><div class="s2" style="font-weight:600;font-size:8.5pt">{nm}</div><div class="s3 small tnum">{fam}, {sz} pt<br>{wt}</div>
<div class="s7" style="font-size:{p}pt;line-height:{l}pt;font-weight:{w};letter-spacing:{ls};{st}white-space:{"nowrap" if p>20 else "normal"};overflow:hidden">{t}</div></div>''' for nm, fam, sz, wt, p, l, w, ls, t, st in spec)
    faces = f'''<div class="g pair blk"><div class="s4"><div style="font-size:24pt;line-height:28pt;font-weight:400">Aa</div><div style="font-weight:600;margin-top:1mm">IBM Plex Sans</div><div class="small">Every word in print: headings, body, tables, captions, charts, and numbers. Weights 400, 500, 600. SIL Open Font License, embedded.</div></div>
<div class="s4"><div class="mono" style="font-size:24pt;line-height:28pt">Aa</div><div style="font-weight:600;margin-top:1mm">IBM Plex Mono</div><div class="small">Code, file paths, versions, and package names. Same design family, so it sits in a paragraph without a jump.</div></div>
<div class="s4"><div style="font-size:24pt;line-height:28pt;color:#9ca3af">Aa</div><div style="font-weight:600;margin-top:1mm">Inter, generated images only</div><div class="small">og:images, social images, icons, and email. The website uses the system font stack. Never in print or PDF.</div></div></div>'''
    c = head("4  Typography", "Typography for print", "Print uses one family. IBM Plex Sans sets every word, from the H1 to the folio, and IBM Plex Mono sets code.") + faces + f'''
<h3>Print scale</h3><div style="border-top:0.8pt solid #111827">{rows}</div>
<p class="fcap">Sizes in points, leading after the slash. Body text runs full width, about 100 characters per line; long prose runs in two columns of about 46 characters.</p>'''
    return pg(c, n, "4  Typography")

def type_web(n):
    web = [("text-5xl", "48 / 48", "Feature page h1, semibold, tight"), ("text-4xl", "36 / 40", "Inner page h1, bold"), ("text-3xl", "30 / 36", "Section heading"), ("text-2xl", "24 / 32", "Section heading, compact"),
           ("text-lg", "18 / 28", "Lede, slate"), ("text-base/7", "16 / 28", "Body"), ("text-sm", "14 / 20", "Buttons, labels, tables"), ("text-xs", "12 / 16", "Badges, meta")]
    wr = ''.join(f'<tr><td class="mono" style="white-space:nowrap">{a}</td><td class="tnum" style="white-space:nowrap">{b}</td><td>{c}</td></tr>' for a, b, c in web)
    c = head("4.1  Typography", "Typography for screens", "Website: system font stack, on the Tailwind scale. Generated screen images (og:images, social, icons, email): Inter. Print: IBM Plex Sans.") + f'''
<div class="g blk"><div class="s3"><h3>Web scale</h3><p class="small">Values from the Tailwind classes used on shellui.com.</p></div><div class="s9"><table class="t"><thead><tr><th>Class</th><th>Size, px</th><th>Use</th></tr></thead><tbody>{wr}</tbody></table></div></div>
<div class="g"><div class="s3"><h3>Rules for print and screen</h3></div><div class="s9"><ul class="l" style="margin-top:0">
<li style="margin-top:0">Sentence case for every heading. Title case only in nav labels</li><li>Line length: at most about 100 characters at full width in print, two columns for long prose; <code>max-w-3xl</code> on the web</li>
<li>Left aligned, ragged right. Never justify</li><li>One H1 per page or slide. Do not skip levels</li><li>Tabular figures in tables and prices</li>
<li>Hyphens, never em or en dashes. Units with a space: 64 KB, 200 ms, 12 GB; seconds bare: 30s</li><li>Bold marks a UI element or a critical fact, not emphasis</li><li>No serif anywhere. Plex Sans in print, the system font stack on the website, Inter in generated images</li></ul></div></div>'''
    return pg(c, n, "4  Typography")

def type_dd(n):
    lorem = "Call init before the shell sends settings. Your app then reads the theme, the locale, and the signed-in account from the shell, so you skip building that chrome again."
    dd = [ex('do', f'<div style="width:74mm"><div style="font-weight:600;font-size:11pt;line-height:14pt">Configure the iframe SDK</div><div style="margin-top:1.5mm;font-size:8.5pt;line-height:12.5pt">Call init before the shell sends settings. Your app then reads the theme and locale from the shell.</div><div class="small" style="margin-top:1.5mm;font-size:7pt;line-height:10pt">Figure 2. Hours per week on release chores.</div></div>', "set the whole document in IBM Plex Sans", "One family: heading, body, and caption share one voice."),
          ex('dont', '<img src="file:///workspace/brand/src-v1/img/dd_mix.png" style="width:72mm;display:block">', "mix serif and sans in one document", "Two voices on one page read as two documents."),
          ex('do', f'<div style="width:74mm"><div style="font-weight:600;font-size:11pt;line-height:14pt">Configure the iframe SDK</div><div style="margin-top:1.5mm;font-size:8.5pt;line-height:12.5pt">{lorem}</div></div>', "use sentence case, ragged right", "About 70 characters per line."),
          ex('dont', f'<div style="width:74mm;font-size:6.5pt;line-height:8pt;text-align:justify"><div style="font-weight:700;font-size:10pt">Configure The Iframe SDK</div><span>{lorem} {lorem}</span></div>', "justify text or use Title Case", "Rivers, long lines, and tight leading slow reading."),
          ex('do', '<div style="width:72mm"><div class="sec">Section 2</div><div style="font-weight:650;font-size:15pt;letter-spacing:-0.02em">Two weights, one size step</div><div class="small">Hierarchy from size and weight.</div></div>', "build hierarchy with size and weight", "400 for text, 600 for headings, one family."),
          ex('dont', '<div style="width:72mm"><div style="font-size:7pt;letter-spacing:0.25em;font-weight:700;color:#e3a512">FEATURES · PLATFORM</div><div style="font-weight:300;font-size:15pt">Many <b style="font-weight:700">weights</b> at <span style="font-weight:500">once</span></div></div>', "add tracked all-caps eyebrows", "Tracking and mixed weights add noise.")]
    c = head("4.2  Typography", "Typography do and don't", "Each pair shows the correct use next to the mistake it replaces.") + f'<div class="dd blk" style="margin-bottom:0">{"".join(dd)}</div>'
    return pg(c, n, "4  Typography")

def spacing(n, VR="13"):
    pr = [(1, 2), (2, 4), (3, 6), (4, 8), (6, 12), (8, 16), (10, 20), (12, 24)]
    dg = [(1, 4), (2, 8), (3, 12), (4, 16), (6, 24), (8, 32), (12, 48), (16, 64), (24, 96)]
    prow = ''.join(f'<div style="display:flex;align-items:center;gap:3mm;height:5mm"><span class="tiny tnum" style="width:9mm">{u}u</span><div style="width:{mm*2.2}mm;height:3mm;background:#e3a512;border-radius:0.5mm"></div><span class="small tnum">{mm} mm</span></div>' for u, mm in pr)
    drow = ''.join(f'<div style="display:flex;align-items:center;gap:3mm;height:4.4mm"><span class="tiny mono" style="width:12mm">{t}</span><div style="width:{px*0.42}mm;height:3mm;background:#111827;border-radius:0.5mm"></div><span class="small tnum">{px} px</span></div>' for t, px in dg)
    # annotated card
    card = f'''<svg viewBox="0 0 80 46" width="52mm" height="29.9mm" font-family="PlexKit">
<rect x="8" y="6" width="64" height="34" rx="2" fill="#f9fafb" stroke="#e5e7eb" stroke-width="0.3"/>
<rect x="14" y="12" width="52" height="22" fill="#dbeafe" opacity=".55"/>
<rect x="14" y="12" width="30" height="2.6" fill="#111827"/><rect x="14" y="17" width="52" height="1" fill="#9ca3af"/><rect x="14" y="19.5" width="48" height="1" fill="#9ca3af"/><rect x="14" y="22" width="40" height="1" fill="#9ca3af"/>
<rect x="14" y="28" width="16" height="6" rx="1" fill="#e3a512"/>
{hdim(8, 14, 4, "8")}{vdim(6, 12, 6, "8")}{vdim(25, 28, 70, "4", left=False)}{hdim(66, 72, 4, "8")}
<text x="8" y="45" font-size="2.4" fill="#2563eb" font-weight="500">Callout or card: 8 mm (4u) padding, 2 mm radius; stacked 6 mm apart</text></svg>'''
    btn = f'''<svg viewBox="0 0 80 46" width="52mm" height="29.9mm" font-family="PlexKit">
<rect x="20" y="14" width="34" height="11" rx="1.5" fill="#e3a512"/><text x="37" y="21.2" font-size="4" font-weight="600" text-anchor="middle" fill="#1a1408">Get started</text>
{hdim(20, 24.9, 11, "14")}{vdim(14, 18, 18, "10")}
<text x="56" y="21" font-size="2.6" fill="#4b5563">px-3.5 py-2.5</text><text x="56" y="24.4" font-size="2.6" fill="#4b5563"><tspan font-family="PlexMonoKit">rounded-md</tspan> 6 px</text>
<rect x="8" y="30" width="64" height="9" rx="2" fill="#fff" stroke="#e5e7eb" stroke-width="0.3"/><text x="11" y="35.6" font-size="2.6" fill="#111827">Card <tspan font-family="PlexMonoKit">p-8</tspan> 32 px, <tspan font-family="PlexMonoKit">rounded-xl</tspan> 12 px</text>
<text x="8" y="45" font-size="2.4" fill="#2563eb" font-weight="500">Screen padding in px, from the website tokens</text></svg>'''
    c = head("5  Spacing", "Spacing system", "One base unit per medium. Every margin, gap, and padding is a step on the scale, so pages line up without measuring by eye.") + f'''
<div class="g pair blk">
<div class="s6"><h3>Print: base unit 2 mm</h3><p class="small">Written as u. One text-level half step: 3.5 mm between paragraphs. List items 2 mm.</p><div style="margin-top:3mm">{prow}</div></div>
<div class="s6"><h3>Screen: base unit 4 px</h3><p class="small">Matches the Tailwind spacing scale (0.25 rem).</p><div style="margin-top:3mm">{drow}</div></div></div>
<h3>Horizontal spacing and padding</h3>
<table class="t"><thead><tr><th>Element</th><th>Print</th><th>Screen</th></tr></thead><tbody>
<tr><td>Page margin</td><td class="tnum">20 mm (10u), bottom 22 mm</td><td class="tnum">16, 24, 32 px (<code>.page-x</code>); og:image 72 px</td></tr>
<tr><td>Column gutter</td><td class="tnum">6 mm (3u); columns 8.67 mm</td><td class="tnum">24 px; 32 px from 1024 px wide</td></tr>
<tr><td>Feature label to content</td><td class="tnum">8 mm (4u)</td><td class="tnum">32 px</td></tr>
<tr><td>Side-by-side blocks</td><td class="tnum">8 mm (4u) minimum</td><td class="tnum">32 px (<code>gap-8</code>)</td></tr>
<tr><td>Card or callout padding</td><td class="tnum">8 mm (4u)</td><td class="tnum">32 or 40 px (<code>p-8</code>, <code>p-10</code>)</td></tr>
<tr><td>Stacked cards or boxes</td><td class="tnum">6 mm (3u)</td><td class="tnum">24 px (<code>space-y-6</code>)</td></tr>
<tr><td>Table cell</td><td class="tnum">2.5 mm above and below, 3 mm each side</td><td class="tnum">12 px above and below, 12 px each side</td></tr>
<tr><td>Corner radius</td><td class="tnum">2 mm cards, 1.5 mm controls</td><td class="tnum"><code>rounded-xl</code> 12 px cards, <code>rounded-md</code> 6 px</td></tr></tbody></table>
<p class="fcap">Nested corners: child radius ≤ parent radius. Vertical spacing has its own tokens on page {VR}.</p>
<div class="g pair blk" style="margin-bottom:0;margin-top:9mm!important"><div class="s6">{card}</div><div class="s6">{btn}</div></div>'''
    return pg(c, n, "5  Spacing")

FOLIO_GOOD = '<div style="width:70mm;height:15mm;background:#fff;border:0.4pt solid #d1d5db;position:relative;font-size:5pt;line-height:6pt;color:#4b5563"><div style="position:absolute;left:3mm;right:3mm;top:1.5mm;display:flex;justify-content:space-between"><span>Shellui brand kit</span><span>Spacing</span></div><div style="position:absolute;left:3mm;right:3mm;top:5.5mm;height:0.8mm;background:#d1d5db"></div><div style="position:absolute;left:3mm;right:24mm;top:7.5mm;height:0.8mm;background:#d1d5db"></div><div style="position:absolute;left:3mm;right:3mm;bottom:1.5mm;display:flex;justify-content:space-between"><span>Shellui report</span><b style="color:#111827">12</b></div></div>'
FOLIO_BAD = '<div style="width:70mm;height:15mm;background:#fff;border:0.4pt solid #d1d5db;position:relative;font-size:5pt;line-height:6pt;color:#4b5563"><div style="position:absolute;left:3mm;right:3mm;top:1.5mm;display:flex;justify-content:space-between"><span>Shellui brand kit</span><span>Page 12 of 31</span></div><div style="position:absolute;left:3mm;right:3mm;top:5.5mm;height:0.8mm;background:#d1d5db"></div><div style="position:absolute;left:3mm;right:24mm;top:7.5mm;height:0.8mm;background:#d1d5db"></div><div style="position:absolute;left:3mm;right:3mm;bottom:1.5mm;display:flex;justify-content:space-between"><span>Shellui report</span><b style="color:#111827">12</b></div></div>'
def margins(n):
    s = 0.33
    W, Hh = 210*s, 297*s
    cols = ''.join(f'<rect x="{(20+i*(44/3))*s:.2f}" y="{20*s}" width="{(26/3)*s:.2f}" height="{255*s:.2f}" fill="#fdf6e3"/>' for i in range(12))
    a4 = f'''<svg viewBox="-16 -10 {W+44} {Hh+22}" width="{(W+44)}mm" height="{(Hh+22)}mm" font-family="PlexKit">
<rect x="0" y="0" width="{W}" height="{Hh}" fill="#fff" stroke="#9ca3af" stroke-width="0.3"/>{cols}
<rect x="{20*s}" y="{20*s}" width="{170*s}" height="{255*s}" fill="none" stroke="#8a6300" stroke-width="0.2" stroke-dasharray="0.8 0.6"/>
<rect x="{20*s}" y="{10*s}" width="{40*s}" height="0.8" fill="#9ca3af"/><rect x="{(190-12)*s}" y="{(297-10)*s-0.8}" width="{6*s}" height="0.8" fill="#111827"/>
<rect x="{20*s}" y="{30*s}" width="{110*s}" height="3" fill="#111827"/>
{''.join(f'<rect x="{20*s:.2f}" y="{36*s+5+i*2.3:.2f}" width="{(170 if i%6!=5 else 110)*s:.2f}" height="0.7" fill="#9ca3af"/>' for i in range(30))}
{hdim(0, 20*s, -3, "20")}{hdim(20*s, 20*s+(26/3)*s, -3, "8.67")}{hdim(20*s+(26/3)*s, 20*s+(44/3)*s, -6.5, "6")}{hdim((20+2*(44/3))*s, 190*s, -3, "170 mm text, full width")}{hdim(190*s, W, -3, "20")}
{vdim(0, 20*s, -2, "20 mm")}{vdim(0, 10*s, W+2, "10 running head", left=False)}{vdim(277*s, Hh, -2, "22 mm")}{vdim(Hh-10*s, Hh, W+2, "10 folio", left=False)}</svg>'''
    sp = lambda kind, fig, t, d: ex(kind, fig, t, d)
    good = '<div style="width:50mm;background:#fff;border-radius:1.5mm;padding:5mm 8mm;border:0.4pt solid #e5e7eb"><div style="font-weight:600;font-size:10pt">Storage</div><div class="small" style="margin-top:2mm">Upload and serve files.</div><div style="margin-top:6mm;display:inline-block;background:#e3a512;color:#1a1408;font-size:8pt;font-weight:600;padding:1.5mm 2.5mm;border-radius:1mm">Read the docs</div></div>'
    bad = '<div style="width:64mm;background:#fff;border-radius:1.5mm;padding:1mm 7mm 0.5mm 1.5mm;border:0.4pt solid #e5e7eb"><div style="font-weight:600;font-size:10pt;margin-left:2.5mm">Storage</div><div class="small" style="margin-top:0">Upload and serve files.</div><div style="margin-top:5.5mm;margin-left:9mm;display:inline-block;background:#e3a512;color:#1a1408;font-size:8pt;font-weight:600;padding:0.5mm 4mm;border-radius:1mm">Read the docs</div></div>'
    c = head("5.1  Spacing", "Margins, gutters, and padding", "The A4 frame used by every print template. Measurements in millimetres, drawn at 33% scale.") + f'''
<div class="g pair" style="margin-top:6mm"><div class="s8">{a4}</div>
<div class="s4" style="padding-top:6mm"><h3 style="margin-top:0">A4 portrait</h3><ul class="l small" style="color:#111827"><li>Margins 20 mm, bottom 22 mm; live area 170 x 255 mm</li><li>12 columns of 8.67 mm, gutters 6 mm</li><li>Running head and folio sit 10 mm from the edge, in 7.5 pt slate. One page number per page, bottom right; none on covers</li><li>Text spans all 12 columns: about 100 characters at 10.5 / 17 pt. Prose longer than three paragraphs runs in two 81 mm columns</li><li>Feature layout only: label in columns 1 to 3, 8 mm from the content</li></ul>
<h3>Screen</h3><ul class="l small" style="color:#111827"><li>Page gutters 16, 24, 32 px by breakpoint</li><li>Content widths: <code>max-w-7xl</code> 1280 px, <code>max-w-5xl</code> 1024 px, prose <code>max-w-3xl</code> 768 px</li><li>Header, body, and footer share one content edge</li></ul></div></div>
<div class="dd dd-tight" style="margin-top:6mm">{sp("do", good, "use scale steps for every gap", "Padding 4u (8 mm), title to text 1u, text to button 3u.")}{sp("dont", bad, "nudge spacing by eye", "Uneven padding and offsets break the content edge.")}
{ex("do", FOLIO_GOOD, "one page number, bottom right", "Head names the section, foot holds the number.", "height:22mm")}{ex("dont", FOLIO_BAD, "repeat the page number", "A number in the head and the foot reads as two counts.", "height:22mm")}</div>'''
    return pg(c, n, "5  Spacing")

def grid_page(n):
    def thumb(label, body, w=36, h=50.9, land=False):
        return f'<div><svg viewBox="0 0 {w} {h}" width="{w}mm" height="{h}mm"><rect x="0.2" y="0.2" width="{w-0.4}" height="{h-0.4}" fill="#fff" stroke="#9ca3af" stroke-width="0.3"/>{body}</svg><div class="small" style="margin-top:1mm;color:#111827;font-weight:600">{label}</div></div>'
    s = 36/210
    colx = lambda i: (20 + i*(44/3))*s
    cw = lambda k: (k*(26/3) + (k-1)*6)*s
    lines = lambda x0, k, y0, n, gap=7: ''.join(f'<rect x="{colx(x0):.2f}" y="{(y0+i*gap)*s:.2f}" width="{cw(k)*(0.6 if i%7==6 else 1):.2f}" height="0.6" fill="#9ca3af"/>' for i in range(n))
    t1 = thumb("Text page: 12, default", f'<rect x="{colx(0)}" y="{24*s}" width="{cw(7)}" height="1.6" fill="#111827"/>' + lines(0, 12, 40, 14) + f'<rect x="{colx(0)}" y="{142*s}" width="{cw(12)}" height="{50*s}" fill="#f3f4f6"/>' + lines(0, 12, 202, 9))
    t2 = thumb("Long prose: 6 + 6", f'<rect x="{colx(0)}" y="{24*s}" width="{cw(7)}" height="1.6" fill="#111827"/>' + lines(0, 6, 40, 30) + lines(6, 6, 40, 30))
    t3 = thumb("Feature opener: 3 + 9", f'<rect x="{colx(0)}" y="{60*s}" width="{cw(2)}" height="1" fill="#8a6300"/><rect x="{colx(3)}" y="{58*s}" width="{cw(8)}" height="2.4" fill="#111827"/><rect x="{colx(3)}" y="{74*s}" width="{cw(7)}" height="1" fill="#9ca3af"/>' + lines(0, 12, 120, 18))
    sl = 'width="54" height="30.4"'
    t4 = f'<div><svg viewBox="0 0 54 30.4" width="54mm" height="30.4mm"><rect x="0.2" y="0.2" width="53.6" height="30" fill="#fff" stroke="#9ca3af" stroke-width="0.3"/>' + ''.join(f'<rect x="{(12+i*(19.75))*54/297:.2f}" y="{12*54/297:.2f}" width="{15.75*54/297:.2f}" height="{143*54/297:.2f}" fill="#fdf6e3"/>' for i in range(12)) + '<rect x="2.2" y="7" width="26" height="2.4" fill="#111827"/><rect x="2.2" y="11" width="22" height="0.8" fill="#9ca3af"/><rect x="31" y="7" width="20.6" height="18" fill="#f3f4f6"/></svg><div class="small" style="margin-top:1mm;color:#111827;font-weight:600">Slide 16:9: 12 columns</div></div>'
    good = '<div style="width:70mm;display:grid;grid-template-columns:repeat(3,1fr);gap:2.5mm">' + ''.join('<div><div style="height:1.4mm;width:60%;background:#111827"></div><div style="height:0.8mm;background:#9ca3af;margin-top:1.5mm"></div><div style="height:0.8mm;width:80%;background:#9ca3af;margin-top:1mm"></div></div>' for _ in range(3)) + '<div style="grid-column:span 3;height:12mm;background:#e5e7eb;border-radius:1mm"></div></div>'
    bad = '<div style="width:70mm;position:relative;height:26mm"><div style="position:absolute;left:4mm;top:0;width:22mm"><div style="height:1.4mm;width:60%;background:#111827"></div><div style="height:0.8mm;background:#9ca3af;margin-top:1.5mm"></div></div><div style="position:absolute;left:31mm;top:3mm;width:17mm"><div style="height:1.4mm;width:60%;background:#111827;margin:auto"></div><div style="height:0.8mm;background:#9ca3af;margin-top:1.5mm"></div></div><div style="position:absolute;left:52mm;top:1mm;width:20mm"><div style="height:1.4mm;width:60%;background:#111827;margin-left:auto"></div><div style="height:0.8mm;background:#9ca3af;margin-top:1.5mm"></div></div><div style="position:absolute;left:7mm;top:13mm;width:58mm;height:12mm;background:#e5e7eb;border-radius:1mm"></div></div>'
    fw = '<div style="width:70mm">' + '<div style="height:1.4mm;width:50%;background:#111827"></div>' + ''.join(f'<div style="height:0.8mm;background:#9ca3af;margin-top:1.4mm;width:{60 if i==5 else 100}%"></div>' for i in range(6)) + '</div>'
    empty = '<div style="width:70mm;display:flex;gap:4mm"><div style="width:17mm"></div><div style="flex:1"><div style="height:1.4mm;width:60%;background:#111827"></div>' + ''.join(f'<div style="height:0.8mm;background:#9ca3af;margin-top:1.4mm;width:{60 if i==5 else 100}%"></div>' for i in range(6)) + '</div></div>'
    good2 = '<div style="width:70mm"><div style="font-weight:650;font-size:13pt;letter-spacing:-0.02em">One dominant claim</div><div class="small" style="margin-top:1mm">Supporting text sits under the heading, on the same left edge, and the eye reads down one line.</div></div>'
    bad2 = '<div style="width:70mm;text-align:center"><div style="font-weight:650;font-size:13pt">Centered hero</div><div class="small">Then three equal cards</div><div style="display:flex;gap:2mm;margin-top:2mm">' + '<div style="flex:1;height:8mm;border:0.4pt solid #9ca3af;border-radius:1mm;background:#fff"></div>'*3 + '</div></div>'
    c = head("6  Layout", "Layout grids", "Every page runs on 12 columns between the margins. Text, tables, charts, and screenshots use the full width by default. Long prose splits into two columns.") + f'''
<div style="display:flex;gap:8mm;align-items:flex-end;margin-top:8mm">{t1}{t2}{t3}{t4}</div>
<h3>When to use each layout</h3><ul class="l"><li><b>Full width, the default.</b> Body text, tables, charts, and screenshots span all 12 columns, 170 mm. Use it for every text page</li><li><b>Two columns, 6 + 6.</b> Prose longer than three paragraphs, so lines stay near 46 characters instead of 100. Also for side-by-side comparisons, 8 mm apart</li><li><b>Feature layout, 3 + 9, optional.</b> A label or section number in columns 1 to 3, the title in columns 4 to 12. Only for covers, section openers, pull quotes, and showcase pages. The content below returns to full width</li><li>Never leave columns 1 to 3 empty beside running text. Snap every edge to a column or gutter</li></ul>
<div class="dd dd-tight" style="margin-top:6mm">{ex("do", fw, "run text pages full width", "Text uses all 12 columns; long prose splits in two.")}{ex("dont", empty, "leave a left column empty on text pages", "Empty columns 1 to 3 waste a fifth of the page.")}
{ex("do", good2, "lead with one claim, left aligned", "Reading starts at the top left edge.")}{ex("dont", bad2, "fall back to centered hero plus equal cards", "A generic pattern that hides the message.")}</div>'''
    return pg(c, n, "6  Layout")

def imagery(n):
    good_chart = bar_chart([("Jul", 42), ("Aug", 51), ("Sep", 58), ("Oct", 74)], w=72, h=30, highlight="Oct", fs=2.8, ymax=80)
    bad_chart = '<svg viewBox="0 0 72 30" width="72mm" height="30mm" font-family="PlexKit">' + ''.join(f'<rect x="{6+i*16}" y="{28-v}" width="10" height="{v}" fill="{c}"/><rect x="{16+i*16}" y="{29-v}" width="2" height="{v}" fill="#00000033"/>' for i, (v, c) in enumerate([(12, "#ef4444"), (16, "#22c55e"), (19, "#3b82f6"), (24, "#a855f7")])) + '<rect x="50" y="1" width="20" height="10" fill="#fff" stroke="#999" stroke-width="0.2"/>' + ''.join(f'<rect x="51" y="{2+i*2.2}" width="1.5" height="1.5" fill="{c}"/><text x="53.5" y="{3.3+i*2.2}" font-size="1.7">Series {i+1}</text>' for i, c in enumerate(["#ef4444", "#22c55e", "#3b82f6", "#a855f7"])) + '</svg>'
    shot = '<div style="width:72mm;border-radius:1.5mm;overflow:hidden;border:0.4pt solid #e5e7eb;box-shadow:none"><img src="file:///workspace/audit/jpg/d_home.jpg" style="width:100%;display:block"></div>'
    fake = '<div style="width:72mm;height:28mm;border-radius:3mm;background:linear-gradient(135deg,#1e1b4b,#7c3aed);padding:2mm;display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5mm;box-shadow:0 2mm 4mm rgba(124,58,237,.5)">' + ''.join(f'<div style="background:rgba(255,255,255,.15);border-radius:1.5mm;color:#fff;font-size:6pt;padding:1mm">{t}<br><b style="font-size:9pt">{v}</b></div>' for t, v in [("Users", "98k"), ("AI score", "99%"), ("Growth", "+412%")]) + '</div>'
    flat_ok = f'<div style="position:absolute;inset:0;background:#fff"></div><div style="position:relative;width:72mm"><div style="margin-bottom:2mm">{mark("#111827", h="5mm")}</div><div style="font-size:12pt;line-height:15pt;font-weight:650;letter-spacing:-0.02em">Ship sooner without rebuilding basic features</div></div>'
    flat_bad = f'<div style="position:absolute;inset:0;background:radial-gradient(circle at 15% 20%,#f6d27a 0%,#fbe7b5 30%,#fde2e4 60%,#ffffff 90%)"></div><div style="position:relative;width:72mm"><div style="margin-bottom:2mm">{mark("#111827", h="5mm")}</div><div style="font-size:12pt;line-height:15pt;font-weight:650;letter-spacing:-0.02em">Ship sooner without rebuilding basic features</div></div>'
    c = head("7  Imagery", "Imagery and charts", "Show real data. A chart makes one point, gold marks that point, and white space sets the chart apart from the text.") + f'''
<div class="g blk"><div class="s3"><h3>Charts</h3></div><div class="s9"><ul class="l" style="margin-top:0"><li style="margin-top:0">The title or caption states the finding, not the metric</li><li>Gray series (#9CA3AF), one gold highlight (#E3A512) with its value labeled in ink</li><li>Label lines and bars directly. Skip the legend when you can</li><li>Bars start at zero. No 3D, no pie with more than three slices</li><li>IBM Plex Sans for all chart text: axis 7 pt slate, labels 8 pt, tabular figures</li><li>Gridlines in #E5E7EB, 0.2 pt</li></ul></div></div>
<div class="g"><div class="s3"><h3>Space and captions</h3></div><div class="s9"><ul class="l" style="margin-top:0"><li style="margin-top:0">10 mm of white space above and below every chart, screenshot, and table</li><li>A caption under each figure: figure number, the finding in one line, and the source. IBM Plex Sans 8 / 12 pt</li><li>One figure per reading moment. If two figures do not fit with full spacing, move one to the next page</li><li>Mark sample figures as example data</li></ul></div></div>
<div class="dd blk" style="margin-bottom:0">{ex("do", good_chart, "highlight the one value that matters", "October in gold, labeled directly. Example data.")}{ex("dont", bad_chart, "use a rainbow, shadows, and a legend", "Color without meaning hides the point.")}</div>'''
    return pg(c, n, "7  Imagery")

def imagery2(n):
    shot = '<div style="width:72mm;border-radius:1.5mm;overflow:hidden;border:0.4pt solid #e5e7eb;box-shadow:none"><img src="file:///workspace/audit/jpg/d_home.jpg" style="width:100%;display:block"></div>'
    fake = '<div style="width:72mm;height:28mm;border-radius:3mm;background:linear-gradient(135deg,#1e1b4b,#7c3aed);padding:2mm;display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5mm;box-shadow:0 2mm 4mm rgba(124,58,237,.5)">' + ''.join(f'<div style="background:rgba(255,255,255,.15);border-radius:1.5mm;color:#fff;font-size:6pt;padding:1mm">{t}<br><b style="font-size:9pt">{v}</b></div>' for t, v in [("Users", "98k"), ("AI score", "99%"), ("Growth", "+412%")]) + '</div>'
    flat_ok = f'<div style="position:absolute;inset:0;background:#fff"></div><div style="position:relative;width:72mm"><div style="margin-bottom:2mm">{mark("#111827", h="5mm")}</div><div style="font-size:12pt;line-height:15pt;font-weight:650;letter-spacing:-0.02em">Ship sooner without rebuilding basic features</div></div>'
    flat_bad = f'<div style="position:absolute;inset:0;background:radial-gradient(circle at 15% 20%,#f6d27a 0%,#fbe7b5 30%,#fde2e4 60%,#ffffff 90%)"></div><div style="position:relative;width:72mm"><div style="margin-bottom:2mm">{mark("#111827", h="5mm")}</div><div style="font-size:12pt;line-height:15pt;font-weight:650;letter-spacing:-0.02em">Ship sooner without rebuilding basic features</div></div>'
    bars = lambda n, w=60: ''.join(f'<div style="height:1.1mm;background:#9ca3af;border-radius:0.5mm;margin-top:1.3mm;width:{w if i<n-1 else w*0.6}mm"></div>' for i in range(n))
    cramped = '<div style="width:74mm">' + bars(2, 74) + '<div style="display:flex;gap:0.8mm;margin-top:0.6mm"><img src="file:///workspace/audit/jpg/d_home.jpg" style="width:36.6mm;height:16mm;object-fit:cover;display:block"><div style="width:36.6mm;height:16mm;background:#e5e7eb;display:flex;align-items:flex-end;gap:1mm;padding:1.5mm">' + ''.join(f'<div style="flex:1;height:{h}mm;background:{c}"></div>' for h, c in [(5,"#ef4444"),(9,"#3b82f6"),(7,"#22c55e")]) + '</div></div>' + bars(2, 74).replace('margin-top:1.3mm','margin-top:0.6mm',1) + '</div>'
    roomy = '<div style="width:60mm">' + bars(2) + '<img src="file:///workspace/audit/jpg/d_home.jpg" style="width:40mm;height:14mm;object-fit:cover;object-position:top;display:block;margin-top:3.5mm;border:0.3pt solid #d1d5db;border-radius:0.8mm"><div style="font-size:5.5pt;line-height:7pt;color:#4b5563;margin-top:1mm">Figure 3. shellui.com home page.</div><div style="margin-top:2.5mm">' + bars(2) + '</div></div>'
    c = head("7.1  Imagery", "Screenshots and backgrounds", "Screenshots prove what ships. Give each one room, a frame, and a caption. Print and social backgrounds stay flat.") + f'''
<div class="g blk"><div class="s3"><h3>Screenshots and photos</h3></div><div class="s9"><ul class="l" style="margin-top:0"><li style="margin-top:0">Screenshots of the shipping UI only, captured at 2x, current version</li><li>Frame with a 0.4 pt border and 2 mm radius (12 px on screen). No device mockups, no shadows</li><li>Photography: real places and real work, natural light. Zurich is the home city</li><li>Print, PDFs, og:images, and social images stay flat: white, mist #F9FAFB, ink, or night</li><li>A soft gold wash is allowed on the website only, behind the hero</li></ul></div></div>
<div class="dd" style="margin-top:0">{ex("do", roomy, "give each figure room and a caption", "10 mm above and below, caption 2 mm under.")}{ex("dont", cramped, "cram figures side by side with text", "No air, no caption, two figures fighting.")}
{ex("do", shot, "show the real UI in a plain frame", "shellui.com home page, October 2026.", "padding:2mm")}{ex("dont", fake, "invent dashboards or metrics", "Fake screenshots break trust.")}
{ex("do", flat_ok, "keep print and social flat", "White, mist, ink, or night. The type and the mark carry the brand.")}{ex("dont", flat_bad, "put a gradient or wash on print or social", "The soft gold wash belongs to the website only.")}</div>'''
    return pg(c, n, "7  Imagery")

VTOKENS = [("space-3xl", "12 mm", "64 px", "Above H1 when it follows content"),
           ("space-2xl", "10 mm", "40 px", "Above H2; before and after tables, charts, callouts, screenshots, code"),
           ("space-xl", "8 mm", "32 px", "Card padding; gap between side-by-side blocks and text columns"),
           ("space-lg", "6 mm", "24 px", "Above H3; grid gutter; between stacked cards"),
           ("space-md", "4 mm", "16 px", "Below H1 and H2; above H4"),
           ("space-sm", "3.5 mm", "20 px", "Between paragraphs"),
           ("space-xs", "2 mm", "8 px", "Below H3 and H4; figure to caption; list items")]

def rhythm(n):
    k = 0.7; X = 0; Wc = 119
    items = []; y = 0
    def lines(cnt, last=0.7, col="#9ca3af", h=1.6, pitch=5.29):
        nonlocal y
        out = ''
        for i in range(cnt):
            w = Wc * (last if i == cnt - 1 else 1)
            out += f'<rect x="0" y="{y + i*pitch + (pitch-h)/2:.2f}" width="{w:.1f}" height="{h}" rx="0.4" fill="{col}"/>'
        y += cnt * pitch
        return out
    dims = []
    def gap(mm, label):
        nonlocal y
        dims.append((y, y + mm, label)); y += mm
    body = ''
    body += lines(2)
    gap(10, "10 mm  space-2xl  above H2")
    body += f'<rect x="0" y="{y+1.2:.2f}" width="62" height="4.6" rx="0.5" fill="#111827"/>'; y += 7.4
    gap(4, "4 mm  space-md  below H2")
    body += lines(4)
    gap(3.5, "3.5 mm  space-sm  paragraphs")
    body += lines(3, 0.5)
    gap(10, "10 mm  space-2xl  before a figure")
    body += f'<rect x="0" y="{y:.2f}" width="{Wc}" height="28" rx="1" fill="#f9fafb" stroke="#e5e7eb" stroke-width="0.3"/>' + ''.join(f'<rect x="{8+i*22}" y="{y+28-h:.2f}" width="12" height="{h}" fill="{"#e3a512" if i==3 else "#9ca3af"}"/>' for i, h in enumerate([10, 15, 12, 22, 14]))
    y += 28
    gap(2, "2 mm  space-xs  figure to caption")
    body += lines(1, 0.6, h=1.2, pitch=4.06)
    gap(10, "10 mm  space-2xl  after a figure")
    body += lines(2, 0.8)
    gap(6, "6 mm  space-lg  above H3")
    body += f'<rect x="0" y="{y+1.1:.2f}" width="44" height="3.4" rx="0.5" fill="#111827"/>'; y += 5.6
    gap(2, "2 mm  space-xs  below H3")
    body += lines(3, 0.6)
    H = y
    dd = ''.join(f'<rect x="0" y="{a:.2f}" width="{Wc}" height="{b-a:.2f}" fill="#dbeafe" opacity=".6"/>' + vdim(a, b, Wc + 4, lab, left=False, fs=3.1, sw=0.3) for a, b, lab in dims)
    svg = f'<svg viewBox="-2 -2 {Wc+62} {H+4}" width="{(Wc+62)*k:.1f}mm" height="{(H+4)*k:.1f}mm" font-family="PlexKit">{dd}{body}</svg>'
    tr = ''.join(f'<tr><td class="mono" style="white-space:nowrap">{a}</td><td class="r tnum" style="text-align:left">{b}</td><td class="tnum">{c}</td><td>{d}</td></tr>' for a, b, c, d in VTOKENS)
    c = head("5.2  Spacing", "Vertical rhythm", "Seven tokens set every gap. Headings sit closer to the text they introduce than to the text above them, and every figure gets 10 mm of air.") + f'''
<div class="g pair blk"><div class="s8">{svg}</div><div class="s4"><h3>Annotated column</h3><p class="small">A body column at 70% scale. Blue bands are the gaps; gray bars are lines of 10.5 / 17 pt text.</p><p class="small" style="margin-top:3mm">Gaps do not add up: when a figure ends right before an H2, use one 10 mm gap.</p></div></div>
<table class="t"><thead><tr><th>Token</th><th>Print</th><th>Screen</th><th>Use</th></tr></thead><tbody>{tr}</tbody></table>'''
    return pg(c, n, "5  Spacing")
