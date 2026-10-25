from kit_parts import *

def og_page(n):
    items = [("og-default.png", "Default site", "Home and pages without their own image"), ("og-docs.png", "Docs page", "Guide title, section path, docs URL"),
             ("og-blog.png", "Blog post", "Dark canvas, title, author, date, category"), ("og-changelog.png", "Changelog", "Version pill, release title, highlights, date")]
    grid = ''.join(f'<div><img src="{A}og/{f}" style="width:81mm;height:42.5mm;display:block;border-radius:1.5mm;border:0.4pt solid #e5e7eb"><div class="small" style="margin-top:1.5mm"><b style="color:#111827">{t}</b>  ·  <span class="mono" style="font-size:7.5pt">{f}</span><br>{d}</div></div>' for f, t, d in items)
    s = 83/1200
    anat = f'''<div style="position:relative;width:83mm;height:43.6mm"><img src="{A}og/og-default.png" style="width:81mm;height:42.5mm;display:block;border-radius:1.5mm;border:0.4pt solid #e5e7eb">
<svg viewBox="0 0 1200 630" width="81mm" height="42.5mm" style="position:absolute;inset:0" font-family="PlexKit">
<rect x="72" y="64" width="1056" height="502" fill="none" stroke="#2563eb" stroke-width="3" stroke-dasharray="12 8"/>
<line x1="0" y1="32" x2="72" y2="32" stroke="#2563eb" stroke-width="3"/><text x="80" y="42" font-size="30" fill="#2563eb" font-weight="600">72 px safe margin</text>
<line x1="1150" y1="168" x2="1150" y2="370" stroke="#2563eb" stroke-width="3"/><text x="1140" y="280" font-size="30" fill="#2563eb" font-weight="600" text-anchor="end">Title 64 px</text></svg></div>'''
    c = f'''<div class="g"><div class="s3 sec" style="padding-top:2.5mm">9  og:image</div><div class="s9"><h1>og:image templates</h1><p class="lede">Link previews for X, LinkedIn, Slack, and chat apps. All four ship as 1200 x 630 PNG files in <code>brand-assets/og/</code>.</p></div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8mm 8mm;margin-top:8mm">{grid}</div>
<div class="g" style="margin-top:7mm"><div class="s6">{anat}<div class="figcap">Anatomy of the default template</div></div>
<div class="s6"><h3 style="margin-top:0">Specification</h3><table class="t t-tight" style="margin-top:2mm"><tbody>
<tr><td class="muted">Size</td><td>1200 x 630 px, PNG, under 300 KB</td></tr><tr><td class="muted">Safe margin</td><td>72 px on every side; 64 px top for the mark row</td></tr>
<tr><td class="muted">Mark</td><td>44 px high, top left, with page label in 24 px slate</td></tr><tr><td class="muted">Title</td><td>Inter 650, 64 px, 1.08 leading, 3 lines or 60 characters at most</td></tr>
<tr><td class="muted">Lede</td><td>26 px slate, 2 lines at most</td></tr><tr><td class="muted">Background</td><td>Flat white, no gradient. Mark at 4% opacity, cropped</td></tr>
<tr><td class="muted">Dark variant</td><td>Flat night #030712, dark gold #E8B84A for the mark and fills only, blog only</td></tr></tbody></table></div></div>'''
    return pg(c, n, "9  og:image")

