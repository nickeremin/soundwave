import React from "react"
import Image from "next/image"

import { Artist } from "@/shared/types/artist"
import { getImageUrl } from "@/shared/lib/utils"

interface ArtistPreviewCardProps {
  artist: Artist
}

function ArtistPreviewCard({ artist }: ArtistPreviewCardProps) {
  const imageUrl = getImageUrl(artist.images)

  return (
    <div className="flex flex-col gap-6 rounded-lg bg-muted p-4 pb-8 transition hover:bg-accent">
      <div className="relative">
        <div className="shadow-image-sm relative w-full overflow-hidden rounded-full bg-muted pb-[100%]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              width={160}
              height={160}
              className="absolute size-full object-cover object-center"
            />
          ) : null}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="overflow-hidden text-ellipsis text-nowrap font-medium">
          {artist.name}
        </p>
        <p className="text-sm text-tertiary">Artist</p>
      </div>
    </div>
  )
}

export default ArtistPreviewCard
