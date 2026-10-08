import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";

import ArchitectureGraph from "./graph.jsx";
import flowCss from "@xyflow/react/dist/base.css";
import chromeCss from "../../assets/css/graph-chrome.css";
import graphCss from "./graph.css";

const STYLE_ID = "architecture-graph-styles";

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `${flowCss}\n${chromeCss}\n${graphCss}`;
  document.head.append(style);
}

export function mount(target, { onReady } = {}) {
  injectStyles();
  const root = createRoot(target);
  // Replace the SSR shell and paint the matching React tree in the same turn
  // so the reserved graph box does not collapse for a frame.
  flushSync(() => {
    root.render(<ArchitectureGraph onReady={onReady} />);
  });
}
