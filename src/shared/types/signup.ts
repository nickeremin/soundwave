import * as z from "zod"

import {
  initialSignUpDataSchema,
  verifyEmailSchema,
} from "../lib/validations/auth"

export type SignUpStep =
  | "initial_data"
  | "choose_signup_method"
  | "email_signup"

export type SignUpContextData = {
  step: SignUpStep
  setStep: React.Dispatch<React.SetStateAction<SignUpStep>>
  isEmailVerifying: boolean
  setIsEmailVerifying: React.Dispatch<React.SetStateAction<boolean>>
}

export type InitialInputs = z.infer<typeof initialSignUpDataSchema>
export type EmailInputs = z.infer<typeof verifyEmailSchema>
