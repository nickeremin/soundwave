"use client"

import React from "react"
import Link from "next/link"

import MainFooter from "@/widgets/layout/footers/main-footer"
import { useLayoutContext } from "@/widgets/layout/layout-context"
import PreviewSearchAlbums from "@/widgets/pages/search/preview-search-albums"
import PreviewSearchArtists from "@/widgets/pages/search/preview-search-artists"
import PreviewSearchTracks from "@/widgets/pages/search/preview-search-tracks"
import { useSearch } from "@/shared/lib/hooks/use-search"
import { trpc } from "@/shared/trpc/client"

function SearchPage() {
  // const { columns } = useLayoutContext()
  // const query = useSearch()
  // const { data } = trpc.searchRouter.search.useQuery(
  //   {
  //     q: query!,
  //   },
  //   {
  //     enabled: !!query,
  //   }
  // )

  // if (!data || !columns) return null

  return (
    <div>
      {/* <main className="relative">
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
      <MainFooter /> */}
      <div className="mt-10 flex flex-col gap-10 px-6">
        <section className="flex flex-col gap-4">
          <Link
            href="/search/recent-searches"
            className="decoration-2 hover:underline"
          >
            <h2 className="text-2xl font-bold">Recent searches</h2>
          </Link>
          <div>
            {/* TODO: Show recent searches tracks, albums, artists etc */}
          </div>
        </section>
      </div>
    </div>
  )
}

export default SearchPage
