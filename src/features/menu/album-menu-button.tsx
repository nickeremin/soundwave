"use client"

import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import {
  HeartIcon,
  ListPlusIcon,
  MoreHorizontalIcon,
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

function AlbumMenuButton({ className, ...props }: HTMLMotionProps<"button">) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          // whileHover={{
          //   scale: 1.1,
          // }}
          // whileTap={{
          //   scale: 1,
          // }}
          className={cn(
            "relative inline-flex size-10 items-center justify-center rounded-full",
            className
          )}
          {...props}
        >
          <MoreHorizontalIcon className="size-8 transition" />
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
          <DropdownMenuItem className="gap-3">
            <span>
              <HeartIcon strokeWidth={2} className="size-5 text-secondary" />
            </span>
            Add to Your library
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-3">
            <span>
              <ListPlusIcon strokeWidth={2} className="size-5 text-secondary" />
            </span>
            Add to queue
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="gap-3">
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

export default AlbumMenuButton
