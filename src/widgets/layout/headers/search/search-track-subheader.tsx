import React from "react"

import { LucideIcon } from "@/shared/components/icons"

function SearchTrackSubheader() {
  return (
    <div className="flex h-10 w-full items-center border-y bg-muted px-6">
      <div className="grid w-full grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 text-sm font-medium text-secondary">
        <p className="justify-self-end">#</p>
        <p>Title</p>
        <p>Album</p>
        <div className="justify-self-end">
          <div className="mr-8">
            <LucideIcon name="Clock" className="size-[18px] " />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchTrackSubheader
