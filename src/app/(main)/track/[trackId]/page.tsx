"use client"

import React from "react"

import ArtistPopularAlbums from "@/widgets/artist/artist-discography"
import RelatedArtists from "@/widgets/artist/artist-related-artists"
import MainFooter from "@/widgets/layout/footers/main-footer"
import AlbumTracks from "@/widgets/pages/track/album-tracks"
import RecommendedTracks from "@/widgets/pages/track/recommended-tracks"
import TrackContextProvider from "@/widgets/pages/track/track-context-provider"
import TrackDetails from "@/widgets/pages/track/track-details"
import { trpc } from "@/shared/trpc/client"

interface TrackPageProps {
  params: {
    trackId: string
  }
}

function TrackPage({ params: { trackId } }: TrackPageProps) {
  const { data: track } = trpc.trackRouter.getTrack.useQuery({ trackId })

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
