import React from "react"

import AlbumList from "@/entities/album/album-list"
import ArtistList from "@/entities/artist/artist-list"
import TrackList from "@/entities/track/track-list"

function SearchPage() {
  return (
    <div className="mt-10 flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Songs</h2>
        <TrackList tracks={[]} />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Artists</h2>
        <ArtistList items={[1, 2, 3]} />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Albums</h2>
        <AlbumList items={[]} />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Playlists</h2>
      </div>
    </div>
  )
}

export default SearchPage
