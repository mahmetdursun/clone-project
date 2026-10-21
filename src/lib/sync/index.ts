/**
 * Tedarikçi ürün senkronizasyonu — ortak giriş noktası.
 *
 * Veri kaynağı ne olursa olsun (bir web servisinden `fetchProducts()` ile
 * gelen liste, ya da bir CSV dosyasından parse edilmiş liste), bu fonksiyon
 * aynı şekilde çalışır: her ürünü `supplier_products`'a yazar (upsert),
 * eşleştirme motorunu (`src/lib/matching`) çalıştırır, ve sonuca göre
 * otomatik eşleştirir ya da `match_review_queue`'ya düşürür.
 *
 * Kullanım örnekleri:
 *   // Web servisli bir tedarikçi:
 *   const products = await getSupplierClient("dega").fetchProducts();
 *   await syncSupplierProducts("dega", products);
 *
 *   // CSV'li bir tedarikçi (bkz. src/lib/suppliers/csv.ts):
 *   const products = parseSupplierCsv(csvText, DINAMIK_COLUMN_MAP);
 *   await syncSupplierProducts("dinamik", products);
 */

import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { matchReviewQueue, supplierProducts } from "@/lib/db/schema";
import { matchSupplierProduct } from "@/lib/matching";
import type { NormalizedSupplierProduct } from "@/lib/suppliers/types";

export interface SyncSummary {
  total: number;
  autoMatched: number;
  needsReview: number;
  unmatched: number;
}

export async function syncSupplierProducts(
  supplierKey: string,
  products: NormalizedSupplierProduct[],
): Promise<SyncSummary> {
  const db = getDb();
  const summary: SyncSummary = {
    total: products.length,
    autoMatched: 0,
    needsReview: 0,
    unmatched: 0,
  };

  for (const product of products) {
    const priceValue = product.price !== undefined ? String(product.price) : undefined;

    const [row] = await db
      .insert(supplierProducts)
      .values({
        supplierKey,
        supplierSku: product.supplierSku,
        rawTitle: product.rawTitle,
        brand: product.brand,
        price: priceValue,
        currency: product.currency ?? "TRY",
        stockQuantity: product.stockQuantity,
        rawOemNumbers: product.rawOemNumbers,
        lastSyncedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [supplierProducts.supplierKey, supplierProducts.supplierSku],
        set: {
          rawTitle: product.rawTitle,
          brand: product.brand,
          price: priceValue,
          currency: product.currency ?? "TRY",
          stockQuantity: product.stockQuantity,
          rawOemNumbers: product.rawOemNumbers,
          lastSyncedAt: new Date(),
          updatedAt: new Date(),
        },
      })
      .returning({ id: supplierProducts.id });

    const matchResult = await matchSupplierProduct({
      supplierProductId: row.id,
      rawOemNumbers: product.rawOemNumbers,
    });

    if (matchResult.status === "auto_matched") {
      await db
        .update(supplierProducts)
        .set({ matchStatus: "auto_matched", masterProductId: matchResult.masterProductId })
        .where(eq(supplierProducts.id, row.id));
      summary.autoMatched++;
      continue;
    }

    if (matchResult.status === "needs_review") {
      await db
        .update(supplierProducts)
        .set({
          matchStatus: "needs_review",
          masterProductId: matchResult.masterProductId ?? null,
        })
        .where(eq(supplierProducts.id, row.id));

      // Aynı ürün için zaten bekleyen bir inceleme kaydı varsa tekrar eklemeyelim.
      const [existingReview] = await db
        .select({ id: matchReviewQueue.id })
        .from(matchReviewQueue)
        .where(
          and(
            eq(matchReviewQueue.supplierProductId, row.id),
            eq(matchReviewQueue.status, "pending"),
          ),
        );

      if (!existingReview) {
        await db.insert(matchReviewQueue).values({
          supplierProductId: row.id,
          suggestedMasterProductId: matchResult.masterProductId,
          reason: matchResult.reason,
        });
      }
      summary.needsReview++;
      continue;
    }

    await db
      .update(supplierProducts)
      .set({ matchStatus: "unmatched" })
      .where(eq(supplierProducts.id, row.id));
    summary.unmatched++;
  }

  return summary;
}
