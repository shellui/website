import re,subprocess,sys
pdf=sys.argv[1]
subprocess.run(['pdftotext','-bbox',pdf,'/tmp/bb.html'],check=True)
h=open('/tmp/bb.html').read()
pages=re.split(r'<page ',h)[1:]
mm=72/25.4
for i,pg in enumerate(pages,1):
    W,H=map(float,re.search(r'width="([\d.]+)" height="([\d.]+)"',pg).groups())
    words=re.findall(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)</word>',pg)
    flags=[]
    if W<H:
      for x0,y0,x1,y1,t in words:
        x0,y0,x1,y1=map(float,(x0,y0,x1,y1))
        if 276*mm < y1 < 284*mm: flags.append(('foot',t,round(y1/mm,1)))
        if x1 > 190.6*mm or x0 < 19.4*mm: flags.append(('side',t,round(x0/mm,1),round(x1/mm,1)))
    if flags: print(i, flags[:5])
