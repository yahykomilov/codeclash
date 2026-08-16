import { z } from "zod"
import { LOCALES, type Locale } from "./types"

/**
 * Nickname: letters / numbers / space / _ . - only, 2–20 chars.
 * Blocks invisible chars, RTL-override, and markup-injection attempts.
 */
export const usernameSchema = z
  .string()
  .trim()
  .min(2, "errors.usernameShort")
  .max(20, "errors.usernameLong")
  .regex(/^[\p{L}\p{N} _.\-]{2,20}$/u, "errors.usernameInvalid")

export const pinSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, "errors.invalidPin")

export const emailSchema = z.string().trim().email("errors.invalidEmail")

export const passwordSchema = z.string().min(6, "errors.passwordShort")

export const joinSchema = z.object({
  pin: pinSchema,
  username: usernameSchema,
})

export const credentialsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

/** Answer submission: 1–10 in-range integer indices. Bounds re-checked per question server-side. */
export const answersSchema = z
  .array(z.number().int().min(0).max(9))
  .min(1)
  .max(10)

/** Coerce any client-provided locale to a known one (prevents odd indexing). */
export function sanitizeLocale(locale: unknown): Locale {
  return LOCALES.includes(locale as Locale) ? (locale as Locale) : "ru"
}
