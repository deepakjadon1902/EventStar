import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  BookOpen,
  ExternalLink,
  CircleHelp,
} from "lucide-react";
import Container from "../layout/Container";
const resources = [
  { label: "Upcoming events", to: "/events", Icon: CalendarDays },
  { label: "Official event websites", to: "/events", Icon: ExternalLink },
  { label: "Creator guidelines", to: "/legal/creator-terms", Icon: BookOpen },
  { label: "Program FAQ", to: "#creator-faq", Icon: CircleHelp },
];
export default function CreatorResources() {
  return (
    <section className="section">
      <Container>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Start with the right tools</p>
            <h2 className="mt-4 text-2xl">Your creator resources.</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {resources.map(({ label, to, Icon }) => (
            <Link
              key={label}
              to={to}
              onClick={
                to.startsWith("#")
                  ? () =>
                      document.getElementById("creator-faq")?.scrollIntoView()
                  : undefined
              }
              className="panel group flex min-h-36 flex-col justify-between p-5 hover:border-brand-100"
            >
              <Icon className="text-brand-600" size={22} aria-hidden="true" />
              <span className="mt-5 flex items-start justify-between gap-2 text-sm font-semibold text-ink-900">
                {label}
                <ArrowUpRight
                  className="shrink-0"
                  size={16}
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
