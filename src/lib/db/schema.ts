/**
 * Ana veritabanı şeması — çapraz tedarikçi ürün eşleştirme (cross-supplier
 * product matching) mimarisi.
 *
 * Neden bu şema? Farklı tedarikçiler (DEGA, Delta, Nekoda, ...) aynı
 * fiziksel parçayı kendi ürün kodları, kendi marka isimleri ve bazen
 * birbirinden farklı OEM numaralarıyla satıyor (örnek: AYFAR 101133 için
 * Dinamik/İsmail 52113625 derken Nekoda 52145166 diyor; DEGA FIA07EG040
 * ön tampon takviyesi için OEM 735750650 derken bizim referansımız
 * 735750652 diyor — muhtemelen revizyon/supersession farkı).
 *
 * Bu yüzden "tek doğru kaynak" tek bir tedarikçi değil — bizim kendi
 * `masterProducts` tablomuz. Her tedarikçinin ürünü (`supplierProducts`)
 * bu master ürüne bir eşleştirme (match) ile bağlanır; eşleştirme
 * otomatik (yüksek güvenilirlik), kuyruğa alınmış (staff onayı bekliyor)
 * ya da hiç yapılmamış olabilir.
 *
 * Akış özeti:
 *   1) Tedarikçiden ürün çekilir → supplierProducts'a ham haliyle yazılır
 *      (masterProductId = null, matchStatus = 'unmatched').
 *   2) Eşleştirme motoru (bkz. src/lib/matching) normalize edilmiş OEM
 *      numaralarını masterProducts + oemNumbers'a karşı dener.
 *      - 2+ bağımsız kaynak aynı OEM'de birleşiyorsa → otomatik eşleştir.
 *      - Tek kaynak ya da çelişki varsa → matchReviewQueue'ya düşer.
 *      - OEM yoksa → araç uyumluluğu + kategori + metin benzerliğiyle
 *        öneri üretilir, yine review queue'ya düşer (insan onayı şart).
 *   3) Bir insan "X OEM'i = Y OEM'i, aynı parça" derse bu kalıcı olarak
 *      oemEquivalences'a yazılır ve bir daha asla yeniden sorulmaz.
 */

import {
  pgTable,
  uuid,
  text,
  integer,
  numeric,
  boolean,
  timestamp,
  pgEnum,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Enumlar
// ---------------------------------------------------------------------------

/**
 * Bir tedarikçi ürününün master ürüne eşleştirme durumu.
 * - unmatched: henüz hiç eşleştirme denenmedi / hiçbir aday bulunamadı.
 * - auto_matched: 2+ bağımsız kaynak aynı OEM'de birleşti, otomatik onaylandı.
 * - needs_review: bir aday var ama insan onayı bekliyor (tek kaynak/çelişki/fuzzy).
 * - manually_matched: bir çalışan review queue'dan onayladı.
 * - rejected: bir çalışan önerilen eşleştirmeyi reddetti (yanlış eşleştirme).
 */
export const matchStatusEnum = pgEnum("match_status", [
  "unmatched",
  "auto_matched",
  "needs_review",
  "manually_matched",
  "rejected",
]);

export const reviewQueueStatusEnum = pgEnum("review_queue_status", [
  "pending",
  "approved",
  "rejected",
]);

// ---------------------------------------------------------------------------
// masterProducts — kanonik/tek doğru ürün kaydı
// ---------------------------------------------------------------------------

export const masterProducts = pgTable("master_products", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Kanonik başlık — sitede gösterilecek, tedarikçi isimlendirmesinden
  // bağımsız, bizim belirlediğimiz isim (örn. "Fiat Egea Ön Tampon Takviyesi").
  title: text("title").notNull(),

  // URL'de kullanılan benzersiz slug (örn. "fiat-egea-on-tampon-takviyesi").
  // /urun-detayi/[slug] rotası bununla arar.
  slug: text("slug").notNull(),

  // Parça kategorisi (örn. "on-tampon-takviyeli", "yag-filtresi").
  // Kategori taksonomisi ayrı bir tabloya taşınabilir, şimdilik düz metin.
  category: text("category").notNull(),

  // Araca göre konum (örn. "ön", "arka-sol") — bazı parçalar için anlamsız,
  // o zaman null.
  position: text("position"),

  // Araç uyumluluğu: VEHICLE_SPECS ile aynı sözlükten brand/model isimleri
  // kullanılır ki bakim-robotu cascade'iyle tutarlı kalsın.
  vehicleBrand: text("vehicle_brand"),
  vehicleModel: text("vehicle_model"),
  // Yıl aralığı (üretici revizyonlarını da kapsayabilsin diye min/max).
  yearFrom: integer("year_from"),
  yearTo: integer("year_to"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  slugIdx: uniqueIndex("master_products_slug_idx").on(table.slug),
  categoryIdx: index("master_products_category_idx").on(table.category),
  vehicleIdx: index("master_products_vehicle_idx").on(
    table.vehicleBrand,
    table.vehicleModel,
  ),
}));

// ---------------------------------------------------------------------------
// oemNumbers — bir master ürüne bağlı, birden fazla olabilen OEM numaraları
// ---------------------------------------------------------------------------

