import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Globe2,
} from "lucide-react";
import Container from "../layout/Container";
import Globe from "../ui/Globe";
import { getUpcoming, formatDateRange, isHappening } from "../../lib/events";
import { useToday } from "../../hooks/useToday";
export default function Hero() {
  const today = useToday();
  const next = getUpcoming(today).find((e) => e.status !== "cancelled");
  return (
    <section className="hero-grid relative overflow-hidden bg-ink-900 text-white">
      <Container className="relative grid items-center gap-10 pb-12 pt-14 md:pb-16 md:pt-20 lg:grid-cols-12 lg:gap-8">
        <div className="relative z-10 lg:col-span-7">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            <span className="h-px w-8 bg-brand-500" />
            Established 2000 · Independently curated
          </p>
          <h1 className="max-w-[680px] text-4xl leading-[1.15] text-white md:text-[56px] md:leading-[1.1]">
            Tech events, tracked
            <br className="hidden sm:block" /> and covered —<br />
            <span className="text-[#8AAEFF]">since 2000.</span>
          </h1>
          <p className="mt-6 max-w-[510px] text-sm leading-7 text-slate-300 md:text-base">
            We follow the conferences that shape technology across the USA, UK,
            Asia, and beyond — and we invite creators to tell their stories.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/events" className="button button-primary">
              Browse upcoming events
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link to="/creators" className="button button-dark">
              Become a creator
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-7 inline-flex items-center gap-2 text-xs text-slate-400">
            <Globe2 size={14} aria-hidden="true" />A global calendar. An
            independent perspective.
          </p>
        </div>
        <div className="relative flex min-h-[310px] items-center justify-center lg:col-span-5 lg:min-h-[380px]">
          <Globe className="pointer-events-none absolute -right-14 -top-16 w-[460px] max-w-none opacity-75 lg:-right-16 lg:-top-20 lg:w-[560px]" />
          {next && (
            <Link
              to={`/events/${next.slug}`}
              className="relative z-10 mt-5 w-full max-w-[348px] rounded-2xl border border-white/15 bg-[#131F35]/95 p-6 shadow-card backdrop-blur-lg transition-colors hover:border-white/35"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                  Next on the calendar
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 text-xs text-slate-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8AAEFF]" />
                  {isHappening(next, today) ? "Happening now" : "Upcoming"}
                </span>
              </div>
              <h2 className="text-2xl leading-8 text-white">{next.name}</h2>
              <div className="mt-5 space-y-2.5 text-xs text-slate-300">
                <p className="flex items-center gap-2">
                  <CalendarDays size={14} aria-hidden="true" />
                  {formatDateRange(next.startDate, next.endDate)}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={14} aria-hidden="true" />
                  {next.city},{" "}
                  {next.country === "United States" ? "USA" : next.country}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold text-[#A7C1FF]">
                Explore event
                <ArrowUpRight size={17} aria-hidden="true" />
              </div>
            </Link>
          )}
        </div>
      </Container>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-brand-600 via-brand-500/50 to-transparent" />
    </section>
  );
}
