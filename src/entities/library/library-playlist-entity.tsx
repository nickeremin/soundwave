"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { MusicIcon } from "lucide-react"

import { PlaylistObject } from "@/shared/types/playlist"

interface LibraryPlaylistEntityProps {
  playlist: PlaylistObject
}

function LibraryPlaylistEntity({ playlist }: LibraryPlaylistEntityProps) {
  const router = useRouter()
  const { user } = useUser()

  const imageUrl = playlist.image_url

  return (
    <li className="relative flex h-16 items-center rounded px-2 hover:bg-muted">
      <div
        role="button"
        tabIndex={-1}
        onClick={() => router.push(`/playlist/${playlist.id}`)}
        className="absolute inset-0 cursor-pointer"
      />
      <div className="flex items-center gap-3">
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
        <div className="flex flex-col items-start font-medium">
          <p className="line-clamp-1">{playlist.name}</p>
          <p className="line-clamp-1 text-sm text-tertiary [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
            <span>Playlist</span>
            <span>{user?.username}</span>
          </p>
        </div>
      </div>
    </li>
  )
}

export default LibraryPlaylistEntity
