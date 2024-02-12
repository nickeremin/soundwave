import React from "react"
import Image from "next/image"
import Link from "next/link"
import { TRPCClientErrorLike } from "@trpc/client"
import { UseTRPCQueryResult } from "@trpc/react-query/shared"

import { Skeleton } from "@/shared/components/ui/skeleton"
import { getImageUrl } from "@/shared/lib/utils"
import { AppRouter, AppRouterOutput } from "@/app/_trpc/app"

function ArtistTrackCard({
  data,
}: UseTRPCQueryResult<
  AppRouterOutput["artistRouter"]["getArtistWithAlbums"],
  TRPCClientErrorLike<AppRouter>
>) {
  if (!data) {
    return (
      <div className="flex w-full items-center gap-4 p-2 lg:max-w-md">
        <Skeleton className="size-20 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    )
  }

  const artistImageUrl = getImageUrl(data.artist.images)

  return (
    <Link href="/" key={data.artist.id}>
      <div className="flex w-full items-center gap-4 rounded-md p-2 transition hover:bg-accent">
        <div className="relative size-20 overflow-hidden rounded-full shadow-image">
          <Image
            src={artistImageUrl}
            width={160}
            height={160}
            alt=""
            className="object-cover"
          />
        </div>
        <div className="flex flex-col font-medium">
          <p className="text-sm">Artist</p>
          <p>{data.artist.name}</p>
        </div>
      </div>
    </Link>
  )
}

export default ArtistTrackCard
