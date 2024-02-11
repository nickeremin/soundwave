import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

import { LucideIcon } from "@/shared/components/icons"
import { cn } from "@/shared/lib/utils"

function TrackMenuButton({ className, ...props }: HTMLMotionProps<"button">) {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 1,
      }}
      className={cn(
        "relative inline-flex size-12 items-center justify-center rounded-full",
        className
      )}
      {...props}
    >
      <LucideIcon name="MoreHorizontal" className="size-8 text-secondary" />
    </motion.button>
  )
}

export default TrackMenuButton
