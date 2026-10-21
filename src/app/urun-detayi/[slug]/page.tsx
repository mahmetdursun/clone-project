import { cache } from "react";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getDb } from "@/lib/db/client";
import { masterProducts, oemNumbers, supplierProducts } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";

/**
 * Gerçek, veritabanı destekli ürün sayfası — bosch-yag-filtresi-... altındaki
 * statik/hardcoded klon sayfasının aksine, bu rota `master_products`
 * tablosundan slug'a göre okur. Milyonlarca ürünü build-time'da önceden
 * üretmek mümkün olmadığı için bilerek dinamik (her istekte render edilir).
 *
 * Şu an sadece DB'de bulunan ham alanları (başlık, kategori, araç
 * uyumluluğu, OEM numaraları, eşleşen tedarikçi ürünleri) gösteriyor —
 * bosch sayfasındaki pixel-perfect galeri/FAQ/vb. bölümler henüz yok,
 * çünkü onlar gerçek tedarikçi verisi (görsel, açıklama, teknik özellik)
 * gelmeden anlamlı şekilde doldurulamaz. Gerçek veri aktıkça bu sayfa
 * bosch sayfasındaki bileşenlerle (ProductGallery, ProductBuyBox vb.)
 * zenginleştirilecek.
 */
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const getProductBySlug = cache(async (slug: string) => {
  const db = getDb();
  const [master] = await db
    .select()
    .from(masterProducts)
    .where(eq(masterProducts.slug, slug))
    .limit(1);

  if (!master) return null;

  const [oems, suppliers] = await Promise.all([
    db.select().from(oemNumbers).where(eq(oemNumbers.masterProductId, master.id)),
    db
      .select()
      .from(supplierProducts)
      .where(eq(supplierProducts.masterProductId, master.id)),
  ]);

  return { master, oems, suppliers };
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProductBySlug(slug);
  if (!data) return {};

  const { master } = data;
  const fitment = [master.vehicleBrand, master.vehicleModel].filter(Boolean).join(" ");

  return {
    title: `${master.title} | KaportaBizde`,
    description: fitment
      ? `${master.title} — ${fitment} uyumlu yedek parça.`
      : master.title,
  };
}

const MATCH_STATUS_LABELS: Record<string, string> = {
  unmatched: "Eşleşmedi",
  auto_matched: "Otomatik eşleşti",
  needs_review: "İnceleme bekliyor",
  manually_matched: "Manuel onaylandı",
  rejected: "Reddedildi",
};

const MATCH_STATUS_STYLES: Record<string, string> = {
  unmatched: "bg-gray-100 text-gray-600",
  auto_matched: "bg-emerald-50 text-emerald-700",
  needs_review: "bg-amber-50 text-amber-700",
  manually_matched: "bg-sky-50 text-sky-700",
  rejected: "bg-red-50 text-red-700",
};

export default async function DynamicProductPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getProductBySlug(slug);
  if (!data) notFound();

  const { master, oems, suppliers } = data;
  const fitment = [master.vehicleBrand, master.vehicleModel].filter(Boolean).join(" ");
  const yearRange = master.yearFrom
    ? `${master.yearFrom}${master.yearTo ? `–${master.yearTo}` : "+"}`
    : null;

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto space-y-8 px-4 py-10">
        <div>
          <p className="text-sm text-gray-400">{master.category}</p>
          <h1 className="mt-1 text-2xl font-bold text-light-text-primary">
            {master.title}
          </h1>
          {fitment ? (
            <p className="mt-2 text-sm text-gray-500">
              Uyumlu araç: <span className="font-medium">{fitment}</span>
              {yearRange ? ` (${yearRange})` : null}
              {master.position ? ` · Konum: ${master.position}` : null}
            </p>
          ) : null}
        </div>

        <section>
          <h2 className="text-lg font-semibold text-light-text-primary">
            OEM Numaraları
          </h2>
          {oems.length === 0 ? (
            <p className="mt-2 text-sm text-gray-400">
              Henüz kayıtlı OEM numarası yok.
            </p>
          ) : (
            <ul className="mt-3 flex flex-wrap gap-2">
              {oems.map((oem) => (
                <li
                  key={oem.id}
                  className="rounded-full border border-gray-200 px-3 py-1.5 text-sm"
                >
                  {oem.rawNumber}{" "}
                  <span className="text-gray-400">({oem.source})</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold text-light-text-primary">
            Tedarikçi Ürünleri ({suppliers.length})
          </h2>
          {suppliers.length === 0 ? (
            <p className="mt-2 text-sm text-gray-400">
              Bu ürüne henüz eşleşen bir tedarikçi ürünü yok.
            </p>
          ) : (
            <div className="mt-3 space-y-2">
              {suppliers.map((sp) => (
                <div
                  key={sp.id}
                  className="rounded-md border border-gray-200 p-3 text-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-light-text-primary">
                      {sp.supplierKey.toUpperCase()} — {sp.supplierSku}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                        MATCH_STATUS_STYLES[sp.matchStatus] ?? "bg-gray-100 text-gray-600",
                      )}
                    >
                      {MATCH_STATUS_LABELS[sp.matchStatus] ?? sp.matchStatus}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-500">{sp.rawTitle}</p>
                  {sp.price ? (
                    <p className="mt-1 font-semibold text-light-text-primary">
                      {sp.price} {sp.currency}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
