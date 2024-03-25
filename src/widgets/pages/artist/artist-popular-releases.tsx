"use client"

import React from "react"
import Link from "next/link"
import { useLayoutStore } from "@/providers/bound-store-provider"

import AlbumPreviewCard from "@/entities/album/album-preview-card"
import AlbumPreviewCardLoading from "@/entities/album/album-preview-card-loading"
import { trpc } from "@/shared/trpc/client"

interface ArtistPopularAlbumsProps {
  artistId: string
}

function ArtistPopularAlbums({ artistId }: ArtistPopularAlbumsProps) {
  const columns = useLayoutStore((state) => state.columnsCount)

  // In artist page we prefetch artist, so here we can get artist instantly from cache
  const { data: artist } = trpc.artistRouter.getArtist.useQuery({ artistId })
  const { data } = trpc.artistRouter.getArtistAlbums.useQuery({
    artistId,
    include_groups: [],
  })

  if (data && data.artistAlbums.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between font-bold">
        <Link
          href={`/artist/${artistId}/discography/all`}
          className="decoration-2 hover:underline"
        >
          <h2 className="text-2xl">Popular Releases by {artist?.name}</h2>
        </Link>
        <Link
          href={`/artist/${artistId}/discography/all`}
          className="text-sm text-tertiary hover:underline"
        >
          Show all
        </Link>
      </div>
      <div
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
        className="grid"
      >
        {data
          ? data.artistAlbums
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
