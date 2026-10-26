// Component cards on /features/apps-and-navigation/ ("Components ready to use").
// To add a card: put the light and dark SVGs in src/_includes/feature-visual-<name>.njk
// (ids prefixed per component, dark copy renamed), add src/assets/css/<name>.css with rules
// scoped to .<prefix>-art and hover rules on .anim-card:is(:hover,:focus-within,:focus-visible),
// import it in input.css, then add an entry below with `visual` set to the include name.
export default [
  {
    id: "toaster",
    title: "Toaster",
    line: "Stack success, error, and action toasts above every app in the shell.",
    visual: "feature-visual-toaster.njk",
  },
  {
    id: "dialog",
    title: "Dialog",
    line: "Ask for confirmation before a destructive action, rendered above the whole shell.",
    visual: "feature-visual-dialog.njk",
  },
  {
    id: "modal",
    title: "Modal",
    line: "Open a full settings panel or form on top of the current app.",
    visual: "feature-visual-modal.njk",
  },
  {
    id: "drawer",
    title: "Drawer",
    line: "Slide in details or filters from the edge of the screen without leaving the page.",
    visual: "feature-visual-drawer.njk",
  },
];
