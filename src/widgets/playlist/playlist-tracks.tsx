"use client"

import React from "react"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { ClockIcon } from "lucide-react"
import { useInView } from "react-intersection-observer"

import PlayableTrackEntityLoading from "@/entities/track/ordered-track-entity-loading"
import { cn } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

import PlayableTrackEntity from "../track/ordered-track-entity"

interface PlaylistTracksProps {
  playlistId: string
  totalTracks: number
  isSticky?: boolean
}

function PlaylistTracks({
  playlistId,
  totalTracks,
  isSticky,
}: PlaylistTracksProps) {
  const mainContainerRef = useLayoutStore((state) => state.mainContainerRef)

  const albumSubHeaderRef = React.useRef<HTMLDivElement | null>(null)
  const tracksContainerRef = React.useRef<HTMLDivElement | null>(null)

  const { data: playlist } = trpc.playlistRouter.getPlaylist.useQuery({
    playlistId,
  })

  const isEnabled = !!playlist && Number(playlist.total_tracks) > 0

  const {
    data: playlistTracks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.playlistRouter.getplaylistTracks.useInfiniteQuery(
    {
      playlistId,
    },
    {
      enabled: isEnabled,
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

  if (!playlist || totalTracks == 0) return null

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
          {playlistTracks
            ? playlistTracks.pages.map((page, i) =>
                page?.tracks.map((track, j) => (
                  <PlayableTrackEntity
                    key={track.id}
                    trackNumber={i * 50 + j + 1}
                    track={track}
                    withImage
                  />
                ))
              )
            : Array(Math.min(totalTracks, 50))
                .fill(0)
                .map((_, i) => <PlayableTrackEntityLoading key={i} />)}
        </div>
        {/* Fetch next tracks when reach end of the list */}
        <div ref={ref} />
      </div>
    </React.Fragment>
  )
}

export default PlaylistTracks
