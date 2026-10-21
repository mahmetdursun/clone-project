interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  bullets: string[];
}

export function FAQSection({ items, bullets }: FAQSectionProps) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="border-l-4 border-sp-accent pl-3 text-lg font-bold text-gray-900">
        Sıkça Sorulan Sorular
      </h2>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.question} className="flex items-start gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sp-accent text-xs font-bold text-white">
              S
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {item.question}
              </p>
              <p className="mt-1 text-sm text-gray-600">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <ul className="mt-4 list-inside list-disc space-y-1 border-t border-gray-100 pt-4 text-sm text-gray-600">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </section>
  );
}
