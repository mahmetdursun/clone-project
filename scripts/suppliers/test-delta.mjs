// Delta (eryaz.net) web servisini test etmek için bağımsız script.
//
// Bulut ortamından (Claude'un çalıştığı sandbox) share.eryaz.net
// domainine ağ erişimi kapalı olduğu için bu script SİZİN kendi
// bilgisayarınızda çalıştırılmalı.
//
// Kullanım (proje kök dizininde, clone-project içinde):
//   node --env-file=.env.local scripts/suppliers/test-delta.mjs
//
// .env.local içinde şunlar tanımlı olmalı (şifreyi TIRNAK içinde yazın,
// çünkü içinde # karakteri var — tırnaksız yazılırsa bazı okuyucular
// # sonrasını yorum satırı sanıp keser):
//   DELTA_API_URL=https://share.eryaz.net/api/Integration/getdata
//   DELTA_COMPANY_KEY=30AC3YN4UFHE
//   DELTA_USERNAME=PBM344062
//   DELTA_PASSWORD="vcdul1R}ysFI#7%"
//
// Bu script varsayılan olarak TÜM katalog yerine, e-postada örnek olarak
// verilen tek bir "Delta Kodu" (AYAYB823) ile daraltılmış bir istek
// atar — bu hem daha hızlı hem daha güvenli bir ilk test. Tüm listeyi
// denemek isterseniz: node ... test-delta.mjs --full

const apiUrl = process.env.DELTA_API_URL;
const companyKey = process.env.DELTA_COMPANY_KEY;
const username = process.env.DELTA_USERNAME;
const password = process.env.DELTA_PASSWORD;

if (!apiUrl || !companyKey || !username || !password) {
  console.error(
    "Eksik ortam değişkeni. .env.local içinde DELTA_API_URL, DELTA_COMPANY_KEY, DELTA_USERNAME, DELTA_PASSWORD tanımlı olmalı.",
  );
  process.exit(1);
}

const testFullCatalog = process.argv.includes("--full");
const code = testFullCatalog ? "" : "AYAYB823";

async function main() {
  console.log(
    `1) İstek gönderiliyor: ${apiUrl} (FunctionName=GetList_Product, Code=${JSON.stringify(code)})`,
  );

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      CompanyKey: companyKey,
      FunctionName: "GetList_Product",
      UserName: username,
      Password: password,
      Parameters: { Code: code },
    }),
  });

  console.log("   HTTP status:", res.status);

  let data;
  try {
    data = await res.json();
  } catch {
    const text = await res.text();
    console.error("   JSON parse edilemedi, ham cevap:\n", text);
    process.exit(1);
  }

  console.log("   Response:\n", JSON.stringify(data, null, 2));
  console.log(
    "\nBu çıktıyı olduğu gibi (kimlik bilgisi içermiyor) Claude'a geri yapıştır — cevaptaki alan isimlerine (özellikle OEM/OE numarası var mı) bakacağız.",
  );
}

main().catch((err) => {
  console.error("Beklenmeyen hata:", err);
  process.exit(1);
});