def social_page(n):
    av = ''.join(f'<div style="text-align:center"><img src="{A}social/avatar-{k}-800.png" style="width:24mm;height:24mm;border-radius:50%;display:block;border:0.4pt solid #e5e7eb"><div class="tiny" style="margin-top:1mm">{t}</div></div>' for k, t in [("dark", "Dark, default"), ("gold", "Gold"), ("light", "Light")])
    c = f'''<div class="g"><div class="s3 sec" style="padding-top:2.5mm">10  Social</div><div class="s9"><h1>Social profiles and GitHub</h1><p class="lede">One avatar, one banner message, and a GitHub preview that names what the repository ships.</p></div></div>
<div class="g feature" style="margin-top:7mm"><div class="s3"><h3 style="margin-top:0">Avatar</h3><p class="small" style="margin-top:1mm">800 x 800 px. The mark fills 50% of the height so it survives a circle crop.</p></div><div class="s9" style="display:flex;gap:6mm">{av}</div></div>
<div class="g feature" style="margin-top:6mm"><div class="s3"><h3 style="margin-top:0">X banner</h3><p class="small" style="margin-top:1mm">1500 x 500 px. Text sits right of center, clear of the avatar at bottom left.</p></div>
<div class="s9" style="position:relative"><img src="{A}social/x-banner-1500x500.png" style="width:126mm;display:block;border:0.4pt solid #e5e7eb;border-radius:1mm">
<div style="position:absolute;left:5mm;top:28mm;width:22mm;height:22mm;border-radius:50%;border:0.6pt dashed #2563eb"></div><div class="tiny" style="color:#2563eb;margin-top:8mm">Dashed circle: where X places the avatar. Keep it empty.</div></div></div>
<div class="g feature" style="margin-top:5mm"><div class="s3"><h3 style="margin-top:0">LinkedIn</h3><p class="small" style="margin-top:1mm">Personal banner 1584 x 396 px and company cover 1128 x 191 px.</p></div>
<div class="s9"><img src="{A}social/linkedin-banner-1584x396.png" style="width:126mm;display:block;border:0.4pt solid #e5e7eb;border-radius:1mm"><img src="{A}social/linkedin-company-cover-1128x191.png" style="width:126mm;display:block;border:0.4pt solid #e5e7eb;border-radius:1mm;margin-top:3mm"></div></div>
<div class="g feature" style="margin-top:5mm"><div class="s3"><h3 style="margin-top:0">GitHub social preview</h3><p class="small" style="margin-top:1mm">1280 x 640 px. Upload in the repository settings. GitHub asks for a 40 px border of empty space; this file keeps 96 px.</p></div>
<div class="s9"><img src="{A}social/github-social-preview-1280x640.png" style="width:126mm;display:block;border:0.4pt solid #e5e7eb;border-radius:1mm"></div></div>'''
    return pg(c, n, "10  Social")

def icons_page(n):
    fav = ''.join(f'<div style="text-align:center"><div style="height:18mm;display:flex;align-items:flex-end;justify-content:center"><img src="{A}icons/{f}" style="width:{w}mm;height:{w}mm;image-rendering:{"pixelated" if s<=48 else "auto"};{"border-radius:" + str(round(w*0.2237,2)) + "mm;" if s>=180 else ""}"></div><div class="tiny" style="margin-top:1.5mm"><b style="color:#111827">{s} px</b><br>{u}</div></div>'
        for f, s, w, u in [("favicon-16.png", 16, 8, "favicon, shown at 2x"), ("favicon-32.png", 32, 10, "favicon"), ("favicon-48.png", 48, 12, "Windows"), ("app-icon-180.png", 180, 14, "apple-touch-icon"), ("app-icon-192.png", 192, 14, "Android"), ("app-icon-512.png", 512, 15, "PWA, splash"), ("app-icon-gold-512.png", 512, 15, "Gold variant")])
    files = ["favicon.ico (16, 32, 48)", "favicon.svg", "favicon-16.png, -32.png, -48.png", "app-icon-64, 180, 192, 512, 1024.png", "app-icon-gold-180, 512.png", "maskable-512.png (mark at 44% for Android safe zone)"]
    c = f'''<div class="g"><div class="s3 sec" style="padding-top:2.5mm">10.1  Email and icons</div><div class="s9"><h1>Email signature and app icons</h1><p class="lede">Small surfaces with the most repetition. Keep them plain so they render in every mail client and browser tab.</p></div></div>
<div class="g" style="margin-top:7mm"><div class="s3"><h3 style="margin-top:0">Email signature</h3><p class="small" style="margin-top:1mm">HTML table with inline styles and system fonts. File: <code>brand-assets/email/email-signature.html</code>.</p></div>
<div class="s9"><img src="{A}email/email-signature-preview.png" style="width:110mm;display:block;border:0.4pt solid #e5e7eb;border-radius:1mm">
<ul class="l small" style="color:#111827"><li>Name in 15 px semibold, role in slate, one gold ink link, no taglines or banners. Replace the example name and role with your own</li><li>Logo image 40 px, hosted at shellui.com. No attachments, no social icon rows</li><li>No quotes, legal paragraphs, or "sent from" lines in the signature</li></ul></div></div>
<div class="g" style="margin-top:7mm"><div class="s3"><h3 style="margin-top:0">Favicon and app icons</h3><p class="small" style="margin-top:1mm">White mark on black, matching the current favicon. The mark grows to 82% at 16 to 48 px so it stays legible.</p></div>
<div class="s9"><div style="display:flex;gap:4mm;align-items:flex-end;justify-content:space-between">{fav}</div>
<h4>Files in <code>brand-assets/icons/</code></h4><ul class="l small" style="color:#111827">{"".join(f"<li>{f}</li>" for f in files)}</ul>
<div class="box mono" style="margin-top:4mm;font-size:8pt;line-height:12pt;padding:4mm">&lt;link rel="icon" href="/favicon.ico" sizes="32x32"&gt;<br>&lt;link rel="icon" href="/favicon.svg" type="image/svg+xml"&gt;<br>&lt;link rel="apple-touch-icon" href="/app-icon-180.png"&gt;</div></div></div>'''
    return pg(c, n, "10  Email and icons")

