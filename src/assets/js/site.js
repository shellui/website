(function () {
  const html = document.documentElement;
  const toggles = document.querySelectorAll(".theme-toggle");
  const embedded = window.parent !== window;
  let cachedSettings = null;

  function applyTheme(mode) {
    const isDark = mode === "dark";
    html.classList.toggle("dark", isDark);
    html.style.colorScheme = isDark ? "dark" : "light";
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute("content", isDark ? "#030712" : "#ffffff");
    }
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

function copyText(text) {
  const write = async () => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    throw new Error("clipboard unavailable");
  };
  return write().catch(() => {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.select();
    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(field);
    }
  });
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  let timer = null;
  const label = button.querySelector("[data-copy-label]");
  const status = document.querySelector("[data-copy-status]");
  const idle = label?.textContent || "Copy";
  button.addEventListener("click", () => {
    const text = button.getAttribute("data-copy") || "";
    if (!text) return;
    copyText(text).then(() => {
      button.setAttribute("aria-label", "Copied to clipboard");
      if (label) label.textContent = "Copied";
      if (status) status.textContent = "Copied";
      clearTimeout(timer);
      timer = setTimeout(() => {
        button.setAttribute("aria-label", "Copy agent prompt");
        if (label) label.textContent = idle;
        if (status) status.textContent = "";
      }, 1600);
    });
  });
});

const frameworkPicker = document.querySelector("[data-framework-picker]");
if (frameworkPicker) {
  const commandNode = frameworkPicker.querySelector("[data-init-command]");
  frameworkPicker.addEventListener("change", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (!commandNode) return;
    const command = input.getAttribute("data-command");
    if (command) commandNode.textContent = command;
  });
}
