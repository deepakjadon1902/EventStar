import type { ReactNode } from "react";
const variants = {
  neutral: "bg-surface text-ink-500",
  blue: "bg-brand-50 text-brand-700",
  success: "bg-white text-success ring-1 ring-inset ring-success/25",
  warning: "bg-white text-warning ring-1 ring-inset ring-warning/25",
  danger: "bg-danger/10 text-danger",
};
export default function Badge({
  children,
  variant = "neutral",
}: {
  children: ReactNode;
  variant?: keyof typeof variants;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold leading-4 ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
