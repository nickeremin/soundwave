import { redirect } from "next/navigation"
import { SignUpContextProvider } from "@/providers/signup-context-provider"
import { currentUser } from "@clerk/nextjs"

import SignUpForm from "@/features/auth/signup-form"

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
