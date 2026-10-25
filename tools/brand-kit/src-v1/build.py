import subprocess, os
from kit_css import CSS
from common import VERSION
import pages_guide as G, pages_samples as S, pages_digital as D
order = ["cover","toc","intro","foundations","logo","logo-dd","color","color-dd","print","type","type-web","type-dd","spacing","margins","rhythm","grid","imagery","imagery2",
         "t-cover","t-body","t-data","t-figs","t-letter","t-invoice","t-sheet","t-proposal","t-slide1","t-slide2","og","social","icons","cheat","open"]
P = {k: i+1 for i, k in enumerate(order)}
fn = {"cover": lambda: G.cover(P["cover"]), "intro": lambda: G.intro(P["intro"]), "print": lambda: G.print_page(P["print"]), "toc": lambda: G.toc(P), "foundations": lambda: G.foundations(P["foundations"]), "logo": lambda: G.logo_page(P["logo"]),
      "logo-dd": lambda: G.logo_dd(P["logo-dd"]), "color": lambda: G.color_page(P["color"]), "color-dd": lambda: G.color_dd(P["color-dd"]),
      "type": lambda: G.type_page(P["type"]), "type-web": lambda: G.type_web(P["type-web"]), "type-dd": lambda: G.type_dd(P["type-dd"]), "rhythm": lambda: G.rhythm(P["rhythm"]), "imagery2": lambda: G.imagery2(P["imagery2"]), "spacing": lambda: G.spacing(P["spacing"], f'{P["rhythm"]:02d}'),
      "margins": lambda: G.margins(P["margins"]), "grid": lambda: G.grid_page(P["grid"]), "imagery": lambda: G.imagery(P["imagery"]),
      "t-cover": lambda: S.report_cover(P["t-cover"]), "t-body": lambda: S.report_body(P["t-body"]), "t-data": lambda: S.report_data(P["t-data"]), "t-figs": lambda: S.report_figs(P["t-figs"]), "t-letter": lambda: S.letterhead(P["t-letter"]), "t-invoice": lambda: S.invoice(P["t-invoice"]),
      "t-sheet": lambda: S.product_sheet(P["t-sheet"]), "t-proposal": lambda: S.proposal(P["t-proposal"]), "t-slide1": lambda: S.slide1(P["t-slide1"]), "t-slide2": lambda: S.slide2(P["t-slide2"]),
      "og": lambda: D.og_page(P["og"]), "social": lambda: D.social_page(P["social"]), "icons": lambda: D.icons_page(P["icons"]),
      "cheat": lambda: D.cheat(P["cheat"]), "open": lambda: D.open_q(P["open"])}
html = f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Shellui brand kit, {VERSION}</title><style>{CSS}</style></head><body>' + ''.join(fn[k]() for k in order) + '</body></html>'
for bad in ['\u2014', '\u2013']:
    assert bad not in html, f'dash found: {html[html.index(bad)-80:html.index(bad)+80]}'
open('kit.html', 'w').write(html)
out = '/workspace/brand/release-v1/shellui-brand-kit-v1.pdf'
subprocess.run(['google-chrome', '--headless=new', '--no-sandbox', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=4000',
                f'--print-to-pdf={out}', 'file:///workspace/brand/src-v1/kit.html'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
print(out, len(order))
