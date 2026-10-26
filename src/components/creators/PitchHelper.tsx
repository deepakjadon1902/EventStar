import { useState } from "react";
import { Copy, Check } from "lucide-react";
const template =
  "Subject: Coverage proposal — [event name]\n\nHi [editor],\n\nI’d like to cover [event name] in [city] on [dates] for [publication]. My proposed angle is [specific question or story], with a focus on what it means for [audience].\n\nI plan to produce [format and deliverables] by [deadline]. You can see examples of my work at [portfolio URL]. Access would be subject to the organizer’s approval.\n\nWould this fit your upcoming coverage? I’m happy to discuss the angle and editorial requirements.\n\nBest,\n[name]";
export default function PitchHelper() {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(template);
      setStatus("Copied to clipboard.");
    } catch {
      setStatus("Select the template text to copy it.");
    }
  }
  return (
    <div className="panel p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3>Pitch to an editor</h3>
        <button className="text-link text-xs" onClick={copy}>
          {status === "Copied to clipboard." ? (
            <Check size={14} aria-hidden="true" />
          ) : (
            <Copy size={14} aria-hidden="true" />
          )}
          Copy template
        </button>
      </div>
      <p className="mb-4 text-xs text-ink-500">
        A starting point for proposing coverage to a publication. Make it your
        own.
      </p>
      <label htmlFor="pitch-template" className="sr-only">
        Editor pitch email template
      </label>
      <textarea
        id="pitch-template"
        readOnly
        value={template}
        rows={9}
        className="bg-surface text-sm leading-7"
      />
      <p className="form-hint" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
