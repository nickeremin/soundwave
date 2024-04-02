import React from "react"

import { Skeleton } from "@/shared/components/ui/skeleton"

interface OrderedTrackEntityLoading {
  withImage?: boolean
}

function OrderedTrackEntityLoading({ withImage }: OrderedTrackEntityLoading) {
  return (
    <div className="flex items-center gap-3 p-2">
      <Skeleton className="size-10" />
      <div className="flex flex-1 flex-col gap-1">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-4 w-8" />
    </div>
  )
}

export default OrderedTrackEntityLoading
