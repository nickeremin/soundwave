"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useBoundStore } from "@/providers/bound-store-provider"
import { useUser } from "@clerk/nextjs"

import LibraryItemListLoading from "@/entities/library/library-item-list-loading"
import LibrarySearchNotFound from "@/entities/library/library-not-found-results"
import { Tooltip } from "@/shared/components/ui/tooltip"
import { cn, getImageUrl } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

function LibraryItemList() {
  const isCollapsed = useBoundStore((state) => state.isCollapsed)
  const search = useBoundStore((state) => state.search)
  const filter = useBoundStore((state) => state.filter)

  const router = useRouter()

  const { user } = useUser()
  const { data: playlists } = trpc.playlistRouter.getPlaylists.useQuery()
  const { data: followedArtists } =
    trpc.playlistRouter.getFollowedArtists.useQuery()

  if (!playlists || !followedArtists || !user) return <LibraryItemListLoading />

  const filteredPlaylists = playlists.filter((playlist) => {
    if (filter === "artists") return false
    else return playlist.name.toLowerCase().includes(search.toLowerCase())
  })

  const filteredFollowedArtists = followedArtists.filter((artist) => {
    if (filter === "playlists") return false
    else return artist.name.toLowerCase().includes(search.toLowerCase())
  })

  const totalCount = filteredPlaylists.length + filteredFollowedArtists.length

  if (totalCount === 0) return <LibrarySearchNotFound />

  return (
    <ul
      // ref={listRef}
      role="list"
      tabIndex={0}
      className="flex flex-col"
    >
      {filteredPlaylists.map((playlist, i) =>
        isCollapsed ? (
          <Tooltip
            key={playlist.id}
            side="right"
            content={
              <div className="flex flex-col items-start font-medium">
                <p className="line-clamp-1">{playlist.name}</p>
                <p className="line-clamp-1 text-sm text-tertiary [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
                  <span>Playlist</span>
                  <span>{user?.username}</span>
                </p>
              </div>
            }
          >
            <li
              // ref={(el) => (listItemRefs.current[i] = el)}
              className="relative flex h-16 items-center px-1"
              tabIndex={i + 1}
            >
              <div
                role="button"
                tabIndex={-1}
                onClick={() => router.push(`/playlist/${playlist.id}`)}
                className="absolute inset-0 cursor-pointer"
              />
              <div className="size-12 rounded bg-accent shadow-image-sm">
                {playlist.imageUrl ? (
                  <Image
                    src={playlist.imageUrl}
                    alt=""
                    width={80}
                    height={80}
                    className="size-full rounded object-cover object-center"
                  />
                ) : null}
              </div>
            </li>
          </Tooltip>
        ) : (
          <li
            key={playlist.id}
            // ref={(el) => (listItemRefs.current[i] = el)}
            className="relative flex h-16 items-center px-2"
            tabIndex={i + 1}
          >
            <div
              role="button"
              tabIndex={-1}
              onClick={() => router.push(`/playlist/${playlist.id}`)}
              className="absolute inset-0 cursor-pointer"
            />
            <div className="flex items-center gap-3">
              <div className="size-12 rounded bg-accent shadow-image-sm">
                {playlist.imageUrl ? (
                  <Image
                    src={playlist.imageUrl}
                    alt=""
                    width={80}
                    height={80}
                    className="size-full rounded object-cover object-center"
                  />
                ) : null}
              </div>
              <div className="flex flex-col items-start font-medium">
                <p className="line-clamp-1">{playlist.name}</p>
                <p className="line-clamp-1 text-sm text-tertiary [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
                  <span>Playlist</span>
                  <span>{user?.username}</span>
                </p>
              </div>
            </div>
          </li>
        )
      )}
      {filteredFollowedArtists.map((artist) => {
        const imageUrl = getImageUrl(artist.images)

        return isCollapsed ? (
          <Tooltip
            key={artist.id}
            side="right"
            content={
              <div className="flex flex-col items-start font-medium">
                <p className="line-clamp-1">{artist.name}</p>
                <p className="line-clamp-1 text-sm text-tertiary">
                  <span>Artist</span>
                </p>
              </div>
            }
          >
            <li
              // ref={(el) => (listItemRefs.current[i] = el)}
              className={cn(
                "relative flex h-16 items-center",
                isCollapsed ? "px-1" : "px-2"
              )}
              // tabIndex={i + 1}
            >
              <div
                role="button"
                tabIndex={-1}
                onClick={() => router.push(`/playlist/${artist.id}`)}
                className="absolute inset-0 cursor-pointer"
              />
              <div className="size-12 rounded bg-accent shadow-image-sm">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt=""
                    width={80}
                    height={80}
                    className="size-full rounded object-cover object-center"
                  />
                ) : null}
              </div>
            </li>
          </Tooltip>
        ) : (
          <li
            key={artist.id}
            // ref={(el) => (listItemRefs.current[i] = el)}
            className="relative flex h-16 items-center px-2"
            // tabIndex={i + 1}
          >
            <div
              role="button"
              tabIndex={-1}
              onClick={() => router.push(`/artist/${artist.id}`)}
              className="absolute inset-0 cursor-pointer"
            />
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-accent shadow-image-sm">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt=""
                    width={80}
                    height={80}
                    className="size-full rounded-full object-cover object-center"
                  />
                ) : null}
              </div>
              <div className="flex flex-col items-start font-medium">
                <p className="line-clamp-1">{artist.name}</p>
                <p className="line-clamp-1 text-sm text-tertiary ">
                  <span>Artist</span>
                </p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default LibraryItemList
