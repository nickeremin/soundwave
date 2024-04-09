import React from "react"
import { type Metadata } from "next"

import { env } from "@/shared/components/env.mjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Login | SoundWave",
}

interface SignInLayoutProps {
  children: React.ReactNode
}

function SignInLayout({ children }: SignInLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      {children}
    </main>
  )
}

export default SignInLayout
