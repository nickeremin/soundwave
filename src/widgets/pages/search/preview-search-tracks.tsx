"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  useBoundStore,
  useLayoutStore,
  useSearchStore,
} from "@/providers/bound-store-provider"

import { TrackObject } from "@/shared/types/track"
import { useLayoutContext } from "@/widgets/layout/layout-context"
import PlayerButton from "@/features/player/play-button"
import ArtistLinksNames from "@/entities/artist/artist-name-links"
import TrackList from "@/entities/track/track-list"
import { cn, getImageUrl } from "@/shared/lib/utils"

interface PreviewSearchTracksProps {
  tracks: TrackObject[]
}

function PreviewSearchTracks({ tracks }: PreviewSearchTracksProps) {
  const columns = useLayoutStore((state) => state.columnsCount)
  const addToRecentSearches = useSearchStore((state) => state.addRecentSearch)

  if (tracks.length === 0) return null

  const topTrack = tracks[0]!
  const trackName = topTrack.name
  const imageUrl = getImageUrl(topTrack.album.images)

  function handleClick() {
    addToRecentSearches({
      item: topTrack,
      type: "track",
    })
  }

  return (
    <React.Fragment>
      <section className="col-span-2 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Top result</h2>
        <div className="group relative flex flex-col gap-4 rounded-lg bg-muted p-5 transition duration-300 hover:bg-accent">
          <div
            data-shadcnui-button
            role="button"
            tabIndex={0}
            className="absolute inset-0 z-10 cursor-pointer rounded-lg outline-none"
            onClick={handleClick}
          />

          <div className="relative size-28 rounded-md shadow-image-sm">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt=""
                width={320}
                height={320}
                className="size-full rounded-md object-cover object-center"
              />
            ) : null}
          </div>
          <div className="flex flex-col gap-1">
            <p className="line-clamp-1 text-3xl font-bold">{trackName}</p>
            <div className="line-clamp-2 text-sm/6 font-medium">
              <span className="text-tertiary after:mx-1 after:content-['•']">
                Song
              </span>
              <ArtistLinksNames
                artists={topTrack.artists}
                className="relative z-10 text-primary"
              />
            </div>
          </div>

          <div className="absolute bottom-5 right-5 z-20 translate-y-2 opacity-0 transition duration-300 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
            <PlayerButton className="shadow-player-button" />
          </div>
        </div>
      </section>

      <section
        className={cn(
          "flex flex-col gap-2",
          columns < 4 ? "col-span-full" : "col-[3/-1]"
        )}
      >
        <h2 className="text-2xl font-bold">Songs</h2>
        <TrackList tracks={tracks.slice(0, 4)} />
      </section>
    </React.Fragment>
  )
}

export default PreviewSearchTracks
