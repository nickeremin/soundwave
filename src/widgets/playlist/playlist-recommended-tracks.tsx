"use client"

import React from "react"

import UnorderedTrackEnityLoading from "@/entities/track/unordered-track-enity-loading"
import { trpc } from "@/shared/trpc/client"

import UnorderedTrackEnity from "../track/unordered-track-entity"

interface PlaylistRecommendedTracksProps {
  playlistId: string
}

function shuffle<TData>(array: TData[]) {
  let currentIndex = array.length

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    const temp = array[currentIndex]
    array[currentIndex] = array[randomIndex] as TData
    array[randomIndex] = temp as TData
  }

  return array
}

const TRACK_LIMIT = 10

function PlaylistRecommendedTracks({
  playlistId,
}: PlaylistRecommendedTracksProps) {
  const { data: playlist } = trpc.playlistRouter.getPlaylist.useQuery({
    playlistId,
  })

  const trackIds = playlist
    ? shuffle([...(playlist.tracks ?? [])])
        .slice(0, 5)
        .map((track) => track.track_id)
    : []

  const isEnabled = !!playlist && Number(playlist.total_tracks) > 0

  const { data: tracks } = trpc.trackRouter.getRecommendations.useQuery(
    {
      seed_tracks: trackIds,
    },
    {
      enabled: isEnabled,
    }
  )

  if (playlist && Number(playlist.total_tracks) == 0) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Recommended</h2>
        <p className="text-sm font-medium text-tertiary">
          Based on what&apos;s in this playlist
        </p>
      </div>
      <div>
        {tracks
          ? tracks
              .slice(0, TRACK_LIMIT)
              .map((track) => (
                <UnorderedTrackEnity key={track.id} track={track} />
              ))
          : Array(TRACK_LIMIT)
              .fill(0)
              .map((_, i) => <UnorderedTrackEnityLoading key={i} />)}
      </div>
    </div>
  )
}

export default PlaylistRecommendedTracks
