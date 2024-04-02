"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

import { type SimplifiedArtistObject } from "@/shared/types/artist"
import { getImageUrl } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

import ArtistNameLinks from "./artist-name-links"

interface TrackMainArtistLinkProps {
  artist: SimplifiedArtistObject
}

function MainArtistLink({ artist }: TrackMainArtistLinkProps) {
  const { data } = trpc.artistRouter.getArtist.useQuery({ artistId: artist.id })

  const imageUrl = getImageUrl(data?.images)

  return (
    <div className="flex items-center gap-1">
      <div className="relative size-6 overflow-hidden rounded-full bg-accent">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            height={64}
            width={64}
            className="size-full object-cover object-center"
          />
        ) : null}
      </div>
      <p className="text-sm font-bold">
        <ArtistNameLinks artists={[artist]} />
      </p>
    </div>
  )
}

export default MainArtistLink
