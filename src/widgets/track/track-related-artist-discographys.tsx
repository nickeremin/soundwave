import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useLayoutStore } from "@/providers/bound-store-provider"

import { type SimplifiedArtistObject } from "@/shared/types/artist"
import AlbumPreviewCard from "@/entities/album/album-preview-card"
import AlbumPreviewCardLoading from "@/entities/album/album-preview-card-loading"
import { getImageUrl } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

interface TrackRelatedArtistDiscographyProps {
  artist: SimplifiedArtistObject
}

function TrackRelatedArtistDiscography({
  artist,
}: TrackRelatedArtistDiscographyProps) {
  const columns = useLayoutStore((state) => state.columnsCount)

  const { data: artistData } = trpc.artistRouter.getArtist.useQuery({
    artistId: artist.id,
  })

  const imageUrl = getImageUrl(artistData?.images)

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

  const isLoading = !albums || !singles || !compilations

  const allDiscography = isLoading
    ? []
    : [
        ...albums.artistAlbums,
        ...singles.artistAlbums,
        ...compilations.artistAlbums,
      ].toSorted((first, second) =>
        second.release_date.localeCompare(first.release_date)
      )

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between font-bold ">
        <div className="flex items-center gap-3">
          <div className="relative size-10 rounded-full bg-accent shadow-image-sm">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt=""
                width={80}
                height={80}
                className="absolute size-full rounded-full object-cover object-center"
              />
            ) : null}
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-tertiary">
              Popular releases
            </p>
            <Link
              href={`/artist/${artist.id}/discography/all`}
              className="hover:underline"
            >
              {artist.name}
            </Link>
          </div>
        </div>
        <Link
          href={`/artist/${artist.id}/discography/all`}
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
        {!isLoading
          ? allDiscography
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

export default TrackRelatedArtistDiscography
