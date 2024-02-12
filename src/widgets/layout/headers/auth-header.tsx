"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { buttonVariants } from "@/shared/components/ui/button"
import { PageHeading } from "@/shared/components/ui/page-heading"
import { cn } from "@/shared/lib/utils"

function AuthHeader() {
  //const [isOpen, toggleOpen] = useCycle(false, true)
  const pathname = usePathname()

  //Based on pathname switch button on sign in or sign up
  const title = String(pathname).includes("signup") ? "Log In" : "Sign Up"
  const href = String(pathname).includes("signup") ? "/login" : "/signup"

  return (
    // <MobileMenuHeaderWrapper
    //   isOpen={isOpen}
    //   toggleOpen={toggleOpen}
    //   backgroundColor="var(--background-hsl)"
    // >
    //   <Wrapper as="header" variant="header">
    //     <div className="flex flex-1 items-center">
    //       <Link href="/" className="flex items-center gap-2">
    //         <PageHeading size="logo" variant="gradient" className="font-bold">
    //           SoundWave
    //         </PageHeading>
    //       </Link>
    //     </div>
    //     <div className="hidden items-center gap-3 lg:flex">
    //       <Link
    //         href="/contact"
    //         className="px-1 py-0.5 text-sm font-medium text-tertiary transition-colors hover:text-primary"
    //       >
    //         Contact
    //       </Link>
    //       <Link
    //         data-shadcnui-button
    //         href={href}
    //         className={cn(
    //           buttonVariants({
    //             variant: "outline",
    //           })
    //         )}
    //       >
    //         {title}
    //       </Link>
    //     </div>
    //     <div className="lg:hidden">
    //       <MobileMenuToggleButton isOpen={isOpen} toggleOpen={toggleOpen} />
    //     </div>
    //   </Wrapper>
    // </MobileMenuHeaderWrapper>
    <header className="absolute top-0 z-50 flex h-16 w-full items-center px-6">
      <nav className="flex w-full items-center justify-between">
        <Link href="/" className="">
          <PageHeading
            variant="gradient"
            size="logo"
            className="text-center font-bold"
          >
            SoundWave
          </PageHeading>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="px-1 py-0.5 text-sm font-medium text-tertiary transition-colors hover:text-primary"
          >
            Contact
          </Link>
          <Link
            data-shadcnui-button
            href={href}
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "rounded-full",
              })
            )}
          >
            {title}
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default AuthHeader
