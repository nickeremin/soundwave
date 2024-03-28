"use client"

import React from "react"
import Image from "next/image"
import chroma from "chroma-js"
import { ShieldCheckIcon } from "lucide-react"

import { getAverageColor, getImageUrl } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

import { usePageStore } from "../providers/page-context-provider"

interface ArtistPreviewProps {
  artistId: string
}

const ArtistPreview = React.forwardRef<HTMLDivElement, ArtistPreviewProps>(
  function ({ artistId }, ref) {
    const { setIsVisible, backgroundColor, setBackgroundColor } = usePageStore()
    const { data: artist } = trpc.artistRouter.getArtist.useQuery({ artistId })

    if (!artist) return null

    const imageUrl = getImageUrl(artist.images)
    console.log({ images: artist.images })

    return (
      <React.Fragment>
        <div ref={ref} className="relative flex h-[340px] items-end gap-6 p-6">
          <div
            style={{
              backgroundColor: backgroundColor
                ? chroma(backgroundColor.hex).saturate().hex()
                : undefined,
            }}
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"
          />
          <div className="relative size-[clamp(128px,128px_+_(100vw-320px-600px)/424*104,232px)] shrink-0 select-none rounded-full bg-accent shadow-image-lg">
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
                className="size-full rounded-full object-cover object-center"
              />
            ) : null}
          </div>
          <div className="relative flex flex-col items-start text-sm font-semibold">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon
                fill="#0a84ff"
                strokeWidth={1.5}
                className="size-7"
              />
              Verified Artist
            </div>
            <span className="mb-2 line-clamp-3 select-none">
              <h1 className="text-[6rem] font-black leading-tight">
                {artist.name}
              </h1>
            </span>
            <span className="text-base">
              {artist.followers.total.toLocaleString("en", {
                useGrouping: true,
              })}{" "}
              followers
            </span>
          </div>
        </div>
        <div
          style={{
            backgroundColor: backgroundColor
              ? chroma(backgroundColor.hex).saturate().hex()
              : "transparent",
          }}
          className="absolute inset-x-0  h-[240px] w-full bg-gradient-to-b from-black/60 to-background-100 "
        />
      </React.Fragment>
    )
  }
)
ArtistPreview.displayName = "ArtistPreview"

{
  /* <div
        style={{
          backgroundColor: backgroundColor
            ? chroma(backgroundColor.hex).saturate().hex()
            : undefined,
        }}
        className="absolute z-[-1] h-[240px] w-full bg-gradient-to-b from-black/60 to-background-100 "
      /> */
}

export default ArtistPreview
