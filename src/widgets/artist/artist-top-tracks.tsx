"use client"

import React from "react"

import PlayableTrackEntityLoading from "@/entities/track/ordered-track-entity-loading"
import { Button } from "@/shared/components/ui/button"
import { trpc } from "@/shared/trpc/client"

import PlayableTrackEntity from "../track/ordered-track-entity"

interface ArtistTopTracksProps {
  artistId: string
}

function ArtistTopTracks({ artistId }: ArtistTopTracksProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const { data: tracks } = trpc.artistRouter.getArtistTopTracks.useQuery({
    artistId,
  })

  if (tracks && tracks.length == 0) return null

  const visibleTracks = tracks ? tracks.slice(0, isExpanded ? 10 : 5) : []

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Popular</h2>
      <div>
        {tracks
          ? visibleTracks.map((track, i) => (
              <PlayableTrackEntity
                key={track.id}
                trackNumber={i + 1}
                track={track}
                withImage
              />
            ))
          : Array(isExpanded ? 10 : 5)
              .fill(0)
              .map((_, i) => <PlayableTrackEntityLoading key={i} withImage />)}
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

export default ArtistTopTracks
