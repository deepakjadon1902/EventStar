import type { UseFormReturn } from "react-hook-form";
import type { ApplicationValues } from "../../lib/validation";
import { countries } from "../../data/countries";
import FormField from "../ui/FormField";
export default function IdentityFields({
  form,
}: {
  form: UseFormReturn<ApplicationValues>;
}) {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <section>
      <h2 className="mb-6 text-xl">01. A little about you</h2>
      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <FormField
          id="email"
          label="Email address"
          error={errors.email?.message}
        >
          <input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby="email-feedback"
          />
        </FormField>
        <FormField id="name" label="Full name" error={errors.name?.message}>
          <input
            id="name"
            autoComplete="name"
            placeholder="Your full name"
            {...register("name")}
            aria-invalid={!!errors.name}
            aria-describedby="name-feedback"
          />
        </FormField>
        <FormField id="country" label="Country" error={errors.country?.message}>
          <select
            id="country"
            autoComplete="country"
            {...register("country")}
            aria-invalid={!!errors.country}
            aria-describedby="country-feedback"
          >
            <option value="">Choose your country</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField
          id="audienceSize"
          label="Approximate audience size"
          optional
          hint="No follower-count gate."
        >
          <select id="audienceSize" {...register("audienceSize")}>
            <option value="">Prefer not to say</option>
            {[
              "Under 1,000",
              "1,000–5,000",
              "5,001–25,000",
              "25,001–100,000",
              "100,000+",
            ].map((range) => (
              <option key={range}>{range}</option>
            ))}
          </select>
        </FormField>
      </div>
    </section>
  );
}
