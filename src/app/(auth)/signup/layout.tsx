import React from "react"

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
