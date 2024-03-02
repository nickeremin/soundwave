"use client"

import React from "react"

import MainFooter from "@/widgets/layout/footers/main-footer"
import AlbumDetails from "@/widgets/pages/album/album-details"
import AlbumTracks from "@/widgets/pages/album/album-tracks"
import ArtistPopularAlbums from "@/widgets/pages/artist/artist-popular-albums"
import { trpc } from "@/shared/trpc/client"

interface AlbumPageProps {
  params: {
    albumId: string
  }
}

function AlbumPage({ params: { albumId } }: AlbumPageProps) {
  const { data: album } = trpc.albumRouter.getAlbum.useQuery({ albumId })

  if (!album) return null

  const mainArtist = album.artists[0]

  return (
    <React.Fragment>
      <main className="relative space-y-10">
        <AlbumDetails albumId={albumId} />
        <AlbumTracks albumId={albumId} />
        {mainArtist ? <ArtistPopularAlbums artist={mainArtist} /> : null}
      </main>
      <MainFooter />
    </React.Fragment>
  )
}

export default AlbumPage
