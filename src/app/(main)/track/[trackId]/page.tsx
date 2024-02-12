"use client"

import React from "react"

import TrackDetails from "@/widgets/track/track-details"
import RecommendedTracks from "@/entities/track/recommended-tracks"

interface TrackPageProps {
  params: {
    trackId: string
  }
}

function TrackPage({ params: { trackId } }: TrackPageProps) {
  return (
    <React.Fragment key={trackId}>
      <TrackDetails trackId={trackId} />
      <RecommendedTracks trackId={trackId} />
    </React.Fragment>
  )
}

export default TrackPage
