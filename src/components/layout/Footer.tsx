import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";
import { site } from "../../config/site";
import { regionLabels } from "../../data/labels";
const legal = [
  ["Terms of use", "terms"],
  ["Privacy policy", "privacy"],
  ["Disclaimer & trademarks", "disclaimer"],
  ["Creator terms", "creator-terms"],
  ["Accessibility", "accessibility"],
  ["Creator code of conduct", "conduct"],
  ["Cookie policy", "cookies"],
];
export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm text-ink-500">
              A clearer view of the technology events shaping our world.
              Independent, curious, and connected.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-700">
              Established {site.foundedYear}
            </p>
          </div>
          <div className="lg:col-span-2">
            <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-wider">
              Explore
            </h2>
            <div className="flex flex-col items-start text-sm text-ink-500">
              {[
                ["Upcoming events", "/events"],
                ["The archive", "/events?view=past"],
                ["Creator program", "/creators"],
                ["About us", "/about"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <Link
                  className="flex min-h-11 items-center hover:text-brand-600"
                  key={to}
                  to={to}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-wider">
              Explore by region
            </h2>
            <div className="flex flex-col items-start text-sm text-ink-500">
              {Object.entries(regionLabels)
                .slice(0, 5)
                .map(([region, label]) => (
                  <Link
                    className="flex min-h-11 items-center hover:text-brand-600"
                    key={region}
                    to={`/events?region=${region}`}
                  >
                    {label}
                  </Link>
                ))}
              <Link to="/contact?topic=event" className="text-link mt-2">
                Submit an event
                <ArrowUpRight aria-hidden="true" size={14} />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-wider">
              Legal
            </h2>
            <div className="flex flex-col items-start text-sm text-ink-500">
              {legal.map(([label, slug]) => (
                <Link
                  className="flex min-h-11 items-center hover:text-brand-600"
                  key={slug}
                  to={`/legal/${slug}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-line py-6 text-xs leading-relaxed text-ink-500">
          <p>
            © {new Date().getFullYear()} {site.legalCompanyName}. Established{" "}
            {site.foundedYear}. All event names, logos, and trademarks are the
            property of their respective owners and are used for identification
            only. We are not affiliated with, endorsed by, or sponsored by the
            organizers of the events listed unless explicitly stated.
          </p>
          <div className="mt-4 flex flex-wrap justify-between gap-3">
            <span>Made for people who follow technology.</span>
            <Link
              className="inline-flex min-h-11 items-center gap-2 hover:text-brand-600"
              to="/legal/cookies"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ink-500" />
              No tracking. No non-essential cookies.
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
