"use client"

import React from "react"

import { cn } from "@/shared/lib/utils"

import { usePlayerContext } from "./player-context-provider"

interface TrackWrapperProps {
  trackId: string
  className?: string
  children: React.ReactNode
}

function TrackWrapper({ trackId, className, children }: TrackWrapperProps) {
  const { activeTrackId, setActiveTrackId } = usePlayerContext()

  return (
    <div
      onClick={() => setActiveTrackId(trackId)}
      className={cn(
        "cursor-pointer rounded transition hover:bg-accent",
        activeTrackId === trackId && "bg-focus hover:bg-focus",
        className
      )}
    >
      {children}
    </div>
  )
}

export default TrackWrapper
