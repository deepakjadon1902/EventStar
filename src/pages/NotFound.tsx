import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import Container from "../components/layout/Container";
import Seo from "../components/ui/Seo";
export default function NotFound({
  eventMissing = false,
}: {
  eventMissing?: boolean;
}) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
    <Container className="py-24 text-center">
      <Seo
        title="Page not found"
        description="This page could not be found. Search the events calendar or return to our home page."
        noindex
      />
      <p className="eyebrow">A small detour · 404</p>
      <h1 className="mt-5">
        {eventMissing
          ? "That event isn’t on the calendar."
          : "You’ve wandered off the map."}
      </h1>
      <p className="mx-auto mt-5 max-w-lg text-ink-500">
        {eventMissing
          ? "The event may have moved, or the link may be incorrect. Let’s find another."
          : "The page you’re looking for may have moved. Your next event is still out there."}
      </p>
      <form
        className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/events?q=${encodeURIComponent(query)}`);
        }}
      >
        <label className="sr-only" htmlFor="not-found-search">
          Search events
        </label>
        <input
          type="search"
          id="not-found-search"
          placeholder="Search the event calendar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button button-primary" type="submit">
          <Search aria-hidden="true" size={18} />
          Search
        </button>
      </form>
      <div className="mt-7 flex justify-center gap-6">
        <Link className="text-link" to="/">
          Go home
        </Link>
        <Link className="text-link" to="/events">
          Browse events
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </Container>
  );
}
