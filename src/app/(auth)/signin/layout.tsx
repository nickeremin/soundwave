import React from "react"

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
