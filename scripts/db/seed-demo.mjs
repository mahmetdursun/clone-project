// Demo amaçlı örnek veri ekler: gerçek bir örnek (daha önce konuştuğumuz
// Fiat Egea ön tampon takviyesi — AYFAR/DEGA/OTODA OEM numarası farkı
// örneği) üzerinden, /urun-detayi/[slug] dinamik rotasının veritabanından
// gerçekten okuduğunu göstermek için.
//
// Tekrar tekrar çalıştırılabilir (idempotent) — önce bu slug'a ait eski
// demo verisini temizler, sonra yeniden ekler.
//
// Kullanım (clone-project kök dizininde):
//   node --env-file=.env.local scripts/db/seed-demo.mjs

import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL tanımlı değil. .env.local dosyasını kontrol edin.");
  process.exit(1);
}

const sql = postgres(databaseUrl);

const SLUG = "fiat-egea-on-tampon-takviyesi";

async function main() {
  console.log("1) Varsa eski demo verisi temizleniyor...");
  const [existing] = await sql`SELECT id FROM master_products WHERE slug = ${SLUG}`;
  if (existing) {
    await sql`DELETE FROM match_review_queue WHERE suggested_master_product_id = ${existing.id}`;
    await sql`DELETE FROM supplier_products WHERE master_product_id = ${existing.id}`;
    await sql`DELETE FROM oem_numbers WHERE master_product_id = ${existing.id}`;
    await sql`DELETE FROM master_products WHERE id = ${existing.id}`;
  }

  console.log("2) Master ürün ekleniyor: Fiat Egea Ön Tampon Takviyesi...");
  const [master] = await sql`
    INSERT INTO master_products (title, slug, category, position, vehicle_brand, vehicle_model, year_from)
    VALUES (
      'Fiat Egea Ön Tampon Takviyesi',
      ${SLUG},
      'on-tampon-takviyeli',
      'ön',
      'Fiat',
      'Egea',
      2015
    )
    RETURNING id
  `;
  console.log("   master_product id:", master.id);

  console.log("3) OEM numaraları ekleniyor (DEGA'nın verdiği 735750650 ile bizim referansımız 735750652)...");
  await sql`
    INSERT INTO oem_numbers (master_product_id, raw_number, normalized_number, source)
    VALUES
      (${master.id}, '735750650', '735750650', 'dega'),
      (${master.id}, '735750652', '735750652', 'manual')
  `;

  console.log("4) Örnek DEGA tedarikçi ürünü ekleniyor (FIA07EG040)...");
  const [supplierProduct] = await sql`
    INSERT INTO supplier_products (
      supplier_key, supplier_sku, raw_title, brand, price, currency,
      raw_oem_numbers, match_status, master_product_id
    )
    VALUES (
      'dega', 'FIA07EG040', 'F. SDN/HB./SW 20- ÖN TAMPON TAKVİYELİ', 'DEGA',
      450.00, 'TRY', '735750650', 'needs_review', ${master.id}
    )
    RETURNING id
  `;
  console.log("   supplier_product id:", supplierProduct.id);

  console.log("5) İnceleme kaydı ekleniyor (tek kaynaktan OEM eşleşmesi, doğrulama bekliyor)...");
  await sql`
    INSERT INTO match_review_queue (supplier_product_id, suggested_master_product_id, reason, confidence_score, status)
    VALUES (
      ${supplierProduct.id}, ${master.id},
      'OEM 735750650 tek kaynaktan (DEGA) geldi, ikinci bir kaynakla doğrulanmadı.',
      55.00, 'pending'
    )
  `;

  console.log("\n✅ Tamamlandı. Şimdi (npm run dev çalışırken) tarayıcıda şunu açabilirsiniz:");
  console.log(`   http://localhost:3000/urun-detayi/${SLUG}`);

  await sql.end();
}

main().catch(async (err) => {
  console.error("Hata:", err);
  await sql.end();
  process.exit(1);
});
