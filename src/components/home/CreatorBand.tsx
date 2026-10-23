import { Link } from "react-router-dom";
import { ArrowUpRight, Check, PenLine } from "lucide-react";
import Container from "../layout/Container";
export default function CreatorBand() {
  return (
    <section className="section">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-brand-100 bg-brand-50 p-7 md:p-12">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="relative z-10 lg:col-span-7">
              <p className="eyebrow">Your perspective belongs here</p>
              <h2 className="mt-4 max-w-lg">
                Cover the events
                <br className="hidden md:block" /> that matter.
              </h2>
              <p className="mt-5 max-w-lg text-sm text-ink-500">
                Writers, video creators, podcasters, and photographers: bring
                your curiosity. We’ll help you take the next step.
              </p>
              <Link to="/creators/apply" className="button button-primary mt-7">
                Apply to cover an event
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="relative z-10 flex flex-col justify-center gap-5 lg:col-span-5">
              {[
                "Support requesting event access",
                "A curated calendar and event briefings",
                "Opportunities to share your work",
              ].map((text) => (
                <p
                  key={text}
                  className="flex items-start gap-3 text-sm font-medium text-ink-700"
                >
                  <span className="rounded-full border border-brand-100 bg-white p-1 text-brand-600">
                    <Check size={13} aria-hidden="true" />
                  </span>
                  {text}
                </p>
              ))}
              <p className="pl-8 text-xs leading-relaxed text-ink-500">
                No follower-count gate. Access is always the organizer’s
                decision.
              </p>
            </div>
          </div>
          <PenLine
            className="pointer-events-none absolute -bottom-12 -right-10 text-brand-100/50"
            strokeWidth={0.5}
            size={260}
            aria-hidden="true"
          />
        </div>
      </Container>
    </section>
  );
}
