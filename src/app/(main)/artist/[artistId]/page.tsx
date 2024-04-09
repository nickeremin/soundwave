"use client"

import React from "react"
import PageContextProvider from "@/providers/page-context-provider"
import { useInView } from "react-intersection-observer"

import ArtistActionBar from "@/widgets/artist/artist-action-bar"
import ArtistAppearsOnAlbums from "@/widgets/artist/artist-appears-on-albums"
import ArtistDiscography from "@/widgets/artist/artist-discography"
import ArtistPreview from "@/widgets/artist/artist-preview"
import ArtistRelatedArtists from "@/widgets/artist/artist-related-artists"
import ArtistTopTracks from "@/widgets/artist/artist-top-tracks"
import ArtistHeader from "@/widgets/layout/headers/artist-header"
import MainFooter from "@/widgets/layout/main-footer"
import { trpc } from "@/shared/trpc/client"

interface ArtistPageProps {
  params: {
    artistId: string
  }
}

function ArtistPage({ params: { artistId } }: ArtistPageProps) {
  const { data: artist } = trpc.artistRouter.getArtist.useQuery({ artistId })

  const { ref: artistPreviewRef, entry } = useInView()

  if (!artist) return null

  return (
    <PageContextProvider>
      <div className="min-h-screen">
        <ArtistHeader artist={artist} previewEntry={entry} />
        <main className="relative -mt-16">
          <ArtistPreview ref={artistPreviewRef} artistId={artistId} />
          <div className="relative px-6">
            <div className="py-5">
              <ArtistActionBar artist={artist} />
            </div>
            <div className="space-y-10">
              <ArtistTopTracks artistId={artistId} />
              <ArtistDiscography artistId={artistId} />
              <ArtistRelatedArtists artistId={artistId} isPreview />
              <ArtistAppearsOnAlbums artistId={artistId} isPreview />
            </div>
          </div>
        </main>
      </div>
      <MainFooter />
    </PageContextProvider>
  )
}

export default ArtistPage
