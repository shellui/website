from kit_parts import *

def doc_rh(left, right):
    return f'<div class="rh"><span>{left}</span><span>{right}</span></div>'
def doc_ft(left, num):
    return f'<div class="ft"><span>{left}</span><b class="tnum">{num}</b></div>'
def spage(inner, label, extra_chrome="", cls=""):
    return f'<section class="page {cls}"><div class="sample">{label}</div>{extra_chrome}{inner}</section>'

def report_cover(n):
    inner = f'''<div style="position:absolute;right:-40mm;bottom:-60mm;">{mark("#f3f3f4", h="240mm")}</div>
<div style="position:absolute;left:20mm;top:20mm">{wordmark("#111827", h="9mm")}</div>
<div style="position:absolute;left:20mm;top:96mm;width:150mm">
<div style="width:20mm;height:1.2mm;background:#e3a512;border-radius:0.6mm"></div>
<div class="sec" style="margin-top:6mm;font-size:10.5pt">Platform report, example document</div>
<div style="font-size:40pt;line-height:44pt;font-weight:650;letter-spacing:-0.025em;margin-top:3mm;text-wrap:balance">Running Shellui in production</div>
<p class="lede" style="font-size:13pt;line-height:19pt;max-width:120mm;margin-top:6mm">How three sample teams moved authentication, administration, and storage into the shell, and what changed in their release work.</p></div>
<div style="position:absolute;left:20mm;right:20mm;bottom:26mm;border-top:0.8pt solid #111827;padding-top:4mm" class="g">
<div class="s3 small"><b style="color:#111827">Prepared by</b><br>Author name</div><div class="s3 small"><b style="color:#111827">Date</b><br>October 2026</div>
<div class="s3 small"><b style="color:#111827">Version</b><br>1.0</div><div class="s3 small"><b style="color:#111827">Audience</b><br>Engineering leads</div></div>'''
    return spage(inner, "Template 8.1, report cover. Sample content")

def report_body(n):
    note = lambda t: f'<div class="small" style="border-top:0.8pt solid #111827;padding-top:1.5mm">{t}</div>'
    inner = doc_rh("Running Shellui in production", "Example document") + f'''<div class="body">
<div class="g"><div class="s3 sec" style="padding-top:2.5mm">2  Architecture</div><div class="s9"><h1>How the shell wraps your app</h1>
<p class="lede">The shell owns navigation, sign-in, settings, and toasts. Your app runs in an iframe and reads that context through <code>@shellui/sdk</code>.</p></div></div>
<h2 style="margin-top:10mm">Shared navigation and identity</h2>
<div class="cols2"><p>Each sample team started with the same problem: three apps, three login screens, and three copies of a settings page. Moving those apps into one shell gave them a single sign-in and one navigation bar.</p>
<p>Because identity-service issues the tokens, every service verifies them the same way. In production it signs tokens with an RSA key and publishes a JWKS, so your API checks a signature instead of calling back to the identity server.</p>
<h3 style="break-before:column;margin-top:0">What the shell provides to your app</h3>
<p>After you call <code>init</code>, your app receives:</p>
<ul class="l"><li>The signed-in account and a token you can send to your API</li><li>Theme and locale, so your app matches the shell</li><li>Toasts, modals, and drawers rendered by the shell, above the iframe</li></ul>
<h3>Starting the SDK</h3>
<p>Call <code>init</code> once, before the shell sends settings. The call resolves when the shell answers.</p>
<p class="small" style="border-top:0.8pt solid #111827;padding-top:1.5mm;margin-top:4mm">Note. JSON Web Key Set (JWKS): the public keys that services use to verify tokens.</p></div>
<div class="box code blk"><span style="color:#8a6300">import</span> {{ init }} <span style="color:#8a6300">from</span> "@shellui/sdk";<br><br><span style="color:#8a6300">await</span> init({{<br>&nbsp;&nbsp;clientId: your_client_id_here,<br>}});</div>
<div class="box small blk" style="border-left:1mm solid #e3a512;border-radius:0 2mm 2mm 0;color:#111827;font-size:9pt;line-height:13pt;margin-bottom:0"><b>Key finding.</b> Example data: the three sample teams removed an average of 4 duplicated features per app after the move.</div>
</div>''' + doc_ft("Shellui, example document", f"{n:02d}")
    return spage(inner, "Template 8.2, report body with heading levels. Sample content")

