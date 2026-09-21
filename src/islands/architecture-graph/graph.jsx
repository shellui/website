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
import { CanvasSkeleton } from "./skeleton.jsx";
import { useGraphReady } from "./use-graph-ready.js";

const VIEWS = architectureGraph.views;
const PAN_STEP = 72;
const FIT_PADDING = 16;
const FIT_MIN_ZOOM = 0.62;
const QUERY_KEY = "stack";
const ARROW = { type: MarkerType.ArrowClosed, width: 14, height: 14, color: "var(--ag-edge)" };

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function readViewFromUrl() {
  const requested = new URLSearchParams(window.location.search).get(QUERY_KEY);
  return VIEWS.some((view) => view.id === requested) ? requested : VIEWS[0].id;
}

function buildNodes(view) {
  const frames = view.groups.map((group) => ({
    id: group.id,
    type: "frame",
    position: group.position,
    data: { title: group.title, subtitle: group.subtitle, logo: group.logo },
    style: { width: group.size.width, height: group.size.height },
    width: group.size.width,
    height: group.size.height,
    measured: { width: group.size.width, height: group.size.height },
    draggable: false,
    selectable: false,
    focusable: false,
    connectable: false,
    zIndex: 0,
  }));

  const cards = view.nodes.map((node) => ({
    id: node.id,
    type: "stack",
    parentId: node.parent,
    extent: node.parent ? "parent" : undefined,
    position: node.position,
    data: {
      title: node.title,
      role: node.role,
      description: node.description,
      href: node.href,
      kind: node.kind,
      fill: Boolean(node.fill),
      logo: node.logo,
    },
    style: { width: node.size.width, height: node.size.height },
    width: node.size.width,
    height: node.size.height,
    measured: { width: node.size.width, height: node.size.height },
    draggable: false,
    connectable: false,
    zIndex: 1,
    ariaLabel: `${node.title}, ${node.role}. ${node.description}`,
  }));

  return [...frames, ...cards];
}

