"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"

import MainArtistLink from "@/entities/artist/main-artist-link"
import PreviewBackgroundGradient from "@/entities/layout/preview-background-gradient"
import {
  formatTimeDuration,
  getAverageColor,
  getImageUrl,
} from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

import { usePageStore } from "../../providers/page-context-provider"

interface TrackPreviewProps {
  trackId: string
}

const TrackPreview = React.forwardRef<HTMLDivElement, TrackPreviewProps>(
  function ({ trackId }, ref) {
    const { setIsVisible, setBackgroundColor } = usePageStore()

    const { data: track } = trpc.trackRouter.getTrack.useQuery({ trackId })

    if (!track) return null

    const trackName = track.name
    const albumName = track.album.name
    const trackDate = format(new Date(track.album.release_date ?? 0), "yyyy")
    const trackDuration = formatTimeDuration(track.duration_ms)
    const imageUrl = getImageUrl(track.album.images)

    return (
      <React.Fragment>
        <div ref={ref} className="relative flex h-[344px] items-end gap-6 p-6">
          <PreviewBackgroundGradient order={1} />
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
                  setBackgroundColor(color.hex)
                  setIsVisible(true)
                }}
                className="size-full object-cover object-center"
              />
            ) : null}
          </div>
          <div className="relative flex flex-col items-start gap-2 text-sm font-medium">
            <span className="font-bold">Song</span>
            <div className="line-clamp-3">
              <h1 className="text-[5rem] font-black leading-tight">
                {trackName}
              </h1>
            </div>
            <div className="flex flex-wrap items-center [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
              <MainArtistLink artist={track.artists[0]!} />
              <span>
                <Link
                  href={`/album/${track.album.id}`}
                  className="font-bold outline-none hover:underline focus-visible:underline focus-visible:decoration-ring"
                >
                  {albumName}
                </Link>
              </span>
              <span>{trackDate}</span>
              <span>{trackDuration}</span>
            </div>
          </div>
        </div>
        <PreviewBackgroundGradient order={2} />
      </React.Fragment>
    )
  }
)
TrackPreview.displayName = "TrackPreview"

export default TrackPreview
