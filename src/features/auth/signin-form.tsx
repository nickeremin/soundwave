"use client"

import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
import { MailIcon } from "lucide-react"

import ContinueAuthWith from "@/entities/auth/continue-auth-with"
import CreateAccountLinkForMobiles from "@/entities/auth/create-account-link-for-mobiles"
import OAuthLoading from "@/entities/auth/oauth-loading"
import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

import { OAuthSignInButtons } from "./oauth"

function SignInForm() {
  const searchParams = useSearchParams()

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-7 p-6">
        <div className="flex w-full max-w-[456px] flex-col items-center">
          <div className="flex w-full flex-col items-center gap-7">
            <h1 className="text-[32px] font-bold sm:text-[40px]">
              Log in to SoundWave
            </h1>

            <div className="flex min-h-[320px] w-full flex-col xs:max-w-[320px]">
              <ClerkLoading>
                <OAuthLoading />
              </ClerkLoading>
              <ClerkLoaded>
                <OAuthSignInButtons />

                <ContinueAuthWith />

                <Link
                  data-shadcnui-button
                  href={{
                    pathname: "/signin/email",
                    query: searchParams.toString(),
                  }}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "xl",
                      className: "w-full gap-2 outline-none",
                    })
                  )}
                >
                  <MailIcon />
                  Continue with Email
                </Link>
              </ClerkLoaded>
            </div>
          </div>
        </div>
      </div>

      <CreateAccountLinkForMobiles />
    </>
  )
}

export default SignInForm
