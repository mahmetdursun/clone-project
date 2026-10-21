"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Müşteri hizmetlerine nasıl ulaşabilirim?",
    answer:
      "Bize 0850 302 25 08 numaralı telefondan veya destek@sonparca.com e-posta adresi üzerinden ulaşabilirsiniz. WhatsApp destek hattımız da mevcuttur.",
  },
  {
    question: "Çalışma saatleriniz nedir?",
    answer:
      "Müşteri hizmetlerimiz hafta içi 09:00-18:00 saatleri arasında hizmet vermektedir. Online mağazamız üzerinden 7/24 sipariş verebilirsiniz.",
  },
  {
    question: "Siparişimle ilgili kime başvurmalıyım?",
    answer:
      "Siparişinizle ilgili tüm sorularınız için 0850 302 25 08 numaralı müşteri hizmetleri hattımızı arayabilir veya hesabınızdaki sipariş detayları üzerinden bize ulaşabilirsiniz.",
  },
];

export function ContactFAQ() {
  // Each item toggles independently — the source accordion allows multiple
  // items open at once (not a single-open accordion).
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
    <section className="bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <section className="w-full">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            İletişim - Sıkça Sorulan Sorular
          </h2>
          <div className="space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openItems.has(index);
              return (
                <div
                  key={item.question}
                  className="overflow-hidden rounded-md border border-gray-200"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-3 bg-white px-4 py-3 text-left transition-colors duration-150 hover:bg-gray-50 sm:px-5 sm:py-4"
                  >
                    <h3 className="text-sm font-medium text-gray-800 sm:text-base">
                      {item.question}
                    </h3>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-gray-400 transition-transform duration-200",
                        isOpen && "rotate-180",
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
                      <p className="px-4 pb-4 text-sm text-gray-600 sm:px-5">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
