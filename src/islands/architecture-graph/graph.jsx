import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Background,
  BackgroundVariant,
  MarkerType,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";

import architectureGraph from "../../_data/architectureGraph.js";
import { edgeTypes } from "./edges.jsx";
import { nodeTypes } from "./nodes.jsx";

const VIEWS = architectureGraph.views;
const PAN_STEP = 72;
const QUERY_KEY = "stack";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function readViewFromUrl() {
  const requested = new URLSearchParams(window.location.search).get(QUERY_KEY);
  return VIEWS.some((view) => view.id === requested) ? requested : VIEWS[0].id;
}

function neighboursOf(view, id) {
  const linked = new Set();
  if (!id) return linked;
  for (const edge of view.edges) {
    if (edge.source === id) linked.add(edge.target);
    if (edge.target === id) linked.add(edge.source);
  }
  return linked;
}

function buildNodes(view, activeId) {
  const linked = neighboursOf(view, activeId);
  const frames = view.groups.map((group) => ({
    id: group.id,
    type: "frame",
    position: group.position,
    data: { title: group.title, subtitle: group.subtitle },
    style: { width: group.size.width, height: group.size.height },
    draggable: false,
    selectable: false,
    focusable: false,
    connectable: false,
    zIndex: 0,
  }));

  const cards = view.nodes.map((node) => {
    let state = "idle";
    if (activeId) {
      if (node.id === activeId) state = "active";
      else if (linked.has(node.id)) state = "linked";
      else state = "dim";
    }
    return {
      id: node.id,
      type: "stack",
      parentId: node.parent,
      extent: "parent",
      position: node.position,
      data: {
        title: node.title,
        role: node.role,
        description: node.description,
        href: node.href,
        kind: node.kind,
        state,
      },
      style: { width: node.size.width, height: node.size.height },
      draggable: false,
      connectable: false,
      zIndex: 1,
      ariaLabel: `${node.title}, ${node.role}. ${node.description}`,
    };
  });

  return [...frames, ...cards];
}

function buildEdges(view, activeId) {
  return view.edges.map((edge) => {
    const touched = edge.source === activeId || edge.target === activeId;
    const state = !activeId ? "idle" : touched ? "active" : "dim";
    const color = state === "active" ? "var(--color-primary)" : "var(--ag-edge)";
    const marker = { type: MarkerType.ArrowClosed, width: 14, height: 14, color };
    return {
      id: edge.id,
      type: "labeled",
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
      markerEnd: marker,
      markerStart: edge.bidirectional ? marker : undefined,
      focusable: false,
      selectable: false,
      data: { label: edge.label, state },
      zIndex: state === "active" ? 2 : 0,
    };
  });
}

