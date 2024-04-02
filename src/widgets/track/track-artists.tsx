"use client"

import React from "react"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { SignedOut } from "@clerk/nextjs"

import { SimplifiedArtistObject } from "@/shared/types/artist"
import LogInSignUpButtons from "@/features/nav/login-signup-buttons"
import TrackArtistLinkCard from "@/entities/artist/track-artist-link-card"
import TrackArtistLinkCardLoading from "@/entities/artist/track-artist-link-card-loading"
import { trpc } from "@/shared/trpc/client"

interface TrackArtistLinksProps {
  artistIds: string[]
}

function TrackArtistLinks({ artistIds }: TrackArtistLinksProps) {
  const columns = useLayoutStore((state) => state.columnsCount)

  const { data: artists } = trpc.artistRouter.getSeveralArtists.useQuery({
    artistIds,
  })

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
      className="grid items-start gap-6"
    >
      {/* <SignedOut>
      <div className="col-span-full flex max-w-xl flex-col items-end gap-10 rounded-lg bg-background/50 p-4 xl:col-start-1 xl:col-end-3">
        <p className="self-start font-semibold">
          Sign in to see lyrics and listen to the full track
        </p>
        <LogInSignUpButtons />
      </div>
      </SignedOut> */}
      <div className="col-span-full flex w-full flex-col">
        {artists
          ? artists.map((artist) => (
              <TrackArtistLinkCard key={artist.id} artist={artist} />
            ))
          : Array(artistIds.length)
              .fill(0)
              .map((_, i) => <TrackArtistLinkCardLoading key={i} />)}
      </div>
    </div>
  )
}

export default TrackArtistLinks
