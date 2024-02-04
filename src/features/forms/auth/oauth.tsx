"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { useSignIn, useSignUp } from "@clerk/nextjs"
import { type OAuthStrategy } from "@clerk/types"

import { InitialInputs } from "@/shared/types/signup"
import { Icons, LucideIcon } from "@/shared/components/icons"
import CustomIcon from "@/shared/components/icons/custom-icon"
import { Button } from "@/shared/components/ui/button"
import { catchClerkError, cn } from "@/shared/lib/utils"

type OAuthProvider = {
  title: string
  name: string
  strategy: OAuthStrategy
  icon: keyof typeof Icons
  className?: string
}

const oauthProviders: OAuthProvider[] = [
  {
    title: "Продолжить с Google",
    name: "Google",
    strategy: "oauth_google",
    icon: "Google",
    className: "bg-[rgb(24,106,224)] hover:bg-[rgb(46,128,246)]",
  },
  {
    title: "Продолжить с GitHub",
    name: "GitHub",
    strategy: "oauth_github",
    icon: "GitHub",
    className: "bg-[rgb(36,41,46)] hover:bg-[rgb(85,85,85)]",
  },
  {
    title: "Продолжить с Discord",
    name: "Discord",
    strategy: "oauth_discord",
    icon: "Discord",
    className: "bg-[rgb(81,94,235)] hover:bg-[rgba(101,114,255)]",
  },
]

function OAuthSignUpButtons({ username, subscriptionPlan }: InitialInputs) {
  const searchParams = useSearchParams()

  const { isLoaded, signUp } = useSignUp()
  const [isPending, setIsPending] = React.useState<OAuthStrategy | null>(null)

  // This function is called when user clicks on the oauth sign in button
  async function oauthSignUp(provider: OAuthStrategy) {
    if (!isLoaded) return

    try {
      setIsPending(provider)

      // Сreate a user with the entered username and subscription plan
      await signUp.create({
        username,
        unsafeMetadata: {
          subscriptionPlan,
        },
      })

      const redirect = searchParams.get("redirect")

      // Try to sign in with oauth provider
      await signUp.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: redirect ?? "/",
        // Use this to avoid overriding the entered username and subscription plan
        continueSignUp: true,
      })
    } catch (error) {
      setIsPending(null)
      catchClerkError(error)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {oauthProviders.map((provider) => (
        <Button
          key={provider.strategy}
          type="button"
          disabled={!!isPending}
          onClick={() => {
            oauthSignUp(provider.strategy)
          }}
          size="xl"
          className={cn("gap-2 text-white", provider.className)}
        >
          {isPending === provider.strategy ? (
            <LucideIcon name="Loader" className="animate-spin" />
          ) : (
            <CustomIcon name={provider.icon} className="size-6" />
          )}
          {provider.title}
        </Button>
      ))}
    </div>
  )
}

function OAuthSignInButtons() {
  const searchParams = useSearchParams()

  const { isLoaded, signIn } = useSignIn()
  const [isPending, setIsPending] = React.useState<OAuthStrategy | null>(null)

  // This function is called when user clicks on the oauth sign in button
  async function oauthSignIn(provider: OAuthStrategy) {
    if (!isLoaded) return

    try {
      setIsPending(provider)

      const redirect = searchParams.get("redirect")

      // Try to sign in with oauth provider
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: redirect ?? "/",
      })
    } catch (error) {
      setIsPending(null)
      catchClerkError(error)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {oauthProviders.map((provider) => (
        <Button
          key={provider.strategy}
          type="button"
          disabled={!!isPending}
          onClick={() => {
            oauthSignIn(provider.strategy)
          }}
          size="xl"
          className={cn("gap-2 text-gray-light", provider.className)}
        >
          {isPending === provider.strategy ? (
            <LucideIcon name="Loader" className="animate-spin" />
          ) : (
            <CustomIcon name={provider.icon} className="size-6" />
          )}
          {provider.title}
        </Button>
      ))}
    </div>
  )
}

export { OAuthSignUpButtons, OAuthSignInButtons }
