/**
 * DEGA (İler Otomotiv) B4B web servis entegrasyonu.
 *
 * Dokümantasyon 2026-09-22'de Erdal Bey'den gelen e-postadan alındı.
 * Not: DEGA'nın "Get Product List" dokümantasyonu ürün alanlarını
 * (field) net olarak listelemiyor — "Data değerleri parametrik
 * belirlenmektedir, gelen sonucu inceleyiniz" diyor. Bu yüzden
 * `DegaRawProduct` şimdilik `Record<string, unknown>` — gerçek bir
 * response görüldükten sonra (bkz. scripts/suppliers/test-dega.mjs)
 * burayı gerçek alan isimleriyle (ürün kodu, OEM numarası, fiyat,
 * stok vs.) daraltmamız gerekiyor.
 *
 * DURUM (2026-09-22): Login hâlâ "E-Posta ya da şifre yanlış" veriyor —
 * DEGA tarafında hesap aktivasyonu bekleniyor (imzalı evrak + statik IP
 * süreci). Bu yüzden `degaClient.fetchProducts()` şimdilik gerçek veriyle
 * test edilemedi; aktivasyon tamamlanıp canlı bir cevap görüldüğünde
 * `normalizeDegaProduct` gerçek alan isimleriyle doldurulmalı.
 *
 * Kimlik bilgileri koda YAZILMAZ — process.env üzerinden okunur:
 *   DEGA_B4B_BASE_URL
 *   DEGA_B4B_EMAIL
 *   DEGA_B4B_PASSWORD
 * Bu değerler .env.local içinde tutulur (git'e girmez).
 *
 * `degaClient` (dosya sonunda), bu modülü diğer tüm tedarikçilerle aynı
 * ortak sözleşmeye (bkz. ./types.ts) bağlar — registry (./index.ts) bu
 * sözleşme üzerinden çalışır.
 *
 * ÖNEMLİ (iş süreci): DEGA'nın e-postasına göre B4B bağlantısının
 * tam olarak aktif olması için imzalı Gizlilik Protokolü + KVKK
 * Aydınlatma Metni + imza sirküleri asıllarının DEGA'ya gönderilmesi
 * VE firmanın statik IP adresinin paylaşılması gerekiyor. Bu adımlar
 * tamamlanmadan bu istemci muhtemelen 401/yetkisiz veya IP engeli
 * hatası alır — bu normaldir, kod hatası değildir.
 */

import type { NormalizedSupplierProduct, SupplierClient } from "./types";

interface DegaMessageItem {
  Kind?: string;
  Msg?: string;
  Input?: string;
}

interface DegaEnvelope<T> {
  d?: T;
  data?: T;
  message?: { Items?: DegaMessageItem[] };
  status?: "succeeded" | "failed" | string;
}

interface DegaConfig {
  baseUrl: string;
  email: string;
  password: string;
}

function getDegaConfig(): DegaConfig {
  const baseUrl = process.env.DEGA_B4B_BASE_URL;
  const email = process.env.DEGA_B4B_EMAIL;
  const password = process.env.DEGA_B4B_PASSWORD;

  if (!baseUrl || !email || !password) {
    throw new Error(
      "DEGA B4B kimlik bilgileri eksik: DEGA_B4B_BASE_URL, DEGA_B4B_EMAIL, DEGA_B4B_PASSWORD ortam değişkenlerini .env.local içinde tanımlayın.",
    );
  }

  return { baseUrl: baseUrl.replace(/\/+$/, ""), email, password };
}

// Süreç içi (in-memory) SessionId önbelleği. DEGA dokümantasyonu
// oturum süresini belirtmiyor; bu yüzden konservatif bir TTL
// kullanıyoruz ve her isteğin "failed" dönmesi durumunda otomatik
// olarak yeniden login deniyoruz (bkz. degaRequest).
let cachedSession: { sessionId: string; obtainedAt: number } | null = null;
const SESSION_TTL_MS = 20 * 60 * 1000;

