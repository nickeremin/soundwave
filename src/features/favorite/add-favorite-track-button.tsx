import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { HeartIcon } from "lucide-react"

import { LucideIcon } from "@/shared/components/icons"
import { cn } from "@/shared/lib/utils"

interface AddFavoriteTrackButtonProps extends HTMLMotionProps<"button"> {
  iconClassName?: string
}

function AddFavoriteTrackButton({
  className,
  iconClassName,
  ...props
}: AddFavoriteTrackButtonProps) {
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
      }}
      className={cn(
        "relative inline-flex size-5 items-center justify-center rounded-full outline-none",
        className
      )}
      {...props}
    >
      <HeartIcon className={cn("size-full transition", iconClassName)} />
    </motion.button>
  )
}

export default AddFavoriteTrackButton
