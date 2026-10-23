import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import Container from "../components/layout/Container";
import Seo from "../components/ui/Seo";
import EventList from "../components/events/EventList";
import FilterBar from "../components/events/FilterBar";
import EmptyState from "../components/ui/EmptyState";
import { filterEvents, getUpcoming, getPast } from "../lib/events";
import { useEventFilters } from "../hooks/useEventFilters";
import { useToday } from "../hooks/useToday";
import { lastVerified } from "../data";
import ExternalLink from "../components/ui/ExternalLink";
export default function Events() {
  const today = useToday();
  const { filters, update, clear, activeCount } = useEventFilters();
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
        description="Browse upcoming and past technology events. Filter by region, category, format, and creator opportunities to find the right event for you."
      />
      <div className="page-heading">
        <Container>
          <p className="eyebrow">Your global technology calendar</p>
          <h1 className="mt-4">
            Tech Events<span className="text-brand-600">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-ink-500">
            Find the gatherings that move technology forward.
            <br className="hidden sm:block" />
            One independent calendar, from the USA to the world.
          </p>
        </Container>
      </div>
      <Container>
        <div
          className="mt-7 flex gap-8"
          role="tablist"
          aria-label="Event dates"
        >
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
              onClick={() => update("view", tab.view)}
              className={`flex min-h-14 items-center gap-2 border-b-2 text-sm font-semibold ${filters.view === tab.view ? "border-brand-600 text-brand-600" : "border-transparent text-ink-500 hover:text-ink-900"}`}
            >
              {tab.label}
              <span
                className={`rounded-md px-2 py-0.5 text-xs ${filters.view === tab.view ? "bg-brand-50" : "bg-surface"}`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
        <FilterBar
          filters={filters}
          update={update}
          clear={clear}
          activeCount={activeCount}
        />
        <div className="flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-ink-500">
          <p aria-live="polite" aria-atomic="true">
            Showing{" "}
            <strong className="font-semibold text-ink-700">
              {items.length}
            </strong>{" "}
            {items.length === 1 ? "event" : "events"}
            {activeCount > 0 ? " matching your filters" : ""}
          </p>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={13} aria-hidden="true" />
            {filters.view === "past" ? "Most recent first" : "Soonest first"}
          </span>
        </div>
        <div
          id="event-results"
          role="tabpanel"
          aria-labelledby={`tab-${filters.view}`}
          tabIndex={0}
        >
          {items.length ? (
            <EventList events={items} />
          ) : (
            <EmptyState onClear={clear} />
          )}
        </div>
        <div className="mb-16 mt-8 rounded-xl border border-line bg-surface p-5">
          <p className="text-xs leading-relaxed text-ink-500">
            Event data compiled from organizers’ public information and industry
            calendars. Last verified:{" "}
            <time dateTime={lastVerified}>
              {format(parseISO(lastVerified), "MMM d, yyyy")}
            </time>
            . Dates and availability may change.
          </p>
          <div className="mt-2 flex flex-wrap gap-x-6">
            <ExternalLink
              className="text-link text-xs"
              href="https://www.techmeme.com/events"
            >
              Source calendar
            </ExternalLink>
            <Link to="/contact?topic=event" className="text-link text-xs">
              Organizer? Submit your event for review
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
