"use client"

import React from "react"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { HeadphonesIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Tooltip } from "@/shared/components/ui/tooltip"

function LibraryToggleLayoutButton() {
  const isLibraryCollapsed = useLayoutStore((state) => state.isLibraryCollapsed)
  const toggleIsLibraryCollapsed = useLayoutStore(
    (state) => state.toggleIsLibraryCollapsed
  )

  return (
    <Tooltip
      content={
        isLibraryCollapsed ? "Expand Your Library" : "Collapse Your Library"
      }
      side={isLibraryCollapsed ? "right" : "top"}
    >
      <Button
        onClick={toggleIsLibraryCollapsed}
        variant="none"
        size="none"
        className="h-10 gap-3 rounded-full px-2 font-bold text-tertiary hover:text-primary"
      >
        <HeadphonesIcon className="size-6" />
        {!isLibraryCollapsed && "Your library"}
      </Button>
    </Tooltip>
  )
}

export default LibraryToggleLayoutButton
