"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { WIZARD_FAQ } from "./data";

export function WizardFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-lg font-bold text-light-text-primary">
        Sıkça Sorulan Sorular
      </h2>
      <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
        {WIZARD_FAQ.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-light-text-primary"
              >
                {item.q}
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-gray-400 transition-transform duration-200",
                    open && "rotate-180",
                  )}
                />
              </button>
              {open ? (
                <p className="px-5 pb-4 text-sm text-light-text-muted">
                  {item.a}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
