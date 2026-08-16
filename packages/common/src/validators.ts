import { z } from "zod"

export const usernameSchema = z
  .string()
  .trim()
  .min(2, "errors.usernameShort")
  .max(20, "errors.usernameLong")

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
