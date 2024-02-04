import React from "react"

interface SignInLayoutProps {
  children: React.ReactNode
}

function SignInLayout({ children }: SignInLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col justify-center pt-16">
      {children}
    </main>
  )
}

export default SignInLayout