function ViewPicker({ viewId, onChange }) {
  return (
    <fieldset className="ag-picker">
      <legend className="ag-picker__legend">Stack</legend>
      <div className="ag-picker__options">
        {VIEWS.map((view) => (
          <label key={view.id} className="ag-picker__option">
            <input
              type="radio"
              name="architecture-stack"
              value={view.id}
              checked={view.id === viewId}
              onChange={() => onChange(view.id)}
            />
            <span>{view.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ZoomButton({ label, onClick, children }) {
  return (
    <button type="button" className="ag-control" onClick={onClick} aria-label={label}>
      {children}
    </button>
  );
}

function Canvas({ view, activeId, setActiveId }) {
  const { zoomIn, zoomOut, fitView, getViewport, setViewport } = useReactFlow();
  const surfaceRef = useRef(null);

  const nodes = useMemo(() => buildNodes(view, activeId), [view, activeId]);
  const edges = useMemo(() => buildEdges(view, activeId), [view, activeId]);

  const duration = useCallback(() => (prefersReducedMotion() ? 0 : 240), []);

  const fit = useCallback(() => {
    fitView({ padding: 0.06, minZoom: 0.4, maxZoom: 1, duration: duration() });
  }, [fitView, duration]);

  useEffect(() => {
    fit();
  }, [view, fit]);

  const pan = useCallback(
    (dx, dy) => {
      const viewport = getViewport();
      setViewport(
        { ...viewport, x: viewport.x + dx, y: viewport.y + dy },
        { duration: duration() },
      );
    },
    [getViewport, setViewport, duration],
  );

  const onKeyDown = useCallback(
    (event) => {
      const keys = {
        ArrowLeft: () => pan(PAN_STEP, 0),
        ArrowRight: () => pan(-PAN_STEP, 0),
        ArrowUp: () => pan(0, PAN_STEP),
        ArrowDown: () => pan(0, -PAN_STEP),
        "+": () => zoomIn({ duration: duration() }),
        "=": () => zoomIn({ duration: duration() }),
        "-": () => zoomOut({ duration: duration() }),
        "0": fit,
      };
      const action = keys[event.key];
      if (!action) return;
      event.preventDefault();
      action();
    },
    [pan, zoomIn, zoomOut, fit, duration],
  );

  const onFocusCapture = useCallback(
    (event) => {
      const card = event.target.closest?.(".react-flow__node");
      setActiveId(card?.dataset?.id ?? null);
    },
    [setActiveId],
  );

  return (
    <div className="ag-surface" ref={surfaceRef}>
      <div
        className="ag-canvas"
        role="application"
        aria-label={`Architecture graph: ${view.label}`}
        aria-describedby="architecture-graph-hint"
        onKeyDown={onKeyDown}
        onFocusCapture={onFocusCapture}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setActiveId(null);
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          edgesFocusable={false}
          deleteKeyCode={null}
          multiSelectionKeyCode={null}
          selectionKeyCode={null}
          zoomOnScroll={false}
          preventScrolling={false}
          zoomOnDoubleClick={false}
          minZoom={0.35}
          maxZoom={1.6}
          onNodeMouseEnter={(_, node) => setActiveId(node.id)}
          onNodeMouseLeave={() => setActiveId(null)}
          proOptions={{ hideAttribution: false }}
        >
          <Background variant={BackgroundVariant.Dots} gap={22} size={1} />
        </ReactFlow>
      </div>
      <div className="ag-controls">
        <ZoomButton label="Zoom out" onClick={() => zoomOut({ duration: duration() })}>
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="M5 10h10" />
          </svg>
        </ZoomButton>
        <ZoomButton label="Zoom in" onClick={() => zoomIn({ duration: duration() })}>
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="M10 5v10M5 10h10" />
          </svg>
        </ZoomButton>
        <button type="button" className="ag-control ag-control--text" onClick={fit}>
          Fit view
        </button>
      </div>
    </div>
  );
}

export default function ArchitectureGraph() {
  const [viewId, setViewId] = useState(readViewFromUrl);
  const [activeId, setActiveId] = useState(null);
  const view = VIEWS.find((item) => item.id === viewId) ?? VIEWS[0];

  const changeView = useCallback((next) => {
    setViewId(next);
    setActiveId(null);
    const url = new URL(window.location.href);
    if (next === VIEWS[0].id) url.searchParams.delete(QUERY_KEY);
    else url.searchParams.set(QUERY_KEY, next);
    window.history.replaceState(null, "", url);
  }, []);

  return (
    <div className="ag-root">
      <div className="ag-toolbar">
        <ViewPicker viewId={view.id} onChange={changeView} />
        <p className="ag-summary">{view.summary}</p>
      </div>

      <ReactFlowProvider>
        <Canvas view={view} activeId={activeId} setActiveId={setActiveId} />
      </ReactFlowProvider>

      <p className="ag-hint" id="architecture-graph-hint">
        Tab to a box to highlight what it talks to. Arrow keys pan, <kbd>+</kbd> and{" "}
        <kbd>-</kbd> zoom, <kbd>0</kbd> fits the view.
      </p>

      <div className="ag-legend">
        <h3 className="ag-legend__title">Connections in this view</h3>
        <ul className="ag-legend__list">
          {view.connections.map((connection) => (
            <li key={connection.id}>
              <span className="ag-legend__pair">
                {connection.from} {connection.bidirectional ? "↔" : "→"} {connection.to}
              </span>
              {connection.label ? (
                <span className="ag-legend__label">{connection.label}</span>
              ) : null}
            </li>
          ))}
        </ul>
        {view.omitted ? (
          <p className="ag-legend__note">
            <span className="ag-legend__note-title">{view.omitted.title}:</span>{" "}
            {view.omitted.items.join("; ")}.
          </p>
        ) : null}
      </div>
    </div>
  );
}
