import fs from "fs";

const oldModels = JSON.parse(fs.readFileSync("./models.json", "utf8"));
const oldBrands = JSON.parse(fs.readFileSync("./brands.json", "utf8"));
const newModelsByBrand = JSON.parse(fs.readFileSync("./new-models.json", "utf8"));

// old-project brand-slug -> exact new-catalog brand string
// (Range Rover has no standalone brand in the new catalog — its real nameplates
// live as models under "Land Rover", so we fold it in here too.)
// Keyed by the old project's BRAND slug (BRANDS[].slug / GROUPS members) —
// NOT the MODELS object key, which differs for Mercedes (see MODELS_KEY_ALIAS
// below, mirroring the old project's own brandKey() function).
const BRAND_SLUG_TO_CATALOG_NAME = {
  abarth: "Abarth", // added separately to the catalog (see add-abarth step)
  alfa: "Alfa Romeo",
  audi: "Audi",
  bmw: "BMW",
  chevrolet: "Chevrolet",
  chrysler: "Chrysler",
  citroen: "Citroen",
  cupra: "Cupra",
  dacia: "Dacia",
  ds: "DS",
  fiat: "Fiat",
  ford: "Ford",
  honda: "Honda",
  hyundai: "Hyundai",
  infiniti: "Infiniti",
  jeep: "Jeep",
  kia: "Kia",
  lancia: "Lancia",
  "land-rover": "Land Rover",
  lexus: "Lexus",
  mercedes: "Mercedes",
  mini: "Mini",
  nissan: "Nissan",
  opel: "Opel",
  peugeot: "Peugeot",
  "range-rover": "Land Rover",
  renault: "Renault",
  seat: "Seat",
  skoda: "Skoda",
  smart: "Smart",
  // tofas: intentionally skipped — its real classic nameplates (Doğan, Şahin,
  // Kartal) are already filed under "Fiat" in the new catalog.
  toyota: "Toyota",
  volkswagen: "Volkswagen",
  volvo: "Volvo",
};

// old project's brandKey(): MODELS is keyed differently from BRANDS.slug only
// for Mercedes-Benz ("mercedes" brand slug -> "mercedes-benz" MODELS key).
const MODELS_KEY_ALIAS = { mercedes: "mercedes-benz" };

