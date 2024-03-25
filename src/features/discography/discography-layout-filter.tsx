"use client"

import React from "react"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { LayoutGridIcon, ListIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

function DiscographyLayoutFilter() {
  const discographyLayout = useLayoutStore((state) => state.discographyLayout)
  const setDiscographyLayout = useLayoutStore(
    (state) => state.setDiscographyLayout
  )

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => {
          setDiscographyLayout("list")
        }}
        variant="ghost"
        size="icon"
        className={cn(
          "size-8 text-tertiary",
          discographyLayout === "list" && "bg-accent text-primary"
        )}
      >
        <ListIcon className="size-5" />
      </Button>
      <Button
        onClick={() => {
          setDiscographyLayout("grid")
        }}
        variant="ghost"
        size="icon"
        className={cn(
          "size-8 text-tertiary",
          discographyLayout === "grid" && "bg-accent text-primary"
        )}
      >
        <LayoutGridIcon className="size-[18px]" />
      </Button>
    </div>
  )
}

export default DiscographyLayoutFilter
