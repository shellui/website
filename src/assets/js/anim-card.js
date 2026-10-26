// Tap or click a component visual (or its play button) to replay the animation.
// Hover and focus keep working through CSS; this adds .is-playing for touch.
for (const v of document.querySelectorAll("[data-anim-play]")) {
  const card = v.closest(".anim-card");
  v.addEventListener("click", () => {
    card.classList.add("is-reset");
    void card.offsetWidth; // reflow so the animations restart
    card.classList.remove("is-reset");
    card.classList.add("is-playing");
  });
}
