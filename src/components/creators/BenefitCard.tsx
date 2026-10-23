import type { LucideIcon } from "lucide-react";
export default function BenefitCard({
  title,
  text,
  Icon,
}: {
  title: string;
  text: string;
  Icon: LucideIcon;
}) {
  return (
    <article className="panel p-7">
      <span className="mb-6 inline-flex rounded-xl bg-brand-50 p-3 text-brand-600">
        <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h3>{title}</h3>
      <p className="mt-4 text-sm text-ink-500">{text}</p>
    </article>
  );
}
