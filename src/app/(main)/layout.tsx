"use client"

import React from "react"
import { useLayoutStore } from "@/providers/bound-store-provider"
import LibraryContextProvider from "@/providers/library-context-provider"

import MainNav from "@/widgets/layout/main-nav"
import UserLibrary from "@/widgets/library/user-library"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { useColumnsCount } from "@/shared/lib/hooks/use-columns-count"

const REMAIN_HEIGHT = 8 * 2

interface MainLayoutProps {
  children?: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  const isLibraryCollapsed = useLayoutStore((state) => state.isLibraryCollapsed)
  const columns = useLayoutStore((state) => state.columnsCount)
  const setMainContainerRef = useLayoutStore(
    (state) => state.setMainContainerRef
  )

  const mainContainerRef = React.useRef<HTMLDivElement | null>(null)
  useColumnsCount(mainContainerRef)

  const isVisible = columns > 0

  React.useEffect(() => {
    setMainContainerRef(mainContainerRef)
  }, [mainContainerRef])

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
          <LibraryContextProvider>
            <UserLibrary />
          </LibraryContextProvider>
        </aside>
        <div className="overflow-hidden rounded-lg bg-background-100">
          <ScrollArea
            style={{ height: `calc(100vh - ${REMAIN_HEIGHT}px)` }}
            ref={mainContainerRef}
          >
            {children}
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
