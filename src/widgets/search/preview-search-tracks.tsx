"use client"

import React from "react"
import Image from "next/image"

import PlayerButton from "@/features/player/player-button"
import ArtistLinksNames from "@/entities/artist/artist-link-names"
import TrackList from "@/entities/track/track-list"
import { useGridColumns } from "@/shared/lib/hooks/use-grid-columns"
import { cn, getImageUrl } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

function PreviewSearchTracks() {
  const columns = useGridColumns()
  const { data } = trpc.searchRouter.searchTracks.useQuery({
    q: "popular (",
  })

  if (!data || data.total === 0) return null

  const topTrack = data.items[0]!
  const trackName = topTrack.name
  const imageUrl = getImageUrl(topTrack.album.images)

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      className="grid gap-8"
    >
      <section className="col-span-2 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Top result</h2>
        <div className="group relative flex flex-col gap-4 rounded-lg bg-muted p-5 transition duration-300 hover:bg-accent">
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
            <div className="flex flex-wrap">
              <span className="text-sm font-medium text-tertiary after:mx-1 after:content-['•']">
                Song
              </span>
              <ArtistLinksNames
                artists={topTrack.artists}
                className="text-primary"
              />
            </div>
          </div>

          <div className="absolute bottom-5 right-5 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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
        <TrackList tracks={data.items.slice(0, 4)} />
      </section>
    </div>
  )
}

export default PreviewSearchTracks
