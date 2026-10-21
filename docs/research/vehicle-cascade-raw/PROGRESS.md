# Vehicle cascade data collection progress

Source: sonparca.com real site, POST /s-api/v1/vehicle-selector/filter-vehicles
Captured via Claude's built-in browser (network inspection), one click at a time,
because the real site's frontend fires dozens of duplicate requests per click and
trips Cloudflare rate limiting (HTTP 429, error 1015) almost immediately.

## Status: ALL 28 BRAND MODEL LISTS CAPTURED ✅ (2026-09-18, ~23:20 UTC)

303 total models across 28 brands. Raw JSON per brand saved as ./<brand>.json
(step-2 "Araç Modeli" response, includes real model id/name/image per model).
Consolidated brand->model-names map: ./_merged-brand-models.json

- [x] Audi — 11 models
- [x] Chery — 4 models
- [x] Chevrolet — 8 models
- [x] Citroen — 22 models
- [x] Cupra — 2 models
- [x] Dacia — 8 models
- [x] Ds — 1 model (autoSelect)
- [x] Fiat — 33 models
- [x] Ford — 17 models
- [x] Honda — 7 models
- [x] Hyundai — 23 models
- [x] Kia — 10 models
- [x] Mazda — 8 models
- [x] Mercedes — 3 models
- [x] Mg — 1 model (autoSelect)
- [x] Mini — 1 model (autoSelect)
- [x] Mitsubishi — 6 models
- [x] Nissan — 10 models
- [x] Opel — 17 models
- [x] Peugeot — 23 models
- [x] Renault — 28 models
- [x] Seat — 7 models
- [x] Skoda — 12 models
- [x] Tesla — 1 model (autoSelect)
- [x] Togg — 1 model (autoSelect)
- [x] Toyota — 13 models
- [x] Volkswagen — 21 models
- [x] Volvo — 5 models

## Key discovery: full cascade comes back in ONE call per model
Once a specific MODEL is selected (not just the brand), the filter-vehicles response
returns ALL remaining levels at once in one `specResults` array: Üretim Yılı (year),
Yakıt (fuel), Motor Hacmi (engine displacement), Vites (gearbox speed count),
Şanzıman (transmission type), Beygir-Kw (hp), Motor Kodu (engine code), Kasa (body
type) — see ./fiat-albea-full-spec.json for a full worked example (Fiat Albea: 12
years, 2 fuels, 4 displacements, 1 gearbox/transmission [autoSelect], 4 hp values, 5
engine codes, 1 body type). So capturing full specs for a given model = 1 click, not
one click per level. Still, doing this exhaustively for all 303 models would be ~303
more careful, paced clicks (given Cloudflare rate limiting, realistically spread
across multiple sessions/hours).

## Rate limiting behavior observed this session
Big automated/near-simultaneous request bursts (the site's own frontend bug — many
duplicate calls per click) trip Cloudflare error 1015 (429) and can lock out the
whole vehicle-selector API (including the homepage widget, same backend) for over an
hour, regardless of pacing during the block. Once actually clear, though, one
click-per-brand at a normal, unhurried pace (no artificial delay needed) worked fine
with zero further 429s across all 28 brands + 1 bonus model-level capture.

## Not yet started
Full year/fuel/engine/gearbox/transmission/hp/enginecode/body cascade for individual
models (303 of them). Deferred pending user direction — either capture for popular
models only, or all of them over time, or ship with real model lists now and keep
deeper levels as reasonable generic/placeholder options.
