import type { UseFormReturn } from "react-hook-form";
import type { ApplicationValues } from "../../lib/validation";
import { creatorTypes } from "../../lib/validation";
import FormField from "../ui/FormField";
export default function PortfolioFields({
  form,
}: {
  form: UseFormReturn<ApplicationValues>;
}) {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <section className="border-t border-line pt-8">
      <h2 className="mb-6 text-xl">02. Your work</h2>
      <fieldset>
        <legend className="field-label">
          What do you create?{" "}
          <span className="font-normal text-ink-500">
            Choose all that apply.
          </span>
        </legend>
        <div className="grid grid-cols-2 gap-x-4 sm:grid-cols-3">
          {creatorTypes.map((type) => (
            <label
              key={type}
              className="flex min-h-12 cursor-pointer items-center gap-2.5 text-sm"
            >
              <input
                type="checkbox"
                value={type}
                {...register("creatorTypes")}
                aria-describedby="types-error"
              />
              {type}
            </label>
          ))}
        </div>
        <p id="types-error" className="field-error" aria-live="polite">
          {errors.creatorTypes?.message}
        </p>
      </fieldset>
      <div className="mt-6">
        <FormField
          id="portfolio"
          label="Channel or portfolio URL"
          error={errors.portfolio?.message}
          hint="A public link to your original work. Start with https://."
        >
          <input
            id="portfolio"
            type="url"
            autoComplete="url"
            placeholder="https://your-channel.com"
            {...register("portfolio")}
            aria-invalid={!!errors.portfolio}
            aria-describedby="portfolio-feedback"
          />
        </FormField>
      </div>
      <details className="mt-5 rounded-xl border border-line p-4">
        <summary className="text-sm font-medium">
          Add more links{" "}
          <span className="font-normal text-ink-500">(optional, up to 3)</span>
        </summary>
        <div className="mt-5 space-y-4">
          {[0, 1, 2].map((i) => (
            <FormField
              key={i}
              id={`additional-${i}`}
              label={`Additional link ${i + 1}`}
              error={errors.additionalLinks?.[i]?.message}
            >
              <input
                id={`additional-${i}`}
                type="url"
                placeholder="https://"
                {...register(`additionalLinks.${i}`)}
                aria-describedby={`additional-${i}-feedback`}
              />
            </FormField>
          ))}
        </div>
      </details>
    </section>
  );
}
