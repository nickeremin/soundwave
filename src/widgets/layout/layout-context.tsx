"use client"

import React from "react"

export type LayoutContextData = {
  columns: number
}

export const LayoutContext = React.createContext<LayoutContextData | null>(null)

export function useLayoutContext() {
  const context = React.useContext(LayoutContext)

  if (!context) {
    throw new Error("Use useLayoutContext inside LayoutContext boundary!")
  }

  return context
}
