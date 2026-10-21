/**
 * Çapraz tedarikçi ürün eşleştirme motoru.
 *
 * Bkz. src/lib/db/schema.ts dosya başındaki akış özeti. Bu dosya o akışın
 * "karar verme" kısmını uyguluyor: bir tedarikçi ürünü için hangi master
 * ürüne (varsa) bağlanması gerektiğine karar verir.
 *
 * Kural sırası (güven azalan sırayla):
 *   1) Normalize edilmiş bir OEM numarası, oem_numbers tablosunda 2+
 *      BAĞIMSIZ kaynakta (farklı `source` değeri) aynı master ürüne
 *      işaret ediyorsa → otomatik eşleştir (auto_matched).
 *   2) Tek kaynaktan bir eşleşme varsa, ya da farklı OEM numaraları
 *      birbiriyle çelişen master ürünlere işaret ediyorsa → insan onayı
 *      gerekiyor (needs_review), review queue'ya düşer.
 *   3) Direkt eşleşme yoksa ama bilinen bir OEM eşdeğerliği (oem_equivalences)
 *      üzerinden bir master ürüne ulaşılabiliyorsa → otomatik eşleştir
 *      (bu tablo zaten insan onaylı, kalıcı kararlardan oluşur).
 *   4) Hiçbir OEM verisi yoksa ya da hiçbir eşleşme bulunamadıysa →
 *      unmatched. (Araç uyumluluğu + kategori + metin benzerliğiyle
 *      fuzzy eşleştirme henüz uygulanmadı — bkz. TODO aşağıda.)
 */

import { inArray } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { oemNumbers, oemEquivalences } from "@/lib/db/schema";
import { normalizeOemNumber, parseRawOemNumbers } from "./oem";

export interface MatchInput {
  /** supplier_products.id */
  supplierProductId: string;
  /** supplier_products.raw_oem_numbers (virgülle ayrılmış ham OEM listesi) */
  rawOemNumbers: string | null | undefined;
}

export interface MatchResult {
  status: "auto_matched" | "needs_review" | "unmatched";
  masterProductId?: string;
  /** İnsan-okunur açıklama — review queue'da ve loglarda gösterilir. */
  reason: string;
}

/**
 * Bir tedarikçi ürünü için eşleştirme kararı üretir. Veritabanına YAZMAZ —
 * sadece kararı döner. Yazma işlemi için bkz. applyMatchResult().
 */
export async function matchSupplierProduct(input: MatchInput): Promise<MatchResult> {
  const candidateNumbers = parseRawOemNumbers(input.rawOemNumbers);

  if (candidateNumbers.length === 0) {
    return {
      status: "unmatched",
      reason:
        "OEM numarası yok. Fuzzy eşleştirme (araç uyumluluğu + kategori + metin benzerliği) henüz uygulanmadı — bkz. TODO.",
    };
  }

  const db = getDb();

  // 1) Direkt eşleşme: bu OEM numaralarından biri oem_numbers'ta var mı?
  const directMatches = await db
    .select({
      normalizedNumber: oemNumbers.normalizedNumber,
      masterProductId: oemNumbers.masterProductId,
      source: oemNumbers.source,
    })
    .from(oemNumbers)
    .where(inArray(oemNumbers.normalizedNumber, candidateNumbers));

  if (directMatches.length > 0) {
    const distinctMasterIds = new Set(directMatches.map((m) => m.masterProductId));

    if (distinctMasterIds.size > 1) {
      return {
        status: "needs_review",
        reason: `Çelişkili eşleşme: OEM numaraları (${candidateNumbers.join(", ")}) farklı master ürünlere işaret ediyor (${[...distinctMasterIds].join(", ")}). Bir insan hangisinin doğru olduğuna karar vermeli.`,
      };
    }

    const [masterProductId] = distinctMasterIds;
    const distinctSources = new Set(directMatches.map((m) => m.source));

    if (distinctSources.size >= 2) {
      return {
        status: "auto_matched",
        masterProductId,
        reason: `${distinctSources.size} bağımsız kaynak (${[...distinctSources].join(", ")}) aynı master ürünü doğruladı.`,
      };
    }

    return {
      status: "needs_review",
      masterProductId,
      reason: `Tek kaynaktan (${[...distinctSources][0]}) eşleşme bulundu, ikinci bir kaynakla doğrulanmadı.`,
    };
  }

  // 2) Direkt eşleşme yok — bilinen bir OEM eşdeğerliği üzerinden dene.
  const equivalences = await db
    .select()
    .from(oemEquivalences)
    .where(
      inArray(oemEquivalences.normalizedNumberA, candidateNumbers),
    );
  const equivalencesReverse = await db
    .select()
    .from(oemEquivalences)
    .where(inArray(oemEquivalences.normalizedNumberB, candidateNumbers));

  const equivalentNumbers = [
    ...equivalences.map((e) => e.normalizedNumberB),
    ...equivalencesReverse.map((e) => e.normalizedNumberA),
  ];

  if (equivalentNumbers.length > 0) {
    const equivalentMatches = await db
      .select({
        masterProductId: oemNumbers.masterProductId,
        normalizedNumber: oemNumbers.normalizedNumber,
      })
      .from(oemNumbers)
      .where(inArray(oemNumbers.normalizedNumber, equivalentNumbers));

    if (equivalentMatches.length > 0) {
      const [first] = equivalentMatches;
      return {
        status: "auto_matched",
        masterProductId: first.masterProductId,
        reason: `Bilinen OEM eşdeğerliği üzerinden eşleşti (${first.normalizedNumber}, insan onaylı kalıcı eşleştirme kaydı).`,
      };
    }
  }

  // 3) Hiçbir eşleşme bulunamadı.
  return {
    status: "unmatched",
    reason: `OEM numaraları (${candidateNumbers.join(", ")}) için eşleşen master ürün bulunamadı. Yeni bir master ürün oluşturulması ya da manuel eşleştirme gerekebilir.`,
  };
}

/**
 * İki OEM numarasının aynı fiziksel parça olduğunu kalıcı olarak kaydeder.
 * Bir insan review queue'da "bunlar aynı parça" dediğinde çağrılır — bir
 * daha asla bu ikili için tekrar soru sorulmaz.
 */
export async function recordOemEquivalence(
  numberA: string,
  numberB: string,
  opts: { note?: string; confirmedBy?: string } = {},
) {
  const db = getDb();
  const a = normalizeOemNumber(numberA);
  const b = normalizeOemNumber(numberB);
  await db.insert(oemEquivalences).values({
    normalizedNumberA: a,
    normalizedNumberB: b,
    note: opts.note,
    confirmedBy: opts.confirmedBy,
  });
}

export { normalizeOemNumber, parseRawOemNumbers } from "./oem";

// TODO: Fuzzy eşleştirme — OEM numarası hiç yoksa (bazı Nekoda kayıtlarında
// olduğu gibi, bkz. proje notları) araç uyumluluğu (marka/model/yıl/motor)
// + kategori + metin benzerliği (örn. Levenshtein/trigram) ile bir aday
// üretip DAİMA needs_review olarak review queue'ya düşürecek bir
// matchByFuzzySearch() fonksiyonu eklenecek. Otomatik eşleşme YOK — bu
// yolla bulunan hiçbir eşleşme insan onayı olmadan auto_matched olmamalı.
