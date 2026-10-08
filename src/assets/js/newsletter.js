(function () {
  const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const MESSAGES = {
    sending: "Sending...",
    sent: "Check your inbox and click the link to confirm.",
    invalid: "Enter a valid email address.",
    rate_limited: "Too many sign-ups from here. Try again in an hour.",
    unavailable: "Sign-up is unavailable right now. Try again later.",
    error: "Could not sign you up right now. Try again later.",
  };

  function setup(form) {
    const input = form.querySelector('input[name="email"]');
    const honeypot = form.querySelector('input[name="website"]');
    const button = form.querySelector('button[type="submit"]');
    const status = form.querySelector('[role="status"]');

    function show(key) {
      const failed = key !== "sending" && key !== "sent";
      status.textContent = MESSAGES[key];
      status.classList.toggle("text-muted-foreground", key === "sending");
      status.classList.toggle("text-foreground", key === "sent");
      status.classList.toggle("text-red-600", failed);
      status.classList.toggle("dark:text-red-400", failed);
      input.setAttribute("aria-invalid", key === "invalid" ? "true" : "false");
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (button.disabled) return;
      const email = input.value.trim();
      if (!EMAIL_RE.test(email)) {
        show("invalid");
        input.focus();
        return;
      }
      button.disabled = true;
      show("sending");
      try {
        const response = await fetch(form.action, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, website: honeypot ? honeypot.value : "" }),
          credentials: "omit",
        });
        if (response.status === 202) {
          show("sent");
          form.reset();
          return;
        }
        const body = await response.json().catch(() => ({}));
        if (response.status === 429 || body.error_code === "rate_limited") show("rate_limited");
        else if (body.error_code === "validation_failed") show("invalid");
        else if (
          body.error_code === "newsletter_unavailable" ||
          body.error_code === "turnstile_unavailable"
        ) {
          show("unavailable");
        } else show("error");
      } catch {
        show("error");
      } finally {
        button.disabled = false;
      }
    });
  }

  document.querySelectorAll("form.newsletter-form").forEach(setup);
})();
