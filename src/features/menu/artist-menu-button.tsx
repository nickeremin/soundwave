import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

import { LucideIcon } from "@/shared/components/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { cn } from "@/shared/lib/utils"

function ArtistMenuButton({ className, ...props }: HTMLMotionProps<"button">) {
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
          <LucideIcon name="MoreHorizontal" className="size-8 transition" />
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-1">
        <ul className="flex flex-col">
          <DropdownMenuItem className="gap-3">
            <span>
              <LucideIcon
                name="UserPlus"
                strokeWidth={2}
                className="text-secondary"
              />
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
              <LucideIcon
                name="Radio"
                strokeWidth={2}
                className="text-secondary"
              />
            </span>
            Go to artist radio
          </DropdownMenuItem>
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ArtistMenuButton
