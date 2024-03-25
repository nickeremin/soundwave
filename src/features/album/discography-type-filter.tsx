"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import { useDiscographyStore } from "@/providers/bound-store-provider"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"

function DiscographyTypeFilter() {
  const router = useRouter()
  const artistId = useParams().artistId as string
  const discographyType = useParams().type as string

  function setDiscographyType(type: string) {
    router.push(`/artist/${artistId}/discography/${type}`)
  }

  return (
    <Select value={discographyType} onValueChange={setDiscographyType}>
      <SelectTrigger data-shadcnui-button className="h-8 px-2 font-bold">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="w-[180px]">
        <SelectGroup>
          <SelectItem value="album">Album</SelectItem>
          <SelectItem value="single">Single and EPs</SelectItem>
          <SelectItem value="compilation">Compilation</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default DiscographyTypeFilter
