import React from "react"
import Image from "next/image"
import Link from "next/link"

import { Track } from "@/shared/types/track"
import TrackWrapper from "@/features/player/track-wrapper"
import { formatTimeDuration, getImageUrl } from "@/shared/lib/utils"

import ArtistLinksNames from "../artist/artist-name-links"

interface TrackListProps {
  tracks: Track[]
}

function TrackList({ tracks }: TrackListProps) {
  return (
    <ul className="flex flex-col">
      {tracks?.map((track) => {
        const imageUrl = getImageUrl(track.album.images)

        return (
          <TrackWrapper
            key={track.id}
            trackId={track.id}
            className="text-sm font-medium text-tertiary hover:text-secondary"
          >
            <li className="flex h-14 items-center gap-3 rounded px-2">
              <div className="relative size-10 rounded bg-accent shadow-image-sm">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt=""
                    width={80}
                    height={80}
                    className="absolute size-full rounded object-cover object-center"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col items-start">
                <Link
                  href={`/track/${track.id}`}
                  className="line-clamp-1 text-base font-bold leading-tight text-primary hover:underline"
                >
                  {track.name}
                </Link>
                <p className="line-clamp-1">
                  <ArtistLinksNames artists={track.artists} />
                </p>
              </div>
              <span>{formatTimeDuration(track.duration_ms)}</span>
            </li>
          </TrackWrapper>
        )
      })}
    </ul>
  )
}

export default TrackList
