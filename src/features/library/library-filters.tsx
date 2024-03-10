"use client"

import { useBoundStore } from "@/providers/bound-store-provider"
import { FilterType } from "@/providers/stores/library-store"
import { XIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

type Filter = {
  name: string
  value: FilterType
}

const filterTypes: Filter[] = [
  {
    name: "Playlists",
    value: "playlists",
  },
  {
    name: "Artists",
    value: "artists",
  },
]

function LibraryFilters() {
  const activeFilter = useBoundStore((state) => state.filter)
  const setFilter = useBoundStore((state) => state.setFilter)

  return (
    <div className="flex h-12 items-center gap-2 px-4">
      {activeFilter ? (
        <Button
          variant="ghost"
          size="icon"
          className="bg-muted"
          onClick={() => {
            setFilter(undefined)
          }}
        >
          <XIcon strokeWidth={2} className="size-4" />
        </Button>
      ) : null}
      {filterTypes
        .filter((filter) => {
          if (!activeFilter) return true
          else return activeFilter === filter.value
        })
        .map((filter) => (
          <Button
            key={filter.value}
            role="checkbox"
            aria-checked={activeFilter === filter.value}
            variant="none"
            size="none"
            className={cn(
              "h-8 rounded-full bg-muted px-3 text-[13px] font-medium hover:bg-accent",
              activeFilter === filter.value &&
                "bg-primary font-semibold text-gray-dark hover:bg-primary"
            )}
            onClick={() => {
              setFilter(filter.value)
            }}
          >
            {filter.name}
          </Button>
        ))}
    </div>
  )
}

export default LibraryFilters
