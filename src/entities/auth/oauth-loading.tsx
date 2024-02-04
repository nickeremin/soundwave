import React from "react"

import { Skeleton } from "@/shared/components/ui/skeleton"

function OAuthLoading() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-14 rounded-2xl" />
      <Skeleton className="h-14 rounded-2xl" />
      <Skeleton className="h-14 rounded-2xl" />
    </div>
  )
}

export default OAuthLoading
