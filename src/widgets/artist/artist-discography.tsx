"use client"

import React from "react"
import Link from "next/link"
import { useLayoutStore } from "@/providers/bound-store-provider"

import { type DiscographyFilterType } from "@/shared/types/artist"
import DiscographyFilters from "@/features/discography/discography-filters"
import AlbumPreviewCard from "@/entities/album/album-preview-card"
import AlbumPreviewCardLoading from "@/entities/album/album-preview-card-loading"
import { trpc } from "@/shared/trpc/client"

interface ArtistDiscographyProps {
  artistId: string
}

function ArtistDiscography({ artistId }: ArtistDiscographyProps) {
  const [discographyFilter, setDiscographyFilter] =
    React.useState<DiscographyFilterType>("all")

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
          href={`/artist/${artistId}/discography/${discographyFilter}`}
          className="decoration-2 hover:underline"
        >
          <h2 className="text-2xl">Discography</h2>
        </Link>
        <Link
          href={`/artist/${artistId}/discography/${discographyFilter}`}
          className="text-sm text-tertiary hover:underline"
        >
          Show all
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <DiscographyFilters
          artistId={artistId}
          discographyFilter={discographyFilter}
          setDiscographyFilter={setDiscographyFilter}
        />
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
          : allDiscography
              .filter((item) => {
                if (discographyFilter == "all") return true
                else return discographyFilter == item.album_type.toLowerCase()
              })
              .toSorted((first, second) =>
                second.release_date.localeCompare(first.release_date)
              )
              .slice(0, columns)
              .map((item) => (
                <AlbumPreviewCard
                  key={item.id}
                  album={item}
                  withReleaseDate
                  withType
                />
              ))}
      </div>
    </div>
  )
}

export default ArtistDiscography
