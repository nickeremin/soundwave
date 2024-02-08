import React from "react"

type Track = {}

interface TrackListProps {
  items: Track[]
}

function TrackList({ items }: TrackListProps) {
  return (
    <ul className="flex flex-col">
      {items.map((track, i) => (
        <li
          key={i}
          className="flex h-14 cursor-pointer items-center gap-3 rounded-md px-2 transition hover:bg-accent"
        >
          <div className="size-10 rounded-md bg-blue" />
          <div className="flex flex-1 flex-col text-sm">
            <p className="font-medium">Track Name</p>
            <p className="text-tertiary">Author Name</p>
          </div>
          <div className="text-sm">
            <p className="text-tertiary">Track : Time</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TrackList
