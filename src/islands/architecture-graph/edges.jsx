import { BaseEdge, EdgeLabelRenderer, Position } from "@xyflow/react";

const CURVATURE = 0.35;

function controlOffset(distance) {
  return distance >= 0 ? 0.5 * distance : CURVATURE * 25 * Math.sqrt(-distance);
}

function controlPoint(position, x1, y1, x2, y2) {
  switch (position) {
    case Position.Left:
      return [x1 - controlOffset(x1 - x2), y1];
    case Position.Right:
      return [x1 + controlOffset(x2 - x1), y1];
    case Position.Top:
      return [x1, y1 - controlOffset(y1 - y2)];
    default:
      return [x1, y1 + controlOffset(y2 - y1)];
  }
}

function cubicAt(t, p0, p1, p2, p3) {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

export function LabeledEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  markerStart,
  data,
}) {
  const [c1x, c1y] = controlPoint(sourcePosition, sourceX, sourceY, targetX, targetY);
  const [c2x, c2y] = controlPoint(targetPosition, targetX, targetY, sourceX, sourceY);
  const path = `M${sourceX},${sourceY} C${c1x},${c1y} ${c2x},${c2y} ${targetX},${targetY}`;

  const t = data?.labelT ?? 0.5;
  const offset = data?.labelOffset ?? [0, 0];
  const labelX = cubicAt(t, sourceX, c1x, c2x, targetX) + offset[0];
  const labelY = cubicAt(t, sourceY, c1y, c2y, targetY) + offset[1];

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        markerStart={markerStart}
        className="ag-edge"
        data-edge-id={id}
      />
      {data?.label ? (
        <EdgeLabelRenderer>
          <span
            className="ag-edge-label nodrag nopan"
            data-edge-id={id}
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            }}
          >
            {data.label}
          </span>
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
}

export const edgeTypes = { labeled: LabeledEdge };
