/**
 * CSV tabanlı tedarikçi kaynakları için genel amaçlı parser.
 *
 * Web servisi olmayan (ya da olsa bile bize CSV export ile veri paylaşan)
 * kaynaklar için kullanılır — örn. "Dinamik". Her kaynağın kendi sütun
 * isimleri farklı olacağı için `CsvColumnMap` ile eşleştiriyoruz; kaynak
 * kodu değişmiyor, sadece hangi sütunun neye karşılık geldiğini
 * belirtiyorsunuz.
 *
 * Çıktısı, web servisli tedarikçilerle (bkz. ./types.ts) BİREBİR AYNI
 * `NormalizedSupplierProduct[]` şekli — bu yüzden `syncSupplierProducts()`
 * (bkz. src/lib/sync) her ikisini de aynı şekilde işler.
 *
 * NOT: Aşağıdaki sütun isimleri (DINAMIK_COLUMN_MAP) henüz gerçek bir
 * Dinamik CSV dosyası görülmeden yazıldı — TAHMİNİ değerlerdir. Gerçek
 * dosyanın başlık satırını (ilk satırdaki sütun isimlerini) paylaşınca
 * bu haritayı gerçek isimlerle güncelleyeceğiz.
 */

import { parse } from "csv-parse/sync";
import type { NormalizedSupplierProduct } from "./types";

export interface CsvColumnMap {
  /** Tedarikçinin ürün kodu/SKU sütununun başlığı. */
  supplierSku: string;
  /** Ürün adı/başlığı sütununun başlığı. */
  rawTitle: string;
  brand?: string;
  price?: string;
  currency?: string;
  stockQuantity?: string;
  /** OEM numarası/numaraları sütununun başlığı (virgülle ayrılmış olabilir). */
  rawOemNumbers?: string;
}

export interface ParseCsvOptions {
  delimiter?: string;
}

/**
 * Türkçe formatlı fiyatları da destekler (ör. "1.234,56" → 1234.56).
 * Basit ondalık formatları (ör. "1234.56") da çalışır.
 */
function parsePrice(raw: string | undefined): number | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;

  // Binlik ayıracı nokta, ondalık ayıracı virgül ise (Türkçe format) çevir.
  const isTurkishFormat = /\d\.\d{3}/.test(trimmed) || /,\d{1,2}$/.test(trimmed);
  const normalized = isTurkishFormat
    ? trimmed.replace(/\./g, "").replace(",", ".")
    : trimmed.replace(/,/g, "");

  const value = Number.parseFloat(normalized.replace(/[^\d.-]/g, ""));
  return Number.isFinite(value) ? value : undefined;
}

function parseStock(raw: string | undefined): number | undefined {
  if (!raw) return undefined;
  const value = Number.parseInt(raw.replace(/[^\d-]/g, ""), 10);
  return Number.isFinite(value) ? value : undefined;
}

export function parseSupplierCsv(
  csvText: string,
  columnMap: CsvColumnMap,
  opts: ParseCsvOptions = {},
): NormalizedSupplierProduct[] {
  const records = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    delimiter: opts.delimiter ?? ",",
    bom: true,
  }) as Record<string, string>[];

  return records
    .map((record): NormalizedSupplierProduct => ({
      supplierSku: record[columnMap.supplierSku]?.trim() ?? "",
      rawTitle: record[columnMap.rawTitle]?.trim() ?? "",
      brand: columnMap.brand ? record[columnMap.brand]?.trim() || undefined : undefined,
      price: columnMap.price ? parsePrice(record[columnMap.price]) : undefined,
      currency: columnMap.currency
        ? record[columnMap.currency]?.trim() || undefined
        : undefined,
      stockQuantity: columnMap.stockQuantity
        ? parseStock(record[columnMap.stockQuantity])
        : undefined,
      rawOemNumbers: columnMap.rawOemNumbers
        ? record[columnMap.rawOemNumbers]?.trim() || undefined
        : undefined,
    }))
    .filter((product) => product.supplierSku.length > 0);
}

// TAHMİNİ sütun haritası — gerçek Dinamik CSV dosyasının başlık satırı
// görülünce gerçek isimlerle güncellenecek. Şimdilik kullanmayın.
export const DINAMIK_COLUMN_MAP_DRAFT: CsvColumnMap = {
  supplierSku: "Ürün Kodu",
  rawTitle: "Ürün Adı",
  brand: "Marka",
  price: "Fiyat",
  stockQuantity: "Stok",
  rawOemNumbers: "OEM No",
};
