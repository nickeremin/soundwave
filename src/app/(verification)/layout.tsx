import React from "react"

import {
  SiteFooter,
  // StarsBackground,
  VerificationHeader,
} from "@/widgets/layout"

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
        {/* <StarsBackground /> */}
      </div>
      <SiteFooter />
    </div>
  )
}

export default VerificationLayout
