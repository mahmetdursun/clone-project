"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Flame, Sparkles } from "lucide-react";

import type { SonparcaProduct } from "@/types/sonparca";

import { ProductCard, type SonparcaProductWithAccent } from "./ProductCard";

const CARD_WIDTH_PX = 190;
const CARD_GAP_PX = 16;

const ICON_MAP = {
  flame: Flame,
  sparkles: Sparkles,
} as const;

interface ProductCarouselProps {
  title: string;
  subtitle: string;
  products: (SonparcaProduct | SonparcaProductWithAccent)[];
  icon?: keyof typeof ICON_MAP;
}

export function ProductCarousel({
  title,
  subtitle,
  products,
  icon = "sparkles",
}: ProductCarouselProps) {
  const Icon = ICON_MAP[icon];
  const trackRef = useRef<HTMLDivElement>(null);

  function handleScroll(direction: 1 | -1) {
    trackRef.current?.scrollBy({
      left: direction * (CARD_WIDTH_PX + CARD_GAP_PX),
      behavior: "smooth",
    });
  }

  return (
    <section>
      <div className="bg-dark-bg rounded-t-lg px-4 py-3 flex items-center gap-2">
        <Icon className="h-5 w-5 text-sp-accent" />
        <div>
          <p className="font-semibold text-dark-text-primary">{title}</p>
          <p className="text-xs text-dark-text-muted">{subtitle}</p>
        </div>
      </div>
      <div className="group relative bg-white rounded-b-lg border border-t-0 border-gray-200 p-4">
        <button
          type="button"
          onClick={() => handleScroll(-1)}
          aria-label="Önceki ürünleri göster"
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <button
          type="button"
          onClick={() => handleScroll(1)}
          aria-label="Sonraki ürünleri göster"
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </section>
  );
}
