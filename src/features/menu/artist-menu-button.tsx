import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

import { LucideIcon } from "@/shared/components/icons"
import { cn } from "@/shared/lib/utils"

function ArtistMenuButton({ className, ...props }: HTMLMotionProps<"button">) {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 1,
      }}
      className={cn(
        "relative inline-flex size-5 items-center justify-center rounded-full",
        className
      )}
      {...props}
    >
      <LucideIcon name="MoreHorizontal" className="size-full transition" />
    </motion.button>
  )
}

export default ArtistMenuButton
