import React from "react"

import { trpc } from "@/shared/trpc/client"

interface TrackRecommendationsProps {
  trackId: string
}

function TrackRecommendations({ trackId }: TrackRecommendationsProps) {
  const { data: track, isLoading } =
    trpc.trackRouter.getTrackById.useQuery(trackId)

  return <div>TrackRecommendations</div>
}

export default TrackRecommendations
