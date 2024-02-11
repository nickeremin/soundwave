import React from "react"
import { HTMLMotionProps, motion } from "framer-motion"

import { LucideIcon } from "@/shared/components/icons"
import { cn } from "@/shared/lib/utils"

function PlayTrackButton({ className, ...props }: HTMLMotionProps<"button">) {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 1,
      }}
      className={cn(
        "relative inline-flex size-14 items-center justify-center rounded-full bg-blue",
        className
      )}
      {...props}
    >
      <LucideIcon name="Play" fill="currentColor" className="ml-1 size-6" />
    </motion.button>

    // <motion.button>

    // </motion.button>
  )
}

export default PlayTrackButton
