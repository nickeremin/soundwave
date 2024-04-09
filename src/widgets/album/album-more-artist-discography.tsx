"use client"

import React from "react"
import Link from "next/link"
import { useLayoutStore } from "@/providers/bound-store-provider"

import AlbumPreviewCard from "@/entities/album/album-preview-card"
import AlbumPreviewCardLoading from "@/entities/album/album-preview-card-loading"
import { trpc } from "@/shared/trpc/client"

interface AlbumMoreArtistDiscographyProps {
  artistId: string
  artistName: string
}

function AlbumMoreArtistDiscography({
  artistId,
  artistName,
}: AlbumMoreArtistDiscographyProps) {
  const columns = useLayoutStore((state) => state.columnsCount)

  const { data: albums } = trpc.artistRouter.getArtistAlbums.useQuery({
    artistId,
    include_groups: ["album"],
  })
  const { data: singles } = trpc.artistRouter.getArtistAlbums.useQuery({
    artistId,
    include_groups: ["single"],
  })
  const { data: compilations } = trpc.artistRouter.getArtistAlbums.useQuery({
    artistId,
    include_groups: ["compilation"],
  })

  const isLoading = !albums || !singles || !compilations

  const allDiscography = isLoading
    ? []
    : [
        ...albums.artistAlbums,
        ...singles.artistAlbums,
        ...compilations.artistAlbums,
      ]

  if (!isLoading && allDiscography.length == 0) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between font-bold">
        <Link
          href={`/artist/${artistId}/discography/all`}
          className="decoration-2 hover:underline"
        >
          <h2 className="text-2xl">More by {artistName}</h2>
        </Link>
        <Link
          href={`/artist/${artistId}/discography/all`}
          className="text-sm text-tertiary hover:underline"
        >
          See discography
        </Link>
      </div>

      <div
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
        className="-mx-3 grid"
      >
        {isLoading
          ? Array.from({ length: columns }, (_, i) => i).map((_, i) => (
              <AlbumPreviewCardLoading key={i} />
            ))
          : [...allDiscography]
              .sort((first, second) =>
                second.release_date.localeCompare(first.release_date)
              )
              .slice(0, columns)
              .map((item) => (
                <AlbumPreviewCard key={item.id} album={item} withReleaseDate />
              ))}
      </div>
    </div>
  )
}

export default AlbumMoreArtistDiscography
