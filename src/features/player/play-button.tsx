"use client"

import React from "react"
import { HTMLMotionProps, motion } from "framer-motion"
import { PlayIcon } from "lucide-react"

import { LucideIcon } from "@/shared/components/icons"
import { cn } from "@/shared/lib/utils"

function PlayButton({ className, ...props }: HTMLMotionProps<"button">) {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 1,
      }}
      className={cn(
        "relative inline-flex size-12 items-center justify-center rounded-full bg-pink",
        className
      )}
      {...props}
    >
      <PlayIcon
        fill="currentColor"
        className="size-6 translate-x-0.5 text-black"
      />
    </motion.button>
  )
}

export default PlayButton
