import React from "react"
import Link from "next/link"

import { AlbumTrack } from "@/shared/types/track"
import TrackWrapper from "@/features/player/track-wrapper"
import { formatTimeDuration } from "@/shared/lib/utils"

import ArtistLinksNames from "../artist/artist-name-links"

interface AlbumTrackListProps {
  tracks: AlbumTrack[]
}

function AlbumTrackList({ tracks }: AlbumTrackListProps) {
  return (
    <ul className="flex flex-col">
      {tracks?.map((track) => {
        return (
          <TrackWrapper
            key={track.id}
            trackId={track.id}
            className="rounded text-sm font-medium text-tertiary hover:text-secondary"
          >
            <li className="grid h-14 grid-cols-[16px_minmax(120px,4fr)_minmax(120px,1fr)] items-center gap-4 px-4">
              <span className="text-base">{track.track_number}</span>
              <div className="flex flex-1 flex-col items-start leading-tight">
                <Link
                  href={`/track/${track.id}`}
                  className="line-clamp-1 text-base font-bold leading-tight text-primary hover:underline"
                >
                  {track.name}
                </Link>
                <p className="line-clamp-1">
                  <ArtistLinksNames artists={track.artists} />
                </p>
              </div>
              <span>{formatTimeDuration(track.duration_ms)}</span>
            </li>
          </TrackWrapper>
        )
      })}
    </ul>
  )
}

export default AlbumTrackList
