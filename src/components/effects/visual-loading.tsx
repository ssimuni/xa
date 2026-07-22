export function VisualLoading({ label }: { label: string }) {
  return (
    <div className="visual-loading" role="status">
      <span className="visual-loading-ring" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
