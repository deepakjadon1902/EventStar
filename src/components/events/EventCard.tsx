import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { TechEvent } from "../../types/event";
import { formatDateRange } from "../../lib/events";
import { categoryLabels } from "../../data/labels";
export default function EventCard({ event }: { event: TechEvent }) {
  return (
    <Link
      to={`/events/${event.slug}`}
      className="panel group flex h-full flex-col p-6 transition-colors hover:border-brand-100 hover:bg-brand-50/40"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-500">
          {formatDateRange(event.startDate, event.endDate)}
        </span>
        <ArrowUpRight
          size={16}
          className="shrink-0 text-ink-500 group-hover:text-brand-600"
          aria-hidden="true"
        />
      </div>
      <h3 className="mb-3 font-sans text-base leading-6 group-hover:text-brand-600">
        {event.name}
      </h3>
      <p className="mb-5 inline-flex items-start gap-1.5 text-xs text-ink-500">
        <MapPin className="shrink-0" size={13} aria-hidden="true" />
        {event.city}
      </p>
      <span className="mt-auto text-xs text-ink-500">
        {event.categories.map((c) => categoryLabels[c]).join(" · ")}
      </span>
    </Link>
  );
}
