"use client"

import React from "react"
import { useLibraryStore } from "@/providers/bound-store-provider"

function LibrarySearchNotFound() {
  const librarySearch = useLibraryStore((state) => state.librarySearch)

  return (
    <div className="mt-12 flex flex-col p-4">
      <div className="flex flex-col justify-center gap-4 text-center">
        <p className="font-bold">Couldn't find "{librarySearch}"</p>
        <p className="text-[13px] font-medium text-secondary">
          Try searching again using a different spelling or keyword.
        </p>
      </div>
    </div>
  )
}

export default LibrarySearchNotFound
