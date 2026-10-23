import { site } from "../../config/site";
import { getUpcoming, getPast } from "../../lib/events";
import { events } from "../../data";
import { useToday } from "../../hooks/useToday";
import Container from "../layout/Container";
export default function StatsStrip() {
  const today = useToday();
  const stats = [
    [String(site.foundedYear), "The year we started"],
    [String(getUpcoming(today).length), "Upcoming events listed"],
    [String(new Set(events.map((e) => e.region)).size), "Regions on our radar"],
    [String(getPast(today).length), "Past events archived"],
  ];
  return (
    <div className="border-b border-line">
      <Container className="grid grid-cols-2 divide-x divide-line py-7 md:grid-cols-4 md:py-8">
        {stats.map(([value, label], i) => (
          <div
            key={label}
            className={`px-4 py-3 text-center sm:px-6 md:py-0 ${i === 2 ? "max-md:border-l-0" : ""}`}
          >
            <span className="font-heading text-2xl font-semibold tracking-tight text-ink-900 md:text-3xl">
              {value}
            </span>
            <p className="mt-2 text-xs text-ink-500">{label}</p>
          </div>
        ))}
      </Container>
    </div>
  );
}
