import { desc, eq } from "drizzle-orm";

import { getDb } from "@/lib/db/client";
import { masterProducts, matchReviewQueue, supplierProducts } from "@/lib/db/schema";
import { approveMatch, rejectMatch } from "./actions";

/**
 * Eşleştirme inceleme kuyruğu — bir insan (staff) tarafından onaylanması
 * gereken tedarikçi ürünü ↔ master ürün eşleştirmelerini listeler.
 *
 * Buraya düşen kayıtlar src/lib/matching (eşleştirme motoru) tarafından
 * "needs_review" olarak işaretlenmiş kayıtlardır — ya tek kaynaktan gelen
 * bir OEM eşleşmesi (ikinci bir kaynakla doğrulanmamış), ya çelişkili OEM
 * numaraları, ya da hiç OEM'i olmayıp sadece isim/araç benzerliğiyle
 * önerilen bir eşleşme.
 *
 * Dahili bir araç olduğu için müşteri sitesinin header/footer'ını
 * kullanmıyor — henüz bir staff giriş sistemi de yok (bkz. actions.ts).
 */
export const dynamic = "force-dynamic";

async function getPendingReviews() {
  const db = getDb();
  return db
    .select({
      reviewId: matchReviewQueue.id,
      reason: matchReviewQueue.reason,
      confidenceScore: matchReviewQueue.confidenceScore,
      createdAt: matchReviewQueue.createdAt,
      supplierProductId: supplierProducts.id,
      supplierKey: supplierProducts.supplierKey,
      supplierSku: supplierProducts.supplierSku,
      rawTitle: supplierProducts.rawTitle,
      rawOemNumbers: supplierProducts.rawOemNumbers,
      price: supplierProducts.price,
      currency: supplierProducts.currency,
      suggestedTitle: masterProducts.title,
      suggestedSlug: masterProducts.slug,
    })
    .from(matchReviewQueue)
    .innerJoin(supplierProducts, eq(matchReviewQueue.supplierProductId, supplierProducts.id))
    .leftJoin(masterProducts, eq(matchReviewQueue.suggestedMasterProductId, masterProducts.id))
    .where(eq(matchReviewQueue.status, "pending"))
    .orderBy(desc(matchReviewQueue.createdAt));
}

export default async function ReviewQueuePage() {
  const pendingReviews = await getPendingReviews();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">Eşleştirme İnceleme Kuyruğu</h1>
      <p className="mt-1 text-sm text-gray-500">
        {pendingReviews.length} bekleyen kayıt — eşleştirme motorunun otomatik
        onaylayamadığı, insan kararı gereken tedarikçi ürünleri.
      </p>

      {pendingReviews.length === 0 ? (
        <p className="mt-8 rounded-md border border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">
          Bekleyen inceleme yok.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {pendingReviews.map((item) => (
            <div
              key={item.reviewId}
              className="rounded-lg border border-gray-200 p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                    {item.supplierKey} · {item.supplierSku}
                  </p>
                  <p className="mt-0.5 font-medium text-gray-900">{item.rawTitle}</p>
                  {item.rawOemNumbers ? (
                    <p className="mt-0.5 text-sm text-gray-500">
                      OEM: {item.rawOemNumbers}
                    </p>
                  ) : null}
                  {item.price ? (
                    <p className="mt-0.5 text-sm text-gray-500">
                      {item.price} {item.currency}
                    </p>
                  ) : null}
                </div>
                {item.confidenceScore ? (
                  <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                    %{item.confidenceScore} güven
                  </span>
                ) : null}
              </div>

              <div className="mt-3 rounded-md bg-gray-50 p-3 text-sm">
                <p className="text-gray-500">
                  <span className="font-medium text-gray-700">Önerilen eşleşme: </span>
                  {item.suggestedTitle ?? "Yok — yeni master ürün gerekebilir"}
                </p>
                <p className="mt-1 text-gray-500">
                  <span className="font-medium text-gray-700">Sebep: </span>
                  {item.reason}
                </p>
              </div>

              <div className="mt-3 flex gap-2">
                <form action={approveMatch.bind(null, item.reviewId)}>
                  <button
                    type="submit"
                    className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
                  >
                    Onayla
                  </button>
                </form>
                <form action={rejectMatch.bind(null, item.reviewId)}>
                  <button
                    type="submit"
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Reddet
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
