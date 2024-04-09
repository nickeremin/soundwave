"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { useUser } from "@clerk/nextjs"
import { AudioWaveformIcon } from "lucide-react"

import PlayButton from "@/features/player/play-button"
import { getImageUrl } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

function RecommendedPlaylists() {
  const { isLoaded, isSignedIn } = useUser()

  const isEnabled = isLoaded && isSignedIn

  const columns = useLayoutStore((state) => state.columnsCount)

  const { data: followedArtists } =
    trpc.playlistRouter.getFollowedArtists.useQuery(undefined, {
      enabled: isEnabled,
    })

  if (!followedArtists || followedArtists.length == 0) return null

  return (
    <section className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between">
        {followedArtists.length > Number(columns) ? (
          <Link
            href="/home/recommended-radio"
            className="select-none decoration-2 hover:underline"
          >
            <h2 className="text-2xl font-bold">Artists you like</h2>
          </Link>
        ) : (
          <h2 className="text-2xl font-bold">Artists you like</h2>
        )}

        {followedArtists.length > Number(columns) && (
          <Link
            href="/"
            className="select-none text-sm font-bold text-tertiary hover:underline"
          >
            Show all
          </Link>
        )}
      </div>
      <div
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
        className="-mx-3 grid"
      >
        {followedArtists.slice(0, columns).map((artist) => {
          const imageUrl = getImageUrl(artist.images)

          return (
            <div
              key={artist.id}
              className="group relative flex select-none flex-col gap-2 rounded-md p-3 duration-300 hover:bg-accent"
            >
              <div className="relative w-full  rounded-md bg-accent pb-[100%] shadow-image-sm">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt=""
                    width={320}
                    height={320}
                    className="absolute size-full rounded-md  object-cover object-center"
                  />
                ) : null}
                <div className="absolute bottom-2 right-2 z-50 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <PlayButton className="shadow-player-button" />
                </div>
                <div className="absolute size-full rounded-md bg-gradient-to-b from-transparent to-black/75">
                  <div className="absolute left-2 top-2 size-5">
                    <AudioWaveformIcon className="size-5 text-pink" />
                  </div>
                  <p className="absolute bottom-2 left-2 line-clamp-1 text-lg font-bold tracking-tight">
                    {artist.name} Mix
                  </p>
                </div>
              </div>
              {/* <div className="flex flex-col items-start">
              <p className="font-semibold tracking-tight">{artist.name} Mix</p>
            </div> */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {}}
                className="absolute inset-0 cursor-pointer"
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default RecommendedPlaylists
