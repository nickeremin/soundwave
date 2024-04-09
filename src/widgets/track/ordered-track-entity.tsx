import React from "react"
import Image from "next/image"
import Link from "next/link"

import { SimplifiedAlbumObject } from "@/shared/types/album"
import { SimplifiedTrackObject } from "@/shared/types/track"
import TrackWrapper from "@/features/player/track-wrapper"
import AddFavoriteTrackButton from "@/features/track/add-favorite-track-button"
import PlayTrackButton from "@/features/track/play-track-button"
import TrackMenuButton from "@/features/track/track-menu-button"
import ArtistNameLinks from "@/entities/artist/artist-name-links"
import { cn, formatTimeDuration, getImageUrl } from "@/shared/lib/utils"

interface OrderedTrackEntityProps<TData> {
  track: TData
  style?: React.CSSProperties
  trackNumber?: number
  withAlbum?: boolean
  withAddedDate?: boolean
  withNames?: boolean
  withImage?: boolean
}

function OrderedTrackEntity<TData extends SimplifiedTrackObject>({
  track,
  style,
  trackNumber = track.track_number,
  withAlbum,
  withAddedDate,
  withNames = true,
  withImage,
}: OrderedTrackEntityProps<TData>) {
  // @ts-expect-error if withImage = true so track should have album property with images
  const imageUrl = withImage ? getImageUrl(track.album.images) : null

  // @ts-expect-error if withAlbum = true so track should have album property with name
  const album = track.album as SimplifiedAlbumObject

  const trackDuration = formatTimeDuration(track.duration_ms)

  return (
    <div style={style}>
      <TrackWrapper
        key={track.id}
        trackId={track.id}
        className="group text-sm font-medium text-tertiary hover:text-primary"
      >
        <li
          className={cn(
            "grid h-14 grid-cols-[16px_minmax(120px,4fr)_minmax(120px,1fr)] items-center gap-4 px-4",
            withAlbum &&
              "grid-cols-[16px_minmax(120px,4fr)__minmax(120px,2fr)_minmax(120px,1fr)]",
            withAlbum &&
              withAddedDate &&
              "grid-cols-[16px_minmax(120px,6fr)_minmax(120px,3fr)_minmax(120px,2fr)_minmax(120px,1fr)]"
          )}
        >
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
                track={track}
                className="invisible absolute rounded text-primary group-hover:visible group-aria-[selected=true]:visible"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {withImage && (
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

          {withAlbum && (
            <div>
              <Link
                href={`/album/${album.id}`}
                className="line-clamp-2 hover:underline"
              >
                {album.name}
              </Link>
            </div>
          )}

          {/* TODO */}
          {withAddedDate && <div>Date</div>}

          <div className="flex items-center gap-4 justify-self-end">
            <AddFavoriteTrackButton
              track={track}
              className="invisible transition-colors hover:text-primary group-hover:visible group-aria-[selected=true]:visible"
            />
            <div className="flex w-[5ch] items-center justify-end">
              <span className="tabular-nums text-tertiary group-hover:text-secondary group-aria-[selected=true]:text-secondary">
                {trackDuration}
              </span>
            </div>
            <TrackMenuButton
              track={track}
              className="invisible transition-colors hover:text-primary group-hover:visible group-aria-[selected=true]:visible"
            />
          </div>
        </li>
      </TrackWrapper>
    </div>
  )
}

export default OrderedTrackEntity
