/**
 * Tedarikçi kayıt defteri (registry).
 *
 * Yeni bir tedarikçi eklerken: (1) src/lib/suppliers/<isim>.ts içinde
 * ./types.ts'teki SupplierClient sözleşmesini uygulayan bir istemci
 * yazın, (2) onu aşağıya ekleyin. Senkronizasyon/eşleştirme kodu bu
 * registry üzerinden çalışır, hangi tedarikçiler olduğunu tek tek
 * bilmesi gerekmez.
 */

import { degaClient } from "./dega";
import { deltaClient } from "./delta";
import type { SupplierClient } from "./types";

export const SUPPLIER_REGISTRY: Record<string, SupplierClient> = {
  [degaClient.key]: degaClient,
  [deltaClient.key]: deltaClient,
};

export function getSupplierClient(key: string): SupplierClient {
  const client = SUPPLIER_REGISTRY[key];
  if (!client) {
    throw new Error(
      `Bilinmeyen tedarikçi anahtarı: "${key}". Kayıtlı tedarikçiler: ${Object.keys(SUPPLIER_REGISTRY).join(", ")}`,
    );
  }
  return client;
}

export type { NormalizedSupplierProduct, SupplierClient } from "./types";
