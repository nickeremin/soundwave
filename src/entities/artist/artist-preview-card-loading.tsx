import React from "react"

import { Skeleton } from "@/shared/components/ui/skeleton"

function ArtistPreviewCardLoading() {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-muted p-4">
      <div className="relative w-full rounded-full pb-[100%] shadow-image-sm">
        <Skeleton className="absolute size-full rounded-full" />
      </div>
      <div className="flex min-h-16 flex-col gap-2">
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  )
}

export default ArtistPreviewCardLoading
