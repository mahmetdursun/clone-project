// Asset downloader for sonparca.com (/on-tampon) clone
// site-key: sonparca-com-32cbe5a4 | page-key: on-tampon-9ed11181
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_ROOT = path.resolve(
  process.cwd(),
  "public/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181"
);

// Real product images captured from https://www.sonparca.com/on-tampon page 1 (20 results)
const products = {
  "product-01.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/4/57a64ff8-aad4-4985-a486-047a5de3a6f0.webp?r=300",
  "product-02.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/4/b137ac40-8aa1-4e26-a4e6-cb0bbbcc3b4d.webp?r=300",
  "product-03.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/5/e68bc0f4-66f1-4b5f-aab2-2727401b88d3.webp?r=300",
  "product-04.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/5/9bf2c0ad-4a60-47f2-a989-9d0d61356b88.webp?r=300",
  "product-05.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/5/c20d4f7a-2ed6-42ed-bd5b-a4c27266cfc3.webp?r=300",
  "product-06.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/5/34345b62-7dd0-4d61-a9de-a1c13904500f.webp?r=300",
  "product-07.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/5/b498dfda-f979-4285-b453-21514443f53a.webp?r=300",
  "product-08.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/5/c3618393-a6da-488b-8580-dd5b8010e2a0.webp?r=300",
  "product-09.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/4/c0c5829c-75f9-40b8-9bcc-0e64cb741435.webp?r=300",
  "product-10.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/4/34e2e89b-f7bf-4c27-a777-a04b3d060b3a.webp?r=300",
  "product-11.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/5/ae2b7991-c74c-48b6-9ead-d08a84a5b6bf.webp?r=300",
  "product-12.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/5/a1649ed8-07a0-48cc-bc50-4fbfc5680224.webp?r=300",
  "product-13.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/5/42f6f021-bf37-4221-beac-05bcc34cff4d.webp?r=300",
  "product-14.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/4/b8747b0b-1b85-4bfc-835e-ca6d1f879276.webp?r=300",
  "product-15.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/5/6476bf17-8eda-42f5-81d0-a229043768d9.webp?r=300",
  "product-16.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/5/07eaf237-6b2b-4639-b026-e325be23750f.webp?r=300",
  "product-17.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/5/f402461f-4162-4a89-a53a-69aa7bb8c3e7.webp?r=300",
  "product-18.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/5/d3a8f586-d747-46be-ad5a-3e5769fc81c9.webp?r=300",
  "product-19.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/5/2d52d096-4623-486d-b6a3-a93f64fe7062.webp?r=300",
  "product-20.webp": "https://www.sonparca.com/storage/contents/marketplace/4/2026/9/5/d44e0c1c-b083-4670-8334-863bb9aa4d41.webp?r=300",
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
  await runBatch(products, path.join(OUT_ROOT, "images"));
}

main();
