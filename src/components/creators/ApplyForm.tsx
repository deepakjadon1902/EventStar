import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { applicationSchema } from "../../lib/validation";
import type { ApplicationValues } from "../../lib/validation";
import { submitApplication } from "../../lib/submit";
import { events } from "../../data";
import { isUpcoming } from "../../lib/events";
import DemoBanner from "./DemoBanner";
import IdentityFields from "./IdentityFields";
import PortfolioFields from "./PortfolioFields";
import EventFields from "./EventFields";
import ConsentFields from "./ConsentFields";
import ApplicationSuccess from "./ApplicationSuccess";
export default function ApplyForm() {
  const [params] = useSearchParams();
  const initialEvent = events.find(
    (e) =>
      e.slug === params.get("event") &&
      isUpcoming(e) &&
      e.status !== "cancelled" &&
      e.creatorAccess !== "closed",
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{
    values: ApplicationValues;
    demo: boolean;
  } | null>(null);
  const form = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: params.get("email") || "",
      country: "",
      creatorTypes: [],
      portfolio: "",
      additionalLinks: ["", "", ""],
      audienceSize: "",
      events: initialEvent ? [initialEvent.slug] : [],
      why: "",
      disclose: false,
      consent: false,
      website: "",
    },
    shouldFocusError: true,
  });
  async function submit(values: ApplicationValues) {
    setError("");
    try {
      const result = await submitApplication({
        ...values,
        additionalLinks: values.additionalLinks.filter(Boolean),
        kind: "creator-application",
      });
      setSuccess({ values, demo: result.mode === "demo" });
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn’t send your application. Please try again.",
      );
    }
  }
  if (success) return <ApplicationSuccess {...success} />;
  return (
    <>
      <DemoBanner />
      <form
        onSubmit={form.handleSubmit(submit)}
        noValidate
        className="panel space-y-8 p-6 md:p-10"
      >
        <IdentityFields form={form} />
        <PortfolioFields form={form} />
        <EventFields form={form} />
        <ConsentFields form={form} />
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-danger/20 bg-surface p-4 text-sm text-danger"
          >
            {error}
          </div>
        )}
        <div className="flex flex-wrap items-start justify-between gap-5 border-t border-line pt-6">
          <p className="max-w-sm text-xs leading-relaxed text-ink-500">
            We review applications within 7 business days. We cannot guarantee
            press access — organizers decide.
          </p>
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="button button-primary"
          >
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle
                  className="animate-spin"
                  size={17}
                  aria-hidden="true"
                />
                Sending…
              </>
            ) : (
              <>
                {error ? "Try again" : "Submit application"}
                <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
