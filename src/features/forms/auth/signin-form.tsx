"use client"

import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import {
  AuthHeading,
  ContinueAuthWith,
  CreateAccountLinkForMobiles,
  OAuthLoading,
} from "@/entities/auth"
import { ClerkLoaded } from "@/shared/components/clerk"
import { LucideIcon } from "@/shared/components/icons"
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
            <AuthHeading>Log in to SoundWave</AuthHeading>

            <div className="flex min-h-[320px] w-full flex-col xs:max-w-[320px]">
              <ClerkLoaded fallbackComponent={<OAuthLoading />}>
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
                  <LucideIcon name="Mail" />
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
