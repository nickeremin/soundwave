import React from "react"

import PlayButton from "@/features/player/play-button"
import PlaylistViewSelect from "@/features/playlist/playlist-view-select"

function CollectionActionBar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-8">
        <PlayButton />
      </div>
      <PlaylistViewSelect />
    </div>
  )
}

export default CollectionActionBar
