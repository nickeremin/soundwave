import React from "react"

import { LucideIcon } from "@/shared/components/icons"

function SearchTrackSubheader() {
  return (
    <div className="flex h-10 w-full items-center border-y bg-muted px-6">
      <div className="grid w-full grid-cols-[16px_minmax(120px,4fr)_minmax(120px,2fr)_minmax(120px,1fr)] gap-4 px-4 text-sm font-medium leading-tight text-secondary">
        <div className="flex items-center justify-self-end text-base">#</div>
        <div className="flex items-center">Title</div>
        <div className="flex items-center">Album</div>
        <div className="flex items-center justify-self-end">
          <span className="mr-9">
            <LucideIcon name="Clock" className="size-[18px]" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default SearchTrackSubheader
