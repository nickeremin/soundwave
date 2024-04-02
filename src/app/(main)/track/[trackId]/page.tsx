"use client"

import React from "react"
import { useInView } from "react-intersection-observer"

import ArtistPopularAlbums from "@/widgets/artist/artist-discography"
import RelatedArtists from "@/widgets/artist/artist-related-artists"
import ArtistRelatedArtists from "@/widgets/artist/artist-related-artists"
import MainFooter from "@/widgets/layout/footers/main-footer"
import TrackHeader from "@/widgets/layout/headers/track-header"
import AlbumTracks from "@/widgets/pages/track/album-tracks"
import TrackContextProvider from "@/widgets/pages/track/track-context-provider"
import TrackDetails from "@/widgets/pages/track/track-details"
import PageContextProvider from "@/widgets/providers/page-context-provider"
import TrackActionBar from "@/widgets/track/track-action-bar"
import TrackArtistPopularTracks from "@/widgets/track/track-artist-popular-tracks"
import TrackArtistLinks from "@/widgets/track/track-artists"
import TrackMainArtistDiscography from "@/widgets/track/track-main-artist-discography"
import TrackPreview from "@/widgets/track/track-preview"
import TrackRecommendedTracks from "@/widgets/track/track-recommended-tracks"
import TrackRelatedArtistDiscography from "@/widgets/track/track-related-artist-discographys"
import { trpc } from "@/shared/trpc/client"

interface TrackPageProps {
  params: {
    trackId: string
  }
}

function TrackPage({ params: { trackId } }: TrackPageProps) {
  const { data: track } = trpc.trackRouter.getTrack.useQuery({ trackId })

  const { ref: trackPreviewRef, entry } = useInView()

  if (!track) return null

  const mainArtist = track.artists[0]!

  return (
    <PageContextProvider>
      <div className="min-h-screen">
        <TrackHeader track={track} previewEntry={entry} />
        <main className="relative -mt-16">
          <TrackPreview ref={trackPreviewRef} trackId={trackId} />
          <div className="relative px-6">
            <TrackActionBar track={track} />
            <div className="space-y-10">
              <TrackArtistLinks
                artistIds={track.artists.map((artist) => artist.id)}
              />
              <TrackRecommendedTracks
                trackId={trackId}
                artistIds={track.artists.slice(0, 5).map((artist) => artist.id)}
              />
              <TrackArtistPopularTracks
                artistId={mainArtist.id}
                artistName={mainArtist.name}
              />
              <TrackMainArtistDiscography artist={mainArtist} />
              {track.artists.slice(1).map((artist) => (
                <TrackRelatedArtistDiscography
                  key={artist.id}
                  artist={artist}
                />
              ))}
              <ArtistRelatedArtists artistId={mainArtist.id} isPreview />
            </div>
          </div>
        </main>
      </div>
      <MainFooter />
    </PageContextProvider>
    // <PageContextProvider>
    //   <main className="relative space-y-10">
    //     <TrackDetails trackId={trackId} />
    //     <RecommendedTracks trackId={trackId} />
    //     {/* Popular releases by artists on this track */}
    //     <div className="flex flex-col gap-10 px-6">
    //       {track.artists.map((artist) => (
    //         <ArtistPopularAlbums key={artist.id} artist={artist} />
    //       ))}
    //     </div>
    //     {/* <RelatedArtists artistId={track.artists[0]!.id} />
    //     <AlbumTracks albumId={track.album.id} /> */}
    //   </main>
    //   <MainFooter />
    // </PageContextProvider>
  )
}

export default TrackPage
