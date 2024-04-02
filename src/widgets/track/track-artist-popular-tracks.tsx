"use client"

import React from "react"

import OrderedTrackEntityLoading from "@/entities/track/ordered-track-entity-loading"
import { Button } from "@/shared/components/ui/button"
import { trpc } from "@/shared/trpc/client"

import OrderedTrackEntity from "./ordered-track-entity"

interface TrackArtistPopularTracksProps {
  artistId: string
  artistName: string
}

function TrackArtistPopularTracks({
  artistId,
  artistName,
}: TrackArtistPopularTracksProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const { data: tracks } = trpc.artistRouter.getArtistTopTracks.useQuery({
    artistId,
  })

  const visibleTracks = tracks ? tracks.slice(0, isExpanded ? 10 : 5) : []

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <p className="text-sm font-medium text-tertiary">Popular tracks by</p>
        <h2 className="text-2xl font-bold">{artistName}</h2>
      </div>
      <div>
        {tracks
          ? visibleTracks.map((track, i) => (
              <OrderedTrackEntity
                key={track.id}
                trackNumber={i + 1}
                track={track}
                withImage
                withNames={false}
              />
            ))
          : Array(isExpanded ? 10 : 5)
              .fill(0)
              .map((_, i) => <OrderedTrackEntityLoading key={i} />)}
        <Button
          variant="link"
          size="none"
          onClick={() => {
            setIsExpanded((isExpanded) => !isExpanded)
          }}
          className="rounded-xl p-4 text-sm"
        >
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      </div>
    </div>
  )
}

export default TrackArtistPopularTracks
