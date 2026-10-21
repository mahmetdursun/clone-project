"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { TurnstileWidget } from "@/components/auth/TurnstileWidget";

function hasUpperCase(value: string) {
  return /[A-ZÇĞİÖŞÜ]/.test(value);
}

function hasLowerCase(value: string) {
  return /[a-zçğıöşü]/.test(value);
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const showEmailError = (submitted || emailTouched) && email.trim() === "";
  const passwordEmpty = password.trim() === "";
  const showPasswordRequired = (submitted || passwordTouched) && passwordEmpty;
  const showPasswordRules =
    !passwordEmpty && (!hasUpperCase(password) || !hasLowerCase(password));

  const canSubmit = email.trim() !== "" && password.trim() !== "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setServerError(null);
    if (!canSubmit) return;

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        turnstileToken,
        redirect: false,
      });

      if (result?.error) {
        setServerError(
          result.code === "too_many_attempts"
            ? "Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin."
            : "E-posta veya şifre hatalı.",
        );
        return;
      }

      const callbackUrl = searchParams.get("callbackUrl");
      router.push(callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/hesabim");
      router.refresh();
    });
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div>
        <label
          htmlFor="giris-email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <div className="mt-1">
          <input
            id="giris-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setEmailTouched(true)}
            className="block h-12 w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2.5 text-base text-stone-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {showEmailError && (
          <p className="mt-1 text-xs text-red-600">Zorunlu alan</p>
        )}
      </div>

      <div>
        <label
          htmlFor="giris-password"
          className="block text-sm font-medium text-gray-700"
        >
          Şifre
        </label>
        <div className="mt-1">
          <input
            id="giris-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => setPasswordTouched(true)}
            className="block h-12 w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2.5 text-base text-stone-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {showPasswordRequired && (
          <p className="mt-1 text-xs text-red-600">Zorunlu alan</p>
        )}
        {showPasswordRules && (
          <ul className="mt-1 space-y-0.5 text-xs text-red-600">
            <li>Şifre en az bir büyük harf içermelidir.</li>
            <li>Şifre en az bir küçük harf içermelidir. +2 hata</li>
          </ul>
        )}
      </div>

      <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken(null)} />

      {serverError ? <p className="text-sm text-red-600">{serverError}</p> : null}

      <button
        type="submit"
        disabled={!canSubmit || isPending}
        className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
      >
        {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>
    </form>
  );
}
