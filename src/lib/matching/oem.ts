/**
 * OEM numarası normalizasyonu.
 *
 * Farklı tedarikçiler/kaynaklar aynı OEM numarasını farklı biçimlerde
 * yazabiliyor (boşluklu, tireli, baştaki sıfırlarla ya da onsuz). Eşleştirme
 * motoru her zaman NORMALIZE edilmiş hali karşılaştırır; ham hali
 * (`oem_numbers.raw_number`) sadece izleme/denetim amaçlı saklanır.
 */
export function normalizeOemNumber(raw: string): string {
  return (
    raw
      .trim()
      .toUpperCase()
      // Boşluk, tire, nokta, eğik çizgi gibi ayırıcıları temizle.
      .replace(/[\s\-./]/g, "")
      // Baştaki sıfırları temizle (ama tamamen sıfırlardan oluşuyorsa dokunma).
      .replace(/^0+(?=\d)/, "")
  );
}

/** Virgülle ayrılmış ham OEM listesini normalize edilmiş, boş olmayan bir diziye çevirir. */
export function parseRawOemNumbers(raw: string | null | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((n) => normalizeOemNumber(n))
    .filter((n) => n.length > 0);
}
