import { Link } from "react-router-dom";
import { ArrowUpRight, PenLine } from "lucide-react";
import type { TechEvent } from "../../types/event";
import { isUpcoming } from "../../lib/events";
import Badge from "../ui/Badge";
import ExternalLink from "../ui/ExternalLink";
export default function EventCoverage({ event }: { event: TechEvent }) {
  const available =
    isUpcoming(event) &&
    event.status !== "cancelled" &&
    event.creatorAccess !== "closed";
  const label = available
    ? event.creatorAccess === "open"
      ? "Open"
      : "By invitation"
    : "Closed";
  return (
    <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <PenLine size={20} className="text-brand-600" aria-hidden="true" />
        <h2 className="text-xl">Planning to cover this event?</h2>
        <Badge variant={available ? "success" : "neutral"}>{label}</Badge>
      </div>
      <p className="mt-4 text-sm text-ink-700">
        {available
          ? "Apply to our creator coverage program. We can help you request access; accreditation is always the organizer’s decision."
          : event.status === "cancelled"
            ? "This event is listed as cancelled. Coverage applications are closed."
            : "Coverage applications for this event are closed. Explore upcoming events for your next story."}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-5">
        {available && (
          <Link
            to={`/creators/apply?event=${event.slug}`}
            className="text-link"
          >
            Apply to cover this event
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        )}
        {event.mediaUrl && (
          <ExternalLink href={event.mediaUrl}>
            Organizer’s media page
          </ExternalLink>
        )}
      </div>
      <p className="mt-4 text-xs text-ink-500">
        Unless agreed in writing, coverage is unpaid and independent. You retain
        ownership of your work.
      </p>
    </div>
  );
}