function cleanToken(s) {
  return String(s)
    .toLocaleLowerCase("tr")
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function tokenize(s) {
  return String(s)
    .replace(/serisi\b/gi, "")
    .split(/[\s/\-]+/)
    .map(cleanToken)
    .filter(Boolean);
}

function normalize(s) {
  return tokenize(s).join("");
}

// Whole-token subset match: every token of the shorter list must appear as an
// EXACT token in the longer list (order-independent). This is what lets
// "A4 Allroad" / "RS Q3" / "Range Rover Sport" correctly reuse their base
// model's photo, while refusing substring collisions like "GL" inside "GLA"
// or "63" inside chassis code "w463" (those are different real models / not
// a model name at all, so showing GLA's photo for "GL" would be wrong).
function tokenSubsetMatch(tokensA, tokensB) {
  const [shorter, longer] = tokensA.length <= tokensB.length ? [tokensA, tokensB] : [tokensB, tokensA];
  if (shorter.length === 0) return false;
  const longerSet = new Set(longer);
  return shorter.every((t) => longerSet.has(t));
}

function stripGenSuffix(name) {
  // "A3 (1997-2003)" -> "A3" ; "S2000 (1999-2009)" -> "S2000"
  return name.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

function yearFromSlug(slug) {
  const m = String(slug).match(/(\d{4})/);
  return m ? Number(m[1]) : 0;
}

// ---- 1. Build logo map -----------------------------------------------------
const logoByOldSlug = {};
for (const b of oldBrands) {
  const slug = (b.slug || b.name).toLowerCase();
  logoByOldSlug[slug] = b.logo;
}

const BRAND_LOGO_MAP = {};
for (const [oldSlug, catalogName] of Object.entries(BRAND_SLUG_TO_CATALOG_NAME)) {
  if (logoByOldSlug[oldSlug]) {
    BRAND_LOGO_MAP[catalogName] = logoByOldSlug[oldSlug];
  }
}
// Abarth logo exists in old BRANDS even though it had no MODELS entry
if (logoByOldSlug["abarth"]) BRAND_LOGO_MAP["Abarth"] = logoByOldSlug["abarth"];

// ---- 2. Build per-brand base-model -> representative image ----------------
// old brand slug -> { normalizedBaseName -> {img, bestYear, displayName} }
const oldBaseModelsBySlug = {};
for (const [oldSlug, entries] of Object.entries(oldModels)) {
  const byBase = {};
  for (const e of entries) {
    if (!e.img) continue;
    const base = stripGenSuffix(e.name);
    const norm = normalize(base);
    const year = yearFromSlug(e.slug);
    if (!byBase[norm] || year >= byBase[norm].bestYear) {
      byBase[norm] = { img: e.img, bestYear: year, displayName: base };
    }
  }
  oldBaseModelsBySlug[oldSlug] = byBase;
}

// invert BRAND_SLUG_TO_CATALOG_NAME: catalogName -> [oldSlug,...] (range-rover + land-rover both map to "Land Rover")
const catalogNameToOldSlugs = {};
for (const [oldSlug, catalogName] of Object.entries(BRAND_SLUG_TO_CATALOG_NAME)) {
  (catalogNameToOldSlugs[catalogName] ||= []).push(oldSlug);
}

const MODEL_IMAGE_MAP = {};
const matchReport = [];

for (const [catalogName, oldSlugs] of Object.entries(catalogNameToOldSlugs)) {
  const newModels = newModelsByBrand[catalogName] || [];
  if (newModels.length === 0) continue;

  // merge all candidate old base-models from every old slug that folds into this catalog brand
  const candidates = []; // { norm, tokens, img, displayName }
  for (const oldSlug of oldSlugs) {
    const modelsKey = MODELS_KEY_ALIAS[oldSlug] || oldSlug;
    const byBase = oldBaseModelsBySlug[modelsKey] || {};
    for (const [norm, v] of Object.entries(byBase)) {
      candidates.push({ norm, tokens: tokenize(v.displayName), img: v.img, displayName: v.displayName });
    }
  }
  if (candidates.length === 0) continue;

  const brandMap = {};
  let matched = 0;
  for (const modelName of newModels) {
    const normModel = normalize(modelName);
    const modelTokens = tokenize(modelName);
    if (!normModel) continue;

    // exact normalized match first
    let hit = candidates.find((c) => c.norm === normModel);

    // then whole-token subset match, preferring the candidate with the most
    // tokens in common (closest nameplate) when several qualify
    if (!hit) {
      let best = null;
      let bestScore = -1;
      for (const c of candidates) {
        if (tokenSubsetMatch(modelTokens, c.tokens)) {
          const score = Math.min(modelTokens.length, c.tokens.length);
          if (score > bestScore) {
            bestScore = score;
            best = c;
          }
        }
      }
      if (best) hit = best;
    }

    if (hit) {
      brandMap[modelName] = hit.img;
      matched++;
    }
  }

  if (Object.keys(brandMap).length > 0) {
    MODEL_IMAGE_MAP[catalogName] = brandMap;
  }
  matchReport.push({ brand: catalogName, totalModels: newModels.length, matched, candidates: candidates.length });
}

fs.writeFileSync("./BRAND_LOGO_MAP.json", JSON.stringify(BRAND_LOGO_MAP, null, 2));
fs.writeFileSync("./MODEL_IMAGE_MAP.json", JSON.stringify(MODEL_IMAGE_MAP, null, 2));
fs.writeFileSync("./match-report.json", JSON.stringify(matchReport, null, 2));

console.log("Brands with logos:", Object.keys(BRAND_LOGO_MAP).length);
console.log("Brands with >=1 model image:", Object.keys(MODEL_IMAGE_MAP).length);
console.log("\nPer-brand match coverage:");
for (const r of matchReport) {
  console.log(`  ${r.brand}: ${r.matched}/${r.totalModels} models matched (candidates: ${r.candidates})`);
}
