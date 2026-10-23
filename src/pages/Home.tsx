import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../components/home/Hero";
import StatsStrip from "../components/home/StatsStrip";
import AudienceRow from "../components/home/AudienceRow";
import RegionTiles from "../components/home/RegionTiles";
import CreatorBand from "../components/home/CreatorBand";
import Container from "../components/layout/Container";
import EventList from "../components/events/EventList";
import EventCard from "../components/events/EventCard";
import Faq from "../components/ui/Faq";
import Seo from "../components/ui/Seo";
import { getUpcoming, getPast } from "../lib/events";
import { useToday } from "../hooks/useToday";
import { site } from "../config/site";
const questions = [
  {
    question: "Do you organize the listed events?",
    answer:
      "We are an independent events directory and creator program. Listed events are run by their respective organizers. We do not sell tickets or issue press credentials.",
  },
  {
    question: "How do you choose the events you list?",
    answer:
      "We track technology events using organizers’ public information and industry calendars. Each listing links to the official website, where you should confirm dates and registration details.",
  },
  {
    question: "Can I apply if I have a small audience?",
    answer:
      "Yes. An active public channel or portfolio is what matters. There is no follower-count gate. We look for original work, clear reporting, and professional conduct.",
  },
];
export default function Home() {
  const today = useToday();
  const upcoming = getUpcoming(today);
  const past = getPast(today);
  return (
    <>
      <Seo
        title="Tech events, tracked since 2000"
        description="An independent guide to technology events across the USA and worldwide. Explore upcoming conferences and apply to cover them as a creator."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          url: site.url,
          foundingDate: "2000",
        }}
      />
      <Hero />
      <StatsStrip />
      <AudienceRow />
      <section className="section pt-8 md:pt-12">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">On the calendar</p>
              <h2>Coming up next.</h2>
              <p className="mt-3 text-sm text-ink-500">
                The next conversations, connections, and ideas to follow.
              </p>
            </div>
            <Link className="text-link" to="/events">
              View all upcoming
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="border-t border-line">
            <EventList events={upcoming.slice(0, 6)} grouped={false} />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-xs text-ink-500">
            <span>
              Independently curated. Always confirm details with the organizer.
            </span>
            <Link className="text-link text-xs" to="/contact?topic=event">
              Something missing? Submit an event
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
      <RegionTiles />
      <CreatorBand />
      <section className="section border-y border-line bg-surface">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">The archive</p>
              <h2>A record of what came before.</h2>
            </div>
            <Link className="text-link" to="/events?view=past">
              Browse the archive
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {past.slice(0, 4).map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </Container>
      </section>
      <section className="section">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">A few useful answers</p>
            <h2 className="mt-4">Good to know.</h2>
            <p className="mt-4 max-w-xs text-sm text-ink-500">
              A little clarity before you find your next event or share your
              next story.
            </p>
            <Link to="/events" className="text-link mt-5">
              Explore the calendar
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <Faq items={questions} />
          </div>
        </Container>
      </section>
    </>
  );
}
