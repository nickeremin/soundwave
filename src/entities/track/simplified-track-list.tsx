import React from "react"
import Image from "next/image"
import Link from "next/link"
import { PlayIcon } from "lucide-react"

import { TrackObject } from "@/shared/types/track"
import TrackWrapper from "@/features/player/track-wrapper"
import AddFavoriteTrackButton from "@/features/track/add-favorite-track-button"
import TrackMenuButton from "@/features/track/track-menu-button"
import { Button } from "@/shared/components/ui/button"
import { formatTimeDuration, getImageUrl } from "@/shared/lib/utils"

import ArtistLinksNames from "../artist/artist-name-links"

interface SimplifiedTrackListProps {
  tracks: TrackObject[]
  withAlbum?: boolean
}

function SimplifiedTrackList({ tracks, withAlbum }: SimplifiedTrackListProps) {
  return (
    <ul className="flex flex-col">
      {tracks?.map((track) => {
        const imageUrl = getImageUrl(track.album.images)

        return (
          <TrackWrapper
            key={track.id}
            trackId={track.id}
            className="group text-sm font-medium text-tertiary hover:text-secondary"
          >
            <li className="flex h-14 items-center justify-between rounded pl-2 pr-4">
              <div className="flex items-center gap-3">
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
                  <Button
                    variant="none"
                    size="none"
                    className="invisible absolute size-full rounded bg-background/50 transition-none group-hover:visible group-aria-[selected=true]:visible"
                  >
                    <PlayIcon
                      fill="currentColor"
                      className="translate-x-px text-primary"
                    />
                  </Button>
                </div>
                <div className="flex flex-col items-start">
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
              </div>
              {withAlbum && (
                <div>
                  <Link
                    href={`/track/${track.album.id}`}
                    className="hover:underline"
                  >
                    {track.album.name}
                  </Link>
                </div>
              )}
              <div className="flex items-center gap-4 justify-self-end">
                <AddFavoriteTrackButton
                  track={track}
                  className="invisible transition-colors hover:text-primary group-hover:visible group-aria-[selected=true]:visible"
                />
                <div className="flex w-[5ch] items-center justify-end">
                  <span className="tabular-nums">
                    {formatTimeDuration(track.duration_ms)}
                  </span>
                </div>
                <TrackMenuButton
                  track={track}
                  className="invisible transition-colors hover:text-primary group-hover:visible group-aria-[selected=true]:visible"
                />
              </div>
            </li>
          </TrackWrapper>
        )
      })}
    </ul>
  )
}

export default SimplifiedTrackList
