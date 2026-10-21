interface ProductToolbarProps {
  resultCount: number;
}

export function ProductToolbar({ resultCount }: ProductToolbarProps) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-light-text-primary">Ürünler</h2>
      <span className="text-sm text-light-text-muted">
        {resultCount.toLocaleString("tr-TR")} sonuç bulundu
      </span>
    </div>
  );
}