def cheat(n):
    def blk(title, body): return f'<div style="break-inside:avoid;margin-bottom:3mm"><div style="font-weight:650;font-size:10pt;border-bottom:0.8pt solid #111827;padding-bottom:1mm">{title}</div>{body}</div>'
    def kv(rows): return '<table class="t" style="font-size:7.8pt;line-height:10.5pt"><tbody>' + ''.join(f'<tr><td class="muted" style="padding:0.6mm 2mm 0.6mm 0">{a}</td><td style="padding:0.6mm 0">{b}</td></tr>' for a, b in rows) + '</tbody></table>'
    sw = lambda h: f'<span style="display:inline-block;width:2.6mm;height:2.6mm;border-radius:0.6mm;background:{h};border:0.3pt solid #d1d5db;vertical-align:-0.4mm;margin-right:1mm"></span>'
    col1 = blk("Color", kv([(f"{sw('#111827')}Ink", "#111827  text, rules"), (f"{sw('#4b5563')}Slate", "#4B5563  secondary text"), (f"{sw('#e3a512')}Brand gold", "#E3A512  fills, logo"), (f"{sw('#8a6300')}Gold ink", "#8A6300  gold text on light"), (f"{sw('#1a1408')}On gold", "#1A1408  text on gold"), (f"{sw('#e5e7eb')}Border", "#E5E7EB  hairlines"), (f"{sw('#f9fafb')}Mist", "#F9FAFB  wells"), (f"{sw('#030712')}Night", "#030712  dark canvas"), (f"{sw('#fdf6e3')}Gold tint", "#FDF6E3  print-only fills"), (f"{sw('#e8b84a')}Dark gold", "#E8B84A  gold text on dark screens"), ("Pantone", "124 C / 7405 U; confirm on a proof")])) + \
        blk("Logo", kv([("Wordmark", "Documents, covers, footers"), ("Mark", "Icons, avatars, nav, slides"), ("Clear space", "Half the wordmark height; half the mark width"), ("Minimum", "18 mm or 72 px wide; mark 4 mm or 16 px"), ("Cover / letter", "9 mm / 6 mm high, top left"), ("Never", "Stretch, recolor, rotate, add effects, invent lockups")])) + \
        blk("Shape and slides", kv([("Cards", "rounded-xl, 12 px"), ("Controls", "rounded-md, 6 px"), ("Nesting", "Child radius ≤ parent radius"), ("Slide", "297 x 167 mm, margins 12 mm")]))
    col2 = blk("Type", kv([("Print", "IBM Plex Sans only; Plex Mono for code"), ("Website", "System font stack, Tailwind scale"), ("Images", "Inter: og:images, social, icons, email"), ("Body", "10.5 / 17 pt, full width; 2 columns for long prose"), ("Display / H1", "40 / 46, 26 / 32 pt, 600"), ("H2 / H3 / H4", "15 / 20, 11.5 / 15.5, 10 / 14 pt"), ("Table", "8.5 / 12.5 pt, tabular"), ("Caption", "8 / 12 pt, slate"), ("Code", "Plex Mono 8.5 / 13 pt"), ("Web body", "16 / 28 px, max-w-3xl")])) + \
        blk("Spacing and grid", kv([("Print unit", "2 mm: 2, 4, 6, 8, 12, 16, 20, 24"), ("Screen unit", "4 px: 4, 8, 12, 16, 24, 32, 48, 64, 96"), ("A4 margins", "20 mm, bottom 22 mm"), ("A4 grid", "12 x 8.67 mm, gutter 6 mm"), ("Text", "Full width, 12 columns, 170 mm"), ("Feature", "Label 3 + content 9, 8 mm apart"), ("Side by side", "8 mm minimum"), ("Cards", "Padding 8 mm, stacked 6 mm"), ("Table cell", "2.5 mm vertical, 3 mm sides"), ("og:image", "1200 x 630, margins 72 px")]))
    col3 = blk("Writing", kv([("Name", "Shellui. Never The Host"), ("Headings", "Sentence case"), ("Dashes", "Hyphen only. No em or en dashes"), ("Banned", "easy, simple, quick, just, very, really, simply, seamless, robust, powerful, unlock, leverage"), ("Voice", "Active, you, under 20 words"), ("Units", "64 KB, 200 ms, 30s"), ("Numbers", "CHF 2'551.15, 8.1% VAT"), ("Placeholders", "your_access_token_here"), ("Samples", "Mark example data as example")])) + \
        blk("Files", kv([("Logo", "brand-assets/logo/*.svg, *.png"), ("og:image", "brand-assets/og/og-*.png"), ("Social", "brand-assets/social/"), ("Icons", "brand-assets/icons/"), ("Email", "brand-assets/email/")])) + \
        blk("Vertical rhythm", kv([("Above H1 / H2", "12 / 10 mm"), ("Above H3 / H4", "6 / 4 mm"), ("Below H1, H2", "4 mm"), ("Below H3, H4", "2 mm"), ("Figures", "10 mm before and after"), ("Paragraphs", "3.5 mm"), ("List items", "2 mm"), ("Caption", "2 mm under figure")]))
    checks = ''.join(f'<div style="display:flex;gap:2mm">{OKI}<span>{t}</span></div>' for t in ["Official logo file, clear space kept, no effects", "One gold accent; gold text #8A6300, or #E8B84A on dark", "Every text pair at 4.5:1 or more", "One family: IBM Plex Sans, body 10.5 / 17 pt", "Edges on the 12 column grid, gaps on the scale", "Sample figures marked as example data", "One page number, bottom right, none on covers", "Real screenshots and data, sources under charts", "Flat print and social; gold wash on the website only"])
    c = f'''<div class="g"><div class="s3 sec" style="padding-top:2.5mm">11  Reference</div><div class="s9"><h1>One-page cheat sheet</h1><p class="lede">The values you need most, on one page. Print it and pin it next to your screen.</p></div></div>
<div class="g pair" style="margin-top:6mm"><div class="s4">{col1}</div><div class="s4">{col2}</div><div class="s4">{col3}</div></div>
<div style="font-weight:650;font-size:10pt;border-bottom:0.8pt solid #111827;padding-bottom:1mm;margin-top:2mm">Check before you send</div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:2mm 4mm;margin-top:3mm;font-size:8pt;line-height:11pt">{checks}</div>'''
    return pg(c, n, "11  Reference")

