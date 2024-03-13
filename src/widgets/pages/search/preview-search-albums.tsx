"use client"

import React from "react"
import { useBoundStore, useLayoutStore } from "@/providers/bound-store-provider"

import { SimplifiedAlbumObject } from "@/shared/types/album"
import AlbumPreviewCard from "@/entities/album/album-preview-card"
import AlbumPreviewCardLoading from "@/entities/album/album-preview-card-loading"

interface PreviewSearchAlbumsProps {
  albums: SimplifiedAlbumObject[]
}

function PreviewSearchAlbums({ albums }: PreviewSearchAlbumsProps) {
  const columns = useLayoutStore((state) => state.columnsCount)

  return (
    <section className="col-span-full flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Albums</h2>
      <div
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
        className="grid"
      >
        {albums
          ? albums
              .slice(0, columns)
              .map((album) => (
                <AlbumPreviewCard
                  key={album.id}
                  album={album}
                  withArtists
                  withAddToRecentSearches
                />
              ))
          : Array.from({ length: columns }, (_, i) => i).map((_, i) => (
              <AlbumPreviewCardLoading key={i} />
            ))}
      </div>
    </section>
  )
}

export default PreviewSearchAlbums
