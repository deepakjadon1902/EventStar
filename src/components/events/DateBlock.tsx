import { format, parseISO } from "date-fns";
import type { TechEvent } from "../../types/event";
import { formatDateRange } from "../../lib/events";
export default function DateBlock({ event }: { event: TechEvent }) {
  const a = parseISO(event.startDate),
    b = parseISO(event.endDate);
  return (
    <div
      className="date-block"
      aria-label={formatDateRange(event.startDate, event.endDate)}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
        {format(a, "MMM")}
        {event.startDate.slice(0, 7) !== event.endDate.slice(0, 7)
          ? `–${format(b, "MMM")}`
          : ""}
      </span>
      <span className="mt-0.5 font-heading text-xl font-semibold tracking-tight sm:text-2xl">
        {format(a, "d")}
        {event.startDate !== event.endDate ? `–${format(b, "d")}` : ""}
      </span>
    </div>
  );
}
