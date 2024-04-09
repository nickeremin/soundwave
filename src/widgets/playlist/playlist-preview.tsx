"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"

import PreviewBackgroundGradient from "@/entities/layout/preview-background-gradient"
import { formatAlbumDuration, getAverageColor } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

import { usePageStore } from "../../providers/page-context-provider"

interface PlaylistPreviewProps {
  playlistId: string
}

const PlaylistPreview = React.forwardRef<HTMLDivElement, PlaylistPreviewProps>(
  function ({ playlistId }, ref) {
    const { user } = useUser()

    const { setIsVisible, setBackgroundColor } = usePageStore()
    const { data: playlist, isLoading } =
      trpc.playlistRouter.getPlaylist.useQuery({
        playlistId,
      })

    React.useEffect(() => {
      if (!isLoading && !playlist?.image_url) {
        setIsVisible(true)
      }
    }, [isLoading])

    if (!playlist || !user) return null

    const imageUrl = playlist.image_url
    const totalTracks = Number(playlist.total_tracks)
    const playlistDuration = formatAlbumDuration(Number(playlist.duration_ms))

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
          <div className="relative flex flex-col items-start font-medium">
            <span className="text-sm font-semibold">Playlist</span>
            <span className="mb-2 line-clamp-3">
              <h1 className="text-[5rem] font-black leading-tight">
                {playlist.name}
              </h1>
            </span>
            <div className="flex flex-wrap items-center [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
              <Link href={`/user/${user.id}`} className="hover:underline">
                {user.username}
              </Link>
              {totalTracks > 0 && (
                <span>
                  {totalTracks} {totalTracks > 1 ? "songs" : "song"},{" "}
                  {playlistDuration}
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
PlaylistPreview.displayName = "PlaylistPreview"

export default PlaylistPreview