def report_data(n):
    rows = [("shellui", "Shell and @shellui/sdk", "TypeScript", "MIT"), ("identity-service", "Sign-in, sessions, JWKS", "Python", "MIT"), ("admin", "Users, roles, settings at /admin", "TypeScript", "MIT"),
            ("storage-service", "Uploads, serving large files", "Python", "MIT"), ("email-service", "Templates and sending", "Python", "MIT"), ("hosting-service", "Deploy and serve apps", "Python", "MIT")]
    tr = ''.join(f'<tr><td class="mono" style="font-size:8pt">{a}</td><td>{b}</td><td>{c}</td><td>{d}</td></tr>' for a, b, c, d in rows)
    chart = bar_chart([("Team A", 6), ("Team B", 4), ("Team C", 3), ("Team D", 9), ("Team E", 5)], w=170, h=62, highlight="Team D", fs=2.8, ymax=12)
    inner = doc_rh("Running Shellui in production", "Example document") + f'''<div class="body">
<div class="g feature"><div class="s3 sec" style="padding-top:2.5mm">3  Results</div><div class="s9"><h2 style="font-size:18pt;line-height:23pt">Team D removed the most duplicated work</h2>
<p>The table lists the services in the stack. The chart compares how many duplicated features each sample team removed per app. Chart figures are example data.</p></div></div>
<div class="blk"><table class="t"><thead><tr><th>Service</th><th>Role</th><th>Language</th><th>License</th></tr></thead><tbody>{tr}</tbody></table>
<p class="fcap"><b>Table 1.</b> Repositories in the Shellui stack. Source: github.com/shellui, October 2026.</p></div>
<p>Team D ran four internal apps before the move, more than any other team, so it had the most to remove. Teams B and C started with two apps each.</p>
<div class="blk" style="margin-bottom:0">{chart}<p class="fcap"><b>Figure 1.</b> Duplicated features removed per app, by team. Example data.</p></div>
</div>''' + doc_ft("Shellui, example document", f"{n:02d}")
    return spage(inner, "Template 8.3, report body with table and chart. Sample data")

def report_figs(n):
    trend = line_chart([("After move", [14, 12, 9, 7, 6, 5], "#e3a512"), ("Before move", [14, 15, 14, 16, 15, 16], "#9ca3af")], ["W1", "W2", "W3", "W4", "W5", "W6"], w=170, h=54, ymax=20)
    inner = doc_rh("Running Shellui in production", "Example document") + f'''<div class="body">
<h2>Release chores dropped by two thirds</h2>
<p>Before the move, each release meant updating login screens and settings pages in every app. After six weeks in the shell, the sample teams spent about 5 hours a week on those chores instead of 15.</p>
<div class="blk">{trend}<p class="fcap"><b>Figure 2.</b> Hours per week on release chores over six weeks. Example data.</p></div>
<h3>What your users see</h3>
<p>Users get one sign-in and one navigation bar across every app. The home page of shellui.com runs the same shell chrome.</p>
<div class="blk" style="margin-bottom:0"><img src="file:///workspace/audit/jpg/d_home.jpg" style="width:170mm;display:block;border:0.4pt solid #e5e7eb;border-radius:2mm"><p class="fcap"><b>Figure 3.</b> shellui.com home page, captured in October 2026.</p></div>
</div>''' + doc_ft("Shellui, example document", f"{n:02d}")
    return spage(inner, "Template 8.4, report body with figure and screenshot. Sample data")

SENDER = '<div class="tiny" style="text-align:right;line-height:12pt"><b style="color:#111827">Shellui</b><br><span class="ph">[Company name]</span><br><span class="ph">[Street and number]</span><br><span class="ph">[Postcode, city, country]</span><br><span class="ph">[Email]</span><br>shellui.com</div>'
LEGAL_T = '<div class="ft" style="border-top:0.4pt solid #e5e7eb;padding-top:2mm"><span><span class="ph">[Company name]</span>, <span class="ph">[Address]</span>. UID <span class="ph">[UID or VAT number]</span>. shellui.com</span><b class="tnum">{n:02d}</b></div>'
FOLD = '<div style="position:absolute;left:5mm;top:105mm;width:4mm;border-top:0.4pt solid #9ca3af"></div><div style="position:absolute;left:5mm;top:210mm;width:4mm;border-top:0.4pt solid #9ca3af"></div><div style="position:absolute;left:5mm;top:148.5mm;width:6mm;border-top:0.4pt solid #9ca3af"></div>'

