"use client"

import React from "react"
import { SignedIn, SignedOut } from "@clerk/nextjs"

import {
  BackForwardButtons,
  LogInSignUpButtons,
  SearchInput,
  UserNav,
} from "@/features/nav"
import { useSearchContext } from "@/features/nav/search-context"
import SearchTabs from "@/features/nav/search-tabs"
import { Wrapper } from "@/shared/components/ui/wrapper"

function SearchHeader() {
  const { search } = useSearchContext()

  return (
    <Wrapper as="header" variant="header" className="">
      <div className="flex w-full flex-col">
        <nav className="flex h-16 w-full items-center justify-between">
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

        {search.length > 0 && <SearchTabs />}
      </div>
    </Wrapper>
  )
}

export default SearchHeader
