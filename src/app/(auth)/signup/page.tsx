import { type Metadata } from "next"

import { SignUpForm } from "@/features/forms"
import { SignUpContextProvider } from "@/entities/auth"
import { env } from "@/shared/components/env.mjs"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Регистрация",
  description: "Создайте Ваш аккаунт",
}

function SignUpPage() {
  // const user = await currentUser()
  // if (user) redirect("/")

  return (
    <SignUpContextProvider>
      <SignUpForm />
    </SignUpContextProvider>
  )
}

export default SignUpPage
