"use client"

import React from "react"
import { useBoundStore } from "@/providers/bound-store-provider"

import { Skeleton } from "@/shared/components/ui/skeleton"

function LibraryItemListLoading() {
  const isCollapsed = useBoundStore((state) => state.isCollapsed)

  return (
    <ul className="flex flex-col">
      {Array(3)
        .fill(0)
        .map((_, i) =>
          isCollapsed ? (
            <li key={i} className="flex h-16 items-center px-1">
              <Skeleton className="size-12" />
            </li>
          ) : (
            <li key={i} className="flex h-16 items-center gap-3 px-2">
              <Skeleton className="size-12" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-36" />
              </div>
            </li>
          )
        )}
      {Array(2)
        .fill(0)
        .map((_, i) =>
          isCollapsed ? (
            <li key={i} className="flex h-16 items-center px-1">
              <Skeleton className="size-12 rounded-full" />
            </li>
          ) : (
            <li key={i} className="flex h-16 items-center gap-3 px-2">
              <Skeleton className="size-12 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
            </li>
          )
        )}
    </ul>
  )
}

export default LibraryItemListLoading
