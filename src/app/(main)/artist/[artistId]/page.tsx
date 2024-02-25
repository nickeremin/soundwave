"use client"

import React from "react"

import MainFooter from "@/widgets/layout/footers/main-footer"
import ArtistDetails from "@/widgets/pages/artist/artist-details"
import ArtistPopularAlbums from "@/widgets/pages/artist/artist-popular-albums"
import ArtistTopTracks from "@/widgets/pages/artist/artist-top-tracks"
import RelatedArtists from "@/widgets/pages/artist/related-artists"
import { trpc } from "@/shared/trpc/client"

interface ArtistPageProps {
  params: {
    artistId: string
  }
}

function ArtistPage({ params: { artistId } }: ArtistPageProps) {
  const { data: artist } = trpc.artistRouter.getArtist.useQuery({ artistId })

  if (!artist) return null

  console.log(artist)

  return (
    <React.Fragment>
      <main className="relative space-y-10">
        <ArtistDetails artistId={artistId} />
        <ArtistTopTracks artistId={artistId} />
        <ArtistPopularAlbums artist={artist} />
        <RelatedArtists artistId={artistId} />
      </main>
      <MainFooter />
    </React.Fragment>
  )
}

export default ArtistPage
