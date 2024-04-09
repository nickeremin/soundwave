"use client"

import React from "react"
import PageContextProvider from "@/providers/page-context-provider"
import { useInView } from "react-intersection-observer"

import PlayableHeader from "@/widgets/layout/headers/playable-header"
import MainFooter from "@/widgets/layout/main-footer"
import CollectionActionBar from "@/widgets/library/collection-action-bar"
import CollectionPreview from "@/widgets/library/collection-preview"
import CollectionTracks from "@/widgets/library/collection-tracks"
import EmptyFavoritePlaylist from "@/entities/library/library-empty-favorite-playlist"
import { trpc } from "@/shared/trpc/client"

function CollectionTracksPage() {
  const { data: favoritePlaylist, isLoading } =
    trpc.playlistRouter.getFavoritePlaylist.useQuery()

  const { ref, entry } = useInView()

  if (isLoading) return null

  const totalTracks = Number(favoritePlaylist?.total_tracks) || 0

  return (
    <PageContextProvider>
      <div className="flex min-h-[calc(100vh-16px)] flex-col">
        <PlayableHeader name="Liked Songs" previewEntry={entry} />
        <main className="relative -mt-16 flex-1">
          <CollectionPreview ref={ref} />
          <div className="relative px-6">
            <div className="py-5">
              {totalTracks > 0 && <CollectionActionBar />}
            </div>
            <div className="space-y-10">
              {totalTracks > 0 ? (
                <CollectionTracks totalTracks={totalTracks} />
              ) : (
                <EmptyFavoritePlaylist />
              )}
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    </PageContextProvider>
  )
}

export default CollectionTracksPage
