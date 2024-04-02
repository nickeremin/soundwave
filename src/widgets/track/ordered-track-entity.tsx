import React from "react"
import Image from "next/image"
import Link from "next/link"

import { ImageObject } from "@/shared/types/image"
import { SimplifiedTrackObject } from "@/shared/types/track"
import PlayTrackButton from "@/features/player/play-track-button"
import TrackWrapper from "@/features/player/track-wrapper"
import AddFavoriteTrackButton from "@/features/track/add-favorite-track-button"
import TrackMenuButton from "@/features/track/track-menu-button"
import ArtistNameLinks from "@/entities/artist/artist-name-links"
import { cn, formatTimeDuration, getImageUrl } from "@/shared/lib/utils"

interface OrderedTrackEntityProps<TData> {
  track: TData
  trackNumber?: number
  withNames?: boolean
  withImage?: boolean
}

function OrderedTrackEntity<TData extends SimplifiedTrackObject>({
  track,
  trackNumber = track.track_number,
  withNames = true,
  withImage,
}: OrderedTrackEntityProps<TData>) {
  // @ts-ignore if withImage = true so track should have album property with images
  const imageUrl = withImage ? getImageUrl(track.album.images) : null
  const trackDuration = formatTimeDuration(track.duration_ms)

  return (
    <TrackWrapper
      key={track.id}
      trackId={track.id}
      className="group text-sm font-medium text-tertiary hover:text-secondary"
    >
      <li className="grid h-14 grid-cols-[16px_minmax(120px,4fr)_minmax(120px,1fr)] items-center gap-4 px-4">
        <div className="flex items-center justify-self-end">
          <div className="relative inline-flex size-4 items-center justify-center">
            <span
              className={cn(
                "absolute right-1 text-base tabular-nums leading-none text-tertiary group-hover:invisible group-aria-[selected=true]:invisible"
                // playingTrackId === track.id && "text-pink"
              )}
            >
              {trackNumber}
            </span>
            <PlayTrackButton
              trackId={track.id}
              className="invisible absolute rounded text-primary group-hover:visible group-aria-[selected=true]:visible"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {withImage && (
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
          )}
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
            {withNames && (
              <p className="line-clamp-1">
                <ArtistNameLinks artists={track.artists} />
              </p>
            )}
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

export default OrderedTrackEntity
