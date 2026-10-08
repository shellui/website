export function CanvasSkeleton({ label }) {
  return (
    <div className="ag-skeleton" role="status" aria-live="polite">
      <span className="ag-visually-hidden">{label}</span>
      <div className="ag-skeleton__pulse" aria-hidden="true" />
    </div>
  );
}
