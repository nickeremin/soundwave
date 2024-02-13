"use client"

import React from "react"

import AlbumTracks from "@/widgets/album/album-tracks"
import RelatedArtists from "@/widgets/artist/related-artists"
import MainFooter from "@/widgets/layout/footers/main-footer"
import RecommendedTracks from "@/widgets/track/recommended-tracks"
import TrackContextProvider from "@/widgets/track/track-context-provider"
import TrackDetails from "@/widgets/track/track-details"
import { trpc } from "@/shared/trpc/client"

interface TrackPageProps {
  params: {
    trackId: string
  }
}

function TrackPage({ params: { trackId } }: TrackPageProps) {
  const { data: track } = trpc.trackRouter.getTrack.useQuery(trackId)
  // const artistsWithAlbumsQueries = trpc.useQueries((t) =>
  //   track
  //     ? track.artists.map((artist) =>
  //         t.artistRouter.getArtistWithAlbums(artist.id)
  //       )
  //     : []
  // )
  // const relatedArtistsQuery = trpc.artistRouter.getRelatedArtists.useQuery(artistId)
  // const {data: album} = trpc.albumRouter.getAlbum.useQuery(albumId)
  if (!track) return null

  return (
    <TrackContextProvider key={trackId}>
      <main key={trackId} className="relative space-y-10">
        <TrackDetails trackId={trackId} />
        <RecommendedTracks trackId={trackId} />
        <RelatedArtists artistId={track.artists[0]!.id} />
        <AlbumTracks albumId={track.album.id} />
        {/* <TrackArtistAlbums {trackId} />
     
       */}
      </main>
      <MainFooter />
    </TrackContextProvider>
  )
}

export default TrackPage
