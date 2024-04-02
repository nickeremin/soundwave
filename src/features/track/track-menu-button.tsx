"use client"

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

import { type SimplifiedTrackObject } from "@/shared/types/track"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Tooltip } from "@/shared/components/ui/tooltip"
import { cn } from "@/shared/lib/utils"

import { usePlayerContext } from "../player/player-context-provider"

interface TrackMenuButtonProps extends HTMLMotionProps<"button"> {
  track: SimplifiedTrackObject
  size?: "sm" | "lg"
}

function TrackMenuButton({
  track,
  size = "sm",
  className,
  ...props
}: TrackMenuButtonProps) {
  const { setActiveTrackId } = usePlayerContext()

  return (
    <DropdownMenu
      onOpenChange={() => {
        setActiveTrackId(track.id)
      }}
    >
      <Tooltip
        content={`More options for ${track.name} by ${track.artists.map((artist) => artist.name).join(", ")}`}
      >
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              "relative",
              size == "sm" && "size-6",
              size == "lg" && "size-8"
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
              className={cn(
                "absolute inline-flex items-center justify-center rounded-full outline-none",
                size == "sm" && "size-6",
                size == "lg" && "size-8",
                className
              )}
              {...props}
            >
              <MoreHorizontalIcon
                strokeWidth={size == "lg" ? 1.5 : 2}
                className={cn(
                  "",
                  size == "sm" && "size-6",
                  size == "lg" && "size-8"
                )}
              />
            </motion.button>
          </div>
        </DropdownMenuTrigger>
      </Tooltip>

      <DropdownMenuContent align="start" className="p-1">
        <ul className="flex flex-col">
          <DropdownMenuItem className="gap-3">
            <PlusIcon className="size-5 text-secondary" />
            Add to playlist
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault()
            }}
            className="gap-3"
          >
            <HeartIcon className="size-5 text-secondary" />
            Save to your Liked songs
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="gap-3">
            <RadioIcon className="size-5 text-secondary" />
            Go to song radio
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-3">
            <MusicIcon className="size-5 text-secondary" />
            Go to artist
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-3">
            <DiscAlbumIcon className="size-5 text-secondary" />
            Go to album
          </DropdownMenuItem>
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TrackMenuButton
