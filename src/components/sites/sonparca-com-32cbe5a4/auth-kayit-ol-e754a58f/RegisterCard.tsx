import Link from "next/link";
import { Suspense } from "react";

import { RegisterForm } from "./RegisterForm";
import { SocialAuthButtons } from "./SocialAuthButtons";

export function RegisterCard() {
  return (
    <section className="flex justify-center bg-light-bg px-4 py-16">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-6 text-center text-[28px] font-bold text-light-text-primary">
          Hesap Oluşturun
        </h1>

        <Suspense fallback={null}>
          <RegisterForm />

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-400">veya</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <SocialAuthButtons />
        </Suspense>

        <p className="mt-4 text-center text-sm text-light-text-muted">
          Zaten hesabınız var mı?{" "}
          <Link href="/auth/giris" className="text-blue-600 transition-colors hover:underline">
            Giriş yapın
          </Link>
        </p>
      </div>
    </section>
  );
}
