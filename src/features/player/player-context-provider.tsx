"use client"

import React from "react"

type PlayerContextData = {
  activeTrackId: string | null
  setActiveTrackId: React.Dispatch<React.SetStateAction<string | null>>
}

const PlayerContext = React.createContext<PlayerContextData | null>(null)

function usePlayerContext() {
  const context = React.useContext(PlayerContext)

  if (!context) {
    throw new Error("Use usePlayerContext inside PlayerContext boundary!")
  }

  return context
}

interface PlayerContextProviderProps {
  children: React.ReactNode
}

function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [activeTrackId, setActiveTrackId] = React.useState<string | null>(null)

  return (
    <PlayerContext.Provider value={{ activeTrackId, setActiveTrackId }}>
      {children}
    </PlayerContext.Provider>
  )
}

export { PlayerContextProvider, usePlayerContext }
