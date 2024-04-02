"use client"

import React from "react"

import UnorderedTrackEnityLoading from "@/entities/track/unordered-track-enity-loading"
import { trpc } from "@/shared/trpc/client"

import UnorderedTrackEnity from "./unordered-track-entity"

interface TrackRecommendedTracksProps {
  trackId: string
  artistIds: string[]
}

function TrackRecommendedTracks({
  trackId,
  artistIds,
}: TrackRecommendedTracksProps) {
  const { data: tracks } = trpc.trackRouter.getRecommendations.useQuery({
    seed_tracks: [trackId],
    seed_artists: artistIds,
  })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Recommended</h2>
        <p className="text-sm font-medium text-tertiary">Based on this song</p>
      </div>
      <div>
        {tracks
          ? tracks
              .slice(0, 5)
              .map((track) => (
                <UnorderedTrackEnity key={track.id} track={track} />
              ))
          : Array(5)
              .fill(0)
              .map((_, i) => <UnorderedTrackEnityLoading key={i} />)}
      </div>
    </div>
  )
}

export default TrackRecommendedTracks
