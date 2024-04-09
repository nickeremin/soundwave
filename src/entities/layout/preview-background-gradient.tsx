"use client"

import React from "react"
import { usePageStore } from "@/providers/page-context-provider"
import chroma from "chroma-js"

import { cn } from "@/shared/lib/utils"

interface PreviewBackgroundGradientProps {
  order: 1 | 2
  className?: string
}

function PreviewBackgroundGradient({
  order,
  className,
}: PreviewBackgroundGradientProps) {
  const { backgroundColor } = usePageStore()

  return (
    <div
      style={{
        backgroundColor: backgroundColor
          ? chroma(backgroundColor).hex()
          : "transparent",
      }}
      className={cn(
        "absolute bg-gradient-to-b",
        order == 1 && "inset-0 from-transparent to-black/50",
        order == 2 && "inset-x-0 h-[240px] from-black/60 to-background-100",
        className
      )}
    />
  )
}

export default PreviewBackgroundGradient
