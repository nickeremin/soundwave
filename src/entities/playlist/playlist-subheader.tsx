import React from "react"
import { ClockIcon } from "lucide-react"

import { cn } from "@/shared/lib/utils"

interface PlaylistSubheaderProps {
  withAlbum?: boolean
  withAddedDate?: boolean
}

const PlaylistSubheader = React.forwardRef<
  HTMLDivElement,
  PlaylistSubheaderProps
>(function ({ withAlbum, withAddedDate }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "sticky top-16 z-40 mb-2 grid h-10 grid-cols-[16px_minmax(120px,4fr)_minmax(120px,1fr)] gap-4 border-b px-4 text-sm font-semibold leading-none text-secondary",
        withAlbum &&
          withAddedDate &&
          "grid-cols-[16px_minmax(120px,6fr)_minmax(120px,3fr)_minmax(120px,2fr)_minmax(120px,1fr)]"
      )}
    >
      <div className="flex items-center justify-self-end text-base">#</div>
      <div className="flex items-center">Title</div>
      {withAlbum && <div className="flex items-center">Album</div>}
      {withAddedDate && <div className="flex items-center">Date added</div>}
      <div className="flex items-center justify-self-end">
        <span className="mr-9">
          <ClockIcon className="size-[18px]" />
        </span>
      </div>
    </div>
  )
})
PlaylistSubheader.displayName = "PlaylistSubheader"

export default PlaylistSubheader
