import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { ApplicationValues } from "../../lib/validation";
import { getUpcoming, formatDateRange } from "../../lib/events";
import { useToday } from "../../hooks/useToday";
import FormField from "../ui/FormField";
export default function EventFields({
  form,
}: {
  form: UseFormReturn<ApplicationValues>;
}) {
  const [search, setSearch] = useState("");
  const {
    register,
    watch,
    formState: { errors },
  } = form;
  const available = getUpcoming(useToday()).filter(
    (e) => e.status !== "cancelled" && e.creatorAccess !== "closed",
  );
  const why = watch("why") || "";
  return (
    <section className="border-t border-line pt-8">
      <h2 className="mb-6 text-xl">03. Your next story</h2>
      <fieldset>
        <legend className="field-label">Events you’d like to cover</legend>
        <label htmlFor="application-event-search" className="sr-only">
          Find an event to cover
        </label>
        <input
          id="application-event-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find an event or city…"
        />
        <div className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-line px-4">
          {available
            .filter((e) =>
              `${e.name} ${e.city}`
                .toLowerCase()
                .includes(search.toLowerCase()),
            )
            .map((event) => (
              <label
                key={event.id}
                className="flex cursor-pointer items-center gap-3 border-b border-line py-3 last:border-0"
              >
                <input
                  type="checkbox"
                  value={event.slug}
                  {...register("events")}
                  aria-describedby="events-error"
                />
                <span>
                  <span className="block text-sm font-medium text-ink-900">
                    {event.name}
                  </span>
                  <span className="mt-1 block text-xs text-ink-500">
                    {formatDateRange(event.startDate, event.endDate)} ·{" "}
                    {event.city}
                  </span>
                </span>
              </label>
            ))}
          {!available.some((e) =>
            `${e.name} ${e.city}`.toLowerCase().includes(search.toLowerCase()),
          ) && (
            <p className="py-5 text-sm text-ink-500">
              No matching events. Try another search.
            </p>
          )}
        </div>
        <p id="events-error" className="field-error" aria-live="polite">
          {errors.events?.message}
        </p>
        <p className="form-hint">
          Selected {watch("events").length}{" "}
          {watch("events").length === 1 ? "event" : "events"}. Organizers make
          all accreditation decisions.
        </p>
      </fieldset>
      <div className="mt-6">
        <FormField
          id="why"
          label="Why would you like to cover these events?"
          error={errors.why?.message}
          hint="Tell us about your perspective, audience, and the story you want to tell."
        >
          <textarea
            id="why"
            rows={5}
            maxLength={800}
            {...register("why")}
            aria-invalid={!!errors.why}
            aria-describedby="why-feedback why-count"
          />
        </FormField>
        <p id="why-count" className="mt-2 text-right text-xs text-ink-500">
          {why.length}/800 characters · minimum 50
        </p>
      </div>
    </section>
  );
}
