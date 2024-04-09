import React from "react"
import { type Metadata } from "next"

import { env } from "@/shared/components/env.mjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Signup | SoundWave",
}

interface SignUpLayoutProps {
  children: React.ReactNode
}

function SignUpLayout({ children }: SignUpLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      {children}
    </main>
  )
}

export default SignUpLayout
