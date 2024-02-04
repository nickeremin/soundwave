import React from "react"

interface ProtectedLayoutProps {
  children: React.ReactNode
}

async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  // const user = await currentUser()

  // console.log(user)

  // if (!user) redirect("/not-auth")

  return <div>{children}</div>
}

export default ProtectedLayout