async function degaLogin(): Promise<string> {
  const { baseUrl, email, password } = getDegaConfig();

  const res = await fetch(`${baseUrl}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Email: email, Password: password }),
  });

  if (!res.ok) {
    throw new Error(`DEGA login isteği HTTP ${res.status} döndü.`);
  }

  const data = (await res.json()) as DegaEnvelope<string>;

  if (data.status !== "succeeded" || !data.d) {
    throw new Error(
      `DEGA login başarısız: ${JSON.stringify(data.message ?? data)}`,
    );
  }

  cachedSession = { sessionId: data.d, obtainedAt: Date.now() };
  return data.d;
}

async function getDegaSessionId(forceRefresh = false): Promise<string> {
  if (
    !forceRefresh &&
    cachedSession &&
    Date.now() - cachedSession.obtainedAt < SESSION_TTL_MS
  ) {
    return cachedSession.sessionId;
  }
  return degaLogin();
}

async function degaRequest<T>(
  path: string,
  body: unknown,
  allowRetry = true,
): Promise<DegaEnvelope<T>> {
  const { baseUrl } = getDegaConfig();
  const sessionId = await getDegaSessionId();

  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      SessionId: sessionId,
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as DegaEnvelope<T>;

  // Oturum süresi dolmuş olabilir — bir kez daha login deneyip tekrar dene.
  if (data.status !== "succeeded" && allowRetry) {
    await getDegaSessionId(true);
    return degaRequest<T>(path, body, false);
  }

  return data;
}

export interface DegaProductListParams {
  searchText?: string;
  productCode?: string;
  pageNo?: number;
  pageLen?: number;
}

/**
 * Gerçek alan isimleri henüz doğrulanmadı — ilk canlı çağrıdan sonra
 * bu tipi (OEM numarası, fiyat, stok, marka vb. gerçek alan
 * isimleriyle) daraltacağız.
 */
export type DegaRawProduct = Record<string, unknown>;

export async function getDegaProductList(
  params: DegaProductListParams = {},
) {
  const body = {
    SearchText: params.searchText ?? "",
    ProductCode: params.productCode ?? "",
    PageNo: params.pageNo ?? 1,
    PageLen: params.pageLen ?? 100,
  };
  return degaRequest<DegaRawProduct[]>("/api/getProductListService", body);
}

export interface DegaOrderItem {
  productCode: string;
  quantity: number;
  itemExp?: string;
}

/** Gerçek sipariş oluşturur — DEGA tarafında karşılığı olan bir işlemdir, dikkatli kullanılmalı. */
export async function saveDegaCustomOrder(
  orderNote: string,
  referenceNo: string,
  items: DegaOrderItem[],
) {
  const body = {
    OrderNote: orderNote,
    ReferenceNo: referenceNo,
    Items: items.map((i) => ({
      ProductCode: i.productCode,
      Quantity: i.quantity,
      ItemExp: i.itemExp ?? "",
    })),
  };
  return degaRequest<{ OrderNo: string }>("/api/custom_order", body);
}

/** DEGA tarafındaki sepete gerçek ürün ekler — dikkatli kullanılmalı. */
export async function addDegaBasketItems(items: DegaOrderItem[]) {
  const body = {
    Items: items.map((i) => ({
      ProductCode: i.productCode,
      Quantity: i.quantity,
      ItemExp: i.itemExp ?? "",
    })),
  };
  return degaRequest<{ OrderNo: string }>("/api/custom_add_basket", body);
}

// ---------------------------------------------------------------------------
// Ortak tedarikçi sözleşmesi (bkz. ./types.ts)
// ---------------------------------------------------------------------------

/**
 * DEGA'nın ham ürün alanları henüz bilinmiyor (bkz. dosya başındaki not).
 * Canlı bir cevap görüldüğünde bu fonksiyon gerçek alan isimleriyle
 * (ör. raw.ProductCode, raw.OemNumber, raw.Price, raw.Stock) doldurulmalı.
 * O ana kadar bilerek hata fırlatıyor — sessizce yanlış/boş veri üretmesin.
 */
function normalizeDegaProduct(raw: DegaRawProduct): NormalizedSupplierProduct {
  throw new Error(
    `DEGA ürün şeması henüz bilinmiyor: normalizeDegaProduct uygulanmadı (hesap aktivasyonu bekleniyor). Ham veri: ${JSON.stringify(raw)}`,
  );
}

async function fetchProducts(): Promise<NormalizedSupplierProduct[]> {
  const response = await getDegaProductList();
  if (response.status !== "succeeded" || !response.data) {
    throw new Error(
      `DEGA ürün listesi alınamadı: ${JSON.stringify(response.message ?? response)}`,
    );
  }
  return response.data.map(normalizeDegaProduct);
}

export const degaClient: SupplierClient = {
  key: "dega",
  displayName: "DEGA (İler Otomotiv)",
  fetchProducts,
};