def letterhead(n):
    inner = FOLD + f'''<div style="position:absolute;left:20mm;top:20mm">{wordmark("#111827", h="6mm")}</div>
<div style="position:absolute;right:20mm;top:19mm">{SENDER}</div>
<div style="position:absolute;left:118mm;top:52mm;width:72mm"><div class="tiny" style="border-bottom:0.4pt solid #e5e7eb;padding-bottom:1mm;margin-bottom:2mm">Shellui, <span class="ph">[Company name]</span>, <span class="ph">[Address]</span></div>
<div style="line-height:14pt">Example AG<br>Anna Muster<br>Bahnhofstrasse 1<br>8001 Zurich</div></div>
<div style="position:absolute;left:20mm;top:100mm;width:170mm">
<div class="small" style="color:#111827"><span class="ph">[City]</span>, 25 October 2026</div>
<div style="font-weight:600;font-size:11.5pt;margin-top:8mm">Your customer portal on Shellui</div>
<div style="margin-top:5mm">
<p>Dear Ms Muster,</p>
<p>Thank you for the call on Tuesday. You asked how your team could ship the new customer portal without building sign-in, roles, and file uploads a fourth time. This letter answers that question and proposes a first step.</p>
<p>Shellui wraps your portal in a shell that already handles navigation, authentication, administration, and storage. Your developers keep their framework and build only the screens your customers use.</p>
<p>I suggest a half-day architecture workshop in November. We map your current apps, decide which ones move into the shell first, and leave you with a written plan. The enclosed quote lists the scope and an example price.</p>
<p>I look forward to hearing from you.</p>
<p style="margin-top:6mm">Kind regards</p>
<p style="margin-top:12mm"><b>Max Muster</b><br><span class="muted">Solutions engineer, Shellui (example)</span></p>
<p class="small" style="margin-top:6mm">Enclosure: quote Q-2026-0042</p></div></div>''' + LEGAL_T.replace('{n:02d}', f'{n:02d}')
    return spage(inner, "Template 8.5, letterhead. Sample content")

def chf(v):
    s = f"{v:,.2f}".replace(",", "'")
    return s

def invoice(n):
    items = [("Example service", "Short description of the service", 1, "pc", 1000.00),
             ("Example workshop", "Half day, remote", 4, "h", 150.00),
             ("Example setup", "One-time configuration", 1, "pc", 800.00)]
    sub = sum(q * p for _, _, q, _, p in items); vat = round(sub * 0.081, 2); tot = sub + vat; tot5 = round(tot * 20) / 20; rnd = tot5 - tot
    tr = ''.join(f'<tr><td class="tnum muted">{i+1}</td><td><b style="font-weight:600">{a}</b><br><span class="muted">{b}</span></td><td class="r tnum">{q} {u}</td><td class="r tnum">{chf(p)}</td><td class="r tnum">{chf(q*p)}</td></tr>' for i, (a, b, q, u, p) in enumerate(items))
    inner = f'''<div style="position:absolute;left:20mm;top:20mm">{wordmark("#111827", h="6mm")}</div>
<div style="position:absolute;right:20mm;top:19mm">{SENDER}</div>
<div style="position:absolute;left:20mm;right:20mm;top:52mm" class="g pair">
<div class="s6"><div class="tiny">Client</div><div style="margin-top:1mm;line-height:14pt">Example AG<br>Anna Muster<br>Bahnhofstrasse 1<br>8001 Zurich</div></div>
<div class="s6"><table class="t t-tight" style="font-size:8.5pt"><tbody>
<tr><td class="muted">Quote number</td><td class="r">Q-2026-0042</td></tr><tr><td class="muted">Date</td><td class="r">25 October 2026</td></tr>
<tr><td class="muted">Valid until</td><td class="r">24 November 2026</td></tr><tr><td class="muted">Contact</td><td class="r">Max Muster</td></tr></tbody></table></div></div>
<div style="position:absolute;left:20mm;right:20mm;top:88mm">
<div style="display:flex;justify-content:space-between;align-items:baseline"><h1 style="font-size:24pt;line-height:29pt">Quote</h1><span class="tag">Example data</span></div>
<p class="muted" style="margin-top:2mm">Customer portal on Shellui. Amounts in Swiss francs.</p>
<table class="t" style="margin-top:8mm;font-size:9pt;line-height:13pt"><thead><tr><th style="width:6mm">#</th><th>Description</th><th class="r">Quantity</th><th class="r">Unit price CHF</th><th class="r">Amount CHF</th></tr></thead><tbody>{tr}</tbody></table>
<div style="display:flex;justify-content:flex-end;margin-top:3mm"><table class="t" style="width:82mm;font-size:9pt"><tbody>
<tr><td>Subtotal</td><td class="r tnum">{chf(sub)}</td></tr><tr><td>VAT 8.1% on CHF {chf(sub)}</td><td class="r tnum">{chf(vat)}</td></tr>
<tr><td class="muted">Rounding to 5 centimes</td><td class="r tnum muted">{rnd:+.2f}</td></tr>
<tr><td style="border-bottom:none;border-top:0.8pt solid #111827;font-weight:650;font-size:11pt;padding-top:2.5mm">Total CHF</td><td class="r tnum" style="border-bottom:none;border-top:0.8pt solid #111827;font-weight:650;font-size:11pt;padding-top:2.5mm">{chf(tot5)}</td></tr></tbody></table></div>
<div class="g pair" style="margin-top:8mm"><div class="s6"><h4 style="margin-top:0">Terms</h4><p class="small" style="color:#111827;margin-top:1mm">Payment within 30 days of invoice. Amounts are examples. Travel is billed separately.</p></div>
<div class="s6"><h4 style="margin-top:0">Payment</h4><p class="small" style="color:#111827;margin-top:1mm">IBAN <span class="ph">[IBAN]</span><br>Bank <span class="ph">[Bank name, city]</span><br>The invoice includes a Swiss QR-bill payment slip.</p></div></div>
<div class="box small" style="margin-top:8mm;padding:6mm 8mm;color:#111827">To accept, sign and return this quote, or reply to the email it came with.<div class="g pair" style="margin-top:8mm"><div class="s6" style="border-top:0.4pt solid #9ca3af;padding-top:1mm">Place and date</div><div class="s6" style="border-top:0.4pt solid #9ca3af;padding-top:1mm">Signature, Example AG</div></div></div>
</div>''' + LEGAL_T.replace('{n:02d}', f'{n:02d}')
    return spage(inner, "Template 8.6, quote and invoice. Example data; dashed boxes are placeholders")

