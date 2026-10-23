import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { events } from "../../data";
import type { ApplicationValues } from "../../lib/validation";
export default function ApplicationSuccess({
  values,
  demo,
}: {
  values: ApplicationValues;
  demo: boolean;
}) {
  return (
    <div role="status" className="panel p-7 md:p-10">
      <span className="mb-6 inline-flex rounded-full bg-brand-50 p-4 text-brand-600">
        <Check size={28} aria-hidden="true" />
      </span>
      <h2 className="text-2xl">
        {demo
          ? "Your demo application is complete."
          : "Your application is on its way."}
      </h2>
      <p className="mt-4 text-sm text-ink-500">
        {demo
          ? "This was a preview. Nothing was sent or saved. Connect a form endpoint to accept real applications."
          : "Thanks for sharing your work. We review applications within 7 business days and will email you with next steps."}
      </p>
      <dl className="mt-6 space-y-4 rounded-xl bg-surface p-5 text-sm">
        <div>
          <dt className="text-xs text-ink-500">Creator</dt>
          <dd className="mt-1 font-medium">
            {values.name} · {values.email}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-ink-500">Selected events</dt>
          <dd className="mt-1">
            {events
              .filter((e) => values.events.includes(e.slug))
              .map((e) => e.name)
              .join(", ")}
          </dd>
        </div>
      </dl>
      <p className="mt-5 text-xs text-ink-500">
        We cannot guarantee press access — organizers decide.
      </p>
      <Link className="button button-primary mt-7" to="/events">
        Browse more events
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}
