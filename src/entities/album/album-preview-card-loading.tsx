import React from "react"

import { Skeleton } from "@/shared/components/ui/skeleton"

function AlbumPreviewCardLoading() {
  return (
    <div className="flex flex-col gap-4 rounded-lg  p-3">
      <div className="relative w-full rounded-md pb-[100%] shadow-image-sm">
        <Skeleton className="absolute size-full rounded-md" />
      </div>
      <div className="flex min-h-[72px] flex-col gap-2">
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
}

export default AlbumPreviewCardLoading
