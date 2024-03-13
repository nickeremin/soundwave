"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import AddFavoriteTrackButton from "@/features/favorite/add-favorite-track-button"
import TrackMenuButton from "@/features/menu/track-menu-button"
import PlayTrackButton from "@/features/player/play-track-button"
import { usePlayerContext } from "@/features/player/player-context-provider"
import TrackWrapper from "@/features/player/track-wrapper"
import ArtistNameLinks from "@/entities/artist/artist-name-links"
import { cn, formatTimeDuration, getImageUrl } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

function SearchTracksPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")

  const { playingTrackId } = usePlayerContext()

  const { data } = trpc.searchRouter.searchTracks.useInfiniteQuery(
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
        <div className="flex flex-col">
          {data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page?.tracks.map((track, j) => {
                const imageUrl = getImageUrl(track.album.images)

                return (
                  <TrackWrapper
                    key={track.id}
                    trackId={track.id}
                    className="group text-sm font-medium text-tertiary hover:text-secondary"
                  >
                    <li className="grid h-14 grid-cols-[16px_4fr_2fr_minmax(120px,1fr)] items-center gap-4 px-4">
                      <div className="flex items-center justify-self-end">
                        <div className="relative inline-block size-4">
                          <span
                            className={cn(
                              "absolute right-1 text-base tabular-nums leading-none text-tertiary group-hover:invisible group-aria-[selected=true]:invisible",
                              playingTrackId === track.id && "text-pink"
                            )}
                          >
                            {i * 20 + j + 1}
                          </span>
                          <PlayTrackButton
                            trackId={track.id}
                            className="invisible absolute text-primary group-hover:visible group-aria-[selected=true]:visible"
                          />
                        </div>
                      </div>
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
                        <div className="flex flex-col">
                          <Link
                            href={`/track/${track.id}`}
                            className={cn(
                              "line-clamp-1 text-base font-bold leading-tight text-primary hover:underline",
                              playingTrackId === track.id && "text-pink"
                            )}
                          >
                            {track.name}
                          </Link>
                          <p className="line-clamp-1">
                            <ArtistNameLinks artists={track.artists} />
                          </p>
                        </div>
                      </div>
                      <div>
                        <Link
                          href={`/album/${track.album.id}`}
                          className="hover:underline"
                        >
                          {track.album.name}
                        </Link>
                      </div>
                      <div className="flex items-center gap-4 justify-self-end">
                        <AddFavoriteTrackButton className="invisible hover:text-primary group-hover:visible group-aria-[selected=true]:visible" />
                        <div className="flex w-[5ch] items-center justify-end">
                          <span>{formatTimeDuration(track.duration_ms)}</span>
                        </div>
                        <TrackMenuButton className="invisible size-5 text-primary group-hover:visible group-aria-[selected=true]:visible" />
                      </div>
                    </li>
                  </TrackWrapper>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </main>
  )
}

export default SearchTracksPage
