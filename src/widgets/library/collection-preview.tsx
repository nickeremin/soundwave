"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"

import PreviewBackgroundGradient from "@/entities/layout/preview-background-gradient"
import { formatAlbumDuration, getAverageColor } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

import LikedSongsImage from "../../../public/images/liked-songs.png"
import { usePageStore } from "../../providers/page-context-provider"

interface CollectionPreviewProps {
  // albumId: string
}

const CollectionPreview = React.forwardRef<
  HTMLDivElement,
  CollectionPreviewProps
>(function (_, ref) {
  const { user } = useUser()
  const { setIsVisible, setBackgroundColor } = usePageStore()

  const { data: favoritePlaylist, isLoading } =
    trpc.playlistRouter.getFavoritePlaylist.useQuery()

  if (isLoading || !user) return null

  const totalTracks = Number(favoritePlaylist?.total_tracks) || 0
  const playlistDuration = formatAlbumDuration(
    Number(favoritePlaylist?.duration_ms) || 0
  )

  return (
    <React.Fragment>
      <div ref={ref} className="relative flex h-[344px] items-end gap-6 p-6">
        <PreviewBackgroundGradient order={1} />
        <div className="relative size-[clamp(128px,128px_+_(100vw-320px-600px)/424*104,232px)] shrink-0 select-none rounded-md bg-accent shadow-image-lg">
          <Image
            src={LikedSongsImage}
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
        </div>
        <div className="relative flex flex-col items-start text-sm font-medium">
          <span className="font-semibold">Album</span>
          <span className="mb-2 line-clamp-3">
            <h1 className="text-[5rem] font-black leading-tight">
              Liked Songs
            </h1>
          </span>
          <div className="flex flex-wrap items-center [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
            <Link
              href={`/user/${user.id}`}
              className="font-bold hover:underline"
            >
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
})
CollectionPreview.displayName = "CollectionPreview"

export default CollectionPreview
