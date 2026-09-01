(function () {
  const html = document.documentElement;
  const toggles = document.querySelectorAll(".theme-toggle");
  const embedded = window.parent !== window;
  let cachedSettings = null;

  function applyTheme(mode) {
    const isDark = mode === "dark";
    html.classList.toggle("dark", isDark);
    if (!embedded) {
      localStorage.setItem("theme", mode);
    }
    toggles.forEach((toggle) => {
      toggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );
    });
  }

  function getInitialTheme() {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function sendColorSchemeToShell(colorScheme) {
    if (!embedded || !cachedSettings) return;
    const nextSettings = {
      ...cachedSettings,
      appearance: {
        ...(cachedSettings.appearance ?? {}),
        colorScheme,
      },
    };
    cachedSettings = nextSettings;
    parent.postMessage(
      { type: "SHELLUI_SETTINGS_UPDATED", payload: { settings: nextSettings } },
      "*",
    );
  }

  function setTheme(theme, event) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const apply = () => {
      applyTheme(theme);
      if (embedded) {
        sendColorSchemeToShell(theme);
      }
    };

    if (
      embedded ||
      !document.startViewTransition ||
      prefersReducedMotion
    ) {
      apply();
      return;
    }

    if (event) {
      html.style.setProperty("--x", `${event.clientX}px`);
      html.style.setProperty("--y", `${event.clientY}px`);
    }

    document.startViewTransition(apply);
  }

  function toggleTheme(event) {
    const next = html.classList.contains("dark") ? "light" : "dark";
    setTheme(next, event);
  }

  function initEmbeddedTheme() {
    const shell = window.shellui;
    if (!shell) return;

    window.addEventListener("message", (event) => {
      const data = event.data;
      if (!data || typeof data !== "object" || typeof data.type !== "string") {
        return;
      }
      if (
        data.type === "SHELLUI_SETTINGS" ||
        data.type === "SHELLUI_SETTINGS_UPDATED"
      ) {
        const settings = data.payload?.settings;
        if (settings) cachedSettings = settings;
      }
    });

    const syncFromShell = (theme) => {
      if (theme?.mode) applyTheme(theme.mode);
    };

    shell.on("theme", syncFromShell);

    // Settings may have arrived before this deferred script ran.
    parent.postMessage({ type: "SHELLUI_SETTINGS_REQUESTED" }, "*");

    if (shell.initialized) {
      syncFromShell(shell.theme);
    } else {
      shell.ready.then(() => syncFromShell(shell.theme));
    }
  }

  if (embedded) {
    initEmbeddedTheme();
  } else {
    applyTheme(getInitialTheme());

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        if (!localStorage.getItem("theme")) {
          applyTheme(event.matches ? "dark" : "light");
        }
      });
  }

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", toggleTheme);
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
