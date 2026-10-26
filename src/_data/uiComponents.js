// Component cards on /features/apps-and-navigation/ ("Components ready to use").
// To add a card: create src/_includes/feature-visual-<name>.njk (inline light and
// dark SVGs, ids prefixed per component), add its CSS under
// src/assets/css/ scoped to .anim-card:is(:hover,:focus-within,:focus-visible) .<prefix>-art,
// import it in input.css, then add an entry below with `visual` set to the include name.
export default [
  {
    id: "toaster",
    title: "Toaster",
    line: "Stack success, error, and action toasts above every app in the shell.",
    visual: "feature-visual-toaster.njk",
  },
  // { id: "dialog", title: "Dialog", line: "...", visual: "feature-visual-dialog.njk" }, // ids dl-
  // { id: "modal", title: "Modal", line: "...", visual: "feature-visual-modal.njk" },   // ids md-
  // { id: "drawer", title: "Drawer", line: "...", visual: "feature-visual-drawer.njk" }, // ids dr-
];
