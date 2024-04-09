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
      aria-selected={activeTrackId === trackId}
      onClick={() => setActiveTrackId(trackId)}
      className={cn(
        "rounded hover:bg-accent aria-[selected=true]:bg-focus aria-[selected=true]:text-primary",
        className
      )}
    >
      {children}
    </div>
  )
}

export default TrackWrapper
