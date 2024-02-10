import React from "react"

import AlbumList from "@/entities/albums/album-list"
import ArtistList from "@/entities/artists/artist-list"
import PlaylistList from "@/entities/playlists/playlist-list"
import TrackList from "@/entities/tracks/track-list"

function SearchPage() {
  return (
    <div className="mt-10 flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Songs</h2>
        <TrackList tracks={[1, 2, 3, 4, 5]} />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Artists</h2>
        <ArtistList items={[1, 2, 3]} />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Albums</h2>
        <AlbumList items={[1, 2, 3, 4]} />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Playlists</h2>
        <PlaylistList items={[1, 2, 3, 4]} />
      </div>
    </div>
  )
}

export default SearchPage
