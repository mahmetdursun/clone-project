"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { faqItems } from "./data";

export function TermsFaq() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Kullanım Koşulları - Sıkça Sorulan Sorular</h2>
      <div className="space-y-3">
        {faqItems.map((item, index) => {
          const isOpen = openItems.has(index);
          return (
            <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center justify-between gap-3"
              >
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">{item.question}</h3>
                <span className="flex items-center justify-center text-gray-500 flex-shrink-0">
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </span>
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 bg-gray-50 border-t border-gray-100">
                  <p className="text-sm leading-relaxed pt-3 text-gray-500">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
