"use client";

import { useMemo, useState, useTransition, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { registerUser } from "@/app/actions/auth";
import { TurnstileWidget } from "@/components/auth/TurnstileWidget";

interface TouchedState {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

function getPasswordErrors(password: string): string[] {
  if (password.length === 0) return ["Zorunlu alan"];
  const errors: string[] = [];
  if (password.length < 8) errors.push("Şifre en az 8 karakter içermelidir.");
  if (!/[A-ZÇĞİÖŞÜ]/.test(password))
    errors.push("Şifre en az bir büyük harf içermelidir.");
  if (!/[a-zçğıöşü]/.test(password))
    errors.push("Şifre en az bir küçük harf içermelidir.");
  if (!/[0-9]/.test(password))
    errors.push("Şifre en az bir rakam içermelidir.");
  return errors;
}

/** Renders the first two messages inline and collapses the rest into "+N hata",
 * reproducing the exact pattern observed on the live site. */
function PasswordErrorList({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;
  const visible = errors.slice(0, 2);
  const remaining = errors.length - visible.length;
  return (
    <p className="mt-1 text-xs leading-snug text-[#ef4444]">
      {visible.map((message, index) => (
        <span key={message}>
          {message}
          {index === visible.length - 1 && remaining > 0 ? (
            <span className="font-medium"> +{remaining} hata</span>
          ) : (
            index < visible.length - 1 && " "
          )}
        </span>
      ))}
    </p>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs leading-snug text-[#ef4444]">{message}</p>;
}

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [touched, setTouched] = useState<TouchedState>({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const emailError = touched.email && email.trim().length === 0 ? "Zorunlu alan" : undefined;
  const passwordErrors = touched.password ? getPasswordErrors(password) : [];
  const confirmPasswordError = useMemo(() => {
    if (!touched.confirmPassword) return undefined;
    if (confirmPassword.length === 0) return "Zorunlu alan";
    if (confirmPassword !== password) return "Şifreler eşleşmiyor.";
    return undefined;
  }, [touched.confirmPassword, confirmPassword, password]);

  const isValid =
    email.trim().length > 0 &&
    getPasswordErrors(password).length === 0 &&
    confirmPassword.length > 0 &&
    confirmPassword === password;

  function markAllTouched() {
    setTouched({ email: true, password: true, confirmPassword: true });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    markAllTouched();
    setServerError(null);
    if (!isValid) return;

    startTransition(async () => {
      const result = await registerUser({ email, password, turnstileToken });
      if (result.ok) {
        const callbackUrl = searchParams.get("callbackUrl");
        router.push(callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/hesabim");
        router.refresh();
      } else {
        setServerError(result.message);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-5">
        <label htmlFor="register-email" className="mb-1.5 block text-sm font-medium text-light-text-primary">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setTouched((state) => ({ ...state, email: true }))}
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-light-text-primary outline-none transition-colors focus:border-sp-accent focus:ring-2 focus:ring-sp-accent/20 aria-invalid:border-[#ef4444]"
          aria-invalid={!!emailError}
        />
        <FieldError message={emailError} />
      </div>

      <div className="mb-5">
        <label htmlFor="register-password" className="mb-1.5 block text-sm font-medium text-light-text-primary">
          Şifre
        </label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={() => setTouched((state) => ({ ...state, password: true }))}
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-light-text-primary outline-none transition-colors focus:border-sp-accent focus:ring-2 focus:ring-sp-accent/20 aria-invalid:border-[#ef4444]"
          aria-invalid={passwordErrors.length > 0}
        />
        <PasswordErrorList errors={passwordErrors} />
      </div>

      <div className="mb-4">
        <label htmlFor="register-password-confirm" className="mb-1.5 block text-sm font-medium text-light-text-primary">
          Şifre Tekrar
        </label>
        <input
          id="register-password-confirm"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          onBlur={() => setTouched((state) => ({ ...state, confirmPassword: true }))}
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-light-text-primary outline-none transition-colors focus:border-sp-accent focus:ring-2 focus:ring-sp-accent/20 aria-invalid:border-[#ef4444]"
          aria-invalid={!!confirmPasswordError}
        />
        <FieldError message={confirmPasswordError} />
      </div>

      <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken(null)} />

      {serverError ? (
        <p className="mb-4 text-sm text-[#ef4444]">{serverError}</p>
      ) : null}

      <button
        type="submit"
        disabled={!isValid || isPending}
        className="h-10 w-full rounded-md text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:bg-indigo-300 enabled:bg-indigo-500 enabled:hover:bg-indigo-600"
      >
        {isPending ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
      </button>
    </form>
  );
}
