"use client"

import React from "react"

import AlbumTracks from "@/widgets/album/album-tracks"
import ArtistPopularAlbums from "@/widgets/artist/artist-popular-albums"
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

  if (!track) return null

  return (
    <TrackContextProvider key={trackId}>
      <main className="relative space-y-10">
        <TrackDetails trackId={trackId} />
        <RecommendedTracks trackId={trackId} />
        {/* Popular releases by artists on this track */}
        <div className="flex flex-col gap-10 px-6">
          {track.artists.map((artist) => (
            <ArtistPopularAlbums key={artist.id} artist={artist} />
          ))}
        </div>
        <RelatedArtists artistId={track.artists[0]!.id} />
        <AlbumTracks albumId={track.album.id} />
      </main>
      <MainFooter />
    </TrackContextProvider>
  )
}

export default TrackPage