def open_q(n):
    from common import VERSION, EDITION
    qs = [("Brand gold", "#E3A512, the gold on shellui.com, for the logo, fills, rules, and chart highlights in every brand file."),
          ("Dark gold", "#E8B84A for gold text, links, the mark, and fills on dark screens, including the website in dark mode."),
          ("Gold ink", "#8A6300 for gold text and links on light backgrounds, on screen and in print. It passes WCAG AA at 5.4:1 on white."),
          ("Print color and paper", "Pantone references for both golds and a paper recommendation, to confirm on a printed proof."),
          ("Type", "Website: system font stack. Generated screen images (og:images, social, icons, email): Inter. Print: IBM Plex Sans, with Plex Mono for code."),
          ("Layout", "Full width is the default; a left title column only on covers, openers, and showcase pages."),
          ("Gradients", "Print, PDFs, og:images, and social images stay flat. A soft gold wash appears on the website only."),
          ("Dark pages", "Allowed anywhere in print, with light text and gold only as a fill."),
          ("Logo", "No lockup in v1. The mark and the wordmark are used separately."),
          ("Templates", "Company details are dashed placeholders; names, items, and amounts are examples.")]
    rows = ''.join(f'<div class="g" style="padding:1.6mm 0;border-top:0.4pt solid #e5e7eb"><div class="s3" style="font-weight:600">{t}</div><div class="s9">{d}</div></div>' for t, d in qs)
    c = f'''<div class="g"><div class="s3 sec" style="padding-top:2.5mm">12  Changelog</div><div class="s9"><h1>Changelog</h1><p class="lede">What changed in each version of the kit. v1 is the first public release.</p></div></div>
<h3 style="margin-top:8mm">{VERSION}, {EDITION}</h3>
<div style="margin-top:3mm">{rows}</div>
<p class="fcap" style="margin-top:5mm">Contrast ratios use the WCAG 2.2 formula. Values come from the Shellui website tokens.</p>
'''
    return pg(c, n, "12  Changelog")
