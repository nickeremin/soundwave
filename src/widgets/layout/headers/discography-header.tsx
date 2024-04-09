import React from "react"
import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"

import { ArtistObject } from "@/shared/types/artist"
import DiscographyFilterSelect from "@/features/discography/discography-filter-select"
import DiscographyLayoutFilter from "@/features/discography/discography-layout-filter"
import BackForwardButtons from "@/features/nav/back-forward-buttons"
import LogInSignUpButtons from "@/features/nav/login-signup-buttons"
import UserNav from "@/features/nav/user-nav"

import HeaderWrapper from "./header-wrapper"

interface DiscographyHeaderProps {
  artist: ArtistObject
}

function DiscographyHeader({ artist }: DiscographyHeaderProps) {
  return (
    <HeaderWrapper>
      <nav className="flex w-full flex-col px-6">
        <div className="flex h-16 w-full items-center justify-between">
          <BackForwardButtons />
          <SignedIn>
            <div className="flex items-center gap-3">
              <UserNav />
            </div>
          </SignedIn>
          <SignedOut>
            <LogInSignUpButtons />
          </SignedOut>
        </div>
        <div className="flex h-10 items-center justify-between">
          <Link
            href={`/artist/${artist.id}`}
            className="text-2xl font-bold decoration-2 hover:underline"
          >
            {artist.name}
          </Link>
          <div className="flex items-center gap-2">
            <DiscographyFilterSelect artistId={artist.id} />
            <DiscographyLayoutFilter />
          </div>
        </div>
      </nav>
    </HeaderWrapper>
  )
}

export default DiscographyHeader
