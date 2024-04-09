"use client"

import React from "react"
import PageContextProvider from "@/providers/page-context-provider"
import { useInView } from "react-intersection-observer"

import AlbumActionBar from "@/widgets/album/album-action-bar"
import AlbumMoreArtistDiscography from "@/widgets/album/album-more-artist-discography"
import AlbumPreview from "@/widgets/album/album-preview"
import AlbumTracks from "@/widgets/album/album-tracks"
import AlbumHeader from "@/widgets/layout/headers/album-header"
import MainFooter from "@/widgets/layout/main-footer"
import { trpc } from "@/shared/trpc/client"

interface AlbumPageProps {
  params: {
    albumId: string
  }
}

function AlbumPage({ params: { albumId } }: AlbumPageProps) {
  const { data: album } = trpc.albumRouter.getAlbum.useQuery({ albumId })

  const { ref: albumPreviewRef, entry } = useInView()

  if (!album) return null

  const mainArtist = album.artists[0]!

  return (
    <PageContextProvider>
      <div className="min-h-screen">
        <AlbumHeader album={album} previewEntry={entry} />
        <main className="relative -mt-16">
          <AlbumPreview ref={albumPreviewRef} albumId={albumId} />
          <div className="relative px-6">
            <div className="py-5">
              <AlbumActionBar album={album} />
            </div>
            <div className="space-y-10">
              <AlbumTracks
                albumId={albumId}
                totalTracks={album.total_tracks}
                isSticky
              />
              <AlbumMoreArtistDiscography
                artistId={mainArtist.id}
                artistName={mainArtist.name}
              />
            </div>
          </div>
        </main>
      </div>
      <MainFooter />
    </PageContextProvider>
  )
}

export default AlbumPage
