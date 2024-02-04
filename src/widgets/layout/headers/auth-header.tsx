"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCycle } from "framer-motion"

import { buttonVariants } from "@/shared/components/ui/button"
import { PageHeading } from "@/shared/components/ui/page-heading"
import { Wrapper } from "@/shared/components/ui/wrapper"
import { cn } from "@/shared/lib/utils"

import MobileMenuToggleButton from "../mobile-menu-toggle-button"
import MobileMenuHeaderWrapper from "./mobile-menu/mobile-menu-header-wrapper"

function AuthHeader() {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const pathname = usePathname()

  //Based on pathname switch button on sign in or sign up
  const title = String(pathname).includes("signup")
    ? "Войти"
    : "Создать аккаунт"
  const href = String(pathname).includes("signup") ? "/signin" : "/signup"

  return (
    <MobileMenuHeaderWrapper
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      backgroundColor="var(--background-hsl)"
    >
      <Wrapper as="header" variant="header">
        <div className="flex flex-1 items-center">
          <Link href="/" className="flex items-center gap-2">
            <PageHeading size="logo" variant="gradient" className="font-bold">
              Timebuilder
            </PageHeading>
          </Link>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="px-1 py-0.5 text-sm font-medium text-tertiary transition-colors hover:text-primary"
          >
            Связаться с Нами
          </Link>
          <Link
            data-shadcnui-button
            href={href}
            className={cn(
              buttonVariants({
                variant: "outline",
              })
            )}
          >
            {title}
          </Link>
        </div>
        <div className="lg:hidden">
          <MobileMenuToggleButton isOpen={isOpen} toggleOpen={toggleOpen} />
        </div>
      </Wrapper>
    </MobileMenuHeaderWrapper>
  )
}

export default AuthHeader
