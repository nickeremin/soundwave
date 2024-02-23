"use client"

import React from "react"

import TrackList from "@/entities/track/track-list"
import TrackListLoading from "@/entities/track/track-list-loading"
import { Button } from "@/shared/components/ui/button"
import { trpc } from "@/shared/trpc/client"

interface ArtistTopTracksProps {
  artistId: string
}

function ArtistTopTracks({ artistId }: ArtistTopTracksProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const { data: tracks } =
    trpc.artistRouter.getArtistTopTracks.useQuery(artistId)

  console.log({ topTracks: tracks })

  return (
    <div className="flex flex-col gap-2 px-6">
      <h2 className="text-2xl font-bold">Popular</h2>

      <div>
        {tracks ? (
          <TrackList
            tracks={isExpanded ? tracks.slice(0, 10) : tracks.slice(0, 5)}
          />
        ) : (
          <TrackListLoading limit={isExpanded ? 10 : 5} />
        )}
        <Button
          variant="none"
          size="none"
          onClick={() => {
            setIsExpanded((isExpanded) => !isExpanded)
          }}
          className="ml-2 mt-2 text-sm font-bold text-tertiary  hover:underline"
        >
          {isExpanded ? "Collapse" : "Show more"}
        </Button>
      </div>
    </div>
  )
}

export default ArtistTopTracks
