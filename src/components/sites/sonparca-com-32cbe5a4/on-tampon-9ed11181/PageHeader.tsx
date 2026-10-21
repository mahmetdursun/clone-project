"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, IdCard } from "lucide-react";

import { cn } from "@/lib/utils";

const DESCRIPTION =
  "Ön Tampon kategorisindeki yedek parçaları inceleyin. Alt gruplar: Ön Tampon Çeki Kapağı, Tampon Fiskiye Motoru, Ön Sağ Tampon Fıskıyesi, Ön Tampon Orta Izgara ve Ön Tampon Demiri. Fiyatlar 0 TL ile 267.294 TL arasında değişiyor. 1.677 ürün stokta mevcut. Fiyat ve stok bilgileri düzenli olarak güncellenmektedir.";

export function PageHeader() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-4">
      <nav className="mb-3 text-xs text-light-text-muted">
        <Link href="/" className="hover:text-sp-accent transition-colors">
          Ana Sayfa
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-medium text-light-text-primary">Ön Tampon</span>
      </nav>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-light-text-primary">
          Ön Tampon
        </h1>
        <Link
          href="/bakim-robotu"
          className="inline-flex shrink-0 items-center gap-1 self-start rounded border border-sp-accent px-3 py-1.5 text-xs text-sp-accent transition-colors hover:bg-sp-accent/10 sm:self-auto"
        >
          <IdCard className="size-3.5" />
          Araç seçimini tamamla
        </Link>
      </div>

      <div className="mt-2">
        <p
          className={cn(
            "text-sm text-light-text-muted",
            expanded ? "line-clamp-none" : "line-clamp-2",
          )}
        >
          {DESCRIPTION}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-1 inline-flex items-center gap-0.5 text-xs font-medium text-sp-accent transition-colors hover:text-sp-accent-hover"
        >
          {expanded ? "Daha az göster" : "Devamını oku"}
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform duration-200",
              expanded && "rotate-180",
            )}
          />
        </button>
      </div>
    </div>
  );
}
