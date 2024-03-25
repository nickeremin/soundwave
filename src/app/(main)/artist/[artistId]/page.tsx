"use client"

import React from "react"
import { useInView } from "react-intersection-observer"

import ArtistActionBar from "@/widgets/artist/artist-action-bar"
import ArtistPreview from "@/widgets/artist/artist-preview"
import MainFooter from "@/widgets/layout/footers/main-footer"
import ArtistHeader from "@/widgets/layout/headers/artist-header"
import ArtistPopularReleases from "@/widgets/pages/artist/artist-popular-releases"
import ArtistTopTracks from "@/widgets/pages/artist/artist-top-tracks"
import RelatedArtists from "@/widgets/pages/artist/related-artists"
import PageContextProvider from "@/widgets/providers/page-context-provider"
import { trpc } from "@/shared/trpc/client"

interface ArtistPageProps {
  params: {
    artistId: string
  }
}

function ArtistPage({ params: { artistId } }: ArtistPageProps) {
  const { data: artist } = trpc.artistRouter.getArtist.useQuery({ artistId })

  const { ref: artistPreviewRef, inView, entry } = useInView()

  if (!artist) return null

  return (
    <PageContextProvider>
      <div className="min-h-screen">
        <ArtistHeader artist={artist} inView={inView} previewEntry={entry} />
        <main className="relative -mt-16">
          <ArtistPreview ref={artistPreviewRef} artistId={artistId} />
          <div className="px-6">
            <div className="py-5">
              <ArtistActionBar />
            </div>
            <div className="space-y-10">
              <ArtistTopTracks artistId={artistId} />
              <ArtistPopularReleases artistId={artistId} />
              <RelatedArtists artistId={artistId} isPreview={true} />
            </div>
          </div>
        </main>
      </div>
      <MainFooter />
    </PageContextProvider>
  )
}

export default ArtistPage
