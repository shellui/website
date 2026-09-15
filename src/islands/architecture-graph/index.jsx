import { createRoot } from "react-dom/client";

import ArchitectureGraph from "./graph.jsx";
import flowCss from "@xyflow/react/dist/base.css";
import graphCss from "./graph.css";

const STYLE_ID = "architecture-graph-styles";

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `${flowCss}\n${graphCss}`;
  document.head.append(style);
}

export function mount(target) {
  injectStyles();
  createRoot(target).render(<ArchitectureGraph />);
}
