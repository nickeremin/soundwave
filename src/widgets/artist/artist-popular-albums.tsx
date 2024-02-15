"use client"

import React from "react"
import Link from "next/link"

import { ArtistShort } from "@/shared/types/artist"
import AlbumPreviewCard from "@/entities/album/album-preview-card"
import AlbumPreviewCardLoading from "@/entities/album/album-preview-card-loading"
import { useGridColumns } from "@/shared/lib/hooks/use-grid-columns"
import { trpc } from "@/shared/trpc/client"

interface ArtistPopularAlbumsProps {
  artist: ArtistShort
}

function ArtistPopularAlbums({ artist }: ArtistPopularAlbumsProps) {
  const columns = useGridColumns()
  const { data: albums } = trpc.artistRouter.getArtistAlbums.useQuery(artist.id)

  if (!albums || albums.total === 0) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between font-bold">
        <Link href={"/"} className="text-2xl hover:underline">
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
        className="grid gap-4"
      >
        {albums
          ? albums.items
              .slice(0, columns)
              .map((album) => <AlbumPreviewCard key={album.id} album={album} />)
          : Array.from({ length: columns }, (_, i) => i).map((_, i) => (
              <AlbumPreviewCardLoading key={i} />
            ))}
      </div>
    </div>
  )
}

export default ArtistPopularAlbums
