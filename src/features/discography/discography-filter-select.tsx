"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"

import { type DiscographyFilterType } from "@/shared/types/artist"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { discographyFilters } from "@/shared/constants/artist"

import useDiscographyExistedFilters from "./use-discography-existed-filters"

interface DiscographyFilterSelectProps {
  artistId: string
}

function DiscographyFilterSelect({ artistId }: DiscographyFilterSelectProps) {
  const router = useRouter()
  const discographyFilterType = useParams().discographyFilterType as string
  const { existedFilters, isLoading } = useDiscographyExistedFilters(artistId)

  function setDiscographyFilterType(type: string) {
    router.push(`/artist/${artistId}/discography/${type}`)
  }

  if (
    isLoading ||
    !existedFilters[discographyFilterType as DiscographyFilterType]
  )
    return null

  return (
    <Select
      value={discographyFilterType}
      onValueChange={setDiscographyFilterType}
    >
      <SelectTrigger data-shadcnui-button className="h-8 px-2 font-bold">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="w-[180px]">
        <SelectGroup>
          {discographyFilters
            .filter((filter) => existedFilters[filter.type])
            .map((filter) => (
              <SelectItem key={filter.type} value={filter.type}>
                {filter.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default DiscographyFilterSelect
