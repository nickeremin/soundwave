"use client"

import React from "react"
import Link from "next/link"
import { useLayoutStore } from "@/providers/bound-store-provider"

import { type SimplifiedAlbumObject } from "@/shared/types/album"
import {
  DiscographyFilterType,
  type SimplifiedArtistObject,
} from "@/shared/types/artist"
import AlbumPreviewCard from "@/entities/album/album-preview-card"
import AlbumPreviewCardLoading from "@/entities/album/album-preview-card-loading"
import { trpc } from "@/shared/trpc/client"

interface TrackMainArtistDiscographyProps {
  artist: SimplifiedArtistObject
}

function TrackMainArtistDiscography({
  artist,
}: TrackMainArtistDiscographyProps) {
  const { data: albums } = trpc.artistRouter.getArtistAlbums.useQuery({
    artistId: artist.id,
    include_groups: ["album"],
  })
  const { data: singles } = trpc.artistRouter.getArtistAlbums.useQuery({
    artistId: artist.id,
    include_groups: ["single"],
  })
  const { data: compilations } = trpc.artistRouter.getArtistAlbums.useQuery({
    artistId: artist.id,
    include_groups: ["compilation"],
  })

  return (
    <React.Fragment>
      <ArtistDiscography
        artist={artist}
        discographyTitle="Albums"
        discographyType="album"
        data={albums?.artistAlbums}
      />
      <ArtistDiscography
        artist={artist}
        discographyTitle="Singles and EPs"
        discographyType="single"
        data={singles?.artistAlbums}
      />
      <ArtistDiscography
        artist={artist}
        discographyTitle="Compilations"
        discographyType="compilation"
        data={compilations?.artistAlbums}
      />
    </React.Fragment>
  )
}

interface ArtistDiscographyProps {
  artist: SimplifiedArtistObject
  discographyTitle: string
  discographyType: DiscographyFilterType
  data: SimplifiedAlbumObject[] | undefined
}

function ArtistDiscography({
  artist,
  discographyTitle,
  discographyType,
  data,
}: ArtistDiscographyProps) {
  const columns = useLayoutStore((state) => state.columnsCount)

  if (data && data.length == 0) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between font-bold">
        <Link
          href={`/artist/${artist.id}/discography/${discographyType}`}
          className="text-2xl decoration-2 hover:underline"
        >
          <h2 className="text-2xl">
            Popular {discographyTitle} by {artist.name}
          </h2>
        </Link>
        <Link
          href={`/artist/${artist.id}/discography/${discographyType}`}
          className="text-sm text-tertiary hover:underline"
        >
          Show all
        </Link>
      </div>
      <div
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
        className="-mx-3 grid"
      >
        {data
          ? data
              .slice(0, columns)
              .map((album) => (
                <AlbumPreviewCard
                  key={album.id}
                  album={album}
                  withReleaseDate
                  withType
                />
              ))
          : Array(columns)
              .fill(0)
              .map((_, i) => <AlbumPreviewCardLoading key={i} />)}
      </div>
    </div>
  )
}

export default TrackMainArtistDiscography
