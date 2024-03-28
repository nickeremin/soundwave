"use client"

import React from "react"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { useInView } from "react-intersection-observer"

import { type SimplifiedAlbumObject } from "@/shared/types/album"
import AlbumPreviewCard from "@/entities/album/album-preview-card"
import ArtistEmptyDiscography from "@/entities/artist/artist-empty-discography"
import { trpc } from "@/shared/trpc/client"

import DiscographyListEntity from "./discography-list-entity"

interface DiscographyAllAlbumsProps {
  artistId: string
}

function DiscographyAllAlbums({ artistId }: DiscographyAllAlbumsProps) {
  const columns = useLayoutStore((state) => state.columnsCount)
  const discographyLayout = useLayoutStore((state) => state.discographyLayout)

  const {
    data: albums,
    fetchNextPage: fetchNextPageAlbums,
    hasNextPage: hasNextPageAlbums,
    isFetchingNextPage: isFetchingNextPageAlbums,
  } = trpc.artistRouter.getArtistAlbums.useInfiniteQuery(
    {
      artistId,
      include_groups: ["album"],
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    }
  )
  const {
    data: singles,
    fetchNextPage: fetchNextPageSingles,
    hasNextPage: hasNextPageSingles,
    isFetchingNextPage: isFetchingNextPageSingles,
  } = trpc.artistRouter.getArtistAlbums.useInfiniteQuery(
    {
      artistId,
      include_groups: ["single"],
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    }
  )
  const {
    data: compilations,
    fetchNextPage: fetchNextPageCompilations,
    hasNextPage: hasNextPageCompilations,
    isFetchingNextPage: isFetchingNextPageCompilations,
  } = trpc.artistRouter.getArtistAlbums.useInfiniteQuery(
    {
      artistId,
      include_groups: ["compilation"],
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    }
  )

  const { ref, inView } = useInView()

  React.useEffect(() => {
    if (inView) {
      if (hasNextPageAlbums && !isFetchingNextPageAlbums) fetchNextPageAlbums()
      if (hasNextPageSingles && !isFetchingNextPageSingles)
        fetchNextPageSingles()
      if (hasNextPageCompilations && !isFetchingNextPageCompilations)
        fetchNextPageCompilations()
    }
  }, [inView])

  // Without this thing the page won't scroll up
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const isLoading = !albums || !singles || !compilations

  if (isLoading || !isMounted) return null

  const allDiscography: SimplifiedAlbumObject[][] = [[]]

  for (let i = 0; i < albums.pages.length; i++) {
    if (!allDiscography[i]) allDiscography[i] = []
    allDiscography[i]!.push(...albums.pages[i]!.artistAlbums)
  }
  for (let i = 0; i < singles.pages.length; i++) {
    if (!allDiscography[i]) allDiscography[i] = []
    allDiscography[i]!.push(...singles.pages[i]!.artistAlbums)
  }
  for (let i = 0; i < compilations.pages.length; i++) {
    if (!allDiscography[i]) allDiscography[i] = []
    allDiscography[i]!.push(...compilations.pages[i]!.artistAlbums)
  }

  for (let i = 0; i < allDiscography.length; i++) {
    allDiscography[i]?.sort((first, second) =>
      second.release_date.localeCompare(first.release_date)
    )
  }

  if (allDiscography[0]?.length == 0) {
    return <ArtistEmptyDiscography />
  }

  return (
    <React.Fragment>
      {discographyLayout == "list" && (
        <div className="space-y-8 pt-8">
          {allDiscography.map((page) =>
            page.map((album) => (
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
          {allDiscography.map((page) =>
            page.map((album) => (
              <AlbumPreviewCard key={album.id} album={album} withType />
            ))
          )}
        </div>
      )}
      <div ref={ref} />
    </React.Fragment>
  )
}

export default DiscographyAllAlbums
