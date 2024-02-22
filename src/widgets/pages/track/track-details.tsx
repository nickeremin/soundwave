"use client"

import React from "react"
import Image from "next/image"
import chroma from "chroma-js"
import { format } from "date-fns"
import { type FastAverageColorResult } from "fast-average-color"

import { useLayoutContext } from "@/widgets/layout/layout-context"
import { LogInSignUpButtons } from "@/features/nav"
import PlayerButton from "@/features/player/play-button"
import AddFavoriteTrackButton from "@/features/track/add-favorite-track-button"
import TrackMenuButton from "@/features/track/track-menu-button"
import TrackArtistLinkCard from "@/entities/artist/track-artist-link-card"
import TrackArtistLinkCardLoading from "@/entities/artist/track-artist-link-card-loading"
import TrackMainArtistLink from "@/entities/artist/track-main-artist-link"
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
  const { columns } = useLayoutContext()
  const { setIsVisible } = useTrackContext()

  const [backgroundColor, setBackgroundColor] =
    React.useState<FastAverageColorResult | null>(null)

  const { data: track } = trpc.trackRouter.getTrack.useQuery(trackId)
  const artistQueries = trpc.useQueries((t) =>
    track
      ? track.artists.map((artist) => t.artistRouter.getArtist(artist.id))
      : []
  )

  if (!track) return null

  const trackName = track.name
  //const trackArtists = track.artists.map((artist) => artist.name).join(", ")
  const trackAlbumName = track.album.name
  const trackDate = format(new Date(track.album.release_date ?? 0), "yyyy")
  const trackDuration = formatTimeDuration(track.duration_ms)
  const imageUrl = getImageUrl(track.album.images)

  return (
    <div>
      <div className="relative flex h-[280px] items-end gap-4 p-6">
        <div
          style={{
            backgroundColor: backgroundColor
              ? backgroundColor.isDark
                ? chroma(backgroundColor.hex).saturate(1).brighten(1.25).hex()
                : chroma(backgroundColor.hex).saturate(1.25).darken(1.5).hex()
              : undefined,
          }}
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 "
        />
        <div className="relative size-[clamp(128px,128px_+_(100vw-320px-600px)/424*104,232px)] shrink-0 overflow-hidden rounded-md bg-accent shadow-image-lg">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              width={400}
              height={400}
              priority
              onLoad={async (e) => {
                const color = getAverageColor(e.currentTarget)
                setBackgroundColor(color)
                setIsVisible(true)

                console.log(
                  "Content visible after ~ " +
                    (Date.now() - timer.current.start)
                )
              }}
              className="size-full object-cover object-center"
            />
          ) : null}
        </div>
        <div className="relative flex flex-col items-start gap-2 text-sm font-medium">
          <span>Song</span>
          <div className="line-clamp-3">
            <h1 className="text-[2rem] font-black leading-tight">
              {trackName}
            </h1>
          </div>
          <div className="flex flex-wrap items-center [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
            <TrackMainArtistLink artist={track.artists[0]!} />
            <span>{trackAlbumName}</span>
            <span>{trackDate}</span>
            <span>{trackDuration}</span>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: backgroundColor
            ? backgroundColor.isDark
              ? chroma(backgroundColor.hex).saturate(1).brighten(1.25).hex()
              : chroma(backgroundColor.hex).saturate(1.25).darken(1.5).hex()
            : undefined,
        }}
        className="absolute z-[-1] h-[240px] w-full bg-gradient-to-b from-black/60 to-background-100 "
      />
      <div className="flex flex-col gap-6 px-6 pt-6">
        <div className="flex items-center gap-6">
          <PlayerButton className="size-14" />
          <AddFavoriteTrackButton className="size-10" />
          <TrackMenuButton className="size-8" />
        </div>
        <div
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
          className="grid items-start gap-6"
        >
          <div className="col-span-full flex max-w-xl flex-col items-end gap-10 rounded-lg bg-background/50 p-4 xl:col-start-1 xl:col-end-3">
            <p className="self-start font-semibold">
              Sign in to see lyrics and listen to the full track
            </p>
            <LogInSignUpButtons />
          </div>
          <div className="col-span-full flex w-full flex-col xl:col-start-4 xl:col-end-6">
            {artistQueries.map(({ data: artist }, i) =>
              artist ? (
                <TrackArtistLinkCard key={i} artist={artist} />
              ) : (
                <TrackArtistLinkCardLoading key={i} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackDetails
