"use client"

import React from "react"

import { PlaylistObject } from "@/shared/types/playlist"
import PlayButton from "@/features/player/play-button"
import PlaylistMenuButton from "@/features/playlist/playlist-menu-button"
import PlaylistViewSelect from "@/features/playlist/playlist-view-select"

interface PlaylistActionBarProps {
  playlist: PlaylistObject
}

function PlaylistActionBar({ playlist }: PlaylistActionBarProps) {
  const isEmpty = Number(playlist.total_tracks) == 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-8">
        {!isEmpty && <PlayButton />}
        <PlaylistMenuButton playlist={playlist} />
      </div>
      <PlaylistViewSelect />
    </div>
  )
}

export default PlaylistActionBar
