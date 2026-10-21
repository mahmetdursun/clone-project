"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { formatPrice } from "@/lib/price";

interface OrderSummaryAsideProps {
  cartNumber: string;
  subtotal: number;
  /** null while the shipping carrier hasn't been chosen yet (Sepet/Adres steps). */
  shippingCost: number | null;
  /** Extra content injected under the totals — e.g. the "Devam Et" button for the current step. */
  children?: React.ReactNode;
}

export function OrderSummaryAside({
  cartNumber,
  subtotal,
  shippingCost,
  children,
}: OrderSummaryAsideProps) {
  const [copied, setCopied] = useState(false);
  const total = subtotal + (shippingCost ?? 0);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(cartNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable/blocked — silently ignore.
    }
  }

  return (
    <aside className="h-fit rounded-lg border border-gray-200 bg-white p-5">
      {cartNumber ? (
        <div className="mb-4 flex items-center justify-between rounded-md bg-gray-50 px-3 py-2">
          <div>
            <p className="text-xs text-gray-400">Sepet Numarası</p>
            <p className="text-sm font-semibold text-light-text-primary">{cartNumber}</p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-light-text-muted transition-colors hover:bg-white"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-600" />
                Kopyalandı
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                Kopyala
              </>
            )}
          </button>
        </div>
      ) : null}

      <h2 className="text-base font-semibold text-light-text-primary">Sipariş Özeti</h2>

      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-light-text-muted">Ara Toplam</span>
          <span className="font-medium text-light-text-primary">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-light-text-muted">Kargo</span>
          {shippingCost === null ? (
            <span className="text-gray-400">Ödeme adımında hesaplanır</span>
          ) : shippingCost === 0 ? (
            <span className="font-medium text-emerald-600">Ücretsiz</span>
          ) : (
            <span className="font-medium text-light-text-primary">
              {formatPrice(shippingCost)}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="text-sm font-semibold text-light-text-primary">Toplam</span>
        <span className="text-xl font-bold text-sp-accent">
          {formatPrice(shippingCost === null ? subtotal : total)}
        </span>
      </div>

      <p className="mt-2 text-xs text-gray-400">
        Sepetinizle ilgili sorularınız için{" "}
        <a href="mailto:destek@sonparca.com" className="text-sp-accent hover:underline">
          destek@sonparca.com
        </a>{" "}
        adresinden bize ulaşabilirsiniz.
      </p>

      {children ? <div className="mt-4">{children}</div> : null}
    </aside>
  );
}
