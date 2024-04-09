"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { useInView } from "react-intersection-observer"

import ArtistPreviewCard from "@/entities/artist/artist-preview-card"
import { trpc } from "@/shared/trpc/client"

function SearchArtistsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")

  const columns = useLayoutStore((state) => state.columnsCount)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.searchRouter.searchArtists.useInfiniteQuery(
      {
        q: query!,
      },
      {
        enabled: !!query,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
      }
    )

  const { ref, inView } = useInView()

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage])

  if (!data) return null

  return (
    <div className="p-6">
      <div
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        className="grid"
      >
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page?.artists.map((artist) => (
              <ArtistPreviewCard
                key={artist.id}
                artist={artist}
                withAddToRecentSearches
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div ref={ref} />
    </div>
  )
}

export default SearchArtistsPage
