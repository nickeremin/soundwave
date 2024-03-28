"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { useInView } from "react-intersection-observer"

import { type DiscographyFilterType } from "@/shared/types/artist"
import AlbumPreviewCard from "@/entities/album/album-preview-card"
import { trpc } from "@/shared/trpc/client"

import DiscographyListEntity from "./discography-list-entity"

interface DiscographyFilteredAlbumsProps {
  artistId: string
  discographyFilterType: DiscographyFilterType
}

function DiscographyFilteredAlbums({
  artistId,
  discographyFilterType,
}: DiscographyFilteredAlbumsProps) {
  const router = useRouter()
  const columns = useLayoutStore((state) => state.columnsCount)
  const discographyLayout = useLayoutStore((state) => state.discographyLayout)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.artistRouter.getArtistAlbums.useInfiniteQuery(
      {
        artistId,
        include_groups:
          discographyFilterType != "all" ? [discographyFilterType] : [],
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
      }
    )

  React.useEffect(() => {
    if (data && data.pages[0]?.artistAlbums.length == 0) {
      router.push(`/artist/${artistId}/discography/all`)
    }
  }, [data])

  const { ref, inView } = useInView()

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView])

  // Without this thing the page won't scroll up
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!data || !isMounted) return null

  return (
    <React.Fragment key={discographyFilterType}>
      {discographyLayout == "list" && (
        <div className="space-y-8 pt-8">
          {data.pages.map((page) =>
            page?.artistAlbums.map((album) => (
              <DiscographyListEntity key={album.id} album={album} />
            ))
          )}
        </div>
      )}
      {discographyLayout == "grid" && (
        <div
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
          className="mx-3 mt-4 grid"
        >
          {data.pages.map((page) =>
            page?.artistAlbums.map((album) => (
              <AlbumPreviewCard key={album.id} album={album} withType />
            ))
          )}
        </div>
      )}
      {/* Fetch new albums when reach end of the list */}
      <div ref={ref} />
    </React.Fragment>
  )
}

export default DiscographyFilteredAlbums
