import React from "react"
import { type Metadata } from "next"

import { SignInForm } from "@/features/forms"
import { env } from "@/shared/components/env.mjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Вход",
  description: "Ввойдите в Ваш аккаунт",
}

function SignInPage() {
  return <SignInForm />
}

export default SignInPage
