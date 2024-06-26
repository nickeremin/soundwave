"use client"

import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import {
  ListPlusIcon,
  MinusCircleIcon,
  MoreHorizontalIcon,
  PencilIcon,
} from "lucide-react"

import { type PlaylistObject } from "@/shared/types/playlist"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Tooltip } from "@/shared/components/ui/tooltip"
import { cn } from "@/shared/lib/utils"

interface PlaylistMenuButtonProps extends HTMLMotionProps<"button"> {
  playlist: PlaylistObject
}

function PlaylistMenuButton({
  playlist,
  className,
  ...props
}: PlaylistMenuButtonProps) {
  return (
    <DropdownMenu>
      <Tooltip content={`More options for ${playlist.name}`}>
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
              <ListPlusIcon className="size-5 text-secondary" />
            </span>
            Add to queue
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={() => {}} className="gap-3">
            <span>
              <PencilIcon className="size-5 text-secondary" />
            </span>
            Edit details
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-3">
            <span>
              <MinusCircleIcon className="size-5 text-secondary" />
            </span>
            Delete
          </DropdownMenuItem>
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PlaylistMenuButton

{
  /* <DropdownMenuContent align="start" className="p-1">
<ul className="flex flex-col">
  <DropdownMenuItem className="gap-3">
    <span>
      <LucideIcon
        name="ListPlus"
        strokeWidth={2}
        className="text-secondary"
      />
    </span>
    Add to queue
  </DropdownMenuItem>
  <DropdownMenuSeparator />

  <DropdownMenuItem onSelect={() => {}} className="gap-3">
    <span>
      <LucideIcon
        name="Pencil"
        strokeWidth={2}
        className="text-secondary"
      />
    </span>
    Edit details
  </DropdownMenuItem>

  <DropdownMenuItem className="gap-3">
    <span>
      <LucideIcon
        name="MinusCircle"
        strokeWidth={2}
        className="text-secondary"
      />
    </span>
    Delete
  </DropdownMenuItem>
</ul>
</DropdownMenuContent> */
}
