import React from "react"

type Playlist = {}

interface PlaylistListProps {
  items: Playlist[]
}

function PlaylistList({ items }: PlaylistListProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((playlisy, i) => (
        <div className="flex flex-col gap-4 rounded-lg bg-muted p-4 pb-6 transition hover:bg-accent">
          <div className="size-28 self-center rounded-lg bg-pink" />
          <div className="flex flex-col">
            <p className="font-medium">Playlist Name</p>
            <p className="text-sm text-tertiary">Other album info</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PlaylistList
