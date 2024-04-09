import React from "react"
import Image from "next/image"
import Link from "next/link"

import { type TrackObject } from "@/shared/types/track"
import TrackWrapper from "@/features/player/track-wrapper"
import AddFavoriteTrackButton from "@/features/track/add-favorite-track-button"
import PlayTrackButton from "@/features/track/play-track-button"
import TrackMenuButton from "@/features/track/track-menu-button"
import ArtistNameLinks from "@/entities/artist/artist-name-links"
import { cn, formatTrackDuration, getImageUrl } from "@/shared/lib/utils"

interface UnorderedTrackEntityProps {
  track: TrackObject
}

function UnorderedTrackEnity({ track }: UnorderedTrackEntityProps) {
  const imageUrl = getImageUrl(track.album.images)
  const trackDuration = formatTrackDuration(track.duration_ms)

  return (
    <TrackWrapper
      key={track.id}
      trackId={track.id}
      className="group text-sm font-medium text-tertiary hover:text-secondary"
    >
      <li className="grid h-14 grid-cols-[minmax(120px,4fr)_minmax(120px,1fr)] items-center gap-4 px-2">
        <div className="flex items-center gap-3">
          <div className="relative size-10 rounded bg-accent">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt=""
                width={80}
                height={80}
                className="absolute size-full rounded object-cover object-center"
              />
            ) : null}
            <PlayTrackButton
              track={track}
              className="invisible absolute bg-background/50 transition-none group-hover:visible group-aria-[selected=true]:visible"
            />
          </div>
          <div className="flex flex-col">
            <Link
              href={`/track/${track.id}`}
              className={cn(
                "line-clamp-1 text-base font-bold leading-tight text-primary outline-none hover:underline focus-visible:underline focus-visible:decoration-ring"
                // playingTrackId === track.id && "text-pink"
              )}
            >
              {track.name}
            </Link>
            <p className="line-clamp-1">
              <ArtistNameLinks artists={track.artists} />
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-self-end">
          <AddFavoriteTrackButton
            track={track}
            className="invisible transition-colors hover:text-primary group-hover:visible group-aria-[selected=true]:visible"
          />
          <div className="flex w-[5ch] items-center justify-end">
            <span className="tabular-nums">{trackDuration}</span>
          </div>
          <TrackMenuButton
            track={track}
            className="invisible transition-colors hover:text-primary group-hover:visible group-aria-[selected=true]:visible"
          />
        </div>
      </li>
    </TrackWrapper>
  )
}

export default UnorderedTrackEnity
