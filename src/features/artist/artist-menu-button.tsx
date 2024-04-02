import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { MoreHorizontalIcon, RadioIcon, UserPlusIcon } from "lucide-react"

import { type SimplifiedArtistObject } from "@/shared/types/artist"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Tooltip } from "@/shared/components/ui/tooltip"
import { cn } from "@/shared/lib/utils"

interface ArtistMenuButtonProps extends HTMLMotionProps<"button"> {
  artist: SimplifiedArtistObject
}

function ArtistMenuButton({
  artist,
  className,
  ...props
}: ArtistMenuButtonProps) {
  return (
    <DropdownMenu>
      <Tooltip content={`More options for ${artist.name}`}>
        <DropdownMenuTrigger asChild>
          <div className="relative size-8">
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
              className={cn(
                "absolute inline-flex size-8 items-center justify-center rounded-full outline-none",

                className
              )}
              {...props}
            >
              <MoreHorizontalIcon strokeWidth={1.5} className="size-8" />
            </motion.button>
          </div>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent align="start" className="p-1">
        <ul className="flex flex-col">
          <DropdownMenuItem className="gap-3">
            <span>
              <UserPlusIcon className="size-5 text-secondary" />
            </span>
            Follow
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault()
            }}
            className="gap-3"
          >
            <span>
              <RadioIcon strokeWidth={2} className="size-5 text-secondary" />
            </span>
            Go to artist radio
          </DropdownMenuItem>
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ArtistMenuButton
