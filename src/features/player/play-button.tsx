"use client"

import React from "react"
import { HTMLMotionProps, motion } from "framer-motion"
import { PlayIcon } from "lucide-react"

import { Tooltip } from "@/shared/components/ui/tooltip"
import { cn } from "@/shared/lib/utils"

interface PlayButtonProps extends HTMLMotionProps<"button"> {
  iconClassName?: string
}

function PlayButton({ iconClassName, className, ...props }: PlayButtonProps) {
  return (
    <Tooltip content={"Play"}>
      <div className="relative size-14">
        <motion.button
          data-shadcnui-button
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 1,
          }}
          className={cn(
            "absolute inline-flex size-14 items-center justify-center rounded-full bg-pink outline-none",
            className
          )}
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
