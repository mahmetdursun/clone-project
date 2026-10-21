"use server";

/**
 * Eşleştirme inceleme kuyruğu için server action'lar.
 *
 * "admin" olarak sabit değer kullanıyoruz — henüz bir staff/kullanıcı
 * giriş sistemi yok. Gerçek bir yetkilendirme eklendiğinde reviewedBy
 * gerçek kullanıcı kimliğiyle doldurulmalı.
 */

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db/client";
import { matchReviewQueue, supplierProducts } from "@/lib/db/schema";

const REVIEW_QUEUE_PATH = "/admin/eslesme-kuyrugu";

export async function approveMatch(reviewId: string) {
  const db = getDb();
  const [review] = await db
    .select()
    .from(matchReviewQueue)
    .where(eq(matchReviewQueue.id, reviewId));

  if (!review) {
    throw new Error("İnceleme kaydı bulunamadı.");
  }

  await db
    .update(matchReviewQueue)
    .set({ status: "approved", reviewedAt: new Date(), reviewedBy: "admin" })
    .where(eq(matchReviewQueue.id, reviewId));

  if (review.suggestedMasterProductId) {
    await db
      .update(supplierProducts)
      .set({
        matchStatus: "manually_matched",
        masterProductId: review.suggestedMasterProductId,
      })
      .where(eq(supplierProducts.id, review.supplierProductId));
  }

  revalidatePath(REVIEW_QUEUE_PATH);
}

export async function rejectMatch(reviewId: string) {
  const db = getDb();
  const [review] = await db
    .select()
    .from(matchReviewQueue)
    .where(eq(matchReviewQueue.id, reviewId));

  if (!review) {
    throw new Error("İnceleme kaydı bulunamadı.");
  }

  await db
    .update(matchReviewQueue)
    .set({ status: "rejected", reviewedAt: new Date(), reviewedBy: "admin" })
    .where(eq(matchReviewQueue.id, reviewId));

  await db
    .update(supplierProducts)
    .set({ matchStatus: "rejected", masterProductId: null })
    .where(eq(supplierProducts.id, review.supplierProductId));

  revalidatePath(REVIEW_QUEUE_PATH);
}
