"use client"

import { stat } from "fs"
import React from "react"
import { useBoundStore } from "@/providers/bound-store-provider"

import MainNav from "@/widgets/layout/main-nav"
import UserLibrary from "@/widgets/layout/user-library"
import { Button } from "@/shared/components/ui/button"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { useColumnsCount } from "@/shared/lib/hooks/use-columns-count"

interface MainLayoutProps {
  children?: React.ReactNode
}

const REMAIN_HEIGHT = 8 * 2

function MainLayout({ children }: MainLayoutProps) {
  const isCollapsed = useBoundStore((state) => state.isCollapsed)
  const hasHydrated = useBoundStore((state) => state._hasHydrated)

  const mainContainerRef = React.useRef(null)
  useColumnsCount(mainContainerRef)

  if (!hasHydrated) return null

  return (
    <div>
      <div className="relative grid h-screen grid-cols-[auto_1fr] gap-2 overflow-hidden p-2">
        <aside
          style={{ width: isCollapsed ? "72px" : "280px" }}
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
