from common import FONT_CSS
CSS = FONT_CSS + """
@page{size:210mm 297mm;margin:0}
@page slide{size:297mm 167.0625mm;margin:0}

.todo{display:inline-block;font-family:PlexMonoKit,monospace;font-size:0.8em;line-height:1.3;padding:0 1mm;border:0.5pt dashed #b91c1c;color:#b91c1c;border-radius:0.6mm}
.ph{display:inline-block;padding:0 0.8mm;border:0.5pt dashed #9ca3af;border-radius:0.6mm;color:#4b5563;line-height:1.25}
body{font-family:"PlexKit",sans-serif;font-size:10.5pt;line-height:17pt;font-feature-settings:normal}
.tnum,table.t{font-variant-numeric:tabular-nums}
.serif{font-family:"PlexKit",sans-serif}
.page{width:210mm;height:297mm;position:relative;overflow:hidden;break-after:page;background:#fff}
.page.slide{page:slide;width:297mm;height:167.0625mm}
.body{position:absolute;left:20mm;right:20mm;top:20mm;bottom:22mm}
.rh{position:absolute;left:20mm;right:20mm;top:10mm;display:flex;justify-content:space-between;font-size:7.5pt;line-height:10pt;color:#4b5563}
.ft{position:absolute;left:20mm;right:20mm;bottom:10mm;display:flex;justify-content:space-between;align-items:baseline;font-size:7.5pt;line-height:10pt;color:#4b5563}
.ft b{color:#111827;font-weight:600}
.g{display:grid;grid-template-columns:repeat(12,1fr);column-gap:6mm}
.g:not(.feature)>.s3:has(+.s9){grid-column:1/-1;padding-right:0;padding-top:0!important}
.g:not(.feature)>.s3:has(+.s9)+.s9{grid-column:1/-1;margin-top:3mm}
.g:not(.feature)>.s3:empty:has(+.s9){display:none}
.g:not(.feature)>.s3:empty+.s9{margin-top:0}
.g.feature>.s3:has(+.s9){padding-right:2mm}
.cols2{column-count:2;column-gap:8mm}
.cols2 p,.cols2 li{break-inside:avoid-column}
.cols2 h2,.cols2 h3,.cols2 h4{break-after:avoid-column}
.cols2>:first-child{margin-top:0!important}
.g.pair{column-gap:8mm}
.s1{grid-column:span 1}.s2{grid-column:span 2}.s3{grid-column:span 3}.s4{grid-column:span 4}.s5{grid-column:span 5}.s6{grid-column:span 6}.s7{grid-column:span 7}.s8{grid-column:span 8}.s9{grid-column:span 9}.s12{grid-column:span 12}
.st4{grid-column-start:4}
.sec{font-size:8.5pt;line-height:12pt;font-weight:600;color:#8a6300}
h1{font-size:26pt;line-height:32pt;font-weight:600;letter-spacing:-0.01em;text-wrap:balance;margin-top:12mm}
h1:first-child,h2:first-child,h3:first-child,h4:first-child{margin-top:0}
h2{font-size:15pt;line-height:20pt;font-weight:600;letter-spacing:-0.005em;margin-top:10mm}
h3{font-size:11.5pt;line-height:15.5pt;font-weight:600;margin-top:6mm}
h4{font-size:10pt;line-height:14pt;font-weight:600;margin-top:4mm}
h1+*,h2+*{margin-top:4mm!important}
h3+*,h4+*{margin-top:2mm!important}
.lede{font-family:"PlexKit",sans-serif;font-size:12pt;line-height:18pt;color:#4b5563;margin-top:4mm}
p,ul.l li,ol.n li{font-family:"PlexKit",sans-serif;font-size:10.5pt;line-height:17pt}
p{max-width:none}
p+p{margin-top:3.5mm}
.small,ul.small li,ol.small li{font-family:"PlexKit",sans-serif;font-size:8pt;line-height:12pt;color:#4b5563}
.blk{margin-top:10mm!important;margin-bottom:10mm}
.blk:last-child{margin-bottom:0}
.fcap{font-family:"PlexKit",sans-serif;font-size:8pt;line-height:12pt;color:#4b5563;margin-top:2mm;}
.fcap b{color:#111827;font-weight:600}
.tiny{font-size:7.5pt;line-height:10pt;color:#4b5563}
.muted{color:#4b5563}
.rule{border-top:0.4pt solid #e5e7eb}
.rule-strong{border-top:0.8pt solid #111827}
ul.l{list-style:none;margin-top:2mm}
ul.l li{position:relative;padding-left:4.5mm;margin-top:2mm;}
ul.l li:before{content:"";position:absolute;left:0.4mm;top:0.6em;width:1.1mm;height:1.1mm;border-radius:50%;background:#111827}
ol.n{margin-top:2mm;padding-left:5mm}
ol.n li{margin-top:2mm;padding-left:1mm}
code{font-size:0.86em;background:#f3f4f6;border-radius:1mm;padding:0 1mm}
.code{font-family:"PlexMonoKit",monospace;font-size:8.5pt;line-height:13pt}
table.t{width:100%;border-collapse:collapse;font-family:"PlexKit",sans-serif;font-size:8.5pt;line-height:12.5pt}
table.t th:first-child,table.t td:first-child{padding-left:0!important}
table.t th:last-child,table.t td:last-child{padding-right:0!important}
table.t th{text-align:left;font-weight:600;padding:2.5mm 3mm;border-bottom:0.8pt solid #111827;vertical-align:bottom}
table.t td{padding:2.5mm 3mm;border-bottom:0.4pt solid #e5e7eb;vertical-align:top}
table.t .r{text-align:right;padding-right:0;font-variant-numeric:tabular-nums}
table.t tfoot td{border-bottom:none;font-weight:600}
table.t-tight td{padding-top:1.8mm;padding-bottom:1.8mm}
.sw{border-radius:2mm;height:20mm;position:relative}
.box{background:#f9fafb;border-radius:2mm;padding:8mm}
.box+.box,.stack>*+*{margin-top:6mm}
.g>.box+.box,.g>*+.box{margin-top:0}
.tag{display:inline-block;font-size:7pt;line-height:9pt;font-weight:600;padding:0.6mm 1.8mm;border-radius:10mm;background:#fdf6e3;color:#8a6300;border:0.4pt solid #f1d58f}
.sample{position:absolute;top:5mm;right:20mm;font-size:6.5pt;line-height:8pt;color:#6b7280;letter-spacing:0}
/* do / dont */
.dd{display:grid;grid-template-columns:1fr 1fr;column-gap:8mm;row-gap:6mm}
.ex .fig{height:34mm;border-radius:2mm;background:#f9fafb;border:0.4pt solid #e5e7eb;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.dd-tight .ex .fig{height:24mm}
.dd-tight{row-gap:6mm}
.ex .cap{display:flex;gap:2mm;align-items:flex-start;margin-top:2mm;font-size:8pt;line-height:12pt}
.ex .cap b{font-weight:600}
.ic{flex:none;width:4.2mm;height:4.2mm;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-top:0.2mm}
.ic.ok{background:#15803d}.ic.no{background:#b91c1c}
.ex.do .fig{border-color:#86efac;border-width:0.6pt}
.ex.dont .fig{border-color:#fca5a5;border-width:0.6pt}
.figcap{font-size:8pt;line-height:12pt;color:#4b5563;margin-top:2mm}
.page.slide ul.l li,.page.slide p{font-family:"PlexKit",sans-serif}
.dim{font-size:6.5pt;fill:#2563eb;font-weight:500}
"""
