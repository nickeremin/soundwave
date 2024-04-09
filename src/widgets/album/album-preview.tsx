"use client"

import React from "react"
import Image from "next/image"

import MainArtistLink from "@/entities/artist/main-artist-link"
import PreviewBackgroundGradient from "@/entities/layout/preview-background-gradient"
import {
  formatAlbumDuration,
  formatReleaseDate,
  getAverageColor,
  getImageUrl,
} from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

import { usePageStore } from "../../providers/page-context-provider"

interface AlbumPreviewProps {
  albumId: string
}

const AlbumPreview = React.forwardRef<HTMLDivElement, AlbumPreviewProps>(
  function ({ albumId }, ref) {
    const { setIsVisible, setBackgroundColor } = usePageStore()
    const { data: album } = trpc.albumRouter.getAlbum.useQuery({ albumId })

    if (!album) return null

    const imageUrl = getImageUrl(album.images)
    const totalTracks = album.total_tracks
    const albumDate = formatReleaseDate(album.release_date)
    const albumDuration = formatAlbumDuration(
      album.tracks.items.reduce((prev, cur) => prev + cur.duration_ms, 0)
    )

    return (
      <React.Fragment>
        <div ref={ref} className="relative flex h-[344px] items-end gap-6 p-6">
          <PreviewBackgroundGradient order={1} />
          <div className="relative size-[clamp(128px,128px_+_(100vw-320px-600px)/424*104,232px)] shrink-0 rounded-md bg-accent shadow-image-lg">
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
                className="size-full rounded-md object-cover object-center"
              />
            ) : null}
          </div>
          <div className="relative flex flex-col items-start text-sm font-medium">
            <span className="font-semibold">Album</span>
            <span className="mb-2 line-clamp-3">
              <h1 className="text-[4rem] font-black leading-tight">
                {album.name}
              </h1>
            </span>
            <div className="flex flex-wrap items-center [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
              <MainArtistLink artist={album.artists[0]!} />
              <span>{albumDate}</span>
              {album.total_tracks > 50 ? (
                <span>{totalTracks} songs</span>
              ) : (
                <span>
                  {totalTracks} {totalTracks > 1 ? "songs" : "song"},{" "}
                  {albumDuration}
                </span>
              )}
            </div>
          </div>
        </div>

        <PreviewBackgroundGradient order={2} />
      </React.Fragment>
    )
  }
)
AlbumPreview.displayName = "AlbumPreview"

export default AlbumPreview
