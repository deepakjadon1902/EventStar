import type { TechEvent } from "../types/event";
import { site } from "../config/site";
export function eventJsonLd(event: TechEvent): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate,
    description: event.summary,
    eventStatus: `https://schema.org/${event.status === "cancelled" ? "EventCancelled" : event.status === "rescheduled" ? "EventRescheduled" : "EventScheduled"}`,
    eventAttendanceMode: `https://schema.org/${event.format === "hybrid" ? "MixedEventAttendanceMode" : event.format === "virtual" ? "OnlineEventAttendanceMode" : "OfflineEventAttendanceMode"}`,
    location:
      event.format === "virtual"
        ? { "@type": "VirtualLocation", url: event.officialUrl }
        : {
            "@type": "Place",
            name: event.venue || event.city,
            address: {
              "@type": "PostalAddress",
              addressLocality: event.city,
              addressCountry: event.country,
            },
          },
    url: `${site.url}/events/${event.slug}`,
    sameAs: event.officialUrl,
    ...(event.organizer
      ? {
          organizer: {
            "@type": "Organization",
            name: event.organizer,
            url: event.officialUrl,
          },
        }
      : {}),
  };
}
