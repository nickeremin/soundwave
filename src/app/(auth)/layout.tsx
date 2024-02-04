import React from "react"

import { AuthHeader, SiteFooter } from "@/widgets/layout"

interface AuthLayoutProps {
  children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <AuthHeader />
        {children}
      </div>
      <SiteFooter />
    </>
  )
}

export default AuthLayout
