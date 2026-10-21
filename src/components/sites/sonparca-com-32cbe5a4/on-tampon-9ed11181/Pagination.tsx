import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  pageSize: number;
}

export function Pagination({
  currentPage,
  totalPages,
  totalResults,
  pageSize,
}: PaginationProps) {
  const pageNumbers = Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => i + 1,
  );
  const rangeStart = (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalResults);

  const arrowButtonClass =
    "flex size-8 items-center justify-center rounded border border-gray-200 bg-white text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-1">
        <button type="button" aria-label="İlk sayfa" disabled={currentPage === 1} className={arrowButtonClass}>
          <ChevronsLeft className="size-4" />
        </button>
        <button type="button" aria-label="Önceki sayfa" disabled={currentPage === 1} className={arrowButtonClass}>
          <ChevronLeft className="size-4" />
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              "flex size-8 items-center justify-center rounded border text-sm transition-colors",
              page === currentPage
                ? "border-sp-accent/30 bg-sp-accent/10 font-medium text-sp-accent"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
            )}
          >
            {page}
          </button>
        ))}
        <button type="button" aria-label="Sonraki sayfa" className={arrowButtonClass}>
          <ChevronRight className="size-4" />
        </button>
        <button type="button" aria-label="Son sayfa" className={arrowButtonClass}>
          <ChevronsRight className="size-4" />
        </button>
      </div>
      <span className="text-sm text-light-text-muted">
        Toplam {totalResults.toLocaleString("tr-TR")} kayıttan {rangeStart}-
        {rangeEnd} arası gösteriliyor
      </span>
    </nav>
  );
}
