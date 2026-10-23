import { ArrowUpRight, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getUpcoming } from "../../lib/events";
import { regionLabels } from "../../data/labels";
import { useToday } from "../../hooks/useToday";
import Container from "../layout/Container";
export default function RegionTiles() {
  const upcoming = getUpcoming(useToday());
  return (
    <section className="section border-y border-line bg-surface">
      <Container>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Technology has no borders</p>
            <h2>Follow your corner of the world.</h2>
          </div>
          <p className="max-w-xs text-sm text-ink-500">
            From San Francisco to Singapore, find the conversations happening
            near you.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Object.entries(regionLabels)
            .slice(0, 5)
            .map(([id, label]) => (
              <Link
                to={`/events?region=${id}`}
                key={id}
                className="panel group flex min-h-40 flex-col p-5 transition-colors hover:border-brand-100"
              >
                <div className="mb-6 flex justify-between">
                  <Globe2
                    size={26}
                    strokeWidth={1}
                    className="text-brand-600"
                    aria-hidden="true"
                  />
                  <ArrowUpRight
                    className="text-ink-500 group-hover:text-brand-600"
                    size={16}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-sans text-sm">{label}</h3>
                <p className="mt-2 text-xs text-ink-500">
                  {upcoming.filter((e) => e.region === id).length} upcoming
                  events
                </p>
              </Link>
            ))}
        </div>
      </Container>
    </section>
  );
}
