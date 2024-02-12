import React from "react"

type Artist = {
  // name: string
  // role: "artist" | "producer"
}

interface ArtistListProps {
  items: Artist[]
}

function ArtistList({ items }: ArtistListProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((artist, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 rounded-lg bg-muted p-4 pb-6 transition hover:bg-accent"
        >
          <div className="size-40 self-center rounded-full bg-green" />
          <div className="flex flex-col">
            <p className="font-medium">Artist Name</p>
            <p className="text-sm text-tertiary">Artist Role</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArtistList
