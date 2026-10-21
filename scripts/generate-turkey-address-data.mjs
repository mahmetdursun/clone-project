// Regenerates public/data/turkey-address.json from the `turkey-neighbourhoods`
// package (PTT postal-code il/ilçe/mahalle data). Run with the package
// installed as a devDependency: `npm i -D turkey-neighbourhoods && node
// scripts/generate-turkey-address-data.mjs`, then it can be uninstalled again —
// the generated JSON is what the address picker (AddressPickerModal) fetches
// at runtime from /data/turkey-address.json.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const cityList = require("turkey-neighbourhoods/src/data/cityList.json");
const districtsByCityCode = require("turkey-neighbourhoods/src/data/districtsByCityCode.json");
const neighbourhoodsByDistrictAndCityCode = require(
  "turkey-neighbourhoods/src/data/neighbourhoodsByDistrictAndCityCode.json"
);

const out = cityList.map((city) => {
  const districts = districtsByCityCode[city.code] || [];
  const neighMap = neighbourhoodsByDistrictAndCityCode[city.code] || {};
  return {
    il: city.name,
    ilceler: districts.map((d) => ({
      ilce: d,
      mahalleler: neighMap[d] || [],
    })),
  };
});

const outPath = path.join(__dirname, "..", "public", "data", "turkey-address.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(out));
console.log(`Wrote ${outPath} (${out.length} il)`);
