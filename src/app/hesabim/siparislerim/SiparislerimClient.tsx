"use client";

import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";

import { OrderCard } from "@/components/account/OrderCard";
import { useLocalCollection } from "@/hooks/use-local-collection";
import type { OrderRecord } from "@/types/account";

/**
 * There is no orders/checkout backend yet (no `orders` table, no payment
 * flow) — see src/lib/db/schema.ts. So this list is genuinely always empty
 * today, same as the reference site's own empty state. What was left open
 * for design here is the OrderCard (src/components/account/OrderCard.tsx):
 * it's built and ready to render real orders — thumbnails, item summary,
 * status badge, total — the moment an orders API exists; nothing fake is
 * seeded in the meantime.
 */
export function SiparislerimClient() {
  const { items: orders, hydrated } = useLocalCollection<OrderRecord>(
    "kaportabizde:orders",
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-light-text-primary">
          Siparişlerim
        </h2>
        <span className="text-sm text-sky-600">
          Toplam: {hydrated ? orders.length : 0} sipariş
        </span>
      </div>

      {hydrated && orders.length === 0 ? (
        <p className="mt-8 rounded-md border border-dashed border-gray-200 py-10 text-center text-sm text-sp-accent">
          Henüz siparişiniz bulunmamaktadır.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            aria-label="İlk sayfa"
            className="rounded p-1.5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronsLeft className="size-4" />
          </button>
          <button
            type="button"
            disabled
            aria-label="Önceki sayfa"
            className="rounded p-1.5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            disabled
            aria-label="Sonraki sayfa"
            className="rounded p-1.5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>
          <button
            type="button"
            disabled
            aria-label="Son sayfa"
            className="rounded p-1.5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronsRight className="size-4" />
          </button>
        </div>
        <span>
          Toplam {orders.length} kayıttan{" "}
          {orders.length === 0 ? "1-0" : `1-${orders.length}`} arası
          gösteriliyor
        </span>
      </div>
    </div>
  );
}
