import React from "react"

import FollowArtistButton from "@/features/favorite/follow-artist-button"
import ArtistMenuButton from "@/features/menu/artist-menu-button"
import PlayButton from "@/features/player/play-button"

function ArtistActionBar() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-8">
        <PlayButton className="size-14" />
        <FollowArtistButton />
        <ArtistMenuButton />
      </div>
    </div>
  )
}

export default ArtistActionBar
