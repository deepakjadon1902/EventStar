import type { UseFormReturn } from "react-hook-form";
import { Link } from "react-router-dom";
import type { ApplicationValues } from "../../lib/validation";
export default function ConsentFields({
  form,
}: {
  form: UseFormReturn<ApplicationValues>;
}) {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <div className="space-y-3 border-t border-line pt-6">
      <label className="flex min-h-11 cursor-pointer items-start gap-3 py-2 text-sm">
        <input
          type="checkbox"
          className="mt-0.5"
          {...register("disclose")}
          aria-describedby="disclose-error"
        />
        <span>
          I will clearly disclose sponsorships, gifts, and compensation in my
          coverage.
        </span>
      </label>
      <p id="disclose-error" className="field-error" aria-live="polite">
        {errors.disclose?.message}
      </p>
      <label className="flex min-h-11 cursor-pointer items-start gap-3 py-2 text-sm">
        <input
          type="checkbox"
          className="mt-0.5"
          {...register("consent")}
          aria-describedby="consent-error"
        />
        <span>
          I agree to the{" "}
          <Link
            to="/legal/creator-terms"
            className="text-brand-600 underline underline-offset-2"
          >
            Creator Terms
          </Link>{" "}
          and{" "}
          <Link
            to="/legal/privacy"
            className="text-brand-600 underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      <p id="consent-error" className="field-error" aria-live="polite">
        {errors.consent?.message}
      </p>
      <div hidden aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>
    </div>
  );
}
