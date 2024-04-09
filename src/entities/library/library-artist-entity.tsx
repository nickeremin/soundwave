"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { ArtistObject } from "@/shared/types/artist"
import { getImageUrl } from "@/shared/lib/utils"

interface LibraryArtistEntityProps {
  artist: ArtistObject
}

function LibraryArtistEntity({ artist }: LibraryArtistEntityProps) {
  const router = useRouter()

  const imageUrl = getImageUrl(artist.images)

  return (
    <li className="relative flex h-16 items-center rounded px-2 hover:bg-muted">
      <div
        role="button"
        tabIndex={-1}
        onClick={() => router.push(`/artist/${artist.id}`)}
        className="absolute inset-0 cursor-pointer"
      />
      <div className="flex items-center gap-3">
        <div className="size-12 rounded-full bg-accent shadow-image-lg">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              width={80}
              height={80}
              className="size-full rounded-full object-cover object-center"
            />
          ) : null}
        </div>
        <div className="flex flex-col items-start font-medium">
          <p className="line-clamp-1">{artist.name}</p>
          <p className="line-clamp-1 text-sm text-tertiary ">
            <span>Artist</span>
          </p>
        </div>
      </div>
    </li>
  )
}

export default LibraryArtistEntity
