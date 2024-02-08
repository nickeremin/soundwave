import React from "react"

type Album = {}

interface AlbumListProps {
  items: Album[]
}

function AlbumList({ items }: AlbumListProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((album, i) => (
        <div className="flex flex-col gap-4 rounded-lg bg-muted p-4 pb-6 transition hover:bg-accent">
          <div className="size-28 self-center rounded-lg bg-orange" />
          <div className="flex flex-col">
            <p className="font-medium">Album Name</p>
            <p className="text-sm text-tertiary">Other album info</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AlbumList
