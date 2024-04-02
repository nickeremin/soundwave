"use client"

import React from "react"
import { HTMLMotionProps, motion } from "framer-motion"
import { PlayIcon } from "lucide-react"

import { cn } from "@/shared/lib/utils"

import { usePlayerContext } from "./player-context-provider"

interface PlayTrackButtonProps extends HTMLMotionProps<"button"> {
  trackId: string
}

function PlayTrackButton({
  trackId,
  className,
  ...props
}: PlayTrackButtonProps) {
  const { setPlayingTrackId } = usePlayerContext()

  return (
    <motion.button
      data-shadcnui-button
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 1,
      }}
      onClick={(e) => {
        e.stopPropagation()
        setPlayingTrackId(trackId)
      }}
      className={cn(
        "relative inline-flex size-4 items-center justify-center outline-none",
        className
      )}
      {...props}
    >
      <PlayIcon fill="currentColor" className="size-full -translate-y-px" />
    </motion.button>
  )
}

export default PlayTrackButton
