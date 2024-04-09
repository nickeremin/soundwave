"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { type FavoritePlaylistObject } from "@/shared/types/playlist"
import { Tooltip } from "@/shared/components/ui/tooltip"

import LikedSongsImage from "../../../public/images/liked-songs.png"

interface LibraryCollapsedFavoritePlaylistEntityProps {
  favoritePlaylist: FavoritePlaylistObject
}

function LibraryCollapsedFavoritePlaylistEntity({
  favoritePlaylist,
}: LibraryCollapsedFavoritePlaylistEntityProps) {
  const router = useRouter()
  const totalTracks = Number(favoritePlaylist.total_tracks)

  if (totalTracks == 0) return null

  return (
    <Tooltip
      side="right"
      content={
        <div className="flex flex-col items-start font-medium">
          <p className="line-clamp-1">Liked Songs</p>
          <p className="line-clamp-1 text-sm text-tertiary [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
            <span>Playlist</span>
            <span>
              {totalTracks} {totalTracks > 1 ? "songs" : "song"}
            </span>
          </p>
        </div>
      }
    >
      <li className="relative -mx-1 flex h-16 items-center rounded px-2 hover:bg-muted">
        <div
          role="button"
          tabIndex={-1}
          onClick={() => router.push(`/collection/tracks`)}
          className="absolute inset-0 cursor-pointer"
        />
        <div className="size-12 rounded bg-accent shadow-image-lg">
          <Image
            src={LikedSongsImage}
            alt=""
            width={80}
            height={80}
            className="size-full rounded object-cover object-center"
          />
        </div>
      </li>
    </Tooltip>
  )
}

export default LibraryCollapsedFavoritePlaylistEntity