def product_sheet(n):
    feats = [("Shell and SDK", "Iframe host with shared navigation, theme, toasts, and modals. Your app talks to it through <code>@shellui/sdk</code>."),
             ("Identity", "identity-service handles sign-in, magic links, OAuth, and sessions."),
             ("Administration", "Users, roles, and settings at <code>/admin</code>, embedded in the shell."),
             ("Storage and Files", "storage-service stores uploads. The Files app lets people browse them."),
             ("Email", "email-service sends transactional mail, newsletters, and broadcasts."),
             ("Hosting", "hosting-service deploys and serves apps.")]
    fl = ''.join(f'<div style="padding:2mm 0;border-top:0.4pt solid #e5e7eb"><div style="font-weight:600">{t}</div><div class="small" style="color:#4b5563;margin-top:0.5mm">{d}</div></div>' for t, d in feats)
    diagram = f'''<svg viewBox="0 0 170 46" width="170mm" height="46mm" font-family="PlexKit">
<rect x="0.3" y="0.3" width="169.4" height="45.4" rx="3" fill="#fff" stroke="#e5e7eb" stroke-width="0.4"/>
<rect x="0.3" y="0.3" width="169.4" height="10" rx="3" fill="#f9fafb"/><line x1="0" y1="10.3" x2="170" y2="10.3" stroke="#e5e7eb" stroke-width="0.4"/>
<svg x="5" y="2.8" width="3.3" height="4.6" viewBox="{MK_VB}">{MK.replace("currentColor","#111827")}</svg>
<text x="12" y="6.6" font-size="2.8" fill="#111827" font-weight="600">Shell</text><text x="24" y="6.6" font-size="2.6" fill="#4b5563">Navigation, account, theme, locale</text>
<rect x="150" y="3" width="15" height="4.4" rx="0.9" fill="#e3a512"/><text x="157.5" y="6" font-size="2.2" text-anchor="middle" fill="#1a1408" font-weight="600">Account</text>
<rect x="0.3" y="10.3" width="34" height="35.4" fill="#f9fafb"/>{''.join(f'<rect x="5" y="{16+i*6}" width="{18 if i%2 else 22}" height="1.6" rx="0.8" fill="{"#111827" if i==0 else "#9ca3af"}"/>' for i in range(5))}
<rect x="40" y="16" width="124" height="24" rx="2" fill="#fdf6e3" stroke="#e3a512" stroke-width="0.4" stroke-dasharray="1.2 0.8"/>
<text x="102" y="27" font-size="4" text-anchor="middle" fill="#111827" font-weight="600">Your app, in an iframe</text><text x="102" y="33" font-size="2.8" text-anchor="middle" fill="#4b5563">Any framework. Talks to the shell through @shellui/sdk</text></svg>'''
    inner = f'''<div class="body"><div style="display:flex;justify-content:space-between;align-items:center">{wordmark("#111827", h="6mm")}<span class="small">Product sheet, October 2026</span></div>
<h1 style="font-size:32pt;line-height:36pt;margin-top:10mm;max-width:150mm">The shell around your web app</h1>
<p class="lede" style="max-width:140mm">Shellui is an open-source web app development platform: a microfrontend shell that wraps your application with shared navigation, authentication, storage, and administration.</p>
<div style="margin-top:10mm">{diagram}</div>
<div class="g pair" style="margin-top:10mm"><div class="s6"><h3 style="margin-top:0">What ships today</h3><div style="margin-top:2mm">{fl}</div></div>
<div class="s6"><h3 style="margin-top:0">Run it your way</h3>
<div style="margin-top:2mm;padding:2.6mm 0;border-top:0.4pt solid #e5e7eb"><div style="font-weight:600">Self-host, free</div><div class="small" style="margin-top:0.5mm">MIT licensed. Docker images for every service on hub.docker.com/u/shellui.</div></div>
<div style="padding:2.6mm 0;border-top:0.4pt solid #e5e7eb"><div style="font-weight:600">Shellui hosting</div><div class="small" style="margin-top:0.5mm">Managed hosting for the shell and its services. Details on shellui.com.</div></div>
<div style="padding:2.6mm 0;border-top:0.4pt solid #e5e7eb"><div style="font-weight:600">Expert help</div><div class="small" style="margin-top:0.5mm">Architecture, custom work, and support from the maintainer.</div></div>
<div class="box mono" style="margin-top:6mm;font-size:8.5pt;line-height:13pt"><span style="color:#8a6300">import</span> {{ init }} <span style="color:#8a6300">from</span> "@shellui/sdk";<br><br><span style="color:#8a6300">await</span> init({{<br>&nbsp;&nbsp;clientId: your_client_id_here,<br>}});</div></div></div>
</div>
<div class="ft" style="border-top:0.8pt solid #111827;padding-top:3mm;bottom:12mm"><span><b>shellui.com</b>  ·  docs.shellui.com  ·  github.com/shellui  ·  Made in Zurich</span><b class="tnum">{n:02d}</b></div>'''
    return spage(inner, "Template 8.7, product sheet. Sample content")

