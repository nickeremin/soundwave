import React from "react"

import { Skeleton } from "@/shared/components/ui/skeleton"

function LibraryFiltersLoading() {
  return (
    <div className="flex h-12 items-center gap-2 px-4">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="h-8 w-[10ch] rounded-full" />
        ))}
    </div>
  )
}

export default LibraryFiltersLoading
