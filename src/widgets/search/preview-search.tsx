"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { useBoundStore } from "@/providers/bound-store-provider"

import { trpc } from "@/shared/trpc/client"

import PreviewSearchAlbums from "../pages/search/preview-search-albums"
import PreviewSearchArtists from "../pages/search/preview-search-artists"
import PreviewSearchTracks from "../pages/search/preview-search-tracks"

function PreviewSearch() {
  const query = useSearchParams().get("query")
  const columns = useBoundStore((state) => state.columnsCount)

  const { data } = trpc.searchRouter.search.useQuery(
    { q: query!, type: ["album", "artist", "track"] },
    {
      enabled: !!query,
    }
  )

  if (!data) return null

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
      className="grid gap-x-8 gap-y-10"
    >
      <PreviewSearchTracks tracks={data.tracks.items} />
      <PreviewSearchArtists artists={data?.artists.items ?? []} />

      <PreviewSearchAlbums albums={data?.albums.items ?? []} />
    </div>
  )
}

export default PreviewSearch
