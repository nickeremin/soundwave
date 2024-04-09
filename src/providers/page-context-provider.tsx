"use client"

import React from "react"

const PageStoreContext = React.createContext<PageStore | null>(null)

const DEFAULT_BACKGROUND_COLOR = "#535353"

interface PageContextProviderProps {
  children: React.ReactNode
}

function PageContextProvider({ children }: PageContextProviderProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [backgroundColor, setBackgroundColor] = React.useState<string>(
    DEFAULT_BACKGROUND_COLOR
  )

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
  backgroundColor: string
}

type PageActions = {
  setIsVisible: (isVisible: boolean) => void
  setBackgroundColor: (backgroundColor: string) => void
}

type PageStore = PageState & PageActions

export default PageContextProvider
