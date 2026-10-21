import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Zorunlu alan")
  .email("Geçerli bir e-posta adresi girin.");

/** Kayıt formundaki kurallarla birebir aynı — bkz. RegisterForm.tsx. */
export const passwordSchema = z
  .string()
  .min(8, "Şifre en az 8 karakter içermelidir.")
  .regex(/[A-ZÇĞİÖŞÜ]/, "Şifre en az bir büyük harf içermelidir.")
  .regex(/[a-zçğıöşü]/, "Şifre en az bir küçük harf içermelidir.")
  .regex(/[0-9]/, "Şifre en az bir rakam içermelidir.");

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  turnstileToken: z.string().nullable().optional(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Zorunlu alan"),
  turnstileToken: z.string().nullable().optional(),
});
