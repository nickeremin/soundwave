import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import SignUpForm from "@/features/auth/signup-form"
import { SignUpContextProvider } from "@/entities/auth/signup-context-provider"

async function SignUpPage() {
  const user = await currentUser()

  if (user) redirect("/")

  return (
    <SignUpContextProvider>
      <SignUpForm />
    </SignUpContextProvider>
  )
}

export default SignUpPage
