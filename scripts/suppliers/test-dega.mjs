// DEGA B4B web servisini test etmek için bağımsız script.
//
// Bulut ortamından (Claude'un çalıştığı sandbox) b4b.de-ga.com.tr
// domainine ağ erişimi kapalı olduğu için bu script SİZİN kendi
// bilgisayarınızda çalıştırılmalı.
//
// Kullanım (proje kök dizininde, clone-project içinde):
//   node --env-file=.env.local scripts/suppliers/test-dega.mjs
//
// .env.local içinde şunlar tanımlı olmalı:
//   DEGA_B4B_BASE_URL=https://b4b.de-ga.com.tr
//   DEGA_B4B_EMAIL=webservice@ilerotomotiv.com
//   DEGA_B4B_PASSWORD=...
//
// Bu script sadece OKUMA yapar (login + ürün listesi), sipariş
// oluşturmaz / sepete ürün eklemez.

const baseUrl = process.env.DEGA_B4B_BASE_URL;
const email = process.env.DEGA_B4B_EMAIL;
const password = process.env.DEGA_B4B_PASSWORD;

if (!baseUrl || !email || !password) {
  console.error(
    "Eksik ortam değişkeni. .env.local içinde DEGA_B4B_BASE_URL, DEGA_B4B_EMAIL, DEGA_B4B_PASSWORD tanımlı olmalı.",
  );
  process.exit(1);
}

async function main() {
  console.log("1) Login deneniyor:", baseUrl + "/api/login");
  const loginRes = await fetch(`${baseUrl}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Email: email, Password: password }),
  });
  console.log("   HTTP status:", loginRes.status);

  let loginData;
  try {
    loginData = await loginRes.json();
  } catch {
    const text = await loginRes.text();
    console.error("   JSON parse edilemedi, ham cevap:\n", text);
    process.exit(1);
  }
  console.log("   Login response:\n", JSON.stringify(loginData, null, 2));

  if (loginData.status !== "succeeded" || !loginData.d) {
    console.error(
      "\nLogin başarısız oldu. Not: DEGA'nın e-postasına göre, imzalı belgeler + statik IP paylaşılmadan bağlantı tam aktif olmayabilir — 401/yetkisiz hatası bu adımın tamamlanmadığı anlamına gelebilir.",
    );
    process.exit(1);
  }

  const sessionId = loginData.d;

  console.log("\n2) Ürün listesi deneniyor (ilk 5 kayıt)...");
  const listRes = await fetch(`${baseUrl}/api/getProductListService`, {
    method: "POST",
    headers: { "Content-Type": "application/json", SessionId: sessionId },
    body: JSON.stringify({ SearchText: "", ProductCode: "", PageNo: 1, PageLen: 5 }),
  });
  console.log("   HTTP status:", listRes.status);

  let listData;
  try {
    listData = await listRes.json();
  } catch {
    const text = await listRes.text();
    console.error("   JSON parse edilemedi, ham cevap:\n", text);
    process.exit(1);
  }

  console.log("   Ürün listesi response:\n", JSON.stringify(listData, null, 2));
  console.log(
    "\nBu çıktıyı olduğu gibi (kimlik bilgisi içermiyor) Claude'a geri yapıştır — ürün objesindeki alan isimlerine (özellikle OEM/OE numarası var mı) bakacağız.",
  );
}

main().catch((err) => {
  console.error("Beklenmeyen hata:", err);
  process.exit(1);
});
