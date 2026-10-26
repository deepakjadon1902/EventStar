import { format, parseISO } from "date-fns";
import { CalendarDays, MapPin, Building2, Globe2, Users } from "lucide-react";
import type { TechEvent } from "../../types/event";
import { formatDateRange } from "../../lib/events";
import { formatLabels } from "../../data/labels";
import ExternalLink from "../ui/ExternalLink";
export default function QuickFacts({ event }: { event: TechEvent }) {
  const facts = [
    {
      label: "Dates",
      value: formatDateRange(event.startDate, event.endDate),
      Icon: CalendarDays,
    },
    {
      label: "Venue",
      value: event.venue || "See organizer’s website",
      Icon: Building2,
    },
    {
      label: "Location",
      value: `${event.city}, ${event.country}`,
      Icon: MapPin,
    },
    {
      label: "Format",
      value: event.inPersonOnly
        ? "In person only — no virtual component"
        : formatLabels[event.format],
      Icon: Globe2,
    },
    {
      label: "Organizer",
      value: event.organizer || "See official website",
      Icon: Users,
    },
  ];
  return (
    <aside className="panel quick-facts p-6 lg:sticky lg:top-28">
      <h2 className="text-lg">Quick facts</h2>
      <dl className="mt-5 divide-y divide-line">
        {facts.map(({ label, value, Icon }) => (
          <div key={label} className="flex gap-3 py-4">
            <Icon
              size={17}
              className="mt-0.5 shrink-0 text-ink-500"
              aria-hidden="true"
            />
            <div>
              <dt className="text-xs text-ink-500">{label}</dt>
              <dd className="mt-1 text-sm font-medium text-ink-900">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
      <ExternalLink href={event.officialUrl}>
        Official event website
      </ExternalLink>
      <p className="mt-5 border-t border-line pt-4 text-xs text-ink-500">
        Last verified:{" "}
        <time dateTime={event.lastVerified}>
          {format(parseISO(event.lastVerified), "MMM d, yyyy")}
        </time>
      </p>
    </aside>
  );
}
