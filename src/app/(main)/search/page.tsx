"use client"

import React from "react"

import MainFooter from "@/widgets/layout/footers/main-footer"
import PreviewSearchAlbums from "@/widgets/pages/search/preview-search-albums"
import PreviewSearchArtists from "@/widgets/pages/search/preview-search-artists"
import PreviewSearchTracks from "@/widgets/pages/search/preview-search-tracks"
import { useGridColumns } from "@/shared/lib/hooks/use-grid-columns"
import { useSearch } from "@/shared/lib/hooks/use-search"
import { trpc } from "@/shared/trpc/client"

function SearchPage() {
  const columns = useGridColumns()
  const query = useSearch()
  const { data } = trpc.searchRouter.search.useQuery(
    {
      q: query!,
    },
    {
      enabled: !!query,
    }
  )

  if (!data || !columns) return null

  return (
    <div>
      <main className="relative">
        <div
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
          className="grid gap-x-8 gap-y-10 p-6"
        >
          <PreviewSearchTracks tracks={data.tracks.items} />
          <PreviewSearchArtists artists={data.artists.items} />
          <PreviewSearchAlbums albums={data.albums.items} />
        </div>
      </main>
      <MainFooter />
    </div>
  )
}

export default SearchPage
