import React from "react"
import Image from "next/image"

// import Image from "next/image"
// import { format } from "date-fns"

import { Track } from "@/shared/types/track"
import { formatTimeDuration, getImageUrl } from "@/shared/lib/utils"

// import { AspectRatio } from "@/shared/components/ui/aspect-ratio"

interface TrackListProps {
  tracks: Track[]
}

function TrackList({ tracks }: TrackListProps) {
  return (
    <ul className="flex flex-col">
      {tracks?.map((track) => {
        const imageUrl = getImageUrl(track.album.images)
        const trackArtistNames = track.artists
          .map((artist) => artist.name)
          .join(", ")

        return (
          <li
            key={track.id}
            className="flex cursor-pointer items-center gap-3 rounded p-2 text-tertiary transition hover:bg-accent"
          >
            <div className="relative size-10 overflow-hidden rounded-md shadow-image">
              <Image
                src={imageUrl}
                alt=""
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col text-sm font-medium">
              <p className="text-primary">{track.name}</p>
              <p className="text-tertiary">{trackArtistNames}</p>
            </div>
            <div>
              <p className="text-sm text-tertiary">
                {formatTimeDuration(track.duration_ms)}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default TrackList
