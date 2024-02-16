"use client"

import React from "react"

import TrackList from "@/entities/track/track-list"
import TrackListLoading from "@/entities/track/track-list-loading"
import { trpc } from "@/shared/trpc/client"

interface RecommendedTracksProps {
  trackId: string
}

function RecommendedTracks({ trackId }: RecommendedTracksProps) {
  const { data: tracks } = trpc.trackRouter.getRecommendedTracks.useQuery({
    seedTracks: trackId,
  })

  return (
    <div className="flex flex-col gap-4 px-6 py-2">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Recommended</h2>
        <p className="text-sm font-medium text-tertiary">Based on this song</p>
      </div>
      {tracks ? (
        <TrackList tracks={tracks.slice(0, 5)} />
      ) : (
        <TrackListLoading limit={5} />
      )}
    </div>
  )
}

export default RecommendedTracks
