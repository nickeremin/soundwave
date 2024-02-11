import React from "react"

import TrackList from "@/entities/tracks/track-list"

function TrackRecommendations() {
  return (
    <div className="flex flex-col px-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">Recommended</h2>
          <p className="text-sm font-medium text-tertiary">
            Based on this song
          </p>
        </div>
        <TrackList tracks={[]} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">Recommended</h2>
          <p className="text-sm font-medium text-tertiary">
            Based on this song
          </p>
        </div>
        <TrackList tracks={[]} />
      </div>
    </div>
  )
}

export default TrackRecommendations
