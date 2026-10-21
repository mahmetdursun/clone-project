"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { chassisFaqItems } from "./data";

export function ChassisFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full">
      <h2 className="mb-4 text-lg font-semibold text-light-text-primary">
        Sık Sorulan Sorular
      </h2>
      <div className="space-y-3">
        {chassisFaqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-md border border-gray-200"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-3 bg-white px-4 py-3 text-left transition-colors duration-150 hover:bg-gray-50 sm:px-5 sm:py-4"
              >
                <h3 className="text-sm font-medium text-light-text-primary sm:text-base">
                  {item.question}
                </h3>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-light-text-muted transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen && (
                <p className="px-4 pb-3 text-sm text-light-text-muted sm:px-5 sm:pb-4">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
