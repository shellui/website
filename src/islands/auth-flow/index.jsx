import { createRoot } from "react-dom/client";

import AuthFlow from "./graph.jsx";
import flowCss from "@xyflow/react/dist/base.css";
import graphCss from "../architecture-graph/graph.css";

const STYLE_ID = "auth-flow-styles";

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `${flowCss}\n${graphCss}`;
  document.head.append(style);
}

export function mount(target, { onReady } = {}) {
  injectStyles();
  createRoot(target).render(<AuthFlow onReady={onReady} />);
}
