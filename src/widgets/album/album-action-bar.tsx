"use client"

import React from "react"

import { type SimplifiedAlbumObject } from "@/shared/types/album"
import AddFavoriteAlbumButton from "@/features/album/add-favorite-album-button"
import AlbumMenuButton from "@/features/album/album-menu-button"
import PlayButton from "@/features/player/play-button"

interface AlbumActionBarProps {
  album: SimplifiedAlbumObject
}

function AlbumActionBar({ album }: AlbumActionBarProps) {
  return (
    <div className="flex items-center gap-8">
      <PlayButton />
      <AddFavoriteAlbumButton album={album} />
      <AlbumMenuButton album={album} />
    </div>
  )
}

export default AlbumActionBar
