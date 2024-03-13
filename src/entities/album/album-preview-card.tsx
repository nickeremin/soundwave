import React from "react"
import Image from "next/image"
import { useSearchStore } from "@/providers/bound-store-provider"
import { format } from "date-fns"

import { SimplifiedAlbumObject } from "@/shared/types/album"
import PlayerButton from "@/features/player/play-button"
import { getImageUrl } from "@/shared/lib/utils"

import ArtistLinksNames from "../artist/artist-name-links"

interface AlbumPreviewCardProps<TAlbum> {
  album: TAlbum
  withType?: boolean
  withArtists?: boolean
  withAddToRecentSearches?: boolean
}

function AlbumPreviewCard<TAlbum extends SimplifiedAlbumObject>({
  album,
  withArtists,
  withType,
  withAddToRecentSearches,
}: AlbumPreviewCardProps<TAlbum>) {
  const imageUrl = getImageUrl(album.images)
  const releaseDate = format(album.release_date, "yyyy")
  const albumType =
    album.album_type[0]?.toUpperCase() + album.album_type.slice(1).toLowerCase()

  const addToRecentSearches = useSearchStore((state) => state.addRecentSearch)

  function handleClick() {
    if (withAddToRecentSearches) {
      addToRecentSearches({ item: album, type: "album" })
    }
  }

  return (
    <div className="group relative flex flex-col gap-4 rounded-lg p-3 transition duration-300 hover:bg-accent">
      <div
        data-shadcnui-button
        role="button"
        tabIndex={0}
        className="absolute inset-0 z-10 cursor-pointer rounded-lg outline-none"
        onClick={handleClick}
      />
      <div className="relative w-full rounded-md bg-accent pb-[100%] shadow-image-sm">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            width={320}
            height={320}
            className="absolute size-full rounded-md object-cover object-center"
          />
        ) : null}
        <div className="absolute bottom-2 right-2 z-20  translate-y-2 opacity-0 transition duration-300 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          <PlayerButton className="shadow-player-button" />
        </div>
      </div>
      <div className="flex flex-col items-start gap-1">
        <p className="line-clamp-1 font-bold">{album.name}</p>
        <div className="line-clamp-2 text-sm font-medium text-tertiary [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
          <span>{releaseDate}</span>
          {withType && <span>{albumType}</span>}
          {withArtists && <ArtistLinksNames artists={album.artists} />}
        </div>
      </div>
    </div>
  )
}

export default AlbumPreviewCard
