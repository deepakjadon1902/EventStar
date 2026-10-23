import { Search, SlidersHorizontal, X } from "lucide-react";
import type { EventFilters } from "../../lib/events";
import { categoryLabels, formatLabels, regionLabels } from "../../data/labels";
interface Props {
  filters: EventFilters;
  update: (key: keyof EventFilters, value: string | boolean) => void;
  clear: () => void;
  activeCount: number;
}
export default function FilterBar({
  filters,
  update,
  clear,
  activeCount,
}: Props) {
  return (
    <div
      id="region-filters"
      className="border-y border-line bg-white py-5 lg:sticky lg:top-20 lg:z-20"
    >
      <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-[minmax(200px,1.5fr)_1fr_1fr_1fr]">
        <div className="relative">
          <label htmlFor="event-search" className="sr-only">
            Search by event, city, or organizer
          </label>
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-4 text-ink-500"
            aria-hidden="true"
          />
          <input
            id="event-search"
            className="pl-11"
            type="search"
            placeholder="Event, city, or organizer…"
            value={filters.q}
            onChange={(e) => update("q", e.target.value)}
          />
        </div>
        {(
          [
            { key: "region", label: "All regions", items: regionLabels },
            { key: "category", label: "All categories", items: categoryLabels },
            { key: "format", label: "All formats", items: formatLabels },
          ] as const
        ).map(({ key, label, items }) => (
          <div key={key}>
            <label className="sr-only" htmlFor={`filter-${key}`}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <select
              id={`filter-${key}`}
              value={filters[key]}
              onChange={(e) => update(key, e.target.value)}
            >
              <option value="">{label}</option>
              {Object.entries(items).map(([value, text]) => (
                <option key={value} value={value}>
                  {text}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="mt-3 flex min-h-8 flex-wrap items-center justify-between gap-2">
        <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-xs font-medium">
          <input
            type="checkbox"
            checked={filters.creators}
            onChange={(e) => update("creators", e.target.checked)}
          />
          Open to creators
        </label>
        {activeCount > 0 ? (
          <button className="text-link min-h-11 text-xs" onClick={clear}>
            <X size={14} aria-hidden="true" />
            Clear filters ({activeCount})
          </button>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-500">
            <SlidersHorizontal size={13} aria-hidden="true" />
            Find your next gathering
          </span>
        )}
      </div>
    </div>
  );
}
