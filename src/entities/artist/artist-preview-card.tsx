import React from "react"
import Image from "next/image"

import { Artist } from "@/shared/types/artist"
import PlayerButton from "@/features/player/play-button"
import { getImageUrl } from "@/shared/lib/utils"

interface ArtistPreviewCardProps {
  artist: Artist
}

function ArtistPreviewCard({ artist }: ArtistPreviewCardProps) {
  const imageUrl = getImageUrl(artist.images)

  return (
    <div className="group flex flex-col gap-6 rounded-lg bg-muted p-4 pb-8 transition duration-300 hover:bg-accent">
      <div className="relative w-full rounded-full bg-accent pb-[100%] shadow-image-sm">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            width={320}
            height={320}
            className="absolute size-full rounded-full object-cover object-center"
          />
        ) : null}
        <div className="absolute bottom-2 right-2 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <PlayerButton className="shadow-player-button" />
        </div>
      </div>
      <div className="flex flex-col items-start">
        <p className="line-clamp-1 font-bold">{artist.name}</p>
        <p className="text-sm font-medium text-tertiary">Artist</p>
      </div>
    </div>
  )
}

export default ArtistPreviewCard
