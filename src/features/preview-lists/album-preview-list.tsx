"use client"

import React from "react"

import { Album, AlbumShort } from "@/shared/types/album"
import AlbumPreviewCard from "@/entities/album/album-preview-card"
import AlbumPreviewCardLoading from "@/entities/album/album-preview-card-loading"
import { useGridColumns } from "@/shared/lib/hooks/use-grid-columns"

interface AlbumPreviewListProps<TAlbum> {
  albums: TAlbum[] | undefined
}

function AlbumPreviewList<TAlbum extends AlbumShort>({
  albums,
}: AlbumPreviewListProps<TAlbum>) {
  const columns = useGridColumns()

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
      className="grid gap-8"
    >
      {albums
        ? albums
            .slice(0, columns)
            .map((album) => (
              <AlbumPreviewCard
                key={album.id}
                album={album}
                withArtists={true}
              />
            ))
        : Array.from({ length: columns }, (_, i) => i).map((_, i) => (
            <AlbumPreviewCardLoading key={i} />
          ))}
    </div>
  )
}

export default AlbumPreviewList
