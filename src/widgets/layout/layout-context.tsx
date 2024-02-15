import React from "react"

export type LayoutContextData = {
  leftBarWidth: number | undefined
  mainContainerWidth: number | undefined
}

export const LayoutContext =
  React.createContext<React.MutableRefObject<LayoutContextData> | null>(null)

export function useLayoutContext() {
  const context = React.useContext(LayoutContext)

  if (!context) {
    throw new Error("Use useLayoutContext inside LayoutContext boundary!")
  }

  return context
}
