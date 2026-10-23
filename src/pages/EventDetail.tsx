import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { events } from "../data";
import { formatLabels } from "../data/labels";
import { formatDateRange, getRelated } from "../lib/events";
import { eventJsonLd } from "../lib/seo";
import { useToday } from "../hooks/useToday";
import Container from "../components/layout/Container";
import Seo from "../components/ui/Seo";
import Faq from "../components/ui/Faq";
import EventHeader from "../components/events/EventHeader";
import QuickFacts from "../components/events/QuickFacts";
import EventCoverage from "../components/events/EventCoverage";
import EventCard from "../components/events/EventCard";
import NotFound from "./NotFound";
export default function EventDetail() {
  const { slug } = useParams();
  const today = useToday();
  const event = events.find((e) => e.slug === slug);
  if (!event) return <NotFound eventMissing />;
  const related = getRelated(event);
  return (
    <>
      <Seo
        title={
          event.name.length > 45 ? `${event.name.slice(0, 42)}…` : event.name
        }
        description={`${formatDateRange(event.startDate, event.endDate)} in ${event.city}. Event details, official links, calendar download, and creator coverage information.`.slice(
          0,
          155,
        )}
        jsonLd={eventJsonLd(event)}
      />
      <EventHeader event={event} today={today} />
      <Container className="grid items-start gap-10 py-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-10 lg:col-span-8">
          <section>
            <p className="eyebrow">The overview</p>
            <h2 className="mt-3 text-2xl">About this event</h2>
            <p className="mt-5 max-w-prose text-base leading-7 text-ink-700">
              {event.summary}
            </p>
          </section>
          {event.scheduleGlance && (
            <section>
              <h2 className="text-xl">Schedule at a glance</h2>
              <dl className="mt-5 divide-y divide-line rounded-xl border border-line px-5">
                {event.scheduleGlance.map((s) => (
                  <div
                    key={s.day}
                    className="grid gap-1 py-4 sm:grid-cols-[100px_1fr]"
                  >
                    <dt className="text-sm font-semibold text-ink-900">
                      {s.day}
                    </dt>
                    <dd className="text-sm text-ink-500">{s.label}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-ink-500">
                A high-level overview only. Refer to the organizer’s published
                schedule for details.
              </p>
            </section>
          )}
          <EventCoverage event={event} />
          <section>
            <h2 className="mb-5 text-xl">Before you go</h2>
            <Faq
              items={[
                {
                  question: "Is this event in person?",
                  answer: event.inPersonOnly
                    ? "Yes. The organizer states that there is no virtual component."
                    : `This event is listed as ${formatLabels[event.format].toLowerCase()}. Confirm participation options on the official website.`,
                },
                {
                  question: "Where do I register?",
                  answer:
                    "Registration is managed by the event organizer. Use “Visit official website” to check availability and register. This directory does not sell tickets.",
                },
                {
                  question: "Can the dates or location change?",
                  answer:
                    "Yes. Always confirm dates, venue, format, and availability on the official site before making travel or purchase decisions.",
                },
              ]}
            />
          </section>
          <p className="border-t border-line pt-6 text-xs leading-relaxed text-ink-500">
            Details compiled from the organizer’s public information. Always
            confirm dates and availability on the official website.
          </p>
        </div>
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <QuickFacts event={event} />
        </div>
      </Container>
      {related.length > 0 && (
        <section className="section border-t border-line bg-surface">
          <Container>
            <div className="section-heading">
              <h2 className="text-2xl">Keep exploring.</h2>
              <Link to="/events" className="text-link">
                All events
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
