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
import {
  cn,
  formatTimeDuration,
  getAverageColor,
  getImageUrl,
} from "@/shared/lib/utils"
import { trackSchema } from "@/shared/lib/validations/track"
import { trpc } from "@/shared/trpc/client"

import TrackList from "./track-list"

interface TrackDetailsProps {
  trackId: string
}

function TrackDetails({ trackId }: TrackDetailsProps) {
  const { data, isLoading } = trpc.trackRouter.getTrack.useQuery(trackId)
  const [isLoaded, setIsLoaded] = React.useState(false)

  const [backgroundColor, setBackgroundColor] =
    React.useState<FastAverageColorResult | null>(null)

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
        <div className="flex h-[280px] items-end gap-4 bg-gradient-to-b from-transparent to-black/30 p-6">
          <div className="shadow-image relative size-[clamp(128px,128px_+_(100vw-320px-600px)/424*104,232px)] overflow-hidden rounded-md">
            <Image
              src={getImageUrl(data?.track.album.images) ?? "/"}
              alt=""
              fill
              onLoad={(e) => {
                const color = getAverageColor(e.currentTarget)
                setBackgroundColor(color)
                setIsLoaded(true)
              }}
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium">Song</p>
            <div className="mb-2 mt-1 line-clamp-3">
              <h1 className="text-[3rem] font-black leading-none">
                {data?.track.name}
              </h1>
            </div>

            <p className="text-sm font-medium">
              {data?.artists.map((artist) => artist.name).join(", ")} •{" "}
              {data?.track.album.name} •{" "}
              {format(new Date(data?.track.album.release_date ?? 0), "yyyy")} •{" "}
              {formatTimeDuration(data?.track?.duration_ms)}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 bg-gradient-to-b from-black/40 to-background-100 p-6">
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

          <div className="flex max-w-xl flex-col items-end gap-6 rounded-lg bg-background/50 p-4">
            <p className="self-start font-semibold">
              Sign in to see lyrics and listen to the full track.
            </p>
            <LogInSignUpButtons />
          </div>
        </div>
      </div>
      <div className="flex flex-col px-6">
        {data?.artists.map((artist) => (
          <Link href="/" key={artist.id}>
            <div className="flex items-center gap-4 rounded-md p-2 transition hover:bg-accent">
              <Avatar className="size-20">
                <AvatarImage src={getImageUrl(artist.images)} alt="" />
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
  )
}

export default TrackDetails
