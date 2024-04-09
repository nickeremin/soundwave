"use client"

import React from "react"
import Image from "next/image"

import PreviewBackgroundGradient from "@/entities/layout/preview-background-gradient"
import CustomIcon from "@/shared/components/icons/custom-icon"
import { getAverageColor, getImageUrl } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

import { usePageStore } from "../../providers/page-context-provider"

interface ArtistPreviewProps {
  artistId: string
}

const ArtistPreview = React.forwardRef<HTMLDivElement, ArtistPreviewProps>(
  function ({ artistId }, ref) {
    const { setIsVisible, setBackgroundColor } = usePageStore()
    const { data: artist } = trpc.artistRouter.getArtist.useQuery({ artistId })

    if (!artist) return null

    const imageUrl = getImageUrl(artist.images)

    return (
      <React.Fragment>
        <div ref={ref} className="relative flex h-[340px] items-end gap-6 p-6">
          <PreviewBackgroundGradient order={1} />
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
                  setBackgroundColor(color.hex)
                  setIsVisible(true)
                }}
                className="size-full rounded-full object-cover object-center"
              />
            ) : null}
          </div>
          <div className="relative flex flex-col items-start font-semibold">
            <div className="flex items-center gap-2">
              <div className="relative inline-flex size-6 items-center justify-center">
                <span className="absolute inset-1 bg-primary" />
                <CustomIcon
                  name="VerifiedArtist"
                  className="absolute size-6 fill-pink"
                />
              </div>
              <span className="text-sm">Verified Artist</span>
            </div>
            <span className="mb-2 line-clamp-3 select-none">
              <h1 className="text-[6rem] font-black leading-tight">
                {artist.name}
              </h1>
            </span>
            <span className="">
              {artist.followers.total.toLocaleString("en", {
                useGrouping: true,
              })}{" "}
              followers
            </span>
          </div>
        </div>
        <PreviewBackgroundGradient order={2} />
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
