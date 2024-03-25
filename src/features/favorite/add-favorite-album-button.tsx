import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { HeartIcon } from "lucide-react"

import { LucideIcon } from "@/shared/components/icons"
import { cn } from "@/shared/lib/utils"

function AddFavoriteAlbumButton({
  className,
  ...props
}: HTMLMotionProps<"button">) {
  return (
    <motion.button
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
        "relative inline-flex size-9 items-center justify-center rounded-full",
        className
      )}
      {...props}
    >
      <HeartIcon className="size-full transition" />
    </motion.button>
  )
}

export default AddFavoriteAlbumButton
