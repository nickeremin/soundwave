"use client"

import React from "react"

import TrackList from "@/entities/track/track-list"
import TrackListLoading from "@/entities/track/track-list-loading"
import { trpc } from "@/shared/trpc/client"

interface RecommendedTracksProps {
  trackId: string
}

function RecommendedTracks({ trackId }: RecommendedTracksProps) {
  const { data } = trpc.trackRouter.getRecommendedTracks.useQuery(
    {
      limit: 5,
      seedTracks: trackId,
    },
    {
      refetchOnWindowFocus: false,
    }
  )

  if (!data) {
    return (
      <div className="flex flex-col gap-4 px-6">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">Recommended</h2>
          <p className="text-sm font-medium text-tertiary">
            Based on this song
          </p>
        </div>
        <TrackListLoading limit={5} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 px-6 py-2">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Recommended</h2>
        <p className="text-sm font-medium text-tertiary">Based on this song</p>
      </div>
      <TrackList tracks={data.tracks} />
    </div>
  )
}

export default RecommendedTracks
