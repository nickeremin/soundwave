import React from "react"

import { useLayoutContext } from "@/widgets/layout/layout-context"

export function useGridColumns() {
  const [columns, setColumns] = React.useState<number>(0)
  const layoutRef = useLayoutContext()

  function setColumnsCount(width: number) {
    if (width < 512) setColumns(2)
    if (width >= 512 && width < 768) setColumns(3)
    if (width >= 768 && width < 1024) setColumns(4)
    if (width >= 1024 && width < 1280) setColumns(5)
    if (width >= 1280 && width < 1400) setColumns(6)
    if (width >= 1400) setColumns(7)
  }

  function initializeColumnsCount() {
    if (layoutRef.current.mainContainerWidth === undefined) return
    setColumnsCount(layoutRef.current.mainContainerWidth)
  }

  React.useEffect(() => {
    initializeColumnsCount()

    const handleResize = () => {
      if (layoutRef.current.mainContainerWidth === undefined) return
      setColumnsCount(layoutRef.current.mainContainerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return columns
}
