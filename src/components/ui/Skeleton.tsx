export default function Skeleton() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="container-shell min-h-[60vh] py-16"
    >
      <div className="mb-8 h-12 w-2/3 rounded-xl bg-surface" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="mb-4 h-24 rounded-xl bg-surface" />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
