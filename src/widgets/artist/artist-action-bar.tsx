"use client"

import React from "react"

import { type SimplifiedArtistObject } from "@/shared/types/artist"
import ArtistMenuButton from "@/features/artist/artist-menu-button"
import FollowArtistButton from "@/features/artist/follow-artist-button"
import PlayButton from "@/features/player/play-button"

interface ArtistActionBarProps {
  artist: SimplifiedArtistObject
}

function ArtistActionBar({ artist }: ArtistActionBarProps) {
  return (
    <div className="flex items-center gap-8">
      <PlayButton />
      <FollowArtistButton artist={artist} />
      <ArtistMenuButton artist={artist} />
    </div>
  )
}

export default ArtistActionBar