export const oemNumbers = pgTable("oem_numbers", {
  id: uuid("id").defaultRandom().primaryKey(),

  masterProductId: uuid("master_product_id")
    .notNull()
    .references(() => masterProducts.id, { onDelete: "cascade" }),

  // Ham OEM numarası (tedarikçiden/kaynaktan geldiği gibi).
  rawNumber: text("raw_number").notNull(),

  // Normalize edilmiş hali (boşluk/tire/baştaki sıfırlar temizlenmiş) —
  // eşleştirme motoru asıl bunu kullanır.
  normalizedNumber: text("normalized_number").notNull(),

  // Bu OEM numarasının kaynağı neresi (örn. "dega", "nekoda", "manual") —
  // birden fazla kaynak aynı numarayı doğruladıysa güven artar.
  source: text("source").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  normalizedIdx: index("oem_numbers_normalized_idx").on(table.normalizedNumber),
  masterProductIdx: index("oem_numbers_master_product_idx").on(table.masterProductId),
}));

// ---------------------------------------------------------------------------
// oemEquivalences — kalıcı, insan onaylı "X OEM'i = Y OEM'i" eşleştirmeleri
// ---------------------------------------------------------------------------

/**
 * Normalize edilmiş OEM numaraları bile bazen aynı fiziksel parça için
 * farklı olabiliyor (üretici revizyonu/supersession, gövde tipi varyantı).
 * Bir insan bir kere "bunlar aynı parça" derse, bu tablo o kararı kalıcı
 * olarak saklar ve eşleştirme motoru bir daha bu ikiliyi insana sormaz.
 */
export const oemEquivalences = pgTable("oem_equivalences", {
  id: uuid("id").defaultRandom().primaryKey(),
  normalizedNumberA: text("normalized_number_a").notNull(),
  normalizedNumberB: text("normalized_number_b").notNull(),
  note: text("note"),
  confirmedBy: text("confirmed_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  pairIdx: uniqueIndex("oem_equivalences_pair_idx").on(
    table.normalizedNumberA,
    table.normalizedNumberB,
  ),
}));

// ---------------------------------------------------------------------------
// supplierProducts — her tedarikçinin kendi ürünü (SKU, fiyat, stok)
// ---------------------------------------------------------------------------

export const supplierProducts = pgTable("supplier_products", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Tedarikçi anahtarı — src/lib/suppliers registry'sindeki key ile aynı
  // olmalı (örn. "dega", "delta", "nekoda").
  supplierKey: text("supplier_key").notNull(),

  // Tedarikçinin kendi ürün kodu (örn. DEGA'da "FIA07EG040").
  supplierSku: text("supplier_sku").notNull(),

  // Tedarikçinin verdiği ham başlık/isim — sitede DEĞİL, sadece eşleştirme
  // ve inceleme için saklanır (kanonik başlık masterProducts'ta).
  rawTitle: text("raw_title").notNull(),

  // Parçanın marka adı (varsa) — örn. "AYFAR". Tedarikçinin kendi markası
  // olabileceği gibi (DEGA kendi markasıyla da satabilir) OEM parça
  // üreticisinin markası da olabilir.
  brand: text("brand"),

  price: numeric("price", { precision: 12, scale: 2 }),
  currency: text("currency").default("TRY"),
  stockQuantity: integer("stock_quantity"),

  // Tedarikçiden gelen ham OEM numarası/numaraları (virgülle ayrılmış ham
  // metin) — normalize edilmiş hali eşleştirme sırasında oemNumbers'a
  // yazılır, burada sadece denetim/izleme amaçlı ham veri tutulur.
  rawOemNumbers: text("raw_oem_numbers"),

  matchStatus: matchStatusEnum("match_status").notNull().default("unmatched"),
  masterProductId: uuid("master_product_id").references(() => masterProducts.id, {
    onDelete: "set null",
  }),

  isActive: boolean("is_active").notNull().default(true),
  lastSyncedAt: timestamp("last_synced_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  supplierSkuIdx: uniqueIndex("supplier_products_supplier_sku_idx").on(
    table.supplierKey,
    table.supplierSku,
  ),
  matchStatusIdx: index("supplier_products_match_status_idx").on(table.matchStatus),
  masterProductIdx: index("supplier_products_master_product_idx").on(
    table.masterProductId,
  ),
}));

// ---------------------------------------------------------------------------
// matchReviewQueue — insan onayı bekleyen eşleştirme önerileri
// ---------------------------------------------------------------------------

export const matchReviewQueue = pgTable("match_review_queue", {
  id: uuid("id").defaultRandom().primaryKey(),

  supplierProductId: uuid("supplier_product_id")
    .notNull()
    .references(() => supplierProducts.id, { onDelete: "cascade" }),

  // Önerilen master ürün (varsa) — hiç aday bulunamadıysa null, o zaman
  // muhtemelen yeni bir master ürün oluşturulması gerekiyordur.
  suggestedMasterProductId: uuid("suggested_master_product_id").references(
    () => masterProducts.id,
    { onDelete: "set null" },
  ),

  // Neden bu öneri yapıldı (insan okuyabilsin diye) — örn.
  // "OEM 735750650 tek kaynaktan geldi (DEGA), doğrulanmadı" ya da
  // "OEM yok, araç uyumluluğu + kategori + metin benzerliğiyle eşleşti (%72)".
  reason: text("reason").notNull(),
  confidenceScore: numeric("confidence_score", { precision: 5, scale: 2 }),

  status: reviewQueueStatusEnum("status").notNull().default("pending"),
  reviewedBy: text("reviewed_by"),
  reviewedAt: timestamp("reviewed_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  statusIdx: index("match_review_queue_status_idx").on(table.status),
  supplierProductIdx: index("match_review_queue_supplier_product_idx").on(
    table.supplierProductId,
  ),
}));
