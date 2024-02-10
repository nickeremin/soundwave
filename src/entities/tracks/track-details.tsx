"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { SignedOut } from "@clerk/nextjs"
import { PlayIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { format } from "date-fns"
import {
  FastAverageColor,
  type FastAverageColorResult,
} from "fast-average-color"
import { motion, MotionConfig } from "framer-motion"

import { Track } from "@/shared/types/track"
import { LogInSignUpButtons } from "@/features/nav"
import { env } from "@/shared/components/env.mjs"
import { LucideIcon } from "@/shared/components/icons"
import MusicIcon from "@/shared/components/icons/music-icon"
import { AspectRatio } from "@/shared/components/ui/aspect-ratio"
import { Avatar, AvatarImage } from "@/shared/components/ui/avatar"
import { Button } from "@/shared/components/ui/button"
import { cn, formatDuration, getImageUrl } from "@/shared/lib/utils"
import { trackSchema } from "@/shared/lib/validations/track"
import { trpc } from "@/shared/trpc/client"

import TrackList from "./track-list"

interface TrackDetailsProps {
  trackId: string
}

function TrackDetails({ trackId }: TrackDetailsProps) {
  const { data: track, isLoading } = trpc.trackRouter.getTrack.useQuery(trackId)
  const { data: artist } = trpc.artistRouter.gerArtist.useQuery(
    "0XNKQFs2Ewb3y0VsFUFc5l"
  )
  const [isLoaded, setIsLoaded] = React.useState(false)

  console.log(artist)

  const imageRef = React.useRef<HTMLImageElement | null>(null)
  const [backgroundColor, setBackgroundColor] =
    React.useState<FastAverageColorResult | null>(null)

  function getAverageColor() {
    if (imageRef) {
      const fac = new FastAverageColor()
      const color = fac.getColor(imageRef.current)
      setBackgroundColor(color)
    }
  }

  return (
    <div
      className={cn("flex flex-col", (!isLoaded || isLoading) && "invisible")}
    >
      <div
        style={{
          backgroundColor: backgroundColor ? backgroundColor.hex : undefined,
        }}
        className="flex flex-col"
      >
        <div className="flex h-[280px] items-end gap-4 bg-gradient-to-b from-black/25 to-black/50 p-6">
          <div className="relative size-[clamp(128px,128px_+_(100vw-320px-600px)/424*104,232px)] overflow-hidden rounded-md">
            <Image
              ref={imageRef}
              src={getImageUrl(track?.album.images) ?? "/"}
              alt=""
              fill
              onLoad={() => {
                console.log("loaded")
                getAverageColor()
                setIsLoaded(true)
              }}
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium">Song</p>
            <div className="mb-2 mt-1 line-clamp-3">
              <h1 className="text-[3rem] font-black leading-none">
                {track?.name}
              </h1>
            </div>

            <p className="text-sm font-medium">
              {track?.album.artists.map((artist) => artist.name).join(", ")} •{" "}
              {track?.album.name} •{" "}
              {format(new Date(track?.album.release_date ?? 0), "yyyy")} •{" "}
              {formatDuration(track?.duration_ms)}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 bg-gradient-to-b from-black/60 to-background-100 p-6">
          <div className="flex items-center">
            <motion.button
              data-shadcnui-button
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 1,
              }}
              className="relative mr-6 inline-flex size-14 items-center justify-center rounded-full bg-blue"
            >
              <LucideIcon
                name="Play"
                fill="currentColor"
                className="ml-1 size-6"
              />
            </motion.button>
            <motion.button
              data-shadcnui-button
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 1,
              }}
              className="relative mr-3 inline-flex size-12 items-center justify-center rounded-full"
            >
              <LucideIcon name="Heart" className="size-9 text-secondary" />
            </motion.button>
            <motion.button
              data-shadcnui-button
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 1,
              }}
              className="relative inline-flex size-12 items-center justify-center rounded-full"
            >
              <LucideIcon
                name="MoreHorizontal"
                className="size-8 text-secondary"
              />
            </motion.button>
          </div>

          <div className="flex max-w-xl flex-col items-end gap-6 rounded-lg bg-purple/75 p-4">
            <p className="self-start font-semibold">
              Sign in to see lyrics and listen to the full track.
            </p>
            <LogInSignUpButtons />
          </div>

          <div className="flex flex-col">
            {track?.artists.map((artist) => (
              <Link href="/" key={artist.id}>
                <div className="flex items-center gap-4 rounded-md p-2 transition hover:bg-accent">
                  <Avatar className="size-20">
                    {/* <AvatarImage src={track} alt="" /> */}
                  </Avatar>
                  <div className="flex flex-col font-medium">
                    <p className="text-sm">Artist</p>
                    <p>{artist.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col gap-4 px-6 py-2">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">Recommended</p>
          <p className="text-sm">Based on this song</p>
        </div>
        <TrackList tracks={recommendedTracks} />
      </div> */}
    </div>
  )
}

export default TrackDetails
