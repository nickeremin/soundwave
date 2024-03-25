"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

import { type SimplifiedAlbumObject } from "@/shared/types/album"
import AddFavoriteAlbumButton from "@/features/favorite/add-favorite-album-button"
import AlbumMenuButton from "@/features/menu/album-menu-button"
import PlayButton from "@/features/player/play-button"
import {
  formatAlbumType,
  formatReleaseDate,
  getImageUrl,
} from "@/shared/lib/utils"

import AlbumTracks from "../pages/album/album-tracks"

interface DiscographyAlbumProps {
  album: SimplifiedAlbumObject
}

function DiscographyAlbum({ album }: DiscographyAlbumProps) {
  const albumType = formatAlbumType(album.album_type)
  const releaseDate = formatReleaseDate(album.release_date)
  const imageUrl = getImageUrl(album.images)

  return (
    <div className="flex flex-col">
      <div className="flex gap-7 p-8">
        <div className="size-[140px] rounded bg-accent shadow-image-lg">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              width={280}
              height={280}
              className="size-full rounded object-cover object-center"
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <Link href={`/`} className="text-[2rem] font-bold">
              {album.name}
            </Link>
            <p className="text-sm font-medium text-tertiary [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
              <span>{albumType}</span>
              <span>{releaseDate}</span>
              <span>
                {album.total_tracks} {album.total_tracks > 1 ? "songs" : "song"}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <PlayButton className="size-9" iconClassName="size-5" />
            <AddFavoriteAlbumButton className="size-7" />
            <AlbumMenuButton className="size-7" />
          </div>
        </div>
      </div>
      <div className="px-6">
        <AlbumTracks albumId={album.id} totalTracks={album.total_tracks} />
      </div>
    </div>
  )
}

export default DiscographyAlbum
