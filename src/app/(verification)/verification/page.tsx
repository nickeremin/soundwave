import React from "react"
import { type Metadata } from "next"

import { VerifyEmail } from "@/features/forms"
import { env } from "@/shared/components/env.mjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Подтверждение",
  description: "Процесс подтверждения аккаунта",
}

function VerificationPage() {
  return <VerifyEmail />
}

export default VerificationPage
