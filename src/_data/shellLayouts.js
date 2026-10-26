// Interactive layouts piece on /features/apps-and-navigation/.
// Badge values come from playground-mock/layouts/ref/measure.json (real playground).
// Each badge: [x, y, side ("r" = label to the right, "l" = to the left), text] in 960x600 stage px.
export default [
  { id: "sidebar", name: "Sidebar", thumb: [[0, 0, 14, 34]], badges: [[192, 330, "r", "width: 256px"], [960, 200, "l", "iframe: 1024 × 800"]] },
  { id: "sidebar-inset", name: "Sidebar inset", thumb: [[0, 0, 14, 34]], badges: [[951, 480, "l", "gutter: 12px"], [192, 560, "r", "border-radius: 16px"]] },
  { id: "app-bar", name: "App bar", thumb: [[0, 0, 54, 8]], badges: [[700, 42, "r", "height: 56px"], [960, 330, "l", "iframe: 1280 × 744"]] },
  { id: "app-bar-inset", name: "App bar inset", thumb: [[0, 0, 54, 8]], badges: [[951, 330, "l", "margin: 0 12px 12px"], [9, 560, "r", "border-radius: 16px · shadow-sm"]] },
  { id: "floating", name: "Floating", thumb: [[3, 3, 12, 28]], badges: [[189, 330, "r", "glass: 82% · backdrop-blur"], [189, 520, "r", "width: 240px · inset: 12px"]] },
  { id: "fullscreen", name: "Fullscreen", thumb: [], badges: [[960, 200, "l", "no navigation chrome"], [960, 480, "l", "iframe: 100% × 100%"]] },
  { id: "windows", name: "Windows", experimental: true, thumb: [[0, 29, 54, 5]], badges: [[730, 310, "r", "one window per nav item"], [480, 564, "r", "taskbar · experimental"]] },
];
