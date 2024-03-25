import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import {
  DiscAlbumIcon,
  HeartIcon,
  MoreHorizontalIcon,
  MusicIcon,
  PlusIcon,
  RadioIcon,
} from "lucide-react"

import { LucideIcon } from "@/shared/components/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { cn } from "@/shared/lib/utils"

interface TrackMenuButtonProps extends HTMLMotionProps<"button"> {
  iconClassName?: string
}

function TrackMenuButton({
  className,
  iconClassName,
  ...props
}: TrackMenuButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          data-shadcnui-button
          // whileHover={{
          //   scale: 1.1,
          // }}
          // whileTap={{
          //   scale: 1,
          // }}
          className={cn(
            "relative inline-flex size-10 items-center justify-center rounded-full outline-none",
            className
          )}
          {...props}
        >
          <MoreHorizontalIcon
            className={cn("size-8 transition", iconClassName)}
          />
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-1">
        <ul className="flex flex-col">
          <DropdownMenuItem className="gap-3">
            <span>
              <PlusIcon strokeWidth={2} className="size-5 text-secondary" />
            </span>
            Add to playlist
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault()
            }}
            className="gap-3"
          >
            <span>
              <HeartIcon strokeWidth={2} className="size-5 text-secondary" />
            </span>
            Save to your Liked songs
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="gap-3">
            <span>
              <RadioIcon strokeWidth={2} className="size-5 text-secondary" />
            </span>
            Go to song radio
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-3">
            <span>
              <MusicIcon strokeWidth={2} className="size-5 text-secondary" />
            </span>
            Go to artist
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-3">
            <span>
              <DiscAlbumIcon
                strokeWidth={2}
                className="size-5 text-secondary"
              />
            </span>
            Go to album
          </DropdownMenuItem>
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TrackMenuButton
