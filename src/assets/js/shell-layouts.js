// Interactive layouts piece: segmented tabs morph one playground window.
// Tour: one rAF clock drives both the ring and the switch every 3.2s. Play/pause button,
// tab selection pauses, offscreen or hidden tab suspends without losing progress.
const W = 960;
const reduce = matchMedia("(prefers-reduced-motion: reduce)");

for (const root of document.querySelectorAll("[data-layouts]")) {
  const L = JSON.parse(root.querySelector("[data-layout-badges]").textContent);
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const stage = root.querySelector(".lyx-stage");
  const pill = root.querySelector(".lyx-pill");
  const badges = root.querySelector(".lyx-badges");
  const value = root.querySelector("[data-layout-value]");
  const fit = root.querySelector(".lyx-fit");
  const wrap = root.querySelector(".lyx-wrap");
  const q = new URLSearchParams(location.search).get("l");
  const btn = root.querySelector("[data-layout-play]");
  const ring = btn.querySelector(".anim-ring-fill");
  const icon = btn.querySelector(".anim-icon");
  const D = 3200, PLAY = "M16 13.5v13l10.5-6.5z", PAUSE = "M15 13.5h3.5v13H15zM21.5 13.5H25v13h-3.5z";
  let i = 0, auto = !q, visible = false, raf = 0, last = 0, elapsed = 0, badgeTimer;
  if (q) root.dataset.still = "";

  const scale = () => {
    const s = Math.min(1.25, fit.clientWidth / W);
    wrap.style.transform = `scale(${s})`;
    fit.style.height = `${600 * s}px`;
    const t = tabs[i];
    pill.style.left = `${t.offsetLeft}px`;
    pill.style.width = `${t.offsetWidth}px`;
  };

  const go = (k, focus) => {
    i = k;
    const { id, badges: bs } = L[k];
    stage.dataset.l = id;
    stage.setAttribute("aria-labelledby", tabs[k].id);
    value.textContent = id;
    tabs.forEach((t, j) => { t.setAttribute("aria-selected", j === k ? "true" : "false"); t.tabIndex = j === k ? 0 : -1; });
    if (focus) tabs[k].focus();
    scale();
    root.querySelectorAll(".lyx-cd").forEach((c) => c.classList.toggle("on", c.dataset.c === id));
    clearTimeout(badgeTimer);
    badges.innerHTML = bs.map(([x, y, s, t]) =>
      `<div class="lyx-bd ${s}" style="${s === "r" ? `left:${x - 3.5}px` : `right:${W - x - 3.5}px`};top:${y - 11}px"><span class="dt"></span><span class="ln"></span><span class="tx"></span></div>`).join("");
    badges.querySelectorAll(".tx").forEach((el, n) => { el.textContent = bs[n][3]; });
    const still = reduce.matches || q;
    badgeTimer = setTimeout(() => badges.querySelectorAll(".lyx-bd").forEach((b) => b.classList.add("show")), still ? 0 : 680);
  };

  const paint = () => {
    ring.style.strokeDashoffset = 100 - (100 * elapsed) / D;
    icon.setAttribute("d", auto ? PAUSE : PLAY);
    btn.setAttribute("aria-label", auto ? "Pause layout tour" : "Play layout tour");
  };
  const frame = (now) => {
    elapsed += now - last; last = now;
    if (elapsed >= D) { elapsed = 0; go((i + 1) % L.length); }
    paint();
    raf = requestAnimationFrame(frame);
  };
  const tick = () => {
    cancelAnimationFrame(raf); raf = 0;
    if (auto && visible && !document.hidden && !reduce.matches) {
      raf = requestAnimationFrame((now) => { last = now; raf = requestAnimationFrame(frame); });
    }
    paint();
  };
  const stop = () => { auto = false; tick(); };
  btn.addEventListener("click", () => {
    if (auto) return stop();
    auto = true; delete root.dataset.still; tick();
  });

  tabs.forEach((t, k) => {
    t.addEventListener("click", () => { elapsed = 0; stop(); go(k); });
    t.addEventListener("keydown", (e) => {
      const n = { ArrowRight: k + 1, ArrowLeft: k - 1, Home: 0, End: L.length - 1 }[e.key];
      if (n === undefined) return;
      e.preventDefault(); elapsed = 0; stop(); go((n + L.length) % L.length, true);
    });
  });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; tick(); }).observe(root);
  document.addEventListener("visibilitychange", tick);
  reduce.addEventListener?.("change", tick);
  new ResizeObserver(scale).observe(fit);
  go(Math.max(0, L.findIndex((x) => x.id === q)));
  document.fonts?.ready.then(scale);
}
