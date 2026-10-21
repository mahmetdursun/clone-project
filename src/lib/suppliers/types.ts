/**
 * Tüm tedarikçi istemcilerinin uyacağı ortak sözleşme (contract).
 *
 * Neden gerekli? 20+ tedarikçinin her biri kendi API şeklini kullanıyor
 * (DEGA REST-benzeri çoklu endpoint, Delta tek "genel" endpoint + FunctionName
 * vb.). Bu farklılığı her tedarikçi modülünün İÇİNDE tutuyoruz; dışarıya
 * (veritabanı senkronizasyon işine, eşleştirme motoruna) hep aynı, sade
 * `NormalizedSupplierProduct` şeklini veriyoruz. Böylece yeni bir tedarikçi
 * eklemek = sadece bu sözleşmeyi uygulayan bir modül eklemek demek oluyor;
 * geri kalan sistemin hiçbir yerini değiştirmeye gerek kalmıyor.
 */

export interface NormalizedSupplierProduct {
  /** Tedarikçinin kendi ürün kodu/SKU'su (örn. DEGA'da "FIA07EG040"). */
  supplierSku: string;
  /** Tedarikçiden geldiği gibi ham başlık — sitede gösterilmez, sadece eşleştirme/inceleme için. */
  rawTitle: string;
  /** Parça markası (varsa) — örn. "AYFAR". */
  brand?: string;
  price?: number;
  /** Varsayılan TRY, tedarikçi başka bir para birimi kullanıyorsa override edin. */
  currency?: string;
  stockQuantity?: number;
  /** Tedarikçiden gelen ham OEM numarası/numaraları — virgülle ayrılmış, normalize edilmemiş. */
  rawOemNumbers?: string;
}

export interface SupplierClient {
  /** Kayıt anahtarı — src/lib/db/schema.ts'teki supplierProducts.supplierKey ile birebir aynı olmalı. */
  key: string;
  /** İnsan-okunur görünen ad. */
  displayName: string;
  /**
   * Tedarikçiden ürün listesini çekip normalize edilmiş forma çevirir.
   * Gerçek alan isimleri henüz bilinmiyorsa (canlı bir cevap görülmediyse),
   * bu fonksiyon açık bir hata fırlatmalı — sessizce boş/yanlış veri
   * dönmemeli.
   */
  fetchProducts(): Promise<NormalizedSupplierProduct[]>;
}
