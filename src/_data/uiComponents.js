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
    line: "Slide in details or filters as a panel that floats over the page.",
    call: "shellui.openDrawer()",
    how: "with a url, position, and size.",
    visual: "feature-visual-drawer.njk",
  },
  {
    id: "actions",
    title: "Action buttons",
    line: "Add a back button, a title, up to 8 trailing actions, and a primary floating button to the shell chrome. On narrow screens, extra trailing actions move into a More menu. Some layouts integrate them deeper: Windows shows them in each window title bar, and Sidebar on mobile shows them in its top bar.",
    call: "shellui.actions.set()",
    how: "with back, title, trailing, and primary items, each with an optional variant.",
    visual: "feature-visual-actions.njk",
  },
];
