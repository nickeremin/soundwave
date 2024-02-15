import React from "react"
import Image from "next/image"
import Link from "next/link"

import { Artist } from "@/shared/types/artist"
import { getImageUrl } from "@/shared/lib/utils"

interface TrackArtistLinkCardProps {
  artist: Artist
}

function TrackArtistLinkCard({ artist }: TrackArtistLinkCardProps) {
  const imageUrl = getImageUrl(artist.images)

  return (
    <Link href="/">
      <div className="flex w-full items-center gap-4 rounded-md p-2 transition hover:bg-accent">
        <div className="relative size-20 overflow-hidden rounded-full bg-muted shadow-image-lg">
          {imageUrl ? (
            <Image
              src={imageUrl}
              width={160}
              height={160}
              alt=""
              className="size-full object-cover object-center"
            />
          ) : null}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium">Artist</p>
          <p className="font-bold">{artist.name}</p>
        </div>
      </div>
    </Link>
  )
}

export default TrackArtistLinkCard
