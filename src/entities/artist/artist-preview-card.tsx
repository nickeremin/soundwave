import React from "react"
import Image from "next/image"
import { useSearchStore } from "@/providers/bound-store-provider"

import { ArtistObject } from "@/shared/types/artist"
import PlayerButton from "@/features/player/play-button"
import { getImageUrl } from "@/shared/lib/utils"

interface ArtistPreviewCardProps {
  artist: ArtistObject
  withAddToRecentSearches?: boolean
}

function ArtistPreviewCard({
  artist,
  withAddToRecentSearches,
}: ArtistPreviewCardProps) {
  const imageUrl = getImageUrl(artist.images)
  const addToRecentSearches = useSearchStore((state) => state.addRecentSearch)

  function handleClick() {
    if (withAddToRecentSearches) {
      addToRecentSearches({ item: artist, type: "artist" })
    }
  }

  return (
    <div className="group relative flex flex-col gap-6 rounded-lg p-3 transition duration-300 hover:bg-accent">
      <div
        data-shadcnui-button
        role="button"
        tabIndex={0}
        className="absolute inset-0 z-10 cursor-pointer rounded-lg outline-none"
        onClick={handleClick}
      />
      <div className="relative w-full rounded-full bg-accent pb-[100%] shadow-image-sm">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            width={320}
            height={320}
            className="absolute size-full rounded-full object-cover object-center"
          />
        ) : null}
        <div className="absolute bottom-2 right-2 z-20 translate-y-2 opacity-0 transition duration-300 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          <PlayerButton className="shadow-player-button" />
        </div>
      </div>
      <div className="flex flex-col items-start">
        <p className="line-clamp-1 font-bold">{artist.name}</p>
        <p className="text-sm font-medium text-tertiary">Artist</p>
      </div>
    </div>
  )
}

export default ArtistPreviewCard
