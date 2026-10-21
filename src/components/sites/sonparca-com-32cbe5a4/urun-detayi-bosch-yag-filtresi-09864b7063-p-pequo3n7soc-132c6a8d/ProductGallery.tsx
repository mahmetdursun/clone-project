import Image from "next/image";
import { ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  image: string;
  alt: string;
  sku: string;
}

export function ProductGallery({ image, alt, sku }: ProductGalleryProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="group relative aspect-square bg-gray-50 p-6 sm:p-6 md:p-8">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 500px, 100vw"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          priority
        />
        <button
          type="button"
          aria-label="Yakınlaştır"
          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-gray-600 opacity-0 shadow-sm transition-opacity hover:text-sp-accent group-hover:opacity-100"
        >
          <ZoomIn className="size-4" />
        </button>
        <span className="absolute bottom-3 left-3 rounded bg-gray-100 px-2 py-1 font-mono text-xs text-gray-600">
          SKU {sku}
        </span>
      </div>
    </div>
  );
}
