"use client"

import React from "react"
import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import chroma from "chroma-js"

import { useTrackContext } from "@/widgets/pages/track/track-context-provider"
import { usePageContext } from "@/widgets/providers/page-context-provider"
import { BackForwardButtons, UserNav } from "@/features/nav"
import { buttonVariants } from "@/shared/components/ui/button"
import { Wrapper } from "@/shared/components/ui/wrapper"
import { cn } from "@/shared/lib/utils"

function ArtistHeader() {
  const { backgroundColor } = usePageContext()

  return (
    <Wrapper
      // style={{
      //   backgroundColor: backgroundColor
      //     ? backgroundColor.isDark
      //       ? chroma(backgroundColor.hex).saturate(1).brighten(1.25).hex()
      //       : chroma(backgroundColor.hex).saturate(1.25).darken(1.5).hex()
      //     : undefined,
      // }}
      variant="header"
      as="header"
      className="absolute  bg-transparent"
    >
      <nav className="flex h-16 w-full items-center justify-between px-6">
        <BackForwardButtons />
        <SignedIn>
          <div className="flex items-center gap-3">
            <UserNav />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "rounded-full font-semibold",
                })
              )}
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className={cn(
                buttonVariants({
                  size: "lg",
                  className: "rounded-full font-semibold",
                })
              )}
            >
              Sign Up
            </Link>
          </div>
        </SignedOut>
      </nav>
    </Wrapper>
  )
}

export default ArtistHeader
