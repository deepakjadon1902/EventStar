import { format, parseISO } from "date-fns";
import type { TechEvent } from "../../types/event";
import { groupByMonth } from "../../lib/events";
import EventRow from "./EventRow";
export default function EventList({
  events,
  grouped = true,
}: {
  events: TechEvent[];
  grouped?: boolean;
}) {
  if (!grouped)
    return (
      <div>
        {events.map((event) => (
          <EventRow key={event.id} event={event} />
        ))}
      </div>
    );
  return (
    <div>
      {Object.entries(groupByMonth(events)).map(([month, items]) => (
        <section
          key={month}
          aria-label={format(parseISO(`${month}-01`), "MMMM yyyy")}
          className="mb-8"
        >
          <div className="sticky top-20 z-10 flex items-center gap-3 border-y border-line bg-surface px-4 py-3 lg:top-[calc(var(--header-height)+var(--event-filters-height))]">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-widest">
              {format(parseISO(`${month}-01`), "MMMM yyyy")}
            </h2>
            <span className="text-xs text-ink-500">
              {items.length} {items.length === 1 ? "event" : "events"}
            </span>
          </div>
          {items.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </section>
      ))}
    </div>
  );
}
