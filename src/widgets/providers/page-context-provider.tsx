"use client"

import React from "react"
import { type FastAverageColorResult } from "fast-average-color"

import { cn } from "@/shared/lib/utils"

type PageContextData = {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  backgroundColor: FastAverageColorResult | undefined
  setBackgroundColor: React.Dispatch<
    React.SetStateAction<FastAverageColorResult | undefined>
  >
}

const PageContext = React.createContext<PageContextData | null>(null)

export function usePageContext() {
  const context = React.useContext(PageContext)

  if (!context) {
    throw new Error("Use usePageContext inside PageContext boundary!")
  }

  return context
}

interface PageContextProviderProps {
  children?: React.ReactNode
}

function PageContextProvider({ children }: PageContextProviderProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [backgroundColor, setBackgroundColor] = React.useState<
    FastAverageColorResult | undefined
  >(undefined)

  return (
    <PageContext.Provider
      value={{ isVisible, setIsVisible, backgroundColor, setBackgroundColor }}
    >
      <div className={cn("relative z-10", isVisible ? "visible" : "invisible")}>
        {children}
      </div>
    </PageContext.Provider>
  )
}

export default PageContextProvider
