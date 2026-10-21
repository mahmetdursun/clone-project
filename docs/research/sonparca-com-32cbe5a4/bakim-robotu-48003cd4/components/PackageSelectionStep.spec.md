# PackageSelectionStep Specification (Stage 2)

## Overview
- Target file: `src/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/PackageSelectionStep.tsx`
- Interaction model: click-driven, static grid, no cascading.

## DOM structure
```
<div>
  <SelectedVehicleBar vehicle={vehicle} onChange={...} />
  <div class="mt-6 mb-4">
    <h2 class="flex items-center gap-2 text-lg font-bold text-light-text-primary"><Wrench class="size-5 text-sp-accent" /> Bir Bakım Paketi Seçin</h2>
    <p class="text-sm text-light-text-muted mt-1">Aracınıza uygun parçaları adım adım listelemek için bir bakım paketi seçin.</p>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {packages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} onSelect={() => onSelectPackage(pkg)} />)}
  </div>
</div>
```

`SelectedVehicleBar` (shared with Stage 3/4, small inline component or its own file):
```
<div class="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
  <div class="flex items-center gap-3">
    <span class="flex size-10 items-center justify-center rounded-full bg-orange-50 text-sp-accent"><Car /></span>
    <div><p class="text-xs uppercase text-gray-400">Seçili Araç</p><p class="font-semibold text-light-text-primary">{brand} {model}</p></div>
  </div>
  <button class="flex items-center gap-1 text-sm font-medium text-sp-accent"><ArrowLeftRight class="size-4" /> Değiştir</button>
</div>
```

`PackageCard`:
```
<button class="group text-left overflow-hidden rounded-lg border border-gray-200 hover:border-sp-accent transition-colors bg-white">
  <div class="relative aspect-[16/9] bg-gray-50"><Image fill .../></div>
  <div class="p-4">
    <h3 class="font-semibold text-light-text-primary group-hover:text-sp-accent">{title}</h3>
    <p class="mt-1 text-sm text-light-text-muted line-clamp-2">{description}</p>
    <div class="mt-3 flex items-center justify-between">
      <span class="rounded bg-gray-100 px-2 py-1 text-xs text-light-text-muted">{groupCount} kategori gurubu</span>
      <span class="flex items-center gap-1 text-sm font-medium text-sp-accent">Başla <ArrowRight class="size-4" /></span>
    </div>
  </div>
</button>
```

## Real content — 8 packages (verbatim title/description/groupCount from live site)
1. **Periyodik Bakım Bileşenleri** — "Aracınızın ilk günkü performansını koruması ve motor ömrünün uzaması için ihtiyaç duyduğunuz tüm filtre ve yağ gruplarına tek tıkla ulaşın." — 5
2. **Aydınlatma, Görüş ve Bakım** — "Gece sürüşlerinde ve zorlu hava koşullarında yolunuzu mükemmel aydınlatacak parçalarla görüşünüzü daima net tutun." — 5
3. **Fren Sistemi** — "Güvenli bir sürüş ve kusursuz duruş performansı için aracınıza en uygun fren diski ve balata setlerini hemen keşfedin." — 6
4. **Soğutma Sistemi** — "Motorunuzun her mevsim ideal sıcaklıkta çalışmasını ve aşırı ısınmaya karşı korunmasını sağlayan soğutma sistemi parçalarını edinin." — 7
5. **Triger/Zincir ve Tahrik Kayış Sistemleri** — "Motorunuzun kalbini koruyan ve olası ağır hasarların önüne geçen triger ile V kayışı setlerini eksiksiz bir şekilde tamamlayın." — 5
6. **Süspansiyon ve Yürüyen Aksam** — "Yoldaki tüm pürüzleri unutturacak ve sürüş konforunuzu yeniden zirveye taşıyacak alt takım parçalarını kolayca seçin." — 6
7. **Ateşleme Sistemi** — "Yakıt tasarrufu sağlamak ve motorunuzun çekiş gücünü maksimuma çıkarmak için gereken birinci sınıf ateşleme ürünlerini inceleyin." — 3
8. **Debriyaj Sistemi** — "Vites geçişlerinizi pürüzsüzleştirecek ve aracınızın gücünü yola kayıpsız aktaracak debriyaj setleriyle sürüş keyfinizi yenileyin." — 6

## Images
Real product-photo images were observed at `storage/contents/marketplace/...webp` (remote, not downloadable into repo within scope/time — use local `public/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/images/` placeholders OR reuse an existing downloaded product image from `root-8a5edab2/images/` as a stand-in per package if a visually-fitting one exists; otherwise a plain `bg-gray-50` panel with a relevant lucide icon centered (Wrench/Lightbulb/Disc/Thermometer/Cog/Settings2/Zap/Disc3) is an acceptable in-scope fallback since these are catalog photos outside this page's own asset scope).

## Props
`{ vehicle: SelectedVehicle; onChangeVehicle: () => void; onSelectPackage: (pkg: Package) => void }`

## Assets
lucide-react: `Wrench`, `Car`, `ArrowLeftRight`, `ArrowRight`, plus one distinct icon per package as image fallback.
