import React from "react"
import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"

import { BackForwardButtons, UserNav } from "@/features/nav"
import { buttonVariants } from "@/shared/components/ui/button"
import { Wrapper } from "@/shared/components/ui/wrapper"
import { cn } from "@/shared/lib/utils"

function MainHeader({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <Wrapper variant="header" as="header" className={className}>
      <nav className="flex h-16 w-full items-center justify-between px-6">
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
    </Wrapper>
  )
}

export default MainHeader
