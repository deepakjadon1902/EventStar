import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, CalendarDays, MapPin } from "lucide-react";
import type { TechEvent } from "../../types/event";
import { formatDateRange, isUpcoming } from "../../lib/events";
import { categoryLabels, formatLabels } from "../../data/labels";
import { getEventPhoto } from "../../data/event-photos";
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
  const photo = getEventPhoto(event);
  return (
    <section className="event-detail-hero">
      <Container>
        <nav aria-label="Breadcrumb" className="detail-breadcrumb">
          <Link to="/events">All events</Link>
          <ChevronRight size={12} aria-hidden="true" />
          <span className="truncate">{event.name}</span>
        </nav>
        <div className="detail-hero-grid">
          <div className="detail-hero-copy">
            <p className="eyebrow">A GATHERING WORTH YOUR CURIOSITY</p>
            <h1>{event.name}</h1>
            <div className="mb-5 flex flex-wrap gap-2">
              <EventBadges event={event} />
              {!isUpcoming(event, today) && <Badge>Ended</Badge>}
              {event.format === "in-person" && (
                <Badge>{formatLabels[event.format]}</Badge>
              )}
              {event.categories.map((c) => (
                <Badge key={c}>{categoryLabels[c]}</Badge>
              ))}
            </div>
            <div className="space-y-2 text-xs text-ink-500">
              <p className="flex items-center gap-2">
                <CalendarDays size={15} aria-hidden="true" />
                {formatDateRange(event.startDate, event.endDate)}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={15} aria-hidden="true" />
                {event.city}, {event.country}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
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
                  Apply to cover this event{" "}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              )}
              <AddToCalendar event={event} />
            </div>
          </div>
          <figure className="detail-hero-image">
            <img src={photo.src} alt={photo.alt} width="900" height="600" />
            <figcaption>
              {photo.caption} · {photo.credit}
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
