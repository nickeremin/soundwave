"use client"

import React from "react"
import Link from "next/link"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { format } from "date-fns"
import { ClockIcon } from "lucide-react"
import { useInView } from "react-intersection-observer"

import AddFavoriteTrackButton from "@/features/favorite/add-favorite-track-button"
import TrackMenuButton from "@/features/menu/track-menu-button"
import PlayTrackButton from "@/features/player/play-track-button"
import TrackWrapper from "@/features/player/track-wrapper"
import ArtistNameLinks from "@/entities/artist/artist-name-links"
import PlayableTrackEntityLoading from "@/entities/track/ordered-track-entity-loading"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { cn, formatTimeDuration } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

import PlayableTrackEntity from "../track/ordered-track-entity"

interface AlbumTracksProps {
  albumId: string
  totalTracks: number
  isSticky?: boolean
}

function AlbumTracks({ albumId, totalTracks, isSticky }: AlbumTracksProps) {
  const mainContainerRef = useLayoutStore((state) => state.mainContainerRef)

  const albumSubHeaderRef = React.useRef<HTMLDivElement | null>(null)
  const tracksContainerRef = React.useRef<HTMLDivElement | null>(null)

  const { data: album } = trpc.albumRouter.getAlbum.useQuery({ albumId })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.albumRouter.getAlbumTracks.useInfiniteQuery(
      { albumId },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
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
      if (!albumSubHeaderRef.current || !tracksContainerRef.current) return

      const headerInitialTop =
        albumSubHeaderRef.current.getBoundingClientRect().top
      const containerInitialTop =
        tracksContainerRef.current.getBoundingClientRect().top

      if (headerInitialTop > containerInitialTop) {
        albumSubHeaderRef.current.classList.add("bg-muted", "-mx-6", "px-10")
        albumSubHeaderRef.current.classList.remove("px-4")
      } else {
        albumSubHeaderRef.current.classList.remove("bg-muted", "-mx-6", "px-10")
        albumSubHeaderRef.current.classList.add("px-4")
      }
    }

    if (isSticky)
      mainContainerRef.current?.addEventListener("scroll", handleScroll)

    return () => {
      if (isSticky)
        mainContainerRef.current?.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (!album) return null

  return (
    <React.Fragment>
      <div ref={tracksContainerRef}>
        <div
          ref={albumSubHeaderRef}
          className={cn(
            "mb-2 grid h-10 grid-cols-[16px_minmax(120px,4fr)_minmax(120px,1fr)] gap-4 border-b px-4 text-sm font-medium leading-none text-secondary",
            isSticky && "sticky top-16 z-40"
          )}
        >
          <div className="flex items-center justify-self-end text-base">#</div>
          <div className="flex items-center">Title</div>
          <div className="flex items-center justify-self-end">
            <span className="mr-9">
              <ClockIcon className="size-[18px]" />
            </span>
          </div>
        </div>
        <div>
          {data
            ? data.pages.map((page) =>
                page?.albumTracks.map((track) => (
                  <PlayableTrackEntity key={track.id} track={track} />
                ))
              )
            : Array(totalTracks)
                .fill(0)
                .map((_, i) => <PlayableTrackEntityLoading key={i} />)}
        </div>
        {/* Fetch next tracks when reach end of the list */}
        <div ref={ref} />
      </div>
      <div className="mt-6 flex flex-col items-start font-medium text-tertiary">
        <span className="mb-1 text-sm">
          {format(album.release_date, "MMMM d, yyyy")}
        </span>
        {album.copyrights.map((copyright, i) => (
          <span key={i} className="text-xs">
            {copyright.text}
          </span>
        ))}
      </div>
    </React.Fragment>
  )
}

export default AlbumTracks
