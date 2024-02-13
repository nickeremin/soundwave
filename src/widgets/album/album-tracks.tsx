"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"

import AlbumTrackList from "@/entities/track/album-track-list"
import TrackList from "@/entities/track/track-list"
import { getImageUrl } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

interface AlbumTracks {
  albumId: string
}

function AlbumTracks({ albumId }: AlbumTracks) {
  const { data: album } = trpc.albumRouter.getAlbum.useQuery(albumId)

  if (!album) {
    return null
  }

  const imageUrl = getImageUrl(album.images)
  console.log({ album })

  return (
    <div className="flex flex-col px-6">
      <div className="relative mb-2 flex cursor-pointer items-center gap-3 overflow-hidden rounded-t-md bg-muted transition hover:bg-accent">
        <div className="size-20">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              height={160}
              width={160}
              className="size-full object-cover object-center"
            />
          ) : null}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium text-tertiary">
            From the album
          </span>
          <Link href={"/"} className="font-bold hover:underline">
            <span>{album.name}</span>
          </Link>
        </div>
      </div>
      <AlbumTrackList tracks={album.tracks.items} />
      <div className="mt-6 flex flex-col items-start font-medium">
        <p className="mb-1 text-sm text-secondary">
          {format(album.release_date, "MMMM d, yyyy")}
        </p>
        {album.copyrights.map((copyright) => (
          <p className="text-xs text-tertiary">&copy; {copyright.text}</p>
        ))}
      </div>
    </div>
  )
}

export default AlbumTracks
