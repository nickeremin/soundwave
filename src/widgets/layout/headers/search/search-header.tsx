"use client"

import React from "react"
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation"
import { SignedIn, SignedOut } from "@clerk/nextjs"

import BackForwardButtons from "@/features/nav/back-forward-buttons"
import LogInSignUpButtons from "@/features/nav/login-signup-buttons"
import SearchTabs from "@/features/nav/search-tabs"
import UserNav from "@/features/nav/user-nav"
import SearchInput from "@/features/search/search-input"
import { Wrapper } from "@/shared/components/ui/wrapper"

import SearchTrackSubheader from "./search-track-subheader"

function SearchHeader() {
  const segment = useSelectedLayoutSegment()
  const search = useSearchParams().get("query")

  return (
    <Wrapper
      as="header"
      variant="header"
      className="flex-col backdrop-blur-xl backdrop-saturate-200"
    >
      <nav className="flex h-16 w-full items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <BackForwardButtons />
          <SearchInput />
        </div>
        <SignedIn>
          <UserNav />
        </SignedIn>
        <SignedOut>
          <LogInSignUpButtons />
        </SignedOut>
      </nav>

      {search && search.length > 0 && (
        <nav className="flex w-full items-center px-6 pb-3 pt-1">
          <SearchTabs />
        </nav>
      )}

      {segment === "tracks" && <SearchTrackSubheader />}
    </Wrapper>
  )
}

export default SearchHeader
