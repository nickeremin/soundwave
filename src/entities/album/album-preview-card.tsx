import React from "react"
import Image from "next/image"
import { format } from "date-fns"

import { ArtistAlbum } from "@/shared/types/album"
import PlayerButton from "@/features/player/play-button"
import { getImageUrl } from "@/shared/lib/utils"

import ArtistLinksNames from "../artist/artist-name-links"

interface AlbumPreviewCardProps {
  album: ArtistAlbum
  withType?: boolean
  withArtists?: boolean
}

function AlbumPreviewCard({
  album,
  withArtists,
  withType,
}: AlbumPreviewCardProps) {
  const imageUrl = getImageUrl(album.images)
  const releaseDate = format(album.release_date, "yyyy")
  const albumType =
    album.album_type[0]?.toUpperCase() + album.album_type.slice(1).toLowerCase()

  return (
    <div className="group flex flex-col gap-4 rounded-lg bg-muted p-4 transition duration-300 hover:bg-accent">
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
        <div className="absolute bottom-2 right-2 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <PlayerButton className="shadow-player-button" />
        </div>
      </div>
      <div className="flex flex-col items-start gap-1">
        <p className="line-clamp-1 font-bold">{album.name}</p>
        <div className="line-clamp-2 text-sm font-medium text-tertiary">
          <span className="after:mx-1 after:content-['•']">{releaseDate}</span>
          {withType && <span>{albumType}</span>}
          {withArtists && <ArtistLinksNames artists={album.artists} />}
        </div>
      </div>
    </div>
  )
}

export default AlbumPreviewCard
