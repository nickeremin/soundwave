"use client"

import React from "react"
import { useBoundStore } from "@/providers/bound-store-provider"

import { ArtistObject } from "@/shared/types/artist"
import ArtistPreviewCard from "@/entities/artist/artist-preview-card"
import ArtistPreviewCardLoading from "@/entities/artist/artist-preview-card-loading"

interface ArtistPreviewListProps {
  artists: ArtistObject[]
}

function ArtistPreviewList({ artists }: ArtistPreviewListProps) {
  const columns = useBoundStore((state) => state.columnsCount)

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
      className="grid gap-8"
    >
      {artists
        ? artists
            .slice(0, columns)
            .map((artist) => (
              <ArtistPreviewCard key={artist.id} artist={artist} />
            ))
        : Array.from({ length: columns }, (_, i) => i).map((_, i) => (
            <ArtistPreviewCardLoading key={i} />
          ))}
    </div>
  )
}

export default ArtistPreviewList
