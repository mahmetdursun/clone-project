# GarageTab Specification

## Overview
- Target file: `src/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/GarageTab.tsx`
- Interaction model: static empty/auth-gated state (this project has no real auth session; always render the logged-out state).

## DOM structure
```
<div class="flex flex-col items-center justify-center gap-3 py-12 text-center">
  <span class="flex size-14 items-center justify-center rounded-full bg-orange-50 text-sp-accent"><Home /></span>
  <h3 class="font-semibold text-light-text-primary">Garajım özelliğini kullanın</h3>
  <p class="max-w-sm text-sm text-light-text-muted">Araçlarınızı garajınıza ekleyerek uyumlu parçalara tek tıkla ulaşın. Bu özellik için giriş yapmanız gerekiyor.</p>
  <div class="mt-2 flex gap-3">
    <Link href="/auth/giris" class="rounded-md bg-sp-accent px-5 py-2.5 text-sm font-medium text-white">Giriş Yap</Link>
    <Link href="/auth/kayit-ol" class="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-light-text-primary">Kayıt Ol</Link>
  </div>
  <button class="mt-1 text-sm text-gray-500 hover:text-sp-accent">Misafir olarak araç seçimine devam et →</button>
</div>
```

## Text content (verbatim)
- "Garajım özelliğini kullanın"
- "Araçlarınızı garajınıza ekleyerek uyumlu parçalara tek tıkla ulaşın. Bu özellik için giriş yapmanız gerekiyor."
- "Giriş Yap" / "Kayıt Ol"
- "Misafir olarak araç seçimine devam et →"

## Behavior
`Giriş Yap` and `Kayıt Ol` are real Next.js `Link`s to the already-built `/auth/giris` and `/auth/kayit-ol` routes. The guest link calls prop `onSwitchToVehicleTab()`.

## Props
`{ onSwitchToVehicleTab: () => void }`

## Assets
lucide-react: `Home`.
