import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, LayoutGrid, List } from "lucide-react";
import Container from "../components/layout/Container";
import Seo from "../components/ui/Seo";
import EventList from "../components/events/EventList";
import EventCard from "../components/events/EventCard";
import FilterBar from "../components/events/FilterBar";
import EmptyState from "../components/ui/EmptyState";
import {
  filterEvents,
  getUpcoming,
  getPast,
  groupByMonth,
} from "../lib/events";
import { useEventFilters } from "../hooks/useEventFilters";
import { useToday } from "../hooks/useToday";
import { lastVerified } from "../data";
import ExternalLink from "../components/ui/ExternalLink";
export default function Events() {
  const today = useToday();
  const { filters, update, clear, activeCount } = useEventFilters();
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const upcoming = getUpcoming(today),
    past = getPast(today);
  const items = filterEvents(
    filters.view === "past" ? past : upcoming,
    filters,
  );
  return (
    <>
      <Seo
        title="Tech Events"
        description="Find your next technology event. Browse the global calendar by interest, destination, format, and creator opportunities."
      />
      <section className="directory-hero">
        <Container className="directory-hero-inner">
          <div>
            <p className="eyebrow">
              <span className="status-dot" />
              THE WORLD IS GETTING TOGETHER
            </p>
            <h1>
              Tech Events<span className="text-brand-600">.</span>
            </h1>
            <p>
              Find the rooms where ideas become what’s next.
              <br />
              Your independent guide to technology gatherings, worldwide.
            </p>
          </div>
          <div className="directory-photo">
            <img
              src="/images/aws-community.png"
              alt="Technology professionals learning at AWS re:Invent"
              width="800"
              height="450"
            />
            <span>REAL CONNECTIONS. · AWS RE:INVENT, PREVIOUS EDITION</span>
          </div>
        </Container>
      </section>
      <Container>
        <div className="directory-tabs" role="tablist" aria-label="Event dates">
          {[
            { view: "upcoming", label: "Upcoming", count: upcoming.length },
            { view: "past", label: "Past events", count: past.length },
          ].map((tab) => (
            <button
              id={`tab-${tab.view}`}
              role="tab"
              aria-selected={filters.view === tab.view}
              aria-controls="event-results"
              tabIndex={filters.view === tab.view ? 0 : -1}
              key={tab.view}
              onClick={() => update("view", tab.view)}
              onKeyDown={(e) => {
                if (
                  ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                  const view =
                    e.key === "Home"
                      ? "upcoming"
                      : e.key === "End"
                        ? "past"
                        : filters.view === "past"
                          ? "upcoming"
                          : "past";
                  update("view", view);
                  document.getElementById(`tab-${view}`)?.focus();
                }
              }}
            >
              {tab.label}
              <span>{tab.count}</span>
            </button>
          ))}
        </div>
        <FilterBar
          filters={filters}
          update={update}
          clear={clear}
          activeCount={activeCount}
        />
        <div className="results-toolbar">
          <p aria-live="polite" aria-atomic="true">
            Showing{" "}
            <strong className="font-medium text-ink-900">{items.length}</strong>{" "}
            {items.length === 1 ? "event" : "events"}
            {activeCount > 0
              ? " matching your filters"
              : ". Find your kind of gathering."}
          </p>
          <div className="results-controls">
            <span className="results-sort inline-flex items-center gap-1.5">
              <CalendarDays size={13} aria-hidden="true" />
              {filters.view === "past" ? "Most recent first" : "Soonest first"}
            </span>
            <div className="view-toggle" role="group" aria-label="Event layout">
              <button
                onClick={() => setLayout("grid")}
                aria-pressed={layout === "grid"}
                aria-label="Grid view"
              >
                <LayoutGrid size={15} aria-hidden="true" />
              </button>
              <button
                onClick={() => setLayout("list")}
                aria-pressed={layout === "list"}
                aria-label="List view"
              >
                <List size={17} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div
          id="event-results"
          role="tabpanel"
          aria-labelledby={`tab-${filters.view}`}
          tabIndex={0}
        >
          {!items.length ? (
            <EmptyState onClear={clear} />
          ) : layout === "list" ? (
            <EventList events={items} />
          ) : (
            Object.entries(groupByMonth(items)).map(([month, events]) => (
              <section
                key={month}
                className="event-month"
                aria-label={format(parseISO(`${month}-01`), "MMMM yyyy")}
              >
                <div className="event-month-heading">
                  <h2>{format(parseISO(`${month}-01`), "MMMM yyyy")}</h2>
                  <span>
                    {events.length} {events.length === 1 ? "event" : "events"}
                  </span>
                </div>
                <div className="event-card-grid">
                  {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
        <div className="directory-source-note">
          <p>
            Independently curated from organizers’ public information. Last
            verified:{" "}
            <time dateTime={lastVerified}>
              {format(parseISO(lastVerified), "MMM d, yyyy")}
            </time>
            . Confirm the latest dates and availability with the organizer.
            Photography may show previous editions; regional city views are
            labelled.
          </p>
          <div className="mt-2 flex flex-wrap gap-x-6">
            <ExternalLink
              className="text-link text-xs"
              href="https://www.techmeme.com/events"
            >
              Source calendar
            </ExternalLink>
            <Link to="/contact?topic=event" className="text-link text-xs">
              Add your event to the conversation{" "}
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
