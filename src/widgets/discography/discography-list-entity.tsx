"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ClockIcon } from "lucide-react"

import { type SimplifiedAlbumObject } from "@/shared/types/album"
import AddFavoriteAlbumButton from "@/features/album/add-favorite-album-button"
import AddFavoriteTrackButton from "@/features/favorite/add-favorite-track-button"
import AlbumMenuButton from "@/features/menu/album-menu-button"
import TrackMenuButton from "@/features/menu/track-menu-button"
import PlayButton from "@/features/player/play-button"
import PlayTrackButton from "@/features/player/play-track-button"
import TrackWrapper from "@/features/player/track-wrapper"
import ArtistNameLinks from "@/entities/artist/artist-name-links"
import { Skeleton } from "@/shared/components/ui/skeleton"
import {
  cn,
  formatAlbumType,
  formatReleaseDate,
  formatTimeDuration,
  getImageUrl,
} from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

interface DiscographyListEntityProps {
  album: SimplifiedAlbumObject
}

function DiscographyListEntity({ album }: DiscographyListEntityProps) {
  const albumType = formatAlbumType(album.album_type)
  const releaseDate = formatReleaseDate(album.release_date)
  const imageUrl = getImageUrl(album.images)

  return (
    <div className="flex flex-col">
      <div className="flex gap-7 p-8">
        <div className="size-[140px] rounded bg-accent shadow-image-lg">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              width={280}
              height={280}
              className="size-full rounded object-cover object-center"
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <Link href={`/`} className="text-[2rem] font-bold">
              {album.name}
            </Link>
            <p className="text-sm font-medium text-tertiary [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
              <span>{albumType}</span>
              <span>{releaseDate}</span>
              <span>
                {album.total_tracks} {album.total_tracks > 1 ? "songs" : "song"}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <PlayButton className="size-9" iconClassName="size-5" />
            <AddFavoriteAlbumButton className="size-7" />
            <AlbumMenuButton className="size-7" />
          </div>
        </div>
      </div>
      <div className="px-6">
        <AlbumTracks albumId={album.id} totalTracks={album.total_tracks} />
      </div>
    </div>
  )
}

interface AlbumTracksProps {
  albumId: string
  totalTracks: number
  isSticky?: boolean
}

function AlbumTracks({ albumId, totalTracks, isSticky }: AlbumTracksProps) {
  const { data } = trpc.albumRouter.getAlbumTracks.useInfiniteQuery(
    { albumId },
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    }
  )

  return (
    <div className="">
      <div
        className={cn(
          "mb-2 grid h-10 grid-cols-[16px_minmax(120px,4fr)_minmax(120px,1fr)] gap-4 border-b px-4 text-sm font-medium leading-none text-secondary",
          isSticky && "sticky top-16"
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
          ? data.pages.map((page, i) =>
              page?.albumTracks.map((track, j) => (
                <TrackWrapper
                  key={track.id}
                  trackId={track.id}
                  className="group text-sm font-medium text-tertiary hover:text-secondary"
                >
                  <li className="grid h-14 grid-cols-[16px_minmax(120px,4fr)_minmax(120px,1fr)] items-center gap-4 px-4">
                    <div className="flex items-center justify-self-end">
                      <div className="relative inline-block size-4">
                        <span
                          className={cn(
                            "absolute right-1 text-base tabular-nums leading-none text-tertiary group-hover:invisible group-aria-[selected=true]:invisible"
                            // playingTrackId === track.id && "text-pink"
                          )}
                        >
                          {i * 20 + j + 1}
                        </span>
                        <PlayTrackButton
                          trackId={track.id}
                          className="invisible absolute rounded text-primary group-hover:visible group-aria-[selected=true]:visible"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Link
                          href={`/track/${track.id}`}
                          className={cn(
                            "line-clamp-1 text-base font-bold leading-tight text-primary outline-none hover:underline focus-visible:underline focus-visible:decoration-ring"
                            // playingTrackId === track.id && "text-pink"
                          )}
                        >
                          {track.name}
                        </Link>
                        <p className="line-clamp-1">
                          <ArtistNameLinks artists={track.artists} />
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 justify-self-end">
                      <AddFavoriteTrackButton className="invisible rounded-full hover:text-primary group-hover:visible group-aria-[selected=true]:visible" />
                      <div className="flex w-[5ch] items-center justify-end">
                        <span>{formatTimeDuration(track.duration_ms)}</span>
                      </div>
                      <TrackMenuButton
                        iconClassName="size-5"
                        className="invisible size-5 rounded-full text-primary group-hover:visible group-aria-[selected=true]:visible"
                      />
                    </div>
                  </li>
                </TrackWrapper>
              ))
            )
          : Array(totalTracks)
              .fill(0)
              .map((_, i) => (
                <li
                  key={i}
                  className="grid h-14 grid-cols-[16px_minmax(120px,4fr)_minmax(120px,1fr)] items-center gap-4 px-4"
                >
                  <div className="flex items-center justify-self-end">
                    <div className="relative inline-block size-4">
                      <span className="absolute right-1 text-base tabular-nums leading-none text-tertiary">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-self-end">
                    <Skeleton className="mr-9 h-5 w-[5ch]" />
                  </div>
                </li>
              ))}
      </div>
    </div>
  )
}

export default DiscographyListEntity
