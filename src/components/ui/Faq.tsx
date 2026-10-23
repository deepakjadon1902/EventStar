import { Plus } from "lucide-react";
export default function Faq({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div>
      {items.map((item) => (
        <details key={item.question} className="faq-item">
          <summary>
            {item.question}
            <Plus size={18} aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
