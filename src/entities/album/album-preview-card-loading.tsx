import React from "react"

import { Skeleton } from "@/shared/components/ui/skeleton"

function AlbumPreviewCardLoading() {
  return (
    <div className="flex flex-col gap-6 rounded-lg bg-muted p-4 pb-8 transition hover:bg-accent">
      <div className="relative w-full overflow-hidden rounded-md bg-muted pb-[100%] shadow-image-sm">
        <Skeleton className="absolute size-full object-cover object-center" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
}

export default AlbumPreviewCardLoading
