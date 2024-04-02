import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { HeartIcon } from "lucide-react"

import { type SimplifiedAlbumObject } from "@/shared/types/album"
import { Tooltip } from "@/shared/components/ui/tooltip"
import { cn } from "@/shared/lib/utils"

interface AddFavoriteAlbumButtonProps extends HTMLMotionProps<"button"> {
  album: SimplifiedAlbumObject
  size?: "sm" | "lg"
}

function AddFavoriteAlbumButton({
  className,
  size = "lg",
  ...props
}: AddFavoriteAlbumButtonProps) {
  return (
    <Tooltip content={"Save to Your Library"}>
      <div
        className={cn(
          "relative",
          size == "sm" && "size-5",
          size == "lg" && "size-9"
        )}
      >
        <motion.button
          data-shadcnui-button
          transition={{
            duration: 0.15,
            easings: [0.4, 0, 0.2, 1],
          }}
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 1,
          }}
          onClick={(e) => {
            // e.stopPropagation()
          }}
          className={cn(
            "absolute inline-flex size-5 items-center justify-center rounded-full outline-none",
            size == "sm" && "size-5",
            size == "lg" && "size-9",
            className
          )}
          {...props}
        >
          <HeartIcon
            strokeWidth={size == "lg" ? 1.5 : 2}
            className={cn(
              "",
              size == "sm" && "size-5",
              size == "lg" && "size-9"
            )}
          />
        </motion.button>
      </div>
    </Tooltip>
  )
}

export default AddFavoriteAlbumButton
