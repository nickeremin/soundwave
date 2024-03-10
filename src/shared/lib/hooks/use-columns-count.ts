import React from "react"
import { useBoundStore } from "@/providers/bound-store-provider"
import useResizeObserver from "@react-hook/resize-observer"

export function useColumnsCount(target: React.RefObject<HTMLElement> | null) {
  const currentColumnsCount = useBoundStore((state) => state.columnsCount)
  const setCloumnsCount = useBoundStore((state) => state.setColumnsCount)

  React.useLayoutEffect(() => {
    if (target && target.current) {
      const { width } = target.current.getBoundingClientRect()
      const columnsCount = getColumnsCount(width)
      setCloumnsCount(columnsCount)
    }
  }, [target])

  useResizeObserver(target, (entry) => {
    const { width } = entry.target.getBoundingClientRect()
    const columnsCount = getColumnsCount(width)
    if (currentColumnsCount !== columnsCount) {
      setCloumnsCount(columnsCount)
    }
  })
}

function getColumnsCount(width: number) {
  if (width < 512) {
    return 2
  } else if (width >= 512 && width < 768) {
    return 3
  } else if (width >= 768 && width < 1024) {
    return 4
  } else if (width >= 1024 && width < 1280) {
    return 5
  } else if (width >= 1280 && width < 1400) {
    return 6
  } else {
    return 7
  }
}
