// Küçük, elle yazılmış erişim katmanı — gerçek veri
// vehicle-media-generated.ts içinde (bkz. docs/research/vehicle-wheel-media/
// build-media-map.mjs). Eski projeden (kaportabizdefrontend) taşınan marka
// logoları ve model fotoğrafları için tek giriş noktası budur.

import {
  BRAND_LOGO_MAP,
  MODEL_IMAGE_MAP,
  WHEEL_GROUPS,
  type WheelGroup,
} from "./vehicle-media-generated";

export { WHEEL_GROUPS };
export type { WheelGroup };

/** VEHICLE_BRANDS içindeki marka adı için logo yolu (yoksa undefined). */
export function getBrandLogo(brand: string): string | undefined {
  return BRAND_LOGO_MAP[brand];
}

/**
 * VEHICLE_MODELS_BY_BRAND içindeki marka+model çifti için temsili fotoğraf
 * yolu (yoksa undefined — bileşen o zaman ikon placeholder'a düşer).
 */
export function getModelImage(brand: string, model: string): string | undefined {
  return MODEL_IMAGE_MAP[brand]?.[model];
}

/** Çark'ta hiç görünmeyecek markalar da dahil, tüm markalar için logo var mı? */
export function hasBrandLogo(brand: string): boolean {
  return Boolean(BRAND_LOGO_MAP[brand]);
}