def proposal(n):
    phases = [("1", "Workshop and plan", "Map current apps, pick the first two to move", "Week 1"), ("2", "Shell and identity", "Deploy the shell, connect Keycloak through identity-service", "Weeks 2 to 3"),
              ("3", "Move the portal", "Run the portal in the shell, add storage and /admin", "Weeks 4 to 6"), ("4", "Handover", "Documentation, training, support window", "Week 7")]
    tr = ''.join(f'<tr><td class="tnum muted">{a}</td><td style="font-weight:600">{b}</td><td>{c}</td><td class="tnum" style="white-space:nowrap">{d}</td></tr>' for a, b, c, d in phases)
    inner = doc_rh("Proposal for Example AG", "Q-2026-0042") + f'''<div class="body">
<div style="display:flex;justify-content:space-between;align-items:center">{wordmark("#111827", h="6mm")}<span class="tag">Sample proposal</span></div>
<div class="g feature" style="margin-top:7mm"><div class="s3 sec" style="padding-top:2.5mm">Proposal</div><div class="s9"><h1>A customer portal on Shellui in seven weeks</h1>
<p class="lede">You keep your React front end. Shellui adds sign-in, roles, file storage, and an admin area around it, so your team spends the seven weeks on portal screens.</p></div></div>
<div class="g prop" style="margin-top:2mm"><div class="s3"></div><div class="s9">
<h2 style="margin-top:10mm">Scope and timeline</h2><table class="t" style="margin-top:4mm;margin-bottom:10mm"><thead><tr><th style="width:5mm">#</th><th>Phase</th><th>What you get</th><th>When</th></tr></thead><tbody>{tr}</tbody></table>
<h2>At a glance</h2><div class="g" style="grid-template-columns:repeat(9,1fr);column-gap:8mm">
<div class="s3 box"><div class="small">Duration</div><div style="font-size:14pt;line-height:18pt;font-weight:600;margin-top:1mm;white-space:nowrap" class="tnum">7 weeks</div><div class="tiny">Example</div></div>
<div class="s3 box"><div class="small">Team</div><div style="font-size:14pt;line-height:18pt;font-weight:600;margin-top:1mm;white-space:nowrap" class="tnum">2 engineers</div><div class="tiny">Example</div></div>
<div class="s3 box" style="background:#fdf6e3"><div class="small" style="color:#1a1408">You save</div><div style="font-size:14pt;line-height:18pt;font-weight:650;margin-top:1mm;color:#1a1408">6 weeks</div><div class="tiny" style="color:#4b5563">Auth and roles, estimate</div></div></div>
<p class="fcap">All figures are examples for this template.</p>
<h2>Next steps</h2><ol class="n"><li>Reply to confirm the workshop date</li><li>Share read access to the three existing repositories</li><li>Sign the quote to reserve weeks 2 to 7</li></ol>
</div></div></div>''' + doc_ft('Shellui, <span class="ph">[Company name]</span>, <span class="ph">[Address]</span>', f"{n:02d}")
    return spage(inner, "Template 8.8, proposal page. Sample content and figures")

