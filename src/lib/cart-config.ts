import type { ShippingCarrier } from "@/types/cart";

/**
 * Sepet toplamı bu tutara ulaşınca (veya geçince) kargo ücretsiz olur.
 * Sadece bu sayıyı değiştirmek yeterli — sepet, adres ve ödeme adımlarının
 * hepsi buradan okuyor.
 */
export const FREE_SHIPPING_THRESHOLD = 1500;

/**
 * Anlaşmalı kargo firmaları. Fiyatlar örnek/placeholder değerlerdir —
 * gerçek anlaşma tutarlarınızla güncelleyin. "En Uygun" rozeti otomatik
 * olarak en düşük fiyatlı firmaya eklenir (bkz. ShippingCarrierSelector.tsx).
 */
export const SHIPPING_CARRIERS: ShippingCarrier[] = [
  { id: "aras-kargo", name: "Aras Kargo", price: 149.9, etaLabel: "1-2 iş günü" },
  { id: "city-kargo", name: "City Kargo", price: 159.9, etaLabel: "2-3 iş günü" },
];

/**
 * Havale/EFT ile ödeme adımında gösterilecek banka hesap bilgileri.
 * Gerçek bilgiler paylaşılana kadar bilerek boş bırakıldı — bkz.
 * BankTransferPanel.tsx. Kendi hesap bilgilerinizi öğrendiğimizde bu
 * alanları doldurmanız yeterli, arayüz otomatik olarak gerçek verileri
 * gösterecek.
 */
export const BANK_TRANSFER_ACCOUNT: {
  accountName: string | null;
  bankName: string | null;
  iban: string | null;
  accountNumber: string | null;
  branchCode: string | null;
  branch: string | null;
} = {
  accountName: null,
  bankName: null,
  iban: null,
  accountNumber: null,
  branchCode: null,
  branch: null,
};
