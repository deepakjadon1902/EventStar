import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, CalendarDays, MapPin } from "lucide-react";
import { format, parseISO } from "date-fns";
import type { TechEvent } from "../../types/event";
import { formatDateRange, isUpcoming } from "../../lib/events";
import { categoryLabels, formatLabels } from "../../data/labels";
import Container from "../layout/Container";
import Badge from "../ui/Badge";
import ExternalLink from "../ui/ExternalLink";
import EventBadges from "./EventBadges";
import AddToCalendar from "./AddToCalendar";
export default function EventHeader({
  event,
  today,
}: {
  event: TechEvent;
  today: string;
}) {
  const available =
    isUpcoming(event, today) &&
    event.status !== "cancelled" &&
    event.creatorAccess !== "closed";
  return (
    <div className="border-b border-line bg-surface py-10 md:py-14">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex items-center gap-2 text-xs text-ink-500"
        >
          <Link to="/events" className="text-brand-600 hover:underline">
            Events
          </Link>
          <ChevronRight size={13} aria-hidden="true" />
          <span className="truncate">{event.name}</span>
        </nav>
        <div className="mb-4 flex flex-wrap gap-2">
          <EventBadges event={event} />
          {!isUpcoming(event, today) && <Badge>Ended</Badge>}
          {event.format === "in-person" && (
            <Badge>{formatLabels[event.format]}</Badge>
          )}
          {event.categories.map((c) => (
            <Badge key={c}>{categoryLabels[c]}</Badge>
          ))}
        </div>
        <h1 className="max-w-4xl leading-tight">{event.name}</h1>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-500">
          <p className="inline-flex items-center gap-2">
            <CalendarDays size={17} aria-hidden="true" />
            {formatDateRange(event.startDate, event.endDate)}{" "}
            <span className="text-xs">
              ({format(parseISO(event.startDate), "EEE")}
              {event.startDate !== event.endDate
                ? `–${format(parseISO(event.endDate), "EEE")}`
                : ""}
              )
            </span>
          </p>
          <p className="inline-flex items-center gap-2">
            <MapPin size={17} aria-hidden="true" />
            {event.city}, {event.country}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ExternalLink
            href={event.officialUrl}
            className="button button-primary"
          >
            Visit official website
          </ExternalLink>
          {available && (
            <Link
              to={`/creators/apply?event=${event.slug}`}
              className="button button-secondary"
            >
              Apply to cover this event
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
          <AddToCalendar event={event} />
        </div>
      </Container>
    </div>
  );
}
