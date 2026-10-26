// Discreet dot field behind the homepage hero. Decorative only.
const hero = document.querySelector("[data-hero-dots]");
const canvas = hero?.querySelector("canvas");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (canvas && !reduce) {
  const ctx = canvas.getContext("2d");
  const text = hero.querySelector("[data-hero-text]");
  const dark = matchMedia("(prefers-color-scheme: dark)");
  const fine = matchMedia("(pointer: fine)").matches;
  const S = 24, R = 100, PUSH = 4, K = 0.06, DAMP = 0.82;
  // Wind: a soft wave travelling left to right, each dot with its own phase and strength.
  const WIND = 2.5, WL = 0.012, WS = 0.0006;
  let dots = [], w = 0, h = 0, mouse = null, raf = 0, visible = true;

  const isDark = () => document.documentElement.classList.contains("dark");
  const smooth = (t) => t * t * (3 - 2 * t);

  function layout() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = hero.clientWidth; h = hero.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const box = text?.getBoundingClientRect(), top = hero.getBoundingClientRect();
    const cx = box ? box.left - top.left + box.width / 2 : w / 2;
    const cy = box ? box.top - top.top + box.height / 2 : h / 2;
    const rx = box ? box.width / 2 + 40 : 0, ry = box ? box.height / 2 + 30 : 0;
    dots = [];
    for (let y = S / 2; y < h; y += S) for (let x = (w % S) / 2; x < w; x += S) {
      const e = rx ? Math.hypot((x - cx) / rx, (y - cy) / ry) : 9;
      const t = y / h;
      const v = t < 0.55 ? 1 : 1 - smooth((t - 0.55) / 0.45);
      const a = smooth(Math.min(1, Math.max(0, (e - 0.85) / 0.5))) * v;
      if (a > 0.02) dots.push({ x, y, a, ox: 0, oy: 0, vx: 0, vy: 0, g: 0, p: Math.random() * 6.28, s: 0.6 + Math.random() * 0.4, gold: (x / S * 7 + y / S * 3 | 0) % 9 === 0 });
    }
    draw(); kick();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const dk = isDark(), base = dk ? "255,255,255" : "17,24,39", B = dk ? 0.12 : 0.16;
    for (const d of dots) {
      const m = Math.max(0, Math.min(1, (Math.hypot(d.ox, d.oy) - WIND) / PUSH));
      ctx.fillStyle = d.g > 0.02 ? `rgba(227,165,18,${(0.5 * d.g + 0.1) * d.a})` : `rgba(${base},${(B + 0.22 * m) * d.a})`;
      ctx.beginPath(); ctx.arc(d.x + d.ox, d.y + d.oy, 1.25, 0, 7); ctx.fill();
    }
  }

  function step(now) {
    raf = 0;
    for (const d of dots) {
      const ph = d.x * WL - now * WS + d.p * 0.35;
      let tx = Math.sin(ph) * WIND * d.s, ty = Math.cos(ph * 0.7 + d.p) * WIND * 0.4 * d.s;
      if (mouse) {
        const dx = d.x - mouse.x, dy = d.y - mouse.y, dist = Math.hypot(dx, dy) || 1;
        if (dist < R) {
          const f = PUSH * smooth(1 - dist / R);
          tx += dx / dist * f; ty += dy / dist * f;
          if (d.gold && dist < 40) d.g = 1;
        }
      }
      d.vx = (d.vx + (tx - d.ox) * K) * DAMP; d.vy = (d.vy + (ty - d.oy) * K) * DAMP;
      d.ox += d.vx; d.oy += d.vy; d.g *= 0.94;
    }
    draw();
    if (visible && !document.hidden) raf = requestAnimationFrame(step);
  }
  const kick = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(step); };

  if (fine) {
    hero.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = hero.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; kick();
    });
    hero.addEventListener("pointerleave", () => { mouse = null; kick(); });
  }
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; kick(); }).observe(hero);
  document.addEventListener("visibilitychange", kick);
  dark.addEventListener("change", draw);
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  new ResizeObserver(layout).observe(hero);
}