def slide1(n):
    inner = f'''<div style="position:absolute;right:-20mm;bottom:-70mm;">{mark("#f3f3f4", h="200mm")}</div>
<div style="position:absolute;left:12mm;top:12mm">{mark("#111827", h="6mm")}</div>
<div style="position:absolute;left:12mm;top:52mm;width:190mm"><div style="font-size:34pt;line-height:38pt;font-weight:650;letter-spacing:-0.025em;text-wrap:balance">Ship sooner without rebuilding basic features</div>
<div style="font-size:15pt;line-height:21pt;color:#4b5563;margin-top:6mm">Shellui overview for engineering teams</div></div>
<div style="position:absolute;left:12mm;right:12mm;bottom:10mm;display:flex;justify-content:space-between;font-size:9pt;color:#4b5563"><span><b style="color:#111827">Speaker name</b>, role</span><span>October 2026</span></div>'''
    return f'<section class="page slide"><div class="sample" style="right:12mm;top:4mm">Template 8.9, presentation title slide, 16:9</div>{inner}</section>'

def slide2(n):
    ch = bar_chart([("Auth", 14), ("Roles", 9), ("Settings", 6), ("Uploads", 8), ("Your app", 23)], w=120, h=72, highlight="Your app", fs=3.4, ymax=24)
    inner = f'''<div style="position:absolute;left:12mm;top:12mm;right:12mm;display:flex;justify-content:space-between;align-items:center">{mark("#111827", h="6mm")}<span style="font-size:9pt;color:#4b5563">Why a shell</span></div>
<div style="position:absolute;left:12mm;top:30mm;width:130mm"><div style="font-size:24pt;line-height:29pt;font-weight:650;letter-spacing:-0.02em">Your team builds the product, not the chrome</div>
<ul class="l" style="margin-top:6mm;font-size:13pt;line-height:19pt">{''.join(f'<li style="max-width:none;margin-top:2.5mm;padding-left:5mm">{t}</li>' for t in ["Sign-in, roles, and settings come with the shell", "Your app runs in an iframe, in any framework", "MIT licensed and self-hosted"])}</ul></div>
<div style="position:absolute;left:160mm;top:30mm;width:125mm"><div style="font-size:10pt;font-weight:600">Days of work per area, example project</div>{ch}<div style="font-size:8pt;color:#4b5563">Example data. Gold marks the time left for your own product.</div></div>
<div style="position:absolute;left:12mm;bottom:22mm;width:130mm;border-left:1.2mm solid #111827;padding:1mm 0 1mm 5mm;font-size:13pt;line-height:19pt"><b style="font-weight:600">37 of 60 days</b> go to sign-in, roles, settings, and uploads in this example. The shell gives them back to your product.</div>
<div style="position:absolute;left:12mm;right:12mm;bottom:8mm;display:flex;justify-content:space-between;font-size:8pt;color:#4b5563"><span>shellui.com</span><span class="tnum">{n:02d}</span></div>'''
    return f'<section class="page slide"><div class="sample" style="right:12mm;top:4mm">Template 8.9, presentation content slide, 16:9. Example data</div>{inner}</section>'
