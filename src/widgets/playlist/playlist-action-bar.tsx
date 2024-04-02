"use client"

import React from "react"

import { PlaylistObject } from "@/shared/types/playlist"
import PlayButton from "@/features/player/play-button"
import PlaylistMenuButton from "@/features/playlist/playlist-menu-button"

interface PlaylistActionBarProps {
  playlist: PlaylistObject
}

function PlaylistActionBar({ playlist }: PlaylistActionBarProps) {
  return (
    <div className="flex items-center gap-8">
      <PlayButton />
      <PlaylistMenuButton playlist={playlist} />
    </div>
  )
}

export default PlaylistActionBar
