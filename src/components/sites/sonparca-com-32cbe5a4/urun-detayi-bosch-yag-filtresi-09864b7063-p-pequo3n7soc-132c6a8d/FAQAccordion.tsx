"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface FAQAccordionItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQAccordionItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <h2 className="border-b border-gray-100 px-4 py-3.5 text-lg font-bold text-gray-900">
        Sıkça Sorulan Sorular
      </h2>
      <div className="divide-y divide-gray-100">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={`${item.question}-${index}`}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-800">
                  {item.question}
                </span>
                <ChevronRight
                  className={cn(
                    "size-4 shrink-0 text-sp-accent transition-transform duration-200",
                    isOpen && "rotate-90",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-200 ease-out",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 text-sm text-gray-600">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
