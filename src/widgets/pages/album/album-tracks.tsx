"use client"

import React from "react"

import TrackList from "@/entities/track/track-list"
import { LucideIcon } from "@/shared/components/icons"
import { trpc } from "@/shared/trpc/client"

interface AlbumTracksProps {
  albumId: string
}

function AlbumTracks({ albumId }: AlbumTracksProps) {
  const { data: albumTracks } =
    trpc.albumRouter.getAlbumTracks.useQuery(albumId)

  if (!albumTracks) return null

  return (
    <div className="px-6">
      <div className="sticky top-16 mb-2 grid h-10 grid-cols-[16px_minmax(120px,4fr)_minmax(120px,1fr)] gap-4 border-b  px-4 text-sm font-medium leading-none text-secondary">
        <div className="flex items-center justify-self-end text-base">#</div>
        <div className="flex items-center">Title</div>
        <div className="flex items-center justify-self-end">
          <span className="mr-9">
            <LucideIcon name="Clock" className="size-[18px]" />
          </span>
        </div>
      </div>
      <TrackList tracks={[]} />
    </div>
  )
}

export default AlbumTracks
