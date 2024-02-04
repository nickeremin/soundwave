"use client"

import React from "react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { useCycle } from "framer-motion"

import { PageHeading } from "@/shared/components/ui/page-heading"
import { Wrapper } from "@/shared/components/ui/wrapper"

import MobileMenuToggleButton from "../mobile-menu-toggle-button"
import MobileMenuHeaderWrapper from "./mobile-menu/mobile-menu-header-wrapper"

function VerificationHeader() {
  const { isLoaded } = useUser()
  const [isOpen, toggleOpen] = useCycle(false, true)

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
              Tablebuilder
            </PageHeading>
          </Link>
        </div>
        {isLoaded && (
          <div className="lg:hidden">
            <MobileMenuToggleButton isOpen={isOpen} toggleOpen={toggleOpen} />
          </div>
        )}
      </Wrapper>
    </MobileMenuHeaderWrapper>
  )
}

export default VerificationHeader
