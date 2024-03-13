"use client"

import React from "react"
import { useBoundStore } from "@/providers/bound-store-provider"

import { type ArtistObject } from "@/shared/types/artist"
import ArtistPreviewList from "@/features/preview-lists/artist-preview-list"
import ArtistPreviewCard from "@/entities/artist/artist-preview-card"
import ArtistPreviewCardLoading from "@/entities/artist/artist-preview-card-loading"

interface PreviewSearchArtistsProps {
  artists: ArtistObject[]
}

function PreviewSearchArtists({ artists }: PreviewSearchArtistsProps) {
  const columns = useBoundStore((state) => state.columnsCount)

  return (
    <section className="col-span-full flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Artists</h2>
      <div
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
        className="grid"
      >
        {artists
          ? artists
              .slice(0, columns)
              .map((artist) => (
                <ArtistPreviewCard
                  key={artist.id}
                  artist={artist}
                  withAddToRecentSearches
                />
              ))
          : Array.from({ length: columns }, (_, i) => i).map((_, i) => (
              <ArtistPreviewCardLoading key={i} />
            ))}
      </div>
      {/* <ArtistPreviewList artists={artists} /> */}
    </section>
  )
}

export default PreviewSearchArtists
