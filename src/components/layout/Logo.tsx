import { Link } from "react-router-dom";
import { site } from "../../config/site";
export default function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      to="/"
      aria-label={`${site.name} home`}
      className="inline-flex shrink-0 items-center gap-3 rounded-md"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 32 32">
          <path
            d="m16 1 3.4 11.6L31 16l-11.6 3.4L16 31l-3.4-11.6L1 16l11.6-3.4Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span>
        <span
          className={`block font-heading text-xl font-bold tracking-tight ${inverse ? "text-white" : "text-ink-900"}`}
        >
          {site.shortName}
          <span className="text-brand-500">.</span>
        </span>
        <span
          className={`block text-[10px] font-semibold uppercase tracking-[0.2em] ${inverse ? "text-slate-400" : "text-ink-500"}`}
        >
          Tech Events
        </span>
      </span>
    </Link>
  );
}
