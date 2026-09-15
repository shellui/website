// Lazy mount for the /architecture/ diagram. The React island is a separate
// bundle so every other page stays on the Eleventy + Alpine budget.
(function () {
  const container = document.querySelector("[data-architecture-graph]");
  if (!container) return;

  const fallback = container.querySelector("[data-graph-fallback]");
  const target = container.querySelector("[data-graph-mount]");
  if (!target) return;

  let started = false;

  function load() {
    if (started) return;
    started = true;
    import("/assets/js/architecture-graph.island.js")
      .then((island) => {
        target.hidden = false;
        if (fallback) fallback.hidden = true;
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
})();
