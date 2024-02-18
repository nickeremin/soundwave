"use client"

import React from "react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/shared/components/ui/button"
import { trpc } from "@/shared/trpc/client"

function SearchTracksPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")

  const { data, fetchNextPage } =
    trpc.searchRouter.searchTracks.useInfiniteQuery(
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
        <div className="flex flex-col gap-2">
          {data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page?.tracks.map((track) => (
                <div key={track.id} className="flex h-14 items-center">
                  {track.name}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
        <Button onClick={() => fetchNextPage()}>Fetch next page</Button>
      </div>
    </main>
  )
}

export default SearchTracksPage
