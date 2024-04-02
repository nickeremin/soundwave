"use client"

import React from "react"

import { type DiscographyFilterType } from "@/shared/types/artist"
import { Button } from "@/shared/components/ui/button"
import { discographyFilters } from "@/shared/constants/artist"
import { cn } from "@/shared/lib/utils"

import useDiscographyExistedFilters from "./use-discography-existed-filters"

interface DiscographyFiltersProps {
  discographyFilter: DiscographyFilterType
  setDiscographyFilter: React.Dispatch<
    React.SetStateAction<DiscographyFilterType>
  >
  artistId: string
}

function DiscographyFilters({
  artistId,
  discographyFilter,
  setDiscographyFilter,
}: DiscographyFiltersProps) {
  const { existedFilters, isLoading } = useDiscographyExistedFilters(artistId)

  return (
    <div className="flex h-10 items-center gap-2">
      {!isLoading &&
        discographyFilters
          .filter((filter) => existedFilters[filter.type])
          .map((filter) => (
            <Button
              key={filter.type}
              role="checkbox"
              aria-checked={discographyFilter === filter.type}
              variant="none"
              size="none"
              className={cn(
                "h-8 rounded-full bg-muted px-3 text-[13px] font-semibold hover:bg-accent",
                discographyFilter === filter.type &&
                  "bg-primary text-gray-dark hover:bg-primary"
              )}
              onClick={() => {
                setDiscographyFilter(filter.type)
              }}
            >
              {filter.name}
            </Button>
          ))}
    </div>
  )
}

export default DiscographyFilters
