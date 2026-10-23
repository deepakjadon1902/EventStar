import { SearchX } from "lucide-react";
import Button from "./Button";
export default function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="panel my-6 flex flex-col items-center px-6 py-16 text-center">
      <span className="mb-5 rounded-2xl bg-brand-50 p-4 text-brand-600">
        <SearchX size={28} aria-hidden="true" />
      </span>
      <h2 className="text-xl">No events match these filters.</h2>
      <p className="mb-6 mt-3 text-sm text-ink-500">
        Try a different region or clear filters.
      </p>
      <Button variant="secondary" onClick={onClear}>
        Clear filters
      </Button>
    </div>
  );
}
