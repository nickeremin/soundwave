"use client"

import React from "react"

import { cn } from "@/shared/lib/utils"

type TrackProviderData = {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const TrackContext = React.createContext<TrackProviderData | null>(null)

export function useTrackContext() {
  const context = React.useContext(TrackContext)

  if (!context) {
    throw new Error(
      "Use useTrackProviderContext inside TrackProvider boundary!"
    )
  }

  return context
}

interface TrackProviderProps {
  children: React.ReactNode
}

function TrackContextProvider({ children }: TrackProviderProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <TrackContext.Provider value={{ isVisible, setIsVisible }}>
      <div className={cn("relative z-10", isVisible ? "visible" : "invisible")}>
        {children}
      </div>
    </TrackContext.Provider>
  )
}

export default TrackContextProvider
