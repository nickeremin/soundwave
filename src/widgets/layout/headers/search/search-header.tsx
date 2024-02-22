"use client"

import React from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import { SignedIn, SignedOut } from "@clerk/nextjs"

import {
  BackForwardButtons,
  LogInSignUpButtons,
  SearchInput,
  UserNav,
} from "@/features/nav"
import SearchTabs from "@/features/nav/search-tabs"
import { Wrapper } from "@/shared/components/ui/wrapper"

import SearchTrackSubheader from "./search-track-subheader"

function SearchHeader() {
  const segment = useSelectedLayoutSegment()

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

      <nav className="flex w-full items-center px-6 pb-3 pt-1">
        <SearchTabs />
      </nav>

      {segment === "tracks" && <SearchTrackSubheader />}
    </Wrapper>
  )
}

export default SearchHeader
