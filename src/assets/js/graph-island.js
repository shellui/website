// Shared lazy mount for React Flow islands. Reserves the graph box with a
// pending shell before the bundle paints so swapping away from the Nunjucks
// fallback does not collapse the layout.

const PENDING_CLASS = "ag-graph-pending";

export function lazyMountGraphIsland({
  containerSelector,
  islandUrl,
  loadingLabel = "Loading diagram…",
}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const fallback = container.querySelector("[data-graph-fallback]");
  const target = container.querySelector("[data-graph-mount]");
  if (!target) return;

  let started = false;

  function showPendingShell() {
    target.hidden = false;
    target.classList.add(PENDING_CLASS);
    target.setAttribute("aria-busy", "true");
    target.innerHTML = `<div class="ag-graph-pending__shell" role="status"><span class="sr-only">${loadingLabel}</span></div>`;
    if (fallback) fallback.hidden = true;
  }

  function clearPendingMark() {
    target.classList.remove(PENDING_CLASS);
    target.removeAttribute("aria-busy");
  }

  function restoreFallback() {
    started = false;
    target.hidden = true;
    clearPendingMark();
    target.innerHTML = "";
    if (fallback) fallback.hidden = false;
  }

  function load() {
    if (started) return;
    started = true;
    showPendingShell();
    import(islandUrl)
      .then((island) => {
        island.mount(target, { onReady: clearPendingMark });
      })
      .catch(() => {
        restoreFallback();
      });
  }

  if (!("IntersectionObserver" in window)) {
    load();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        load();
      }
    },
    { rootMargin: "300px 0px" },
  );

  observer.observe(container);
}
