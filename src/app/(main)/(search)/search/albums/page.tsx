"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { useLayoutStore } from "@/providers/bound-store-provider"

import AlbumPreviewCard from "@/entities/album/album-preview-card"
import { trpc } from "@/shared/trpc/client"

function SearchAlbumsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")

  const columns = useLayoutStore((state) => state.columnsCount)

  const { data } = trpc.searchRouter.searchAlbums.useInfiniteQuery(
    {
      q: query!,
    },
    {
      enabled: !!query,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    }
  )

  if (!data) return null

  return (
    <main>
      <div className="p-6">
        <div
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          className="grid"
        >
          {data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page?.albums.map((album, j) => (
                <AlbumPreviewCard key={j} album={album} withArtists />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </main>
  )
}

export default SearchAlbumsPage
