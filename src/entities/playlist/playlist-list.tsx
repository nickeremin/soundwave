"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { type PlaylistObject } from "@/shared/types/playlist"

interface PlaylistListProps {
  playlists: PlaylistObject[]
}

function PlaylistList({ playlists }: PlaylistListProps) {
  const { user } = useUser()
  const supabase = createClientComponentClient()

  return (
    <ul>
      {playlists.map((playlist) => (
        <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
          <li className="flex h-16 items-center justify-between rounded pl-2 pr-4">
            <div className="flex items-center gap-3">
              <div className="relative size-12 rounded bg-accent shadow-image-sm">
                {playlist.imageUrl ? (
                  <Image
                    src={playlist.imageUrl}
                    alt=""
                    width={80}
                    height={80}
                    className="absolute size-full rounded object-cover object-center"
                  />
                ) : null}
              </div>
              <div className="flex flex-col items-start font-medium ">
                <p className="line-clamp-1 text-base text-primary">
                  {playlist.name}
                </p>
                <p className="line-clamp-1 text-sm text-tertiary [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
                  <span>Playlist</span>
                  <span>{user?.username}</span>
                </p>
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default PlaylistList
