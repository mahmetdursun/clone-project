import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SonparcaProduct } from "@/types/sonparca";

/**
 * Extends the shared SonparcaProduct type with a local, presentation-only
 * `accent` flag used to render a product's name in the brand accent color
 * (e.g. sponsored / featured items like "Denso İridyum Buji").
 */
export interface SonparcaProductWithAccent extends SonparcaProduct {
  accent?: boolean;
}

interface ProductCardProps {
  product: SonparcaProductWithAccent;
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, brandLabel, price, image, accent, href } = product;

  const imageEl = (
    <div className="relative aspect-square bg-gray-50">
      <Image
        src={image}
        alt={name}
        fill
        sizes="190px"
        className="object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );

  const nameEl = (
    <p
      className={cn(
        "text-sm font-medium line-clamp-2 min-h-[2.5em]",
        accent ? "text-sp-accent" : "text-gray-900",
      )}
    >
      {name}
    </p>
  );

  return (
    <div className="group shrink-0 w-[190px] snap-start bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {href ? <Link href={href}>{imageEl}</Link> : imageEl}
      <div className="p-3">
        {brandLabel ? (
          <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wide">
            {brandLabel}
          </p>
        ) : null}
        {href ? (
          <Link href={href} className="hover:text-sp-accent">
            {nameEl}
          </Link>
        ) : (
          nameEl
        )}
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-gray-900">{price} TL</span>
          <button
            type="button"
            aria-label={`${name} - sepete ekle`}
            className="w-8 h-8 rounded-md bg-dark-bg text-white flex items-center justify-center hover:bg-sp-accent transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
