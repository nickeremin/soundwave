import React from "react"

import { Skeleton } from "@/shared/components/ui/skeleton"

interface TrackListLoadingProps {
  limit: number
}

function TrackListLoading({ limit }: TrackListLoadingProps) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: limit }, (_, i) => i).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-2">
          <Skeleton className="size-10" />
          <div className="flex flex-1 flex-col gap-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-8" />
        </div>
      ))}
    </div>
  )
}

export default TrackListLoading
