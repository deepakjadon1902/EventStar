import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Plus,
  MoveUpRight,
} from "lucide-react";
import Hero from "../components/home/Hero";
import EventSearch from "../components/home/EventSearch";
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
const topics = [
  { id: "", label: "All interests" },
  { id: "ai", label: "AI & machine learning" },
  { id: "developer", label: "Developer" },
  { id: "cloud", label: "Cloud & infrastructure" },
  { id: "startup", label: "Startups" },
  { id: "fintech", label: "Fintech" },
];
const questions = [
  {
    question: "Do you organize the listed events?",
    answer:
      "We’re an independent event directory and creator program. Each event is run by its own organizer. We link you to their official website for registration and the latest details.",
  },
  {
    question: "How do you choose the events you list?",
    answer:
      "We follow technology conferences through organizers’ public information and industry calendars. You’ll find official links and verification dates on every listing.",
  },
  {
    question: "Can I apply if I have a small audience?",
    answer:
      "Absolutely. Original work and a thoughtful perspective matter more than follower count. An active public channel or portfolio is enough to apply.",
  },
];
export default function Home() {
  const today = useToday();
  const upcoming = getUpcoming(today);
  const [topic, setTopic] = useState("");
  const active = upcoming.filter((e) => e.status !== "cancelled");
  const preferred = [
    "github-universe-2026",
    "web-summit-lisbon-2026",
    "aws-reinvent-2026",
  ];
  const ordered = [...active].sort((a, b) => {
    const ai = preferred.indexOf(a.slug),
      bi = preferred.indexOf(b.slug);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
  });
  const featured = ordered
    .filter((e) => !topic || e.categories.some((c) => c === topic))
    .slice(0, 3);
  return (
    <>
      <Seo
        title="Tech events, tracked since 2000"
        description="Find your next technology conference. Independently curated global events, real connections, and opportunities for creators."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          url: site.url,
          foundingDate: "2000",
        }}
      />
      <Hero />
      <EventSearch />
      <Container>
        <div className="radar-strip">
          <span>BIG IDEAS. FAMILIAR NAMES.</span>
          <div className="radar-brands">
            <span className="brand-github">
              GitHub<span className="brand-light"> Universe</span>
            </span>
            <span className="brand-websummit">
              web summit<span className="summit-triangle">▲</span>
            </span>
            <span className="brand-aws">
              aws <span className="brand-light">re:Invent</span>
            </span>
            <span className="brand-microsoft">
              <i aria-hidden="true">▦</i> Microsoft
            </span>
            <span className="brand-oracle">ORACLE</span>
          </div>
        </div>
      </Container>
      <section className="section featured-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">WORTH BEING THERE</p>
              <h2>
                The events on our radar<span className="text-brand-600">.</span>
              </h2>
            </div>
            <Link className="text-link" to="/events">
              Explore all events <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div
            className="topic-tabs"
            role="group"
            aria-label="Featured event interests"
          >
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setTopic(t.id)}
                aria-pressed={topic === t.id}
                className={`topic-tab ${topic === t.id ? "selected" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div
            className="event-card-grid"
            role="region"
            aria-label="Featured events"
            aria-live="polite"
          >
            {featured.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
          {featured.length === 0 && (
            <div className="empty-featured">
              <p>No upcoming events for this interest yet.</p>
              <button className="text-link" onClick={() => setTopic("")}>
                Explore all interests <ArrowRight size={16} />
              </button>
            </div>
          )}
          <p className="photo-disclosure">
            Real events, real moments. Conference photos show previous editions;
            city views illustrate the region.
          </p>
        </Container>
      </section>
      <section className="section calendar-section">
        <Container className="calendar-layout">
          <div>
            <p className="eyebrow">MAKE ROOM IN YOUR CALENDAR</p>
            <h2>
              Next up.
              <br />
              Be in the know.
            </h2>
            <p className="section-intro">
              The next gatherings, launches, and conversations to have on your
              calendar.
            </p>
            <Link to="/events" className="text-link">
              The full calendar <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <div className="calendar-note">
              <Globe2 size={20} aria-hidden="true" />
              <p>
                <strong>{active.length} upcoming events.</strong>
                <br />
                One independent, global view.
              </p>
            </div>
          </div>
          <div className="home-event-list">
            <EventList events={active.slice(0, 5)} grouped={false} />
            <Link className="calendar-submit" to="/contact?topic=event">
              <Plus size={15} aria-hidden="true" /> An event we should know
              about?{" "}
              <span>
                Tell us <MoveUpRight size={14} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Container>
      </section>
      <RegionTiles />
      <CreatorBand />
      <section className="section archive-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">IN CASE YOU MISSED IT</p>
              <h2>Good ideas leave a trail.</h2>
            </div>
            <Link to="/events?view=past" className="text-link">
              Into the archive <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="event-card-grid">
            {getPast(today)
              .slice(0, 3)
              .map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
          </div>
        </Container>
      </section>
      <section className="section faq-section">
        <Container className="faq-layout">
          <div>
            <p className="eyebrow">A LITTLE CLARITY</p>
            <h2>Before you go.</h2>
            <p className="section-intro">
              A few things to know about the calendar and the people behind it.
            </p>
            <Link to="/about" className="text-link">
              Get to know NorthStar <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <Faq items={questions} />
        </Container>
      </section>
    </>
  );
}
