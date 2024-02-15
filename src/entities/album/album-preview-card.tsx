import React from "react"
import Image from "next/image"
import { format } from "date-fns"

import { ArtistAlbum } from "@/shared/types/album"
import PlayerButton from "@/features/player/player-button"
import { getImageUrl } from "@/shared/lib/utils"

interface AlbumPreviewCardProps {
  album: ArtistAlbum
}

function AlbumPreviewCard({ album }: AlbumPreviewCardProps) {
  const imageUrl = getImageUrl(album.images)

  return (
    <div className="group flex flex-col gap-6 rounded-lg bg-muted p-4 pb-8 transition hover:bg-accent">
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
      <div className="flex flex-col items-start">
        <p className="overflow-hidden text-ellipsis text-nowrap font-bold">
          {album.name}
        </p>
        <p className="text-sm font-medium text-tertiary">
          {format(album.release_date, "yyyy")} •{" "}
          {album.album_type[0]?.toUpperCase() +
            album.album_type.slice(1).toLowerCase()}
        </p>
      </div>
    </div>
  )
}

export default AlbumPreviewCard
