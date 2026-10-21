import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Package } from "lucide-react";

import { cn } from "@/lib/utils";
import type { OrderRecord, OrderStatus } from "@/types/account";

const STATUS_LABELS: Record<OrderStatus, string> = {
  hazirlaniyor: "Hazırlanıyor",
  kargoya_verildi: "Kargoya Verildi",
  teslim_edildi: "Teslim Edildi",
  iptal_edildi: "İptal Edildi",
};

const STATUS_STYLES: Record<OrderStatus, string> = {
  hazirlaniyor: "bg-amber-50 text-amber-700",
  kargoya_verildi: "bg-sky-50 text-sky-700",
  teslim_edildi: "bg-emerald-50 text-emerald-700",
  iptal_edildi: "bg-red-50 text-red-700",
};

function formatPrice(value: number, currency: string) {
  return `${value.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

export function OrderCard({ order }: { order: OrderRecord }) {
  const previewItems = order.items.slice(0, 3);
  const extraCount = order.items.length - previewItems.length;

  return (
    <Link
      href={`/hesabim/siparislerim/${order.id}`}
      className="group block rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-sp-accent/40 hover:shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-light-text-primary">
            Sipariş #{order.orderNumber}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(order.createdAt).toLocaleDateString("tr-TR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium",
            STATUS_STYLES[order.status],
          )}
        >
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {previewItems.map((item, index) => (
          <div
            key={`${item.productName}-${index}`}
            className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-100 bg-gray-50"
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.productName}
                width={56}
                height={56}
                className="size-full object-contain p-1"
              />
            ) : (
              <Package className="size-5 text-gray-300" />
            )}
          </div>
        ))}
        {extraCount > 0 ? (
          <div className="flex size-14 shrink-0 items-center justify-center rounded-md border border-gray-100 bg-gray-50 text-xs font-medium text-gray-500">
            +{extraCount}
          </div>
        ) : null}
        <div className="min-w-0 flex-1 pl-1">
          <p className="truncate text-sm text-light-text-primary">
            {previewItems.map((item) => item.productName).join(", ")}
            {extraCount > 0 ? ` ve ${extraCount} ürün daha` : ""}
          </p>
          <p className="text-xs text-gray-500">
            {order.items.reduce((sum, item) => sum + item.quantity, 0)} ürün
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="font-semibold text-light-text-primary">
          {formatPrice(order.total, order.currency)}
        </span>
        <span className="flex items-center gap-1 text-sm font-medium text-sp-accent">
          Sipariş Detayı
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
