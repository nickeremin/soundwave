"use client"

import {
  useBoundStore,
  useLibraryStore,
} from "@/providers/bound-store-provider"
import { XIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { libraryFilters } from "@/shared/constants/library"
import { cn } from "@/shared/lib/utils"

function LibraryFilters() {
  const currentFilter = useLibraryStore((state) => state.libraryFilter)
  const setLibraryFilter = useLibraryStore((state) => state.setLibraryFilter)

  return (
    <div className="flex h-12 items-center gap-2 px-4">
      {currentFilter ? (
        <Button
          variant="ghost"
          size="icon"
          className="bg-muted"
          onClick={() => {
            setLibraryFilter(undefined)
          }}
        >
          <XIcon strokeWidth={2} className="size-4" />
        </Button>
      ) : null}
      {libraryFilters
        .filter((filter) => {
          if (!currentFilter) return true
          else return currentFilter === filter.type
        })
        .map((filter) => (
          <Button
            key={filter.type}
            role="checkbox"
            aria-checked={currentFilter === filter.type}
            variant="none"
            size="none"
            className={cn(
              "h-8 rounded-full bg-muted px-3 text-[13px] font-medium hover:bg-accent",
              currentFilter === filter.type &&
                "bg-primary font-semibold text-gray-dark hover:bg-primary"
            )}
            onClick={() => {
              setLibraryFilter(filter.type)
            }}
          >
            {filter.name}
          </Button>
        ))}
    </div>
  )
}

export default LibraryFilters
