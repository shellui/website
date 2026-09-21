import { useEffect, useRef, useState } from "react";
import { useNodesInitialized } from "@xyflow/react";

const READY_FALLBACK_MS = 400;

// Reveal the flow only after nodes are measured so the canvas is not an empty
// reserved box for a frame. prepare() runs first (fit/highlight); onReady once.
export function useGraphReady(onReady, { prepare } = {}) {
  const nodesInitialized = useNodesInitialized();
  const [ready, setReady] = useState(false);
  const onReadyRef = useRef(onReady);
  const prepareRef = useRef(prepare);
  onReadyRef.current = onReady;
  prepareRef.current = prepare;

  useEffect(() => {
    if (ready || !nodesInitialized) return undefined;
    prepareRef.current?.();
    const frame = window.requestAnimationFrame(() => {
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [nodesInitialized, ready]);

  // Controlled graphs without onNodesChange can stall measurement; don't leave
  // the skeleton up forever if the store never flips nodesInitialized.
  useEffect(() => {
    if (ready) return undefined;
    const timer = window.setTimeout(() => {
      prepareRef.current?.();
      setReady(true);
    }, READY_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    onReadyRef.current?.();
  }, [ready]);

  return ready;
}
