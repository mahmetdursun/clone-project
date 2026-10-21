// Asset downloader for sonparca.com (/) clone
// site-key: sonparca-com-32cbe5a4 | page-key: root-8a5edab2
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_ROOT = path.resolve(
  process.cwd(),
  "public/sites/sonparca-com-32cbe5a4"
);
const SHARED = path.join(OUT_ROOT, "shared");
const PAGE = path.join(OUT_ROOT, "root-8a5edab2");

const shared = {
  "logo.svg": "https://www.sonparca.com/assets/images/sonparca-logo-5.svg",
  "favicon.ico": "https://www.sonparca.com/favicon.ico",
  "favicon.svg": "https://www.sonparca.com/favicon.svg",
  "favicon-16.png": "https://www.sonparca.com/favicon-16.png",
  "favicon-32.png": "https://www.sonparca.com/favicon-32.png",
  "apple-touch-icon.png": "https://www.sonparca.com/apple-touch-icon.png",
  "sm-instagram.webp": "https://www.sonparca.com/assets/sm/instagram_16x16.webp",
  "sm-facebook.webp": "https://www.sonparca.com/assets/sm/facebook_16x16.webp",
  "sm-x.webp": "https://www.sonparca.com/assets/sm/x_16x16.webp",
  "mp-trendyol.webp": "https://www.sonparca.com/assets/sm/trendyol.webp",
  "mp-hepsiburada.webp": "https://www.sonparca.com/assets/sm/hepsiburada.webp",
  "mp-n11.webp": "https://www.sonparca.com/assets/sm/n11.webp",
  "mp-ptavm.webp": "https://www.sonparca.com/assets/sm/pttavm.webp",
  "mp-pazarama.webp": "https://www.sonparca.com/assets/sm/pazarama.webp",
};

const categories = {
  "yag-filtresi": "https://www.sonparca.com/assets/images/categories/yag-filtresi_150x150.webp",
  "hava-filtresi": "https://www.sonparca.com/assets/images/categories/hava-filtresi_150x150.webp",
  "polen-filtresi": "https://www.sonparca.com/assets/images/categories/polen-filtresi_150x150.webp",
  "mazot-filtreleri": "https://www.sonparca.com/assets/images/categories/mazot-filtreleri_150x150.webp",
  "benzin-filtreleri": "https://www.sonparca.com/assets/images/categories/benzin-filtreleri_150x150.webp",
  "oto-bakim-urunleri": "https://www.sonparca.com/assets/images/categories/oto-bakim-urunleri_150x150.webp",
  "vites-kolu-ve-parcalari": "https://www.sonparca.com/assets/images/categories/vites-kolu-ve-parcalari_150x150.webp",
  "ampuller-aydinlatma-urunleri": "https://www.sonparca.com/assets/images/categories/ampuller-aydinlatma-urunleri_150x150.webp",
  "on-fren-balatasi": "https://www.sonparca.com/assets/images/categories/on-fren-balatasi_150x150.webp",
  "arka-fren-balatasi": "https://www.sonparca.com/assets/images/categories/arka-fren-balatasi_150x150.webp",
  "on-fren-diski": "https://www.sonparca.com/assets/images/categories/on-fren-diski_150x150.webp",
  "buji": "https://www.sonparca.com/assets/images/categories/buji_150x150.webp",
  "bobin": "https://www.sonparca.com/assets/images/categories/bobin_150x150.webp",
  "sensorler-musurler": "https://www.sonparca.com/assets/images/categories/sensorler-musurler_150x150.webp",
  "aku": "https://www.sonparca.com/assets/images/categories/aku_150x150.webp",
  "debriyaj-seti": "https://www.sonparca.com/assets/images/categories/debriyaj-seti_150x150.webp",
  "devirdaim": "https://www.sonparca.com/assets/images/categories/devirdaim_150x150.webp",
  "v-kayis": "https://www.sonparca.com/assets/images/categories/v-kayis_150x150.webp",
  "triger-seti": "https://www.sonparca.com/assets/images/categories/triger-seti_150x150.webp",
  "radyator": "https://www.sonparca.com/assets/images/categories/radyator_150x150.webp",
  "amortisor": "https://www.sonparca.com/assets/images/categories/amortisor_150x150.webp",
  "motor-yagi": "https://www.sonparca.com/assets/images/categories/motor-yagi_150x150.webp",
  "sanziman-yagi": "https://www.sonparca.com/assets/images/categories/sanziman-yagi_150x150.webp",
  "antifriz": "https://www.sonparca.com/assets/images/categories/antifriz_150x150.webp",
  "far": "https://www.sonparca.com/assets/images/categories/far_150x150.webp",
  "stop": "https://www.sonparca.com/assets/images/categories/stop_150x150.webp",
  "sis-lambalari": "https://www.sonparca.com/assets/images/categories/sis-lambalari_150x150.webp",
  "silecek": "https://www.sonparca.com/assets/images/categories/silecek_150x150.webp",
  "ayna": "https://www.sonparca.com/assets/images/categories/ayna_150x150.webp",
  "klima-kompresoru": "https://www.sonparca.com/assets/images/categories/klima-kompresoru_150x150.webp",
  "on-tampon": "https://www.sonparca.com/assets/images/categories/on-tampon_150x150.webp",
  "arka-tampon": "https://www.sonparca.com/assets/images/categories/arka-tampon_150x150.webp",
  "camurluk-sinyali": "https://www.sonparca.com/assets/images/categories/camurluk-sinyali_150x150.webp",
  "reflektor": "https://www.sonparca.com/assets/images/categories/reflektor_150x150.webp",
  "davlumbaz": "https://www.sonparca.com/assets/images/categories/davlumbaz_150x150.webp",
  "camurluk": "https://www.sonparca.com/assets/images/categories/camurluk_150x150.webp",
};
// termostat has no confirmed URL from the sweep; fall back to the same categories folder pattern
categories["termostat"] = "https://www.sonparca.com/assets/images/categories/termostat_150x150.webp";

