"use client"

import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { HeartIcon } from "lucide-react"

import { type SimplifiedTrackObject } from "@/shared/types/track"
import { Tooltip } from "@/shared/components/ui/tooltip"
import { cn } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

interface AddFavoriteTrackButtonProps extends HTMLMotionProps<"button"> {
  track: SimplifiedTrackObject
  size?: "sm" | "lg"
}

function AddFavoriteTrackButton({
  track,
  size = "sm",
  className,
  ...props
}: AddFavoriteTrackButtonProps) {
  const [isPending, startTransition] = React.useTransition()
  const { mutateAsync: addTrackToFavorite } =
    trpc.trackRouter.addTrackToFavorite.useMutation()

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
          disabled={isPending}
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
          onClick={() => {
            startTransition(async () => {
              await addTrackToFavorite({
                trackId: track.id,
                trackDuration: track.duration_ms,
              })
            })
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

export default AddFavoriteTrackButton
