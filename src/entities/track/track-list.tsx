import React from "react"
import Image from "next/image"
import Link from "next/link"

import { Track } from "@/shared/types/track"
import AddFavoriteTrackButton from "@/features/favorite/add-favorite-track-button"
import TrackMenuButton from "@/features/menu/track-menu-button"
import TrackWrapper from "@/features/player/track-wrapper"
import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import { formatTimeDuration, getImageUrl } from "@/shared/lib/utils"

import ArtistLinksNames from "../artist/artist-name-links"

interface TrackListProps {
  tracks: Track[]
  withAlbum?: boolean
}

function TrackList({ tracks, withAlbum }: TrackListProps) {
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
                    <LucideIcon
                      fill="currentColor"
                      name="Play"
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
                <AddFavoriteTrackButton className="invisible hover:text-primary group-hover:visible group-aria-[selected=true]:visible" />
                <div className="flex w-[5ch] items-center justify-end">
                  <span>{formatTimeDuration(track.duration_ms)}</span>
                </div>
                <TrackMenuButton className="invisible size-5 text-primary group-hover:visible group-aria-[selected=true]:visible" />
              </div>
            </li>
          </TrackWrapper>
        )
      })}
    </ul>
  )
}

export default TrackList
