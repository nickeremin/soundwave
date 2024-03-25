"use client"

import React, { useState } from "react"
import Image from "next/image"
import chroma from "chroma-js"
import { BadgeCheckIcon } from "lucide-react"

import { usePageStore } from "@/widgets/providers/page-context-provider"
import FollowArtistButton from "@/features/favorite/follow-artist-button"
import ArtistMenuButton from "@/features/menu/artist-menu-button"
import PlayButton from "@/features/player/play-button"
import { getAverageColor, getImageUrl } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

interface ArtistDetailsProps {
  artistId: string
}

// For better user experience, first the page is made invisible before we can get the artist,
// after that we load the image and once we get the average color of the image we show the page to the user.
function ArtistDetails({ artistId }: ArtistDetailsProps) {
  const { setIsVisible, backgroundColor, setBackgroundColor } = usePageStore()
  const { data: artist } = trpc.artistRouter.getArtist.useQuery({ artistId })

  if (!artist) return null

  const imageUrl = getImageUrl(artist.images)

  return (
    <div>
      <div className="relative flex h-[340px] items-end gap-6 p-6">
        <div
          style={{
            backgroundColor: backgroundColor
              ? chroma(backgroundColor.hex).saturate().hex()
              : undefined,
          }}
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 "
        />
        <div className="relative size-[clamp(128px,128px_+_(100vw-320px-600px)/424*104,232px)] shrink-0 rounded-full bg-accent shadow-image-lg">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              width={400}
              height={400}
              priority
              onLoad={async (e) => {
                const color = getAverageColor(e.currentTarget)
                setBackgroundColor(color)
                setIsVisible(true)
              }}
              className="size-full rounded-full object-cover object-center"
            />
          ) : null}
        </div>
        <div className="relative flex flex-col items-start text-sm font-medium">
          <div className="flex items-center gap-2">
            <BadgeCheckIcon
              fill="#0a84ff"
              strokeWidth={1.5}
              className="size-7"
            />
            Verified Artist
          </div>
          <span className="mb-2 line-clamp-3">
            <h1 className="text-[4rem] font-black leading-tight">
              {artist.name}
            </h1>
          </span>
          <span className="text-base">
            {artist.followers.total.toLocaleString("en", { useGrouping: true })}{" "}
            monthly listeners
          </span>
        </div>
      </div>
      <div
        style={{
          backgroundColor: backgroundColor
            ? chroma(backgroundColor.hex).saturate().hex()
            : undefined,
        }}
        className="absolute z-[-1] h-[240px] w-full bg-gradient-to-b from-black/60 to-background-100 "
      />
      <div className="flex flex-col gap-6 px-6 pt-6">
        <div className="flex items-center gap-8">
          <PlayButton className="size-14" />
          <FollowArtistButton />
          <ArtistMenuButton />
        </div>
      </div>
    </div>
  )
}

export default ArtistDetails
