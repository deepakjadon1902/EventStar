import { CalendarDays, PenLine, Building2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../layout/Container";
const audiences = [
  {
    name: "Find your next event",
    label: "For event-goers",
    description: "See what’s next in technology.",
    to: "/events",
    Icon: CalendarDays,
  },
  {
    name: "Tell the story",
    label: "For creators",
    description: "Apply to cover the events that matter.",
    to: "/creators",
    Icon: PenLine,
  },
  {
    name: "Put your event on the map",
    label: "For organizers",
    description: "Submit an event for our review.",
    to: "/contact?topic=event",
    Icon: Building2,
  },
];
export default function AudienceRow() {
  return (
    <Container className="grid gap-5 py-8 md:grid-cols-3">
      {audiences.map(({ name, label, description, to, Icon }) => (
        <Link
          key={to}
          to={to}
          className="group flex gap-4 rounded-xl border border-transparent p-4 transition-colors hover:border-line hover:bg-surface"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Icon size={20} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-ink-500">
              {label}
            </p>
            <h2 className="flex items-center gap-2 font-sans text-sm font-semibold tracking-normal">
              {name}
              <ArrowUpRight
                className="shrink-0 text-ink-500 group-hover:text-brand-600"
                size={14}
                aria-hidden="true"
              />
            </h2>
            <p className="mt-1 text-xs text-ink-500">{description}</p>
          </div>
        </Link>
      ))}
    </Container>
  );
}
