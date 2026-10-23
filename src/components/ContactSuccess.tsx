import { Check } from "lucide-react";
export default function ContactSuccess({ mode }: { mode: "demo" | "sent" }) {
  return (
    <div className="panel p-8" role="status">
      <Check size={28} className="mb-5 text-brand-600" aria-hidden="true" />
      <h2 className="text-2xl">
        {mode === "demo"
          ? "Demo message complete."
          : "Thanks for getting in touch."}
      </h2>
      <p className="mt-4 text-sm text-ink-500">
        {mode === "demo"
          ? "This was a preview. No message was sent or saved."
          : "Your message has been sent. We aim to reply within 3 business days."}
      </p>
    </div>
  );
}
