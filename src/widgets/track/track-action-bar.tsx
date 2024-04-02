"use client"

import React from "react"

import { type SimplifiedTrackObject } from "@/shared/types/track"
import PlayButton from "@/features/player/play-button"
import AddFavoriteTrackButton from "@/features/track/add-favorite-track-button"
import TrackMenuButton from "@/features/track/track-menu-button"

interface TrackActionBarProps {
  track: SimplifiedTrackObject
}

function TrackActionBar({ track }: TrackActionBarProps) {
  return (
    <div className="flex items-center gap-8 py-5">
      <PlayButton className="size-14" />
      <AddFavoriteTrackButton size="lg" track={track} />
      <TrackMenuButton size="lg" track={track} />
    </div>
  )
}

export default TrackActionBar
