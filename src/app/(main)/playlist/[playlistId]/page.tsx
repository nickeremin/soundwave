"use client"

import React from "react"
import PageContextProvider from "@/providers/page-context-provider"
import { useInView } from "react-intersection-observer"

import PlaylistHeader from "@/widgets/layout/headers/playlist-header"
import MainFooter from "@/widgets/layout/main-footer"
import PlaylistActionBar from "@/widgets/playlist/playlist-action-bar"
import PlaylistPreview from "@/widgets/playlist/playlist-preview"
import PlaylistRecommendedTracks from "@/widgets/playlist/playlist-recommended-tracks"
import PlaylistSearch from "@/widgets/playlist/playlist-search"
import PlaylistTracks from "@/widgets/playlist/playlist-tracks"
import { trpc } from "@/shared/trpc/client"

interface PlaylistPageProps {
  params: {
    playlistId: string
  }
}

function PlaylistPage({ params: { playlistId } }: PlaylistPageProps) {
  const { data: playlist } = trpc.playlistRouter.getPlaylist.useQuery({
    playlistId,
  })

  const { ref: playlistPreviewRef, entry } = useInView()

  if (!playlist) return null

  const totalTracks = Number(playlist.total_tracks)

  return (
    <PageContextProvider>
      <div className="min-h-screen">
        <PlaylistHeader playlist={playlist} previewEntry={entry} />
        <main className="relative -mt-16">
          <PlaylistPreview ref={playlistPreviewRef} playlistId={playlistId} />
          <div className="relative px-6">
            <div className="py-5">
              <PlaylistActionBar playlist={playlist} />
            </div>
            <div className="space-y-10">
              <PlaylistTracks
                totalTracks={totalTracks}
                playlistId={playlistId}
                isSticky
              />
              <PlaylistSearch playlistId={playlistId} />
              <PlaylistRecommendedTracks playlistId={playlistId} />
            </div>
          </div>
        </main>
      </div>
      <MainFooter />
    </PageContextProvider>
  )
}

export default PlaylistPage
