/**
 * Client-side cart shapes for the "Sepetim" flow.
 *
 * Like the other /hesabim features (Garajım, Adreslerim, Parça Taleplerim —
 * see src/types/account.ts), there is no orders/checkout backend yet, so
 * the cart itself is genuinely built and working, backed by localStorage
 * (see src/hooks/use-cart.tsx) rather than a server session. Placing a real
 * order (payment capture, shipment creation) is intentionally out of scope
 * for this pass — see BankTransferPanel.tsx for the one place real data
 * (the site's own bank account) still needs to be filled in by hand.
 */

export interface CartItem {
  id: string;
  title: string;
  brand?: string;
  /** Unit price in TL, as a plain number (see src/lib/price.ts to parse/format). */
  unitPrice: number;
  quantity: number;
  image?: string;
  href?: string;
}

export type ShippingCarrierId = "city-kargo" | "aras-kargo";

export interface ShippingCarrier {
  id: ShippingCarrierId;
  name: string;
  /** Standard price in TL for this carrier, before the free-shipping threshold is applied. */
  price: number;
  etaLabel: string;
}

export type PaymentMethodId = "credit-card" | "bank-transfer";
