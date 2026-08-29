(function () {
  const html = document.documentElement;
  const toggles = document.querySelectorAll(".theme-toggle");

  function getInitialTheme() {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setTheme(theme) {
    html.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    toggles.forEach((toggle) => {
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      );
    });
  }

  function toggleTheme(event) {
    const next = html.classList.contains("dark") ? "light" : "dark";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(next);
      return;
    }

    if (event) {
      html.style.setProperty("--x", `${event.clientX}px`);
      html.style.setProperty("--y", `${event.clientY}px`);
    }

    document.startViewTransition(() => {
      setTheme(next);
    });
  }

  setTheme(getInitialTheme());

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", toggleTheme);
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (!localStorage.getItem("theme")) {
      setTheme(event.matches ? "dark" : "light");
    }
  });
})();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});
