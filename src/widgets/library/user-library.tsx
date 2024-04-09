"use client"

import React from "react"
import { useLayoutStore } from "@/providers/bound-store-provider"

import LibraryCreatePlaylistButton from "@/features/library/library-create-playlist-button"
import LibraryEntityList from "@/features/library/library-entity-list"
import LibraryFilters from "@/features/library/library-filters"
import LibraryToggleLayoutButton from "@/features/library/library-toggle-layout-button"
import { ScrollArea } from "@/shared/components/ui/scroll-area"

function UserLibrary() {
  const isLibraryCollapsed = useLayoutStore((state) => state.isLibraryCollapsed)

  // This height based on left menu layout for scroll area
  const REMAIN_HEIGHT = isLibraryCollapsed ? 240 : 288

  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null)
  const scrollBoundaryRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    function handleScroll() {
      if (!scrollAreaRef.current) return

      const scrollTop = scrollAreaRef.current.scrollTop

      if (scrollTop !== 0) {
        scrollBoundaryRef.current?.classList.add(
          "shadow-[0_6px_10px_rgba(0,0,0,.6)]"
        )
      } else {
        scrollBoundaryRef.current?.classList.remove(
          "shadow-[0_6px_10px_rgba(0,0,0,.6)]"
        )
      }
    }

    if (scrollAreaRef.current) {
      scrollAreaRef.current.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return (
    <div className="flex flex-1 flex-col rounded-lg bg-background-100">
      <div ref={scrollBoundaryRef} className="transition-shadow">
        <div className="flex items-center px-4 py-2">
          <div className="flex w-full items-center justify-between gap-2">
            <LibraryToggleLayoutButton />
            {!isLibraryCollapsed && <LibraryCreatePlaylistButton />}
          </div>
        </div>

        {!isLibraryCollapsed && <LibraryFilters />}
      </div>

      <div className="relative h-full">
        <ScrollArea
          ref={scrollAreaRef}
          style={{ height: `calc(100vh - ${REMAIN_HEIGHT}px)` }}
        >
          <LibraryEntityList />
        </ScrollArea>
      </div>
    </div>
  )
}

export default UserLibrary
