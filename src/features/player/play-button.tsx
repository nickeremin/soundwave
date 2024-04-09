"use client"

import React from "react"
import { HTMLMotionProps, motion } from "framer-motion"
import { PlayIcon } from "lucide-react"

import { Tooltip } from "@/shared/components/ui/tooltip"
import { cn } from "@/shared/lib/utils"

interface PlayButtonProps extends HTMLMotionProps<"button"> {
  iconClassName?: string
}

function PlayButton({ className, iconClassName, ...props }: PlayButtonProps) {
  return (
    <Tooltip content={"Play"}>
      <div className={cn("relative size-14 rounded-full", className)}>
        <motion.button
          data-shadcnui-button
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 1,
          }}
          className="absolute inline-flex size-full items-center justify-center rounded-full bg-pink outline-none"
          {...props}
        >
          <PlayIcon
            fill="currentColor"
            className={cn("size-6 translate-x-0.5 text-black", iconClassName)}
          />
        </motion.button>
      </div>
    </Tooltip>
  )
}

export default PlayButton
