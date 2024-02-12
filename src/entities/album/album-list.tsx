import React from "react"

import { Album } from "@/shared/types/album"

interface AlbumListProps {
  items: Album[]
}

function AlbumList({ items }: AlbumListProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 rounded-lg bg-muted p-4 pb-6 transition hover:bg-accent"
        >
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
