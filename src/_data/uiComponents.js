// Component cards on /features/apps-and-navigation/ ("Components ready to use").
// To add a card: put the light and dark SVGs in src/_includes/feature-visual-<name>.njk
// (ids prefixed per component, dark copy renamed), add src/assets/css/<name>.css with rules
// scoped to .<prefix>-art and hover rules on .anim-card:is(:hover,:focus-within,:focus-visible),
// import it in input.css, then add an entry below with `visual` set to the include name.
// `call` must be a real @shellui/sdk method (see packages/sdk/src/index.ts in shellui/shellui).
export default [
  {
    id: "toaster",
    title: "Toaster",
    line: "Show a success, error, or action notification above every app in the shell.",
    call: "shellui.toast()",
    how: "with a title, description, and type.",
    visual: "feature-visual-toaster.njk",
  },
  {
    id: "dialog",
    title: "Dialog",
    line: "Ask for confirmation before a destructive action, outside the app iframe.",
    call: "shellui.dialog()",
    how: "with a mode and onOk and onCancel callbacks.",
    visual: "feature-visual-dialog.njk",
  },
  {
    id: "modal",
    title: "Modal",
    line: "Open a settings page or form on top of the current app.",
    call: 'shellui.openModal("/settings")',
    how: "to load that route of your app in a modal.",
    visual: "feature-visual-modal.njk",
  },
  {
    id: "drawer",
    title: "Drawer",
    line: "Slide in details or filters from the edge of the screen.",
    call: "shellui.openDrawer()",
    how: "with a url, position, and size.",
    visual: "feature-visual-drawer.njk",
  },
];
