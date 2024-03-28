import React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { MoreHorizontalIcon, RadioIcon, UserPlusIcon } from "lucide-react"

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
          <MoreHorizontalIcon className="size-8 transition" />
        </motion.button>
      </DropdownMenuTrigger>
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
