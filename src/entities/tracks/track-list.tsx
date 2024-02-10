import React from "react"
import Image from "next/image"
import { format } from "date-fns"

import { Track } from "@/shared/types/track"
import { AspectRatio } from "@/shared/components/ui/aspect-ratio"

interface TrackListProps {
  tracks: Track[] | undefined
}

function TrackList({ tracks }: TrackListProps) {
  return (
    <ul className="flex flex-col">
      {tracks?.map((track, i) => (
        <li
          key={i}
          className="tex-sm flex h-14 cursor-pointer items-center gap-3 rounded-md px-2 text-tertiary transition hover:bg-accent"
        >
          <div className="relative size-10 overflow-hidden rounded-md">
            <Image src={track.imageUrl} alt="" fill className="object-cover" />
          </div>
          <div className="flex flex-1 flex-col">
            <p className="text-base text-primary">{track.title}</p>
            <p>{track.artist}</p>
          </div>
          <div>
            <p>{format(new Date(track.duration * 1000), "m:ss")}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TrackList