const page = {
  "hero-slide-1.webp": "https://www.sonparca.com/storage/contents/marketplace/17/2026/8/27/d2a73c14-cb3c-46db-9a89-004fc6d22c31.webp",
  "hero-slide-2.webp": "https://www.sonparca.com/storage/contents/marketplace/17/2026/8/29/99c5425a-1724-4466-bb56-fd2f1526e859.webp",
  "product-01.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/2/91f6262b-ece9-411f-ab50-b516b0cc133c.webp",
  "product-02.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/4/8ed3d12d-276a-4e58-bcac-a1cbc0a7f380.webp",
  "product-03.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/3/efe303b8-ed2b-4589-aca3-c8d3784e22d6.webp",
  "product-04.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/4/6829de3f-2c43-4d50-8aaa-3815995c316e.webp",
  "product-05.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/2/e15afffc-260f-4370-9e63-5544d29da033.webp",
  "product-06.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/2/a42d2e48-9a49-4787-a0d3-9c25f6963615.webp",
  "product-07.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/3/26e17a04-1207-424f-9615-c1446ca6ebff.webp",
  "product-08.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/2/b655028e-75bc-45b3-979a-7b89329b52bf.webp",
  "product-09.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/2/8eb46096-40f4-46a6-9f15-f674f0475177.webp",
  "product-10-battery.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/17/ffe8c580-fddd-44b0-af94-9a962bf9b0ad.webp",
  "product-11-salincak-1.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/2/d09111a8-9b95-4d67-a8b5-2c6ab8afb0d7.webp",
  "product-12-salincak-2.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/4/de6add67-2b8c-4739-9ee0-ebf2bd1ca9e2.webp",
  "product-13-sis-bakalit.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/4/07e1d33c-412a-48e4-9961-3125b51d9e9c.webp",
  "product-14-silecek.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/4/af2665a2-1089-4fda-af83-820489500f5b.webp",
  "product-15-salincak-3.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/2/845c8620-78ff-4e52-aa6f-b18ee4d63697.webp",
  "product-16-salincak-4.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/2/4e015d45-e4c2-48f5-8547-f8d85fd26fb8.webp",
  "product-17-buji.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/4/6436fbdb-c022-4919-a35e-d49aa23042d0.webp",
};

async function download(url, dest) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`SKIP (${res.status}): ${url}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    console.log(`OK: ${path.basename(dest)}`);
    return true;
  } catch (err) {
    console.warn(`FAIL: ${url} — ${err.message}`);
    return false;
  }
}

async function runBatch(entries, dir) {
  await mkdir(dir, { recursive: true });
  const list = Object.entries(entries);
  const batchSize = 4;
  for (let i = 0; i < list.length; i += batchSize) {
    const batch = list.slice(i, i + batchSize);
    await Promise.all(
      batch.map(([name, url]) => download(url, path.join(dir, name)))
    );
  }
}

async function main() {
  await runBatch(shared, SHARED);
  await mkdir(path.join(PAGE, "categories"), { recursive: true });
  await runBatch(
    Object.fromEntries(
      Object.entries(categories).map(([k, v]) => [`categories/${k}.webp`, v])
    ),
    PAGE
  );
  await runBatch(page, path.join(PAGE, "images"));
}

main();
