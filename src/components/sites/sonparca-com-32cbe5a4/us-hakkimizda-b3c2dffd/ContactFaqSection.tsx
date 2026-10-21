"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Mail, Phone } from "lucide-react";

import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "KaportaBizde hangi markaların parçalarını satıyor?",
    answer:
      "Mercedes, Audi, Volkswagen, Ford, Opel, Renault, Peugeot, Toyota, Honda ve 50'den fazla markanın orijinal ve muadil yedek parçalarını sunuyoruz.",
  },
  {
    question: "KaportaBizde mağazası nerede?",
    answer:
      "Fiziksel mağazamız Avcılar Sanayi Sitesi No:10 (Oto Yılmaz Yedek Parça Yanı), 34325 Avcılar/İstanbul adresinde bulunmaktadır. Ayrıca online mağazamız üzerinden 7/24 sipariş verebilirsiniz.",
  },
  {
    question: "KaportaBizde'nın avantajları nelerdir?",
    answer:
      "Geniş ürün yelpazesi, uygun fiyat garantisi ve hızlı kargo başlıca avantajlarımızdır. Şasi numarası ile %100 uyumlu parça bulma imkanı sunuyoruz. Müşteri memnuniyeti odaklı hizmet anlayışımızla her zaman yanınızdayız.",
  },
];

export function ContactFaqSection() {
  // Independent multi-open accordion — the live site allows more than one
  // FAQ item open at the same time (verified by clicking all three in turn).
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  function toggleItem(index: number) {
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
    <section className="w-full bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 md:text-3xl">
            İletişime Geçin
          </h2>
          <p className="mb-6 text-gray-600">
            Her türlü soru ve önerileriniz için bizimle iletişime
            geçebilirsiniz. Size yardımcı olmaktan memnuniyet duyarız.
          </p>
          <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
            <div className="flex items-center rounded-md bg-white p-4 shadow-sm">
              <div className="mr-3 text-blue-600">
                <Phone className="size-5" />
              </div>
              <div className="text-left">
                <p className="mb-1 text-sm text-gray-500">Telefon</p>
                <p className="font-medium text-gray-800">0850 302 25 08</p>
              </div>
            </div>
            <div className="flex items-center rounded-md bg-white p-4 shadow-sm">
              <div className="mr-3 text-blue-600">
                <Mail className="size-5" />
              </div>
              <div className="text-left">
                <p className="mb-1 text-sm text-gray-500">E-posta</p>
                <p className="font-medium text-gray-800">
                  destek@sonparca.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Hakkımızda - Sıkça Sorulan Sorular
          </h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openItems.has(index);
              return (
                <div
                  key={item.question}
                  className="overflow-hidden rounded-md border border-gray-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50 sm:px-5 sm:py-4"
                  >
                    <h3 className="text-sm font-medium text-gray-800 sm:text-base">
                      {item.question}
                    </h3>
                    {isOpen ? (
                      <ChevronUp className="size-4 shrink-0 text-gray-400" />
                    ) : (
                      <ChevronDown className="size-4 shrink-0 text-gray-400" />
                    )}
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
                      <div className="border-t border-gray-100 bg-gray-50 px-4 pb-4 pt-3 sm:px-5">
                        <p className="text-sm leading-relaxed text-gray-500">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
