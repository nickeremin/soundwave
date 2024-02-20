"use client"

import React from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

import { Button } from "@/shared/components/ui/button"
import { getImageUrl } from "@/shared/lib/utils"
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
              {page?.tracks.map((track, j) => {
                const imageUrl = getImageUrl(track.album.images)

                return (
                  <li
                    key={track.id}
                    className="grid h-14 grid-cols-[16px_4fr_2fr_minmax(120px,1fr)] items-center gap-4 px-4"
                  >
                    <span className="justify-self-end font-medium text-tertiary">
                      {i * 20 + j + 1}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="relative size-10 rounded bg-accent">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt=""
                            height={80}
                            width={80}
                            className="absolute size-full rounded object-cover object-center"
                          />
                        ) : null}
                      </div>
                    </div>
                    {track.name}
                  </li>
                )
              })}
            </React.Fragment>
          ))}
        </div>
        <Button onClick={() => fetchNextPage()}>Fetch next page</Button>
      </div>
    </main>
  )
}

export default SearchTracksPage
