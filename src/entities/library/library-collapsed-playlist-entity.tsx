"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { MusicIcon } from "lucide-react"

import { PlaylistObject } from "@/shared/types/playlist"
import { Tooltip } from "@/shared/components/ui/tooltip"

interface LibraryCollapsedPlaylistEntityProps {
  playlist: PlaylistObject
}

function LibraryCollapsedPlaylistEntity({
  playlist,
}: LibraryCollapsedPlaylistEntityProps) {
  const router = useRouter()
  const { user } = useUser()

  const imageUrl = playlist.image_url

  return (
    <Tooltip
      side="right"
      content={
        <div className="flex flex-col items-start font-medium">
          <p className="line-clamp-1">{playlist.name}</p>
          <p className="line-clamp-1 text-sm text-tertiary [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
            <span>Playlist</span>
            <span>{user?.username}</span>
          </p>
        </div>
      }
    >
      <li className="relative -mx-1 flex h-16 items-center rounded px-2 hover:bg-muted">
        <div
          role="button"
          tabIndex={-1}
          onClick={() => router.push(`/playlist/${playlist.id}`)}
          className="absolute inset-0 cursor-pointer"
        />
        <div className="size-12 rounded bg-accent shadow-image-lg">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              width={80}
              height={80}
              className="size-full rounded object-cover object-center"
            />
          ) : (
            <span className="flex size-full items-center justify-center">
              <MusicIcon className="size-6 text-tertiary" />
            </span>
          )}
        </div>
      </li>
    </Tooltip>
  )
}

export default LibraryCollapsedPlaylistEntity
