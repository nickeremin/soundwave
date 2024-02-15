import React from "react"

import { Skeleton } from "@/shared/components/ui/skeleton"

function TrackArtistLinkCardLoading() {
  return (
    <div className="flex w-full items-center gap-4 p-2 lg:max-w-md">
      <div className="relative size-20 overflow-hidden rounded-full bg-muted shadow-image-lg">
        <Skeleton className="size-full object-cover object-center" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-32" />
      </div>
    </div>
  )
}

export default TrackArtistLinkCardLoading
