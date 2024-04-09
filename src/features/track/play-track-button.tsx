"use client"

import React from "react"
import { PlayIcon } from "lucide-react"

import { type SimplifiedTrackObject } from "@/shared/types/track"
import { Button } from "@/shared/components/ui/button"
import { Tooltip } from "@/shared/components/ui/tooltip"
import { cn } from "@/shared/lib/utils"

import { usePlayerContext } from "../player/player-context-provider"

interface PlayTrackButtonProps {
  track: SimplifiedTrackObject
  className?: string
}

function PlayTrackButton({ track, className }: PlayTrackButtonProps) {
  const { setPlayingTrackId } = usePlayerContext()

  return (
    <Tooltip
      content={`Play ${track.name} by ${track.artists.map((artist) => artist.name).join(", ")}`}
    >
      <Button
        variant="none"
        size="none"
        onClick={(e) => {
          e.stopPropagation()
          setPlayingTrackId(track.id)
        }}
        className={cn(
          "relative inline-flex size-10 cursor-default items-center justify-center rounded outline-none",
          className
        )}
      >
        <PlayIcon
          fill="currentColor"
          className="relative z-10 size-5 text-primary"
        />
      </Button>
    </Tooltip>
  )
}

export default PlayTrackButton
