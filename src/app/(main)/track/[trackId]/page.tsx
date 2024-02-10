"use client"

import React from "react"
import axios from "axios"
import { FastAverageColor } from "fast-average-color"
import * as z from "zod"

import TrackDetails from "@/entities/tracks/track-details"
import { Button } from "@/shared/components/ui/button"
import { trackSchema } from "@/shared/lib/validations/track"
import { getArtist, getSpotifyAccessToken, getTrack } from "@/app/_actions/test"

interface TrackPageProps {
  params: {
    trackId: string
  }
}

function TrackPage({ params: { trackId } }: TrackPageProps) {
  return (
    <div className="flex flex-col">
      <TrackDetails key={trackId} trackId={trackId} />
    </div>
  )
}

export default TrackPage
