import type { ReactNode } from "react";
export default function FormField({
  id,
  label,
  error,
  hint,
  optional = false,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-ink-500">(optional)</span>
        )}
      </label>
      {children}
      <p
        id={`${id}-feedback`}
        className={error ? "field-error" : "form-hint"}
        aria-live="polite"
      >
        {error || hint}
      </p>
    </div>
  );
}
