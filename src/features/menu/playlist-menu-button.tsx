"use client"

import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

import { useEditPlaylistDetailsContext } from "@/widgets/providers/edit-playlist-details-provider"
import { LucideIcon } from "@/shared/components/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { cn } from "@/shared/lib/utils"

function PlaylistMenuButton({
  className,
  ...props
}: HTMLMotionProps<"button">) {
  // const { toggleOpen } = useEditPlaylistDetailsContext()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          className={cn(
            "relative inline-flex size-10 items-center justify-center rounded-full",
            className
          )}
          {...props}
        >
          <LucideIcon name="MoreHorizontal" className="size-8 transition" />
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-1">
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PlaylistMenuButton
