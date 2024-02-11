"use client"

import React from "react"

import TrackDetails from "@/widgets/track/track-details"
import TrackRecommendations from "@/widgets/track/track-recommendations"

interface TrackPageProps {
  params: {
    trackId: string
  }
}

function TrackPage({ params: { trackId } }: TrackPageProps) {
  return (
    <React.Fragment>
      <TrackDetails key={trackId} trackId={trackId} />
      <TrackRecommendations />
    </React.Fragment>
  )
}

export default TrackPage
