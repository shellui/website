// Shared lazy mount for React Flow islands. The Nunjucks template already
// ships graph chrome (toolbar, canvas skeleton, legend) so the page keeps its
// height from first paint; this only hydrates the interactive island over it.

export function lazyMountGraphIsland({
  containerSelector,
  islandUrl,
}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const target = container.querySelector("[data-graph-mount]");
  if (!target) return;

  let started = false;

  function load() {
    if (started) return;
    started = true;
    import(islandUrl)
      .then((island) => {
        island.mount(target);
      })
      .catch(() => {
        started = false;
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
