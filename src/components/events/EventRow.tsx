import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { TechEvent } from "../../types/event";
import DateBlock from "./DateBlock";
import EventBadges from "./EventBadges";
import { categoryLabels } from "../../data/labels";
import { isUpcoming } from "../../lib/events";
export default function EventRow({ event }: { event: TechEvent }) {
  return (
    <Link
      to={`/events/${event.slug}`}
      className={`event-row group ${event.status === "cancelled" ? "bg-surface/50" : ""}`}
    >
      <DateBlock event={event} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`font-sans text-base font-semibold leading-6 group-hover:text-brand-600 ${event.status === "cancelled" ? "text-ink-500 line-through" : ""}`}
          >
            {event.name}
          </h3>
          <EventBadges event={event} />
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={12} aria-hidden="true" />
            {event.city},{" "}
            {event.country === "United States"
              ? "USA"
              : event.country === "United Kingdom"
                ? "UK"
                : event.country}
          </span>
          <span className="hidden h-0.5 w-0.5 rounded-full bg-ink-500 sm:inline" />
          <span>
            {event.categories
              .slice(0, 2)
              .map((c) => categoryLabels[c])
              .join(" · ")}
          </span>
        </div>
        {event.venue && (
          <p className="mt-1 text-xs text-ink-500">{event.venue}</p>
        )}
      </div>
      {event.creatorAccess === "open" &&
        event.status !== "cancelled" &&
        isUpcoming(event) && (
          <span className="hidden items-center gap-1.5 text-xs font-medium text-success lg:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Open to creators
          </span>
        )}
      <ArrowRight
        size={18}
        className="event-arrow shrink-0 text-ink-500 transition-transform"
        aria-hidden="true"
      />
    </Link>
  );
}
