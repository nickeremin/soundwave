"use client"

import React from "react"
import { useInView } from "react-intersection-observer"

import AlbumPreview from "@/widgets/album/album-preview"
import MainFooter from "@/widgets/layout/footers/main-footer"
import AlbumHeader from "@/widgets/layout/headers/album-header"
import PageContextProvider from "@/widgets/providers/page-context-provider"
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

  const mainArtist = album.artists[0]

  return (
    <PageContextProvider>
      <div className="min-h-screen">
        <AlbumHeader album={album} previewEntry={entry} />
        <main className="relative -mt-16">
          <AlbumPreview ref={albumPreviewRef} albumId={albumId} />
          <div className="relative px-6">
            <div className="py-5"></div>
            <div className="space-y-10"></div>
          </div>
        </main>
      </div>
      <MainFooter />
    </PageContextProvider>
  )
}

export default AlbumPage
