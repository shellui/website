// Interactive layouts piece on /features/apps-and-navigation/.
// Badge values follow the Shellui 0.7 layouts (shellui/shellui #131).
// Each badge: [x, y, side ("r" = label to the right, "l" = to the left), text] in 960x600 stage px.
export default [
  { id: "sidebar", name: "Sidebar", thumb: [[0, 0, 14, 34]], badges: [[192, 330, "r", "width: 256px"], [192, 155, "r", "active: primary pill"]] },
  { id: "sidebar-inset", name: "Sidebar inset", thumb: [[0, 0, 14, 34]], badges: [[951, 480, "l", "gutter: 12px"], [201, 560, "r", "border-radius: 16px"]] },
  { id: "app-bar", name: "App bar", thumb: [[0, 0, 54, 8]], badges: [[700, 42, "r", "height: 56px"], [166, 42, "r", "active: 2px underline"]] },
  { id: "app-bar-inset", name: "App bar inset", thumb: [[0, 0, 54, 8]], badges: [[951, 330, "l", "margin: 0 12px 12px"], [9, 560, "r", "border-radius: 16px · shadow-sm"]] },
  { id: "floating", name: "Floating", thumb: [[3, 3, 12, 28]], badges: [[189, 330, "r", "glass: 72% · blur: 24px"], [189, 520, "r", "width: 240px · inset: 12px"]] },
  { id: "fullscreen", name: "Fullscreen", thumb: [], badges: [[960, 200, "l", "no navigation chrome"], [960, 480, "l", "iframe: 100% × 100%"]] },
  { id: "windows", name: "Windows", experimental: true, thumb: [[0, 29, 54, 5]], badges: [[640, 400, "r", "one window per nav item"], [470, 564, "r", "glass taskbar · calm dot field"]] },
];
