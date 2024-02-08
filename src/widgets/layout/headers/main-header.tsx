import React from "react"
import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"

import { BackForwardButtons, UserNav } from "@/features/nav"
import { LucideIcon } from "@/shared/components/icons"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

function MainHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center bg-background-100/80 px-6 backdrop-blur-[20px] backdrop-saturate-200">
      <nav className="flex w-full items-center justify-between">
        <BackForwardButtons />
        <SignedIn>
          <div className="flex items-center gap-3">
            {/* <Link
              href="/contact"
              className="px-1 py-0.5 font-medium text-tertiary transition-colors hover:text-primary"
            >
              Contact
            </Link> */}
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
    </header>
  )
}

export default MainHeader
