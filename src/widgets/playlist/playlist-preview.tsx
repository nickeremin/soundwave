"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import chroma from "chroma-js"

import MainArtistLink from "@/entities/artist/main-artist-link"
import {
  formatAlbumDuration,
  formatReleaseDate,
  formatTrackDuration,
  getAverageColor,
  getImageUrl,
} from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

import { usePageStore } from "../providers/page-context-provider"

interface PlaylistPreviewProps {
  playlistId: string
}

const PlaylistPreview = React.forwardRef<HTMLDivElement, PlaylistPreviewProps>(
  function ({ playlistId }, ref) {
    const { user } = useUser()

    const { backgroundColor, setIsVisible, setBackgroundColor } = usePageStore()
    const { data: playlist } = trpc.playlistRouter.getPlaylist.useQuery({
      playlistId,
    })

    if (!playlist) return null

    const imageUrl = playlist.image_url
    const playlistDuration = formatTrackDuration(Number(playlist.duration_ms))

    return (
      <React.Fragment>
        <div ref={ref} className="relative flex h-[344px] items-end gap-6 p-6">
          <div
            style={{
              backgroundColor: backgroundColor
                ? chroma(backgroundColor.hex).saturate().hex()
                : "transparent",
            }}
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"
          />
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
                  setBackgroundColor(color)
                  setIsVisible(true)
                }}
                className="size-full rounded-md object-cover object-center"
              />
            ) : null}
          </div>
          <div className="relative flex flex-col items-start text-sm font-medium">
            <span className="font-semibold">Playlist</span>
            <span className="mb-2 line-clamp-3">
              <h1 className="text-[4rem] font-black leading-tight">
                {playlist.name}
              </h1>
            </span>
            <div className="flex flex-wrap items-center [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
              {user && <Link href={`/user/${user.id}`}>{user.username}</Link>}

              <span>
                {playlist.total_tracks} songs, {playlistDuration}
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: backgroundColor
              ? chroma(backgroundColor.hex).saturate().hex()
              : "transparent",
          }}
          className="absolute h-[240px] w-full bg-gradient-to-b from-black/60 to-background-100 "
        />
      </React.Fragment>
    )
  }
)
PlaylistPreview.displayName = "PlaylistPreview"

export default PlaylistPreview
