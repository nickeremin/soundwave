"use client"

import React from "react"
import { HTMLMotionProps, motion } from "framer-motion"
import { PlayIcon } from "lucide-react"

import { LucideIcon } from "@/shared/components/icons"
import { cn } from "@/shared/lib/utils"

interface PlayButtonProps extends HTMLMotionProps<"button"> {
  iconClassName?: string
}

function PlayButton({ iconClassName, className, ...props }: PlayButtonProps) {
  return (
    <motion.button
      data-shadcnui-button
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 1,
      }}
      className={cn(
        "relative inline-flex size-12 items-center justify-center rounded-full bg-pink outline-none",
        className
      )}
      {...props}
    >
      <PlayIcon
        fill="currentColor"
        className={cn("size-6 translate-x-0.5 text-black", iconClassName)}
      />
    </motion.button>
  )
}

export default PlayButton
