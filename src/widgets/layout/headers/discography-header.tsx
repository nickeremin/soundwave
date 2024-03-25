import React from "react"
import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"

import { ArtistObject } from "@/shared/types/artist"
import DiscographyTypeFilter from "@/features/album/discography-type-filter"
import DiscographyLayoutFilter from "@/features/discography/discography-layout-filter"
import BackForwardButtons from "@/features/nav/back-forward-buttons"
import UserNav from "@/features/nav/user-nav"
import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

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
            <div className="flex items-center gap-3">
              <Link
                href="/signin"
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
        </div>
        <div className="flex h-10 items-center justify-between">
          <Link
            href={`/artist/${artist.id}`}
            className="text-2xl font-bold decoration-2 hover:underline"
          >
            {artist.name}
          </Link>
          <div className="flex items-center gap-2">
            <DiscographyTypeFilter />
            <DiscographyLayoutFilter />
          </div>
        </div>
      </nav>
    </HeaderWrapper>
  )
}

export default DiscographyHeader
