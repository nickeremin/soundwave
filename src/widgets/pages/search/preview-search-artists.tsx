"use client"

import React from "react"

import { Artist } from "@/shared/types/artist"
import ArtistPreviewList from "@/features/preview-lists/artist-preview-list"

interface PreviewSearchArtistsProps {
  artists: Artist[]
}

function PreviewSearchArtists({ artists }: PreviewSearchArtistsProps) {
  return (
    <section className="col-span-full flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Artists</h2>
      <ArtistPreviewList artists={artists} />
    </section>
  )
}

export default PreviewSearchArtists