function buildEdges(view) {
  return view.edges.map((edge) => ({
    id: edge.id,
    type: "labeled",
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle,
    targetHandle: edge.targetHandle,
    markerEnd: ARROW,
    markerStart: edge.bidirectional ? ARROW : undefined,
    focusable: false,
    selectable: false,
    data: { label: edge.label, labelT: edge.labelT, labelOffset: edge.labelOffset },
  }));
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

function Canvas({ view, onReady }) {
  const { zoomIn, zoomOut, getViewport, setViewport } = useReactFlow();
  const surfaceRef = useRef(null);
  const canvasRef = useRef(null);

  const nodes = useMemo(() => buildNodes(view), [view]);
  const edges = useMemo(() => buildEdges(view), [view]);

  const duration = useCallback(() => (prefersReducedMotion() ? 0 : 240), []);

  // Highlighting writes data attributes straight to the rendered graph. Routing
  // it through React state would rebuild the nodes under the pointer, and a tap
  // that lands between mousedown and mouseup would lose its click target.
  // Edges that target a frame (for example hosting → Browser) also light up
  // every stack card inside that frame so an all-in deploy reads as one unit.
  const highlight = useCallback(
    (activeId) => {
      const root = surfaceRef.current;
      if (!root) return;
      const groupIds = new Set(view.groups.map((group) => group.id));
      const linked = new Set();
      for (const edge of view.edges) {
        if (edge.source === activeId) linked.add(edge.target);
        if (edge.target === activeId) linked.add(edge.source);
      }
      for (const id of [...linked]) {
        if (!groupIds.has(id)) continue;
        for (const node of view.nodes) {
          if (node.parent === id) linked.add(node.id);
        }
      }
      for (const element of root.querySelectorAll(".react-flow__node-stack[data-id]")) {
        const id = element.dataset.id;
        element.dataset.agState = !activeId
          ? "idle"
          : id === activeId
            ? "active"
            : linked.has(id)
              ? "linked"
              : "dim";
      }
      for (const element of root.querySelectorAll(".react-flow__node-frame[data-id]")) {
        const id = element.dataset.id;
        element.dataset.agState = !activeId
          ? "idle"
          : id === activeId || linked.has(id)
            ? "linked"
            : "dim";
      }
      for (const element of root.querySelectorAll("[data-edge-id]")) {
        const edge = view.edges.find((item) => item.id === element.dataset.edgeId);
        element.dataset.agState = !activeId
          ? "idle"
          : edge && (edge.source === activeId || edge.target === activeId)
            ? "active"
            : "dim";
      }
    },
    [view],
  );

  // A graph wider than the canvas is anchored to its left edge rather than
  // centered, so a phone opens on the browser frame instead of a cropped middle.
  const fit = useCallback(
    (animate = true) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const { clientWidth: width, clientHeight: height } = canvas;
      const { width: contentWidth, height: contentHeight } = view.bounds;
      const inner = FIT_PADDING * 2;
      const zoom = Math.min(
        (width - inner) / contentWidth,
        (height - inner) / contentHeight,
        1,
      );
      const options = { duration: animate ? duration() : 0 };
      if (zoom >= FIT_MIN_ZOOM) {
        setViewport(
          {
            x: (width - contentWidth * zoom) / 2,
            y: (height - contentHeight * zoom) / 2,
            zoom,
          },
          options,
        );
        return;
      }
      setViewport(
        {
          x: FIT_PADDING,
          y: Math.max(
            FIT_PADDING,
            (height - contentHeight * FIT_MIN_ZOOM) / 2,
          ),
          zoom: FIT_MIN_ZOOM,
        },
        options,
      );
    },
    [view, setViewport, duration],
  );

  const prepare = useCallback(() => {
    fit(false);
    highlight(null);
  }, [fit, highlight]);

  const ready = useGraphReady(onReady, { prepare });

  useEffect(() => {
    if (!ready) return;
    fit(false);
    highlight(null);
  }, [view, fit, highlight, ready]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof ResizeObserver === "undefined") return undefined;
    let timer = 0;
    const observer = new ResizeObserver(() => {
      if (!ready) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => fit(false), 150);
    });
    observer.observe(canvas);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [fit, ready]);

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
      const actions = {
        ArrowLeft: () => pan(PAN_STEP, 0),
        ArrowRight: () => pan(-PAN_STEP, 0),
        ArrowUp: () => pan(0, PAN_STEP),
        ArrowDown: () => pan(0, -PAN_STEP),
        "+": () => zoomIn({ duration: duration() }),
        "=": () => zoomIn({ duration: duration() }),
        "-": () => zoomOut({ duration: duration() }),
        "0": () => fit(),
      };
      const action = actions[event.key];
      if (!action) return;
      event.preventDefault();
      action();
    },
    [pan, zoomIn, zoomOut, fit, duration],
  );

  return (
    <div className="ag-surface" ref={surfaceRef}>
      <div
        className="ag-canvas"
        ref={canvasRef}
        data-ag-pending={ready ? undefined : ""}
        role="application"
        aria-label={`Architecture graph: ${view.label}`}
        aria-describedby="architecture-graph-hint"
        aria-busy={ready ? undefined : true}
        onKeyDown={onKeyDown}
        onFocusCapture={(event) =>
          highlight(event.target.closest?.(".react-flow__node-stack")?.dataset.id ?? null)
        }
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) highlight(null);
        }}
      >
        {ready ? null : <CanvasSkeleton label="Loading architecture diagram…" />}
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
          proOptions={{ hideAttribution: true }}
          onNodeMouseEnter={(_, node) => highlight(node.id)}
          onNodeMouseLeave={() => highlight(null)}
        >
          <Background variant={BackgroundVariant.Dots} gap={22} size={1} />
        </ReactFlow>
      </div>
      <div className="ag-controls" hidden={!ready}>
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
        <button type="button" className="ag-control ag-control--text" onClick={() => fit()}>
          Fit view
        </button>
      </div>
    </div>
  );
}

export default function ArchitectureGraph({ onReady }) {
  const [viewId, setViewId] = useState(readViewFromUrl);
  const view = VIEWS.find((item) => item.id === viewId) ?? VIEWS[0];

  const changeView = useCallback((next) => {
    setViewId(next);
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
        <Canvas view={view} onReady={onReady} />
      </ReactFlowProvider>

      <p className="ag-hint" id="architecture-graph-hint">
        Point at a box, or tab to it, to highlight what it talks to. Arrow keys pan,{" "}
        <kbd>+</kbd> and <kbd>-</kbd> zoom, <kbd>0</kbd> fits the view.
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
