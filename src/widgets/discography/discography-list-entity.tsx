"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ClockIcon } from "lucide-react"
import { useInView } from "react-intersection-observer"

import { type SimplifiedAlbumObject } from "@/shared/types/album"
import AddFavoriteAlbumButton from "@/features/album/add-favorite-album-button"
import AlbumMenuButton from "@/features/album/album-menu-button"
import PlayButton from "@/features/player/play-button"
import UnorderedTrackEnityLoading from "@/entities/track/unordered-track-enity-loading"
import {
  formatAlbumType,
  formatReleaseDate,
  getImageUrl,
} from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

import OrderedTrackEntity from "../track/ordered-track-entity"

interface DiscographyListEntityProps {
  album: SimplifiedAlbumObject
}

function DiscographyListEntity({ album }: DiscographyListEntityProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.albumRouter.getAlbumTracks.useInfiniteQuery(
      { albumId: album.id },
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
            <AddFavoriteAlbumButton className="size-7" album={album} />
            <AlbumMenuButton className="size-7" album={album} />
          </div>
        </div>
      </div>
      <div className="px-6">
        <div className="mb-2 grid h-10 grid-cols-[16px_minmax(120px,4fr)_minmax(120px,1fr)] gap-4 border-b px-4 text-sm font-medium leading-none text-secondary">
          <div className="flex items-center justify-self-end text-base">#</div>
          <div className="flex items-center">Title</div>
          <div className="flex items-center justify-self-end">
            <span className="mr-9">
              <ClockIcon className="size-[18px]" />
            </span>
          </div>
        </div>
        {data
          ? data.pages.map((page) =>
              page?.albumTracks.map((track) => (
                <OrderedTrackEntity key={track.id} track={track} />
              ))
            )
          : Array(album.total_tracks)
              .fill(0)
              .map((_, i) => <UnorderedTrackEnityLoading key={i} />)}
        {/* Fetch next tracks when reach end of the list */}
        <div ref={ref} />
      </div>
    </div>
  )
}

export default DiscographyListEntity
