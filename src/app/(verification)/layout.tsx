import React from "react"
import { type Metadata } from "next"

import VerificationHeader from "@/widgets/layout/headers/verification-header"
import { env } from "@/shared/components/env.mjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Verification | SoundWave",
}

interface VerificationLayoutProps {
  children: React.ReactNode
}

function VerificationLayout({ children }: VerificationLayoutProps) {
  return (
    <div>
      <div className="relative min-h-screen">
        <VerificationHeader />
        <main className="flex h-[calc(100vh-120px)] flex-col items-center justify-center">
          {children}
        </main>
      </div>
    </div>
  )
}

export default VerificationLayout
