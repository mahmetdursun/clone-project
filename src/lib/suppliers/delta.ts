/**
 * Delta (eryaz.net üzerinden paylaşılan entegrasyon) web servisi.
 *
 * Dokümantasyon 2026-09-22'de e-posta ile alındı. DEGA'dan farklı olarak
 * Delta'nın servisi tek bir "genel" endpoint üzerinden çalışıyor
 * (`/api/Integration/getdata`) ve hangi işlemin yapılacağı `FunctionName`
 * alanıyla belirleniyor (örn. "GetList_Product"). Başka FunctionName
 * değerleri de olabilir — şimdilik sadece ürün listesi biliniyor.
 *
 * Kimlik bilgileri koda YAZILMAZ — process.env üzerinden okunur:
 *   DELTA_API_URL
 *   DELTA_COMPANY_KEY
 *   DELTA_USERNAME
 *   DELTA_PASSWORD
 * Bu değerler .env.local içinde tutulur (git'e girmez).
 *
 * ÖNEMLİ: Delta'nın notuna göre bu servise erişim, isteğin geldiği
 * sunucunun IP adresine göre kısıtlanmış olabilir ("Yazılım hangi
 * sunucuda çalışacak ise ona ait IP adresi gerekiyor"). Bu yüzden bu
 * istemci sadece bizim IP'si onaylı bir sunucudan (yerel makine veya
 * ileride kalıcı IP'li bir üretim sunucusu) çalıştığında başarılı olur.
 *
 * ÖNEMLİ (şifre): Şifrede JSON içinde özel anlamı olabilecek karakterler
 * var (`}` `#` `%`). Bu dosyadaki kod şifreyi düz metin olarak
 * `JSON.stringify` ile gönderdiği için sorun yok, ama `.env.local`
 * dosyasına yazarken değeri tırnak içine almanız önerilir:
 *   DELTA_PASSWORD="vcdul1R}ysFI#7%"
 * (Tırnaksız yazılırsa bazı .env okuyucuları `#` karakterinden sonrasını
 * yorum satırı sanıp keser.)
 *
 * DURUM (2026-09-22): Kimlik bilgileri "yanlış" diye reddedilmiyor ama
 * her istek `{"Status": false, "Message": "No Accept Data"}` dönüyor —
 * muhtemelen hesap eski bir IP'ye (95.70.176.142) whitelist'lenmiş,
 * bizim güncel IP'mize (92.44.217.13) değil. Delta'dan whitelist
 * güncellemesi bekleniyor. Bu yüzden `deltaClient.fetchProducts()`
 * henüz gerçek veriyle test edilemedi.
 *
 * `deltaClient` (dosya sonunda), bu modülü diğer tüm tedarikçilerle aynı
 * ortak sözleşmeye (bkz. ./types.ts) bağlar — registry (./index.ts) bu
 * sözleşme üzerinden çalışır.
 */

import type { NormalizedSupplierProduct, SupplierClient } from "./types";

interface DeltaEnvelope<T> {
  // Canlı testte görülen gerçek zarf (envelope) alanları:
  //   {"Status": false, "Message": "No Accept Data", "Count": 1}
  // Başarılı bir cevabın veri alanının adı (Data/data/Result?) henüz
  // görülmedi — üçünü de destekliyoruz, ilk canlı başarılı cevaptan sonra
  // gereksiz olanları temizleyeceğiz.
  Status: boolean;
  Message?: string;
  Count?: number;
  Data?: T;
  data?: T;
  Result?: T;
}

interface DeltaConfig {
  apiUrl: string;
  companyKey: string;
  username: string;
  password: string;
}

function getDeltaConfig(): DeltaConfig {
  const apiUrl = process.env.DELTA_API_URL;
  const companyKey = process.env.DELTA_COMPANY_KEY;
  const username = process.env.DELTA_USERNAME;
  const password = process.env.DELTA_PASSWORD;

  if (!apiUrl || !companyKey || !username || !password) {
    throw new Error(
      "Delta kimlik bilgileri eksik: DELTA_API_URL, DELTA_COMPANY_KEY, DELTA_USERNAME, DELTA_PASSWORD ortam değişkenlerini .env.local içinde tanımlayın.",
    );
  }

  return { apiUrl, companyKey, username, password };
}

/**
 * Delta'nın tek endpoint'ine genel amaçlı istek atar. `functionName`
 * hangi işlemin yapılacağını belirler (örn. "GetList_Product").
 */
async function deltaRequest<T>(
  functionName: string,
  parameters: Record<string, unknown> = {},
): Promise<DeltaEnvelope<T>> {
  const { apiUrl, companyKey, username, password } = getDeltaConfig();

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      CompanyKey: companyKey,
      FunctionName: functionName,
      UserName: username,
      Password: password,
      Parameters: parameters,
    }),
  });

  if (!res.ok) {
    throw new Error(`Delta isteği HTTP ${res.status} döndü.`);
  }

  return (await res.json()) as DeltaEnvelope<T>;
}

/**
 * Gerçek alan isimleri henüz doğrulanmadı — ilk canlı çağrıdan sonra
 * bu tipi (OEM numarası, fiyat, stok, marka vb. gerçek alan
 * isimleriyle) daraltacağız.
 */
export type DeltaRawProduct = Record<string, unknown>;

/**
 * Ürün listesi çeker. `code` boş bırakılırsa TÜM katalog döner (Delta'nın
 * notuna göre) — bu potansiyel olarak çok büyük bir cevap olabilir, ilk
 * testlerde bilinen tek bir "Delta Kodu" ile (örn. "AYAYB823") daraltarak
 * denemek daha güvenli.
 */
export async function getDeltaProductList(code = "") {
  return deltaRequest<DeltaRawProduct[]>("GetList_Product", { Code: code });
}

// ---------------------------------------------------------------------------
// Ortak tedarikçi sözleşmesi (bkz. ./types.ts)
// ---------------------------------------------------------------------------

/**
 * Delta'nın ham ürün alanları henüz bilinmiyor (bkz. dosya başındaki not —
 * hesap whitelist güncellemesi bekleniyor). Canlı bir başarılı cevap
 * görüldüğünde bu fonksiyon gerçek alan isimleriyle doldurulmalı.
 */
function normalizeDeltaProduct(raw: DeltaRawProduct): NormalizedSupplierProduct {
  throw new Error(
    `Delta ürün şeması henüz bilinmiyor: normalizeDeltaProduct uygulanmadı (whitelist güncellemesi bekleniyor). Ham veri: ${JSON.stringify(raw)}`,
  );
}

async function fetchProducts(): Promise<NormalizedSupplierProduct[]> {
  const response = await getDeltaProductList();
  if (response.Status !== true) {
    throw new Error(
      `Delta ürün listesi alınamadı: ${JSON.stringify(response)}`,
    );
  }
  const data = (response.Data ?? response.data ?? response.Result ?? []) as DeltaRawProduct[];
  return data.map(normalizeDeltaProduct);
}

export const deltaClient: SupplierClient = {
  key: "delta",
  displayName: "Delta (eryaz.net)",
  fetchProducts,
};
