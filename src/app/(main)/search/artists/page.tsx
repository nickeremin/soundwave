"use client"

import React from "react"
import { useSearchParams } from "next/navigation"

import { useLayoutContext } from "@/widgets/layout/layout-context"
import ArtistPreviewCard from "@/entities/artist/artist-preview-card"
import { trpc } from "@/shared/trpc/client"

function SearchArtistsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")

  const { columns } = useLayoutContext()

  const { data } = trpc.searchRouter.searchArtists.useInfiniteQuery(
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
      <div className="px-6 py-3">
        <div
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          className="grid gap-8"
        >
          {data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page?.artists.map((artist, j) => (
                <ArtistPreviewCard key={j} artist={artist} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </main>
  )
}

export default SearchArtistsPage
