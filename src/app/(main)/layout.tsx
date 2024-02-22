"use client"

import React from "react"

import { MainNav } from "@/widgets/layout"
import { LayoutContext } from "@/widgets/layout/layout-context"
import { ScrollArea } from "@/shared/components/ui/scroll-area"

interface MainLayoutProps {
  children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  const [columns, setColumns] = React.useState(0)

  const layoutRef = React.useRef<{
    leftBarWidth: number | undefined
    mainContainerWidth: number | undefined
  }>({
    leftBarWidth: undefined,
    mainContainerWidth: undefined,
  })
  const leftBarRef = React.useRef<HTMLElement | null>(null)
  const mainContainerRef = React.useRef<HTMLDivElement | null>(null)

  function setColumnsCount(width: number) {
    if (width < 512) setColumns(2)
    if (width >= 512 && width < 768) setColumns(3)
    if (width >= 768 && width < 1024) setColumns(4)
    if (width >= 1024 && width < 1280) setColumns(5)
    if (width >= 1280 && width < 1400) setColumns(6)
    if (width >= 1400) setColumns(7)
  }

  function initializeLayout() {
    if (!leftBarRef.current || !mainContainerRef.current) return
    layoutRef.current.leftBarWidth = leftBarRef.current.offsetWidth
    layoutRef.current.mainContainerWidth = mainContainerRef.current.offsetWidth
    setColumnsCount(layoutRef.current.mainContainerWidth)
  }

  React.useEffect(() => {
    initializeLayout()

    const handleResize = () => {
      if (!leftBarRef.current || !mainContainerRef.current) return

      layoutRef.current.leftBarWidth = leftBarRef.current.offsetWidth
      layoutRef.current.mainContainerWidth =
        mainContainerRef.current.offsetWidth
      setColumnsCount(layoutRef.current.mainContainerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <LayoutContext.Provider value={{ columns }}>
      <div className="relative grid h-screen grid-cols-[auto_1fr] gap-2 p-2">
        <aside ref={leftBarRef} className="flex w-[280px] flex-col gap-2">
          <MainNav />
        </aside>
        <ScrollArea
          ref={mainContainerRef}
          className="h-[calc(100vh-16px)] rounded-lg bg-background-100"
        >
          {children}
        </ScrollArea>
      </div>
    </LayoutContext.Provider>
  )
}

export default MainLayout
