"use client"

import React from "react"

import { MainNav } from "@/widgets/layout"
import {
  LayoutContext,
  LayoutContextData,
} from "@/widgets/layout/layout-context"
import { ScrollArea } from "@/shared/components/ui/scroll-area"

interface MainLayoutProps {
  children: React.ReactNode
}

function PublicLayout({ children }: MainLayoutProps) {
  const layoutRef = React.useRef<LayoutContextData>({
    leftBarWidth: undefined,
    mainContainerWidth: undefined,
  })
  const leftBarRef = React.useRef<HTMLElement | null>(null)
  const mainContainerRef = React.useRef<HTMLDivElement | null>(null)

  function initializeLayout() {
    if (!leftBarRef.current || !mainContainerRef.current) return

    layoutRef.current.leftBarWidth = leftBarRef.current.offsetWidth
    layoutRef.current.mainContainerWidth = mainContainerRef.current.offsetWidth
  }

  React.useEffect(() => {
    initializeLayout()

    const handleResize = () => {
      if (!leftBarRef.current || !mainContainerRef.current) return

      layoutRef.current.leftBarWidth = leftBarRef.current.offsetWidth
      layoutRef.current.mainContainerWidth =
        mainContainerRef.current.offsetWidth
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <LayoutContext.Provider value={layoutRef}>
      <div className="relative grid h-screen grid-cols-[auto_1fr] gap-2 p-2">
        <aside ref={leftBarRef} className="flex w-[280px] flex-col gap-2">
          <MainNav />
        </aside>
        <ScrollArea
          ref={mainContainerRef}
          className="h-[calc(100vh-16px)] rounded-lg bg-background-100"
        >
          {children}
          {/* <MainHeader />
        <main className="relative flex flex-col px-6">
          <div className="relative flex flex-col">{children}</div>
        </main> */}
        </ScrollArea>
      </div>
    </LayoutContext.Provider>
  )
}

export default PublicLayout
