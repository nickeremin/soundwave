"use client"

import React from "react"
import chroma from "chroma-js"

import FollowArtistButton from "@/features/favorite/follow-artist-button"
import ArtistMenuButton from "@/features/menu/artist-menu-button"
import PlayButton from "@/features/player/play-button"

import { usePageStore } from "../providers/page-context-provider"

function ArtistActionBar() {
  return (
    <React.Fragment>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-8">
          <PlayButton className="size-14" />
          <FollowArtistButton />
          <ArtistMenuButton />
        </div>
      </div>
    </React.Fragment>
  )
}

export default ArtistActionBar
