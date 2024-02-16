"use client"

import React from "react"

import { AlbumShort } from "@/shared/types/album"
import AlbumPreviewList from "@/features/preview-lists/album-preview-list"

interface PreviewSearchAlbumsProps {
  albums: AlbumShort[]
}

function PreviewSearchAlbums({ albums }: PreviewSearchAlbumsProps) {
  return (
    <section className="col-span-full flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Albums</h2>
      <AlbumPreviewList albums={albums} />
    </section>
  )
}

export default PreviewSearchAlbums
