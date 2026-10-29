// Discreet windy dot field. Decorative only. One instance per [data-hero-dots]
// (homepage hero, fades out at the bottom and clears around [data-hero-text])
// or [data-dots] (full field) element containing a <canvas>.
// [data-dots-calm] adds the Shellui windows desktop field: slower, half the travel,
// no pointer play, 1 dot in 11 tinted with --color-primary, 30 fps cap.
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
// Start after load and an idle frame so the decorative field never competes with first paint.
const start = () => document.querySelectorAll("[data-hero-dots], [data-dots]").forEach(initDots);
const idle = () => (window.requestIdleCallback ? requestIdleCallback(start, { timeout: 2000 }) : setTimeout(start, 200));
if (!reduce) document.readyState === "complete" ? idle() : addEventListener("load", idle, { once: true });

function initDots(hero) {
  const canvas = hero.querySelector(":scope > canvas");
  if (!canvas) return;
  const fade = hero.hasAttribute("data-hero-dots");
  const calm = hero.hasAttribute("data-dots-calm");
  const ctx = canvas.getContext("2d");
  const text = hero.querySelector("[data-hero-text]");
  const dark = matchMedia("(prefers-color-scheme: dark)");
  const fine = !calm && matchMedia("(pointer: fine)").matches;
  const S = 24, R = 100, PUSH = 4, K = calm ? 0.035 : 0.06, DAMP = calm ? 0.88 : 0.82;
  // Wind gusts: slanted fronts (top leading) sweep left to right every 1 to 3s (calm: 9 to 15s), nudging nearby dots.
  const GUST = calm ? 3.5 : 7, GW = calm ? 170 : 70, SLANT = Math.tan(18 * Math.PI / 180);
  const CROSS = calm ? [30000, 10000] : [6700, 3300], GAP = calm ? [9000, 6000] : [1000, 2000];
  let gold = [227, 165, 18], ink = [17, 24, 39], last = 0;
  // Resolve a site colour variable (any CSS colour) to rgb through a 1x1 canvas.
  const probe = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  const rgb = (name, fallback) => {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (!v) return fallback;
    probe.clearRect(0, 0, 1, 1); probe.fillStyle = v; probe.fillRect(0, 0, 1, 1);
    return [...probe.getImageData(0, 0, 1, 1).data.slice(0, 3)];
  };
  let fronts = [], next = 0;
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
      const v = !fade || t < 0.55 ? 1 : 1 - smooth((t - 0.55) / 0.45);
      const a = smooth(Math.min(1, Math.max(0, (e - 0.85) / 0.5))) * v;
      if (a > 0.02) dots.push({ x, y, a, ox: 0, oy: 0, vx: 0, vy: 0, g: 0, p: Math.random() * 6.28, s: 0.6 + Math.random() * 0.4, gold: (x / S * 7 + y / S * 3 | 0) % (calm ? 11 : 9) === 0 });
    }
    draw(); kick();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const dk = isDark(), g = gold.join(",");
    const base = calm ? ink.join(",") : dk ? "255,255,255" : "17,24,39";
    const B = calm ? (dk ? 0.11 : 0.15) : dk ? 0.12 : 0.16, LIFT = calm ? 0.16 : 0.22, RAD = calm ? 1.1 : 1.25;
    for (const d of dots) {
      const m = Math.max(0, Math.min(1, Math.hypot(d.ox, d.oy) / GUST));
      ctx.fillStyle = calm && d.gold ? `rgba(${g},${(0.22 + LIFT * m) * d.a})`
        : d.g > 0.02 ? `rgba(${g},${(0.5 * d.g + 0.1) * d.a})` : `rgba(${base},${(B + LIFT * m) * d.a})`;
      ctx.beginPath(); ctx.arc(d.x + d.ox, d.y + d.oy, RAD, 0, 7); ctx.fill();
    }
  }
  const recolor = () => { gold = rgb("--color-primary", gold); ink = rgb("--color-foreground", ink); draw(); };

  function step(now) {
    raf = 0;
    if (calm && now - last < 32) { kick(); return; }
    last = now;
    if (!next || now - next > (calm ? 20000 : 5000)) next = now;
    if (now >= next) { fronts.push({ t: now, v: (w + 2 * GW + h * SLANT) / (CROSS[0] + Math.random() * CROSS[1]) }); next = now + GAP[0] + Math.random() * GAP[1]; }
    for (const f of fronts) f.x = (now - f.t) * f.v - GW - h * SLANT;
    fronts = fronts.filter((f) => f.x < w + GW);
    for (const d of dots) {
      let tx = 0, ty = 0;
      for (const f of fronts) {
        const k = 1 - Math.abs(d.x - f.x - (h - d.y) * SLANT) / GW;
        if (k > 0) { const g = GUST * d.s * smooth(k); tx += g; ty += g * 0.25 * Math.sin(d.p); }
      }
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
  dark.addEventListener("change", recolor);
  new MutationObserver(recolor).observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
  gold = rgb("--color-primary", gold); ink = rgb("--color-foreground", ink);
  new ResizeObserver(layout).observe(hero);
}
