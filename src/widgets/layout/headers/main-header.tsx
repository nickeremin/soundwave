import React from "react"
import { SignedIn, SignedOut } from "@clerk/nextjs"

import BackForwardButtons from "@/features/nav/back-forward-buttons"
import LogInSignUpButtons from "@/features/nav/login-signup-buttons"
import UserNav from "@/features/nav/user-nav"

import HeaderWrapper from "./header-wrapper"

function MainHeader() {
  return (
    <HeaderWrapper>
      <nav className="flex h-16 w-full items-center justify-between px-6">
        <BackForwardButtons />
        <SignedIn>
          <div className="flex items-center gap-3">
            <UserNav />
          </div>
        </SignedIn>
        <SignedOut>
          <LogInSignUpButtons />
        </SignedOut>
      </nav>
    </HeaderWrapper>
  )
}

export default MainHeader
