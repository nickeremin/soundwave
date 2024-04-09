"use client"

import React from "react"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { useInView } from "react-intersection-observer"

import PlaylistSubheader from "@/entities/playlist/playlist-subheader"
import OrderedTrackEntityLoading from "@/entities/track/ordered-track-entity-loading"
import { trpc } from "@/shared/trpc/client"

import OrderedTrackEntity from "../track/ordered-track-entity"

interface CollectionTracksProps {
  totalTracks: number
}

function CollectionTracks({ totalTracks }: CollectionTracksProps) {
  const mainContainerRef = useLayoutStore((state) => state.mainContainerRef)

  const subheaderRef = React.useRef<HTMLDivElement | null>(null)
  const tracksContainerRef = React.useRef<HTMLDivElement | null>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.trackRouter.getFavoriteTracks.useInfiniteQuery(
      {},
      {
        enabled: totalTracks > 0,
        getNextPageParam: (lastPage) => lastPage?.cursor,
      }
    )

  const { ref, inView } = useInView()

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage])

  React.useEffect(() => {
    function handleScroll() {
      if (!subheaderRef.current || !tracksContainerRef.current) return

      const headerInitialTop = subheaderRef.current.getBoundingClientRect().top
      const containerInitialTop =
        tracksContainerRef.current.getBoundingClientRect().top

      if (headerInitialTop > containerInitialTop) {
        subheaderRef.current.classList.add("bg-muted", "-mx-6", "px-10")
        subheaderRef.current.classList.remove("px-4")
      } else {
        subheaderRef.current.classList.remove("bg-muted", "-mx-6", "px-10")
        subheaderRef.current.classList.add("px-4")
      }
    }

    mainContainerRef.current?.addEventListener("scroll", handleScroll)

    return () => {
      mainContainerRef.current?.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (totalTracks == 0) return null

  return (
    <React.Fragment>
      <div ref={tracksContainerRef}>
        <PlaylistSubheader ref={subheaderRef} withAlbum withAddedDate />
        <div>
          {data
            ? data.pages.map((page, i) =>
                page?.tracks.map((track, j) => (
                  <OrderedTrackEntity
                    key={track.id}
                    trackNumber={i * 50 + j + 1}
                    track={track}
                    withAlbum
                    withAddedDate
                    withImage
                  />
                ))
              )
            : Array(Math.min(10, 50))
                .fill(0)
                .map((_, i) => <OrderedTrackEntityLoading key={i} />)}
        </div>
        {/* Fetch next tracks when reach end of the list */}
        <div ref={ref} />
      </div>
    </React.Fragment>
  )
}

export default CollectionTracks
