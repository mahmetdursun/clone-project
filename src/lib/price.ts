/**
 * Turkish Lira formatting/parsing helpers shared by the cart & checkout UI.
 *
 * Existing product data (src/lib/data.ts, the ürün detayı `product.price`)
 * stores prices as already-formatted Turkish strings like "1.580,76" or
 * "1.580,76 TL" — this file converts between that display format and the
 * plain numbers the cart does math with.
 */

/** "1.580,76 TL" | "208,64" | "111,60" → 1580.76 */
export function parsePrice(value: string): number {
  const normalized = value
    .replace(/[^0-9.,-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** 1580.76 → "1.580,76 TL" */
export function formatPrice(value: number): string {
  return `${value.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} TL`;
}
