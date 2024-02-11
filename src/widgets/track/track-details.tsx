"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { type FastAverageColorResult } from "fast-average-color"

import { LogInSignUpButtons } from "@/features/nav"
import AddFavoriteTrackButton from "@/features/track/add-favorite-track-button"
import PlayTrackButton from "@/features/track/play-track-button"
import TrackMenuButton from "@/features/track/track-menu-button"
import { PageHeading } from "@/shared/components/ui/page-heading"
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
  const { setIsVisible } = useTrackContext()

  const [backgroundColor, setBackgroundColor] =
    React.useState<FastAverageColorResult | null>(null)
  const { data, isLoading } = trpc.trackRouter.getTrack.useQuery(trackId)

  if (!data) return null

  const trackName = data.track.name
  const trackArtists = data.trackArtists
    .map(({ artist }) => artist.name)
    .join(", ")
  const trackAlbumName = data.track.album.name
  const trackDate = format(
    new Date(data?.track.album.release_date ?? 0),
    "yyyy"
  )
  const trackDuration = formatTimeDuration(data.track.duration_ms)
  const trackImageUrl = getImageUrl(data.track.album.images)

  return (
    <React.Fragment>
      <div className="relative flex h-[280px] items-end gap-4 p-6">
        <div
          style={{
            backgroundColor: backgroundColor ? backgroundColor.hex : undefined,
          }}
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 "
        />
        <div className="shadow-image relative size-[clamp(128px,128px_+_(100vw-320px-600px)/424*104,232px)] overflow-hidden rounded-md">
          {trackImageUrl && (
            <Image
              src={trackImageUrl}
              alt=""
              fill
              onLoad={(e) => {
                const color = getAverageColor(e.currentTarget)
                setBackgroundColor(color)
                setIsVisible(true)
              }}
              className="object-cover"
            />
          )}
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
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:gap-[200px]">
          <div className="flex w-full max-w-xl flex-col items-end gap-10 rounded-lg bg-background/50 p-4 lg:max-w-[420px]">
            <p className="self-start font-semibold">
              Sign in to see lyrics and listen to the full track
            </p>
            <LogInSignUpButtons />
          </div>
          <div className="flex w-full flex-col">
            {data.trackArtists.map(({ artist }) => {
              const artistImageUrl = getImageUrl(artist.images)

              return (
                <Link href="/" key={artist.id}>
                  <div className="flex w-full items-center gap-4 rounded-md p-2 transition hover:bg-accent lg:max-w-md">
                    <div className="relative size-20 overflow-hidden rounded-full">
                      {artistImageUrl && (
                        <Image
                          src={artistImageUrl}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-col font-medium">
                      <p className="text-sm">Artist</p>
                      <p>{artist.name}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TrackDetails
