"use client"

import React from "react"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { SearchIcon } from "lucide-react"

import { Skeleton } from "@/shared/components/ui/skeleton"

function LibraryEnitityListLoading() {
  const isLibraryCollapsed = useLayoutStore((state) => state.isLibraryCollapsed)

  return (
    <div className="flex flex-col gap-2 px-2">
      {!isLibraryCollapsed && (
        <div className="px-2 pt-0.5">
          <div className="flex h-9 items-center">
            <span className="inline-flex size-8 items-center justify-center rounded-full">
              <SearchIcon className="size-5 text-tertiary" />
            </span>
          </div>
        </div>
      )}

      <ul className="flex flex-col">
        {Array(5)
          .fill(0)
          .map((_, i) =>
            isLibraryCollapsed ? (
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
        {Array(3)
          .fill(0)
          .map((_, i) =>
            isLibraryCollapsed ? (
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
    </div>
  )
}

export default LibraryEnitityListLoading
