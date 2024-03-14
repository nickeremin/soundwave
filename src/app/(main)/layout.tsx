"use client"

import { stat } from "fs"
import React from "react"
import { useBoundStore, useLayoutStore } from "@/providers/bound-store-provider"

import MainNav from "@/widgets/layout/main-nav"
import UserLibrary from "@/widgets/layout/user-library"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { useColumnsCount } from "@/shared/lib/hooks/use-columns-count"

const REMAIN_HEIGHT = 8 * 2

interface MainLayoutProps {
  children?: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  const isLibraryCollapsed = useLayoutStore((state) => state.isLibraryCollapsed)
  const columns = useLayoutStore((state) => state.columnsCount)

  const mainContainerRef = React.useRef(null)
  console.log({ mainContainerRef })
  useColumnsCount(mainContainerRef)

  const isVisible = columns > 0

  return (
    <div
      style={{
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      <div className="relative grid h-screen grid-cols-[auto_1fr] gap-2 overflow-hidden p-2">
        <aside
          style={{ width: isLibraryCollapsed ? "72px" : "280px" }}
          className="flex flex-col gap-2"
        >
          <MainNav />
          <UserLibrary />
        </aside>
        <div className="overflow-hidden bg-background-100">
          <ScrollArea
            style={{ height: `calc(100vh - ${REMAIN_HEIGHT}px)` }}
            ref={mainContainerRef}
            className="rounded-lg"
          >
            {children}
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
