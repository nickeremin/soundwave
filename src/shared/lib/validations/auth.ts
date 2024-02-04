import * as z from "zod"

// Schema to validate data when creating account
export const createAccountSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Пожалуйста, используйте минимум 2 символа." })
    .max(32, {
      message: "Пожалуйста, используйте максимум 32 символа.",
    }),
  subscriptionPlan: z.enum(["hobby", "pro"]),
  email: z.string().email({
    message: "Пожалуйста, введите действительный адрес электронной почты.",
  }),
})

export const initialSignUpDataSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Пожалуйста, используйте минимум 2 символа." })
    .max(32, {
      message: "Пожалуйста, используйте максимум 32 символа.",
    }),
  subscriptionPlan: z.enum(["hobby", "pro"]),
})

export const verifyEmailSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите действительный адрес электронной почты.",
  }),
})

// Schema to validate user email
export const checkEmailSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите действительный адрес электронной почты.",
  }),
})
