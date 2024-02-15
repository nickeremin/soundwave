import React from "react"
import Image from "next/image"
import Link from "next/link"

// import Image from "next/image"
// import { format } from "date-fns"

import { Track } from "@/shared/types/track"
import TrackWrapper from "@/features/player/track-wrapper"
import { formatTimeDuration, getImageUrl } from "@/shared/lib/utils"

import ArtistLinksNames from "../artist/artist-link-names"

// import { AspectRatio } from "@/shared/components/ui/aspect-ratio"

interface TrackListProps {
  tracks: Track[]
}

function TrackList({ tracks }: TrackListProps) {
  return (
    <ul className="flex flex-col">
      {tracks?.map((track) => {
        const imageUrl = getImageUrl(track.album.images)

        return (
          <TrackWrapper key={track.id} trackId={track.id}>
            <li className="flex cursor-pointer items-center gap-3 rounded p-2 text-sm font-medium leading-tight text-tertiary">
              <div className="relative size-10 overflow-hidden rounded-md bg-muted shadow-image-sm">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt=""
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col items-start">
                <Link href={`/track/${track.id}`}>
                  <p className="line-clamp-1 w-fit text-base leading-tight text-primary decoration-2 hover:underline">
                    {track.name}
                  </p>
                </Link>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                  <ArtistLinksNames artists={track.artists} />
                </div>
              </div>
              <p>{formatTimeDuration(track.duration_ms)}</p>
            </li>
          </TrackWrapper>
        )
      })}
    </ul>
  )
}

export default TrackList
