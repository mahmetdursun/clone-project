"use client";

import { useState } from "react";
import { Briefcase, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SonparcaBrandListing } from "@/types/sonparca";

export const brandListings: SonparcaBrandListing[] = [
  { name: "Fiat", count: 34 },
  { name: "Renault", count: 30 },
  { name: "Hyundai", count: 25 },
  { name: "Citroen", count: 24 },
  { name: "Peugeot", count: 23 },
  { name: "Volkswagen", count: 21 },
  { name: "Ford", count: 18 },
  { name: "Opel", count: 18 },
  { name: "Toyota", count: 17 },
  { name: "Kia", count: 17 },
  { name: "Skoda", count: 14 },
  { name: "Nissan", count: 13 },
  { name: "Audi", count: 12 },
  { name: "Mazda", count: 12 },
  { name: "Mitsubishi", count: 10 },
  { name: "Dacia", count: 8 },
  { name: "Seat", count: 8 },
  { name: "Chevrolet", count: 8 },
  { name: "Honda", count: 7 },
  { name: "Mercedes", count: 3 },
];

export function BrandList() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleBrand = (name: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  return (
    <section>
      <div className="bg-dark-bg rounded-t-lg px-4 py-3 flex items-center gap-2">
        <Briefcase className="text-dark-text-primary" size={20} />
        <div>
          <p className="font-semibold text-dark-text-primary">
            Tüm Araç Markaları ve Modelleri
          </p>
          <p className="text-xs text-dark-text-muted">
            Aracınızın markasını seçerek uyumlu yedek parçalara ulaşın
          </p>
        </div>
      </div>
      <div className="bg-white border border-t-0 border-gray-200 rounded-b-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-1">
          {brandListings.map((brand) => {
            const isExpanded = expanded.has(brand.name);
            return (
              <div key={brand.name}>
                <button
                  type="button"
                  onClick={() => toggleBrand(brand.name)}
                  aria-expanded={isExpanded}
                  className="flex items-center justify-between w-full px-3 py-3 rounded hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm text-gray-800">
                    {brand.name} Yedek Parça
                  </span>
                  <span className="flex items-center gap-2 text-gray-400">
                    <span className="text-xs bg-gray-100 text-gray-500 rounded px-1.5 py-0.5">
                      {brand.count}
                    </span>
                    <ChevronDown
                      size={16}
                      className={cn(
                        "transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </span>
                </button>
                {isExpanded && (
                  <div className="px-3 pb-3 text-xs text-gray-400">
                    Modeller yakında
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
