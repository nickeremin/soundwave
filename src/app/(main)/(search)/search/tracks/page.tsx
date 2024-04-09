"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { useInView } from "react-intersection-observer"

import OrderedTrackEntity from "@/widgets/track/ordered-track-entity"
import { trpc } from "@/shared/trpc/client"

function SearchTracksPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")

  const { data, fetchNextPage, hasNextPage } =
    trpc.searchRouter.searchTracks.useInfiniteQuery(
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
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  if (!data) return null

  return (
    <div className="flex flex-1 flex-col px-6 py-3">
      <div className="flex-1">
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page?.tracks.map((track, j) => (
              <OrderedTrackEntity
                key={track.id}
                track={track}
                trackNumber={i * 50 + j + 1}
                withImage
                withAlbum
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div ref={ref} />
    </div>
  )
}

export default SearchTracksPage
