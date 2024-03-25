"use client"

import React from "react"
import { type FastAverageColorResult } from "fast-average-color"

const PageStoreContext = React.createContext<PageStore | null>(null)

interface PageContextProviderProps {
  children: React.ReactNode
}

function PageContextProvider({ children }: PageContextProviderProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [backgroundColor, setBackgroundColor] =
    React.useState<FastAverageColorResult | null>(null)

  return (
    <PageStoreContext.Provider
      value={{ isVisible, setIsVisible, backgroundColor, setBackgroundColor }}
    >
      <div
        style={{
          visibility: isVisible ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </PageStoreContext.Provider>
  )
}

export function usePageStore() {
  const pageStoreContext = React.useContext(PageStoreContext)

  if (!pageStoreContext) {
    throw new Error(`usePageStore must be use within PageStoreProvider`)
  }

  return pageStoreContext
}

type PageState = {
  isVisible: boolean
  backgroundColor: FastAverageColorResult | null
}

type PageActions = {
  setIsVisible: (isVisible: boolean) => void
  setBackgroundColor: (backgroundColor: FastAverageColorResult) => void
}

type PageStore = PageState & PageActions

export default PageContextProvider
