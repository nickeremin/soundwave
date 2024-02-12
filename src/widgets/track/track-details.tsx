"use client"

import React from "react"
import Image from "next/image"
import { format } from "date-fns"
import { type FastAverageColorResult } from "fast-average-color"

import { LogInSignUpButtons } from "@/features/nav"
import AddFavoriteTrackButton from "@/features/track/add-favorite-track-button"
import PlayTrackButton from "@/features/track/play-track-button"
import TrackMenuButton from "@/features/track/track-menu-button"
import ArtistTrackCard from "@/entities/artist/artist-track-card"
import {
  formatTimeDuration,
  getAverageColor,
  getImageUrl,
} from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

import { useTrackContext } from "./track-context-provider"

interface TrackDetails {
  trackId: string
}

function TrackDetails({ trackId }: TrackDetails) {
  const timer = React.useRef({
    start: Date.now(),
  })
  const { setIsVisible } = useTrackContext()

  const [backgroundColor, setBackgroundColor] =
    React.useState<FastAverageColorResult | null>(null)

  // Queries
  const { data: track } = trpc.trackRouter.getTrack.useQuery(trackId)

  const artistsWithAlbumsQueries = trpc.useQueries((t) =>
    track
      ? track.artists.map((artist) =>
          t.artistRouter.getArtistWithAlbums(artist.id)
        )
      : []
  )

  if (!track) return null

  console.log("Past: " + (Date.now() - timer.current.start))

  const trackName = track.name
  const trackArtists = track.artists.map((artist) => artist.name).join(", ")
  const trackAlbumName = track.album.name
  const trackDate = format(new Date(track.album.release_date ?? 0), "yyyy")
  const trackDuration = formatTimeDuration(track.duration_ms)
  const trackImageUrl = getImageUrl(track.album.images)

  return (
    <React.Fragment>
      <div className="relative flex h-[280px] items-end gap-4 p-6">
        <div
          style={{
            backgroundColor: backgroundColor ? backgroundColor.hex : undefined,
          }}
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 "
        />
        <div className="relative size-[clamp(128px,128px_+_(100vw-320px-600px)/424*104,232px)] overflow-hidden rounded-md shadow-image">
          <Image
            src={trackImageUrl}
            alt=""
            width={300}
            height={300}
            onLoad={async (e) => {
              const color = getAverageColor(e.currentTarget)
              setBackgroundColor(color)
              setIsVisible(true)

              console.log(
                "Content visible after ~ " + (Date.now() - timer.current.start)
              )
            }}
            className="object-cover"
          />
        </div>
        <div className="relative flex flex-col">
          <p className="text-sm font-medium">Song</p>
          <div className="line-clamp-3">
            <h1 className="text-[3rem] font-black leading-tight">
              {trackName}
            </h1>
          </div>

          <p className="text-sm font-medium">
            {trackArtists} • {trackAlbumName} • {trackDate} • {trackDuration}
          </p>
        </div>
      </div>
      <div
        style={{
          backgroundColor: backgroundColor ? backgroundColor.hex : undefined,
        }}
        className="absolute z-[-1] h-[240px] w-full bg-gradient-to-b from-black/40 to-background-100 "
      />
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center">
          <PlayTrackButton className="mr-6" />
          <AddFavoriteTrackButton className="mr-3" />
          <TrackMenuButton />
        </div>
        <div className="flex flex-col items-start justify-between gap-6">
          <div className="flex w-full max-w-xl flex-col items-end gap-10 rounded-lg bg-background/50 p-4">
            <p className="self-start font-semibold">
              Sign in to see lyrics and listen to the full track
            </p>
            <LogInSignUpButtons />
          </div>
          <div className="flex w-full flex-col">
            {artistsWithAlbumsQueries.map((query, i) => (
              <ArtistTrackCard key={i} {...query} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TrackDetails
