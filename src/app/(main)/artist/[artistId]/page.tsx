"use client"

import React from "react"

import ArtistDetails from "@/widgets/pages/artist/artist-details"
import ArtistTopTracks from "@/widgets/pages/artist/artist-top-tracks"
import { trpc } from "@/shared/trpc/client"

interface ArtistPageProps {
  params: {
    artistId: string
  }
}

function ArtistPage({ params: { artistId } }: ArtistPageProps) {
  const { data: artist } = trpc.artistRouter.getArtist.useQuery(artistId)

  if (!artist) return null

  console.log(artist)

  return (
    <main className="relative space-y-10">
      <ArtistDetails artistId={artistId} />
      <ArtistTopTracks />
    </main>
  )
}

export default ArtistPage
