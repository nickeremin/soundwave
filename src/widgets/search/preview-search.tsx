"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { keepPreviousData } from "@tanstack/react-query"

import { trpc } from "@/shared/trpc/client"

import PreviewSearchAlbums from "../pages/search/preview-search-albums"
import PreviewSearchArtists from "../pages/search/preview-search-artists"
import PreviewSearchTracks from "../pages/search/preview-search-tracks"

function PreviewSearch() {
  const query = useSearchParams().get("query")
  const columns = useLayoutStore((state) => state.columnsCount)

  const { data, isPlaceholderData } = trpc.searchRouter.search.useQuery(
    { q: query!, type: ["album", "artist", "track"] },
    {
      enabled: !!query,
      placeholderData: keepPreviousData,
    }
  )

  const totalTracks = data?.tracks.total
  const totalArtists = data?.artists.total
  const totalAlbums = data?.albums.total

  // if (!(totalTracks || totalArtists || totalAlbums)) return null

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
      className="grid gap-x-8 gap-y-10"
    >
      {!!totalTracks && <PreviewSearchTracks tracks={data.tracks.items} />}
      {!!totalArtists && <PreviewSearchArtists artists={data.artists.items} />}
      {!!totalAlbums && <PreviewSearchAlbums albums={data.albums.items} />}
    </div>
  )
}

export default PreviewSearch
