"use client"

import React from "react"
import Link from "next/link"

import { ArtistShort } from "@/shared/types/artist"
import { useLayoutContext } from "@/widgets/layout/layout-context"
import AlbumPreviewCard from "@/entities/album/album-preview-card"
import AlbumPreviewCardLoading from "@/entities/album/album-preview-card-loading"
import { trpc } from "@/shared/trpc/client"

interface ArtistPopularAlbumsProps {
  artist: ArtistShort
}

function ArtistPopularAlbums({ artist }: ArtistPopularAlbumsProps) {
  const { columns } = useLayoutContext()
  const { data: albums } = trpc.artistRouter.getArtistAlbums.useQuery(artist.id)

  if (!albums || albums.total === 0) return null

  return (
    <div className="flex flex-col gap-2 px-6">
      <div className="flex items-baseline justify-between font-bold">
        <Link href={"/"} className="text-2xl decoration-2 hover:underline">
          <h2>Popular Albums by {artist.name}</h2>
        </Link>
        <Link href={"/"} className="text-sm text-secondary hover:underline">
          <span>Show all</span>
        </Link>
      </div>
      <div
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
        className="grid gap-6"
      >
        {albums
          ? albums.items
              .slice(0, columns)
              .map((album) => (
                <AlbumPreviewCard key={album.id} album={album} withType />
              ))
          : Array.from({ length: columns }, (_, i) => i).map((_, i) => (
              <AlbumPreviewCardLoading key={i} />
            ))}
      </div>
    </div>
  )
}

export default ArtistPopularAlbums
