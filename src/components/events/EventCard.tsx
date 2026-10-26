import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { TechEvent } from "../../types/event";
import { formatDateRange, isUpcoming } from "../../lib/events";
import { categoryLabels, formatLabels } from "../../data/labels";
import { getEventPhoto } from "../../data/event-photos";
import EventBadges from "./EventBadges";
export default function EventCard({ event }: { event: TechEvent }) {
  const photo = getEventPhoto(event);
  return (
    <Link
      to={`/events/${event.slug}`}
      className={`event-card group ${event.status === "cancelled" ? "event-card-cancelled" : ""}`}
    >
      <div className="event-card-photo">
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          width="640"
          height="420"
        />
        <span className="photo-format">{formatLabels[event.format]}</span>
        <span className="photo-caption">{photo.caption}</span>
      </div>
      <div className="event-card-body">
        <div className="event-card-categories">
          {event.categories.slice(0, 2).map((c) => (
            <span key={c}>{categoryLabels[c]}</span>
          ))}
          <EventBadges event={event} />
        </div>
        <h3>{event.name}</h3>
        <p className="card-meta">
          <CalendarDays size={14} aria-hidden="true" />
          {formatDateRange(event.startDate, event.endDate)}
        </p>
        <p className="card-meta">
          <MapPin size={14} aria-hidden="true" />
          {event.city},{" "}
          {event.country === "United States" ? "USA" : event.country}
        </p>
        <div className="event-card-bottom">
          <span>
            {event.status === "cancelled" ? (
              "Event cancelled"
            ) : !isUpcoming(event) ? (
              "Explore the archive"
            ) : event.creatorAccess === "open" ? (
              <>
                <span className="status-dot" /> Open to creators
              </>
            ) : (
              "Discover the event"
            )}
          </span>
          <ArrowUpRight size={19} aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
