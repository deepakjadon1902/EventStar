const steps = [
  [
    "Choose an event",
    "Find a gathering that fits your beat and your audience.",
  ],
  ["Share your work", "Send your portfolio and a short coverage proposal."],
  ["We review", "We aim to review applications within 7 business days."],
  ["Plan your coverage", "Receive a confirmation and next steps if selected."],
];
export default function StepList() {
  return (
    <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map(([title, text], i) => (
        <li key={title} className="relative">
          <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-sm font-semibold text-brand-600">
            0{i + 1}
          </span>
          <h3 className="font-sans text-base">{title}</h3>
          <p className="mt-3 text-sm text-ink-500">{text}</p>
        </li>
      ))}
    </ol>
  );
}
