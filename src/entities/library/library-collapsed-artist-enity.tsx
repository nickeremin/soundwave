"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { ArtistObject } from "@/shared/types/artist"
import { Tooltip } from "@/shared/components/ui/tooltip"
import { getImageUrl } from "@/shared/lib/utils"

interface LibraryCollapsedArtistEntityProps {
  artist: ArtistObject
}

function LibraryCollapsedArtistEntity({
  artist,
}: LibraryCollapsedArtistEntityProps) {
  const router = useRouter()

  const imageUrl = getImageUrl(artist.images)

  return (
    <Tooltip
      side="right"
      content={
        <div className="flex flex-col items-start font-medium">
          <p className="line-clamp-1">{artist.name}</p>
          <p className="line-clamp-1 text-sm text-tertiary">
            <span>Artist</span>
          </p>
        </div>
      }
    >
      <li className="relative -mx-1 flex h-16 items-center rounded-md px-2 hover:bg-muted">
        <div
          role="button"
          tabIndex={-1}
          onClick={() => router.push(`/artist/${artist.id}`)}
          className="absolute inset-0 cursor-pointer"
        />
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
      </li>
    </Tooltip>
  )
}

export default LibraryCollapsedArtistEntity
