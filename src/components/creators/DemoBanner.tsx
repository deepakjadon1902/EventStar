import { Info } from "lucide-react";
import { isDemoMode } from "../../lib/submit";
export default function DemoBanner() {
  return isDemoMode ? (
    <div className="mb-8 flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm text-ink-700">
      <Info
        size={18}
        className="mt-0.5 shrink-0 text-brand-600"
        aria-hidden="true"
      />
      <p>
        <strong className="font-semibold">Demo mode.</strong> This form is a
        preview. No application or message will be sent, and no personal data is
        saved.
      </p>
    </div>
  ) : null;
}
