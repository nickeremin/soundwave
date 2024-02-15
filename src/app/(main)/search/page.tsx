"use client"

import React from "react"

import { Track } from "@/shared/types/track"
import SearchHeader from "@/widgets/layout/headers/search/search-header"
import PreviewSearchTracks from "@/widgets/search/preview-search-tracks"
import AlbumList from "@/entities/album/album-list"
import ArtistList from "@/entities/artist/artist-list"
import TrackList from "@/entities/track/track-list"
import { Button } from "@/shared/components/ui/button"
import { Wrapper } from "@/shared/components/ui/wrapper"
import { useGridColumns } from "@/shared/lib/hooks/use-grid-columns"
import { cn } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

function SearchPage() {
  //utils.searchRouter.search.getInfiniteData()
  const columns = useGridColumns()
  const { data } = trpc.searchRouter.search.useQuery({
    q: "some",
    type: ["track"],
  })

  if (!data) return null

  const tracks = data.searchData.items
  console.log(columns)

  return (
    <div>
      <main className="relative">
        <div className="my-6 px-6">
          <PreviewSearchTracks />
        </div>
        {/* <Button onClick={() => fetchNextPage()}>Fetch Next page</Button> */}
      </main>
    </div>
  )
}

export default SearchPage
