"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import chroma from "chroma-js"

import { useEditPlaylistDetailsContext } from "@/widgets/providers/edit-playlist-details-provider"
import { usePageContext } from "@/widgets/providers/page-context-provider"
import PlaylistMenuButton from "@/features/menu/playlist-menu-button"
import { LucideIcon } from "@/shared/components/icons"
import { getAverageColor } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

interface PlaylistDetailsProps {
  playlistId: string
}

function PlaylistDetails({ playlistId }: PlaylistDetailsProps) {
  const { setIsVisible, backgroundColor, setBackgroundColor } = usePageContext()
  // const { toggleOpen } = useEditPlaylistDetailsContext()

  const { user } = useUser()
  const { data: playlist } = trpc.playlistRouter.getPlaylist.useQuery({
    playlistId,
  })

  const imageUrl = playlist?.imageUrl

  useEffect(() => {
    if (!imageUrl) {
      setIsVisible(true)
    }
  }, [])

  if (!playlist) return null

  const backgroundImageColor = backgroundColor
    ? backgroundColor.isDark
      ? chroma(backgroundColor.hex).saturate(1).brighten(1.25).hex()
      : chroma(backgroundColor.hex).saturate(1.25).darken(1.5).hex()
    : "rgb(75, 75, 80)"

  return (
    <div>
      <div className="relative flex h-[340px] items-end gap-6 p-6">
        <div
          style={{
            backgroundColor: `${backgroundImageColor}`,
            backgroundImage:
              "linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%), var(--background-noise)",
          }}
          className="absolute inset-0 z-[-1]"
        />
        <button
          data-shadcnui-button
          // onClick={toggleOpen}
          className="rounded-md outline-none"
        >
          <div className="relative size-[clamp(128px,128px_+_(100vw-320px-600px)/424*104,232px)] shrink-0 rounded-md bg-accent shadow-image-lg">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt=""
                width={400}
                height={400}
                priority
                onLoad={async (e) => {
                  const color = getAverageColor(e.currentTarget)
                  setBackgroundColor(color)
                  setIsVisible(true)
                }}
                className="size-full rounded-md object-cover object-center"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center">
                <LucideIcon name="Music" className="size-16 text-tertiary" />
              </div>
            )}
          </div>
        </button>
        <div className="relative flex flex-col items-start text-sm font-medium">
          <div className="flex items-center gap-2">
            <span>Playlist</span>
          </div>
          <button
            data-shadcnui-button
            // onClick={toggleOpen}
            className="select-none rounded-md outline-none"
          >
            <h1 className="mb-2 line-clamp-3 text-[4rem] font-black leading-tight">
              {playlist.name}
            </h1>
          </button>
          {playlist.description ? (
            <p className="mb-2 font-medium text-tertiary">
              {playlist.description}
            </p>
          ) : null}
          <span className="text-base">{user?.username}</span>
        </div>
      </div>
      <div
        style={{
          backgroundColor: `${backgroundImageColor}`,
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, .6), rgb(var(--ds-background-100)) 100%), var(--background-noise)",
        }}
        className="absolute z-[-1] h-[240px] w-full"
      />
      <div className="flex flex-col gap-6 px-6 pt-6">
        <div className="flex items-center gap-8">
          <PlaylistMenuButton />
        </div>
      </div>
    </div>
  )
}

export default PlaylistDetails
