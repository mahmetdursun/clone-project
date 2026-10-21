/**
 * Client-side "account" data shapes for /hesabim.
 *
 * There is no real authentication or account backend yet (see auth/giris,
 * auth/kayit-ol — both are UI-only forms). Garajım/Adreslerim/Parça
 * Taleplerim are built as fully working features today, backed by
 * localStorage (see src/hooks/use-local-collection.ts) rather than fake
 * seeded data, so nothing here pretends to be a real signed-in user's
 * history. Once real auth + a database-backed account API exist, the
 * useLocalCollection calls in each page swap for real fetch/mutate calls
 * without changing these shapes much.
 */

export interface ProfileInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface GarageVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  fuel: string;
  engine: string;
  nickname?: string;
  plate?: string;
  color?: string;
  mileageKm?: number;
  vin?: string;
  notes?: string;
  isDefault: boolean;
  createdAt: string;
  mileageUpdatedAt?: string;
}

export type AddressType = "delivery" | "billing";

/** Only meaningful when `type` is "billing" — matches sonparca.com's own
 * "Fatura Tipi" toggle, which swaps the individual name fields for company
 * ones (see AddressFormPanel.tsx). */
export type BillingType = "individual" | "company";

export interface SavedAddress {
  id: string;
  label: string;
  type: AddressType;
  /** Only set when type === "billing". Defaults to "individual" in the UI. */
  billingType?: BillingType;
  firstName: string;
  lastName: string;
  /** Kurumsal (company) fatura fields — only used when billingType === "company". */
  companyName?: string;
  taxOffice?: string;
  taxNumber?: string;
  /** Bireysel (individual) fatura field — only used when billingType === "individual". */
  nationalId?: string;
  phone: string;
  il: string;
  ilce: string;
  mahalle: string;
  postalCode?: string;
  addressDetail: string;
  isDefault: boolean;
  createdAt: string;
}

export type PartRequestStatus = "beklemede" | "teklif_verildi" | "tamamlandi" | "iptal";

export interface PartRequestRecord {
  id: string;
  chassisNumber: string;
  contactPhone: string;
  partList: string;
  status: PartRequestStatus;
  createdAt: string;
}

export type OrderStatus =
  | "hazirlaniyor"
  | "kargoya_verildi"
  | "teslim_edildi"
  | "iptal_edildi";

export interface OrderLineItem {
  productName: string;
  supplierSku?: string;
  quantity: number;
  unitPrice: number;
  image?: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  createdAt: string;
  total: number;
  currency: string;
  items: OrderLineItem[];
}
