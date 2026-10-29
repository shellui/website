import sys, glob
from PIL import Image
ps=sorted(glob.glob('prev/p-*.png'))
sel=[int(x) for x in sys.argv[1:]] if len(sys.argv)>1 else list(range(1,len(ps)+1))
for k in range(0,len(sel),2):
    grp=sel[k:k+2]; ims=[Image.open(f'prev/p-{g:02d}.png') for g in grp]
    W=Image.new('RGB',(sum(i.width for i in ims)+10*(len(ims)-1),max(i.height for i in ims)),'#888'); x=0
    for im in ims: W.paste(im,(x,0)); x+=im.width+10
    W.save(f'prev/pair-{grp[0]}.png')
