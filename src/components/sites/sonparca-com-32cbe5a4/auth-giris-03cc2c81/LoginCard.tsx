import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "./LoginForm";
import { SocialLoginButtons } from "./SocialLoginButtons";

export function LoginCard() {
  return (
    <div className="flex min-h-full flex-col items-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full bg-white px-4 py-8 shadow sm:mx-auto sm:max-w-md sm:rounded-lg sm:px-10">
        <h1 className="mb-4 text-center text-3xl font-normal text-gray-900 sm:text-2xl sm:leading-9">
          Giriş Yapın
        </h1>
        <Suspense fallback={null}>
          <LoginForm />
          <SocialLoginButtons />
        </Suspense>
        <p className="mt-4 text-center text-sm text-gray-500">
          Hesabınız yok mu?{" "}
          <Link href="/auth/kayit-ol" className="text-blue-600 transition-colors hover:underline">
            Kayıt olun
          </Link>
        </p>
      </section>
    </div>
  );
}
