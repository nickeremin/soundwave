"use client"

import { stat } from "fs"
import React from "react"
import useResizeObserver from "@react-hook/resize-observer"

import { LayoutContext } from "@/widgets/layout/layout-context"
import MainNav from "@/widgets/layout/main-nav"
import UserLibrary from "@/widgets/layout/user-library"
import { Button } from "@/shared/components/ui/button"
import { useColumnsCount } from "@/shared/lib/hooks/use-columns-count"
import { useLayoutStore } from "@/shared/stores/layout-store"

interface MainLayoutProps {
  children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  // const [columns, setColumns] = React.useState(0)

  // const layoutRef = React.useRef<{
  //   leftBarWidth: number | undefined
  //   mainContainerWidth: number | undefined
  // }>({
  //   leftBarWidth: undefined,
  //   mainContainerWidth: undefined,
  // })
  // const leftBarRef = React.useRef<HTMLElement | null>(null)
  // const mainContainerRef = React.useRef<HTMLDivElement | null>(null)

  // function setColumnsCount(width: number) {
  //   if (width < 512) setColumns(2)
  //   if (width >= 512 && width < 768) setColumns(3)
  //   if (width >= 768 && width < 1024) setColumns(4)
  //   if (width >= 1024 && width < 1280) setColumns(5)
  //   if (width >= 1280 && width < 1400) setColumns(6)
  //   if (width >= 1400) setColumns(7)
  // }

  // function initializeLayout() {
  //   if (!leftBarRef.current || !mainContainerRef.current) return
  //   layoutRef.current.leftBarWidth = leftBarRef.current.offsetWidth
  //   layoutRef.current.mainContainerWidth = mainContainerRef.current.offsetWidth
  //   setColumnsCount(layoutRef.current.mainContainerWidth)
  // }

  // React.useEffect(() => {
  //   initializeLayout()

  //   const handleResize = () => {
  //     if (!leftBarRef.current || !mainContainerRef.current) return

  //     layoutRef.current.leftBarWidth = leftBarRef.current.offsetWidth
  //     layoutRef.current.mainContainerWidth =
  //       mainContainerRef.current.offsetWidth
  //     setColumnsCount(layoutRef.current.mainContainerWidth)
  //   }

  //   window.addEventListener("resize", handleResize)

  //   return () => window.removeEventListener("resize", handleResize)
  // }, [])

  const isCollapsed = useLayoutStore((state) => state.isCollapsed)

  const mainContainerRef = React.useRef(null)
  useColumnsCount(mainContainerRef)

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
        <div ref={mainContainerRef} className="bg-blue/50">
          {/* <MainContent /> */}
        </div>
      </div>
    </div>
  )
}

export default MainLayout
