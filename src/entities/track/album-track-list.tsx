import React from "react"
import Link from "next/link"

import { AlbumTrack } from "@/shared/types/track"
import TrackWrapper from "@/features/player/track-wrapper"
import { formatTimeDuration } from "@/shared/lib/utils"

import ArtistLinksNames from "../artist/artist-link-names"

interface AlbumTrackListProps {
  tracks: AlbumTrack[]
}

function AlbumTrackList({ tracks }: AlbumTrackListProps) {
  return (
    <ul className="flex flex-col">
      {tracks?.map((track) => {
        const artistNames = track.artists
          .map((artist) => artist.name)
          .join(", ")

        return (
          <TrackWrapper key={track.id} trackId={track.id} className="rounded">
            <li className="grid h-14 grid-cols-[16px_minmax(120px,4fr)_minmax(120px,1fr)] items-center gap-4 px-4 text-sm font-medium leading-tight text-tertiary">
              <span className="text-base">{track.track_number}</span>
              <div className="flex flex-1 flex-col items-start">
                <Link href={`/track/${track.id}`}>
                  <p className="w-fit text-base leading-tight text-primary decoration-2 hover:underline">
                    {track.name}
                  </p>
                </Link>
                <ArtistLinksNames artists={track.artists} />
              </div>
              <div className="flex items-center justify-end">
                <p>{formatTimeDuration(track.duration_ms)}</p>
              </div>
            </li>
          </TrackWrapper>
        )
      })}
    </ul>
  )
}

export default AlbumTrackList
