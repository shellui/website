import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

const HANDLES = [
  { id: "top", position: Position.Top, style: { left: "50%" } },
  { id: "bottom", position: Position.Bottom, style: { left: "50%" } },
  { id: "left", position: Position.Left, style: { top: "50%" } },
  { id: "left2", position: Position.Left, style: { top: "75%" } },
  { id: "right", position: Position.Right, style: { top: "50%" } },
  { id: "right2", position: Position.Right, style: { top: "75%" } },
];

function NodeHandles() {
  return HANDLES.flatMap(({ id, position, style }) => [
    <Handle
      key={`${id}-s`}
      id={`${id}-s`}
      type="source"
      position={position}
      style={style}
      isConnectable={false}
    />,
    <Handle
      key={`${id}-t`}
      id={`${id}-t`}
      type="target"
      position={position}
      style={style}
      isConnectable={false}
    />,
  ]);
}

export const StackNode = memo(function StackNode({ data }) {
  const { title, role, description, href, kind, fill } = data;

  return (
    <div className="ag-node" data-kind={kind} data-fill={fill || undefined}>
      <NodeHandles />
      <p className="ag-node__head">
        {href ? (
          <a className="ag-node__title nodrag nopan" href={href}>
            {title}
          </a>
        ) : (
          <span className="ag-node__title">{title}</span>
        )}
        <span className="ag-node__role">{role}</span>
      </p>
      <p className="ag-node__desc">{description}</p>
    </div>
  );
});

export const FrameNode = memo(function FrameNode({ data }) {
  return (
    <div className="ag-frame">
      <p className="ag-frame__label">
        <span className="ag-frame__title">{data.title}</span>
        <span className="ag-frame__subtitle">{data.subtitle}</span>
      </p>
    </div>
  );
});

export const nodeTypes = { stack: StackNode, frame: FrameNode };
