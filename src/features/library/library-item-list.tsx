"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  useLayoutStore,
  useLibraryStore,
} from "@/providers/bound-store-provider"
import { useUser } from "@clerk/nextjs"

import LibraryEntityListLoading from "@/entities/library/library-item-list-loading"
import LibrarySearchNotFound from "@/entities/library/library-not-found-results"
import { Tooltip } from "@/shared/components/ui/tooltip"
import { cn, getImageUrl } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

function LibraryEntityList() {
  const isLibraryCollapsed = useLayoutStore((state) => state.isLibraryCollapsed)
  const librarySearch = useLibraryStore((state) => state.librarySearch)
  const libraryFilter = useLibraryStore((state) => state.libraryFilter)

  const router = useRouter()

  const { user } = useUser()
  const {
    isLoading: isLibraryLoading,
    playlists,
    followedArtists,
  } = useLibraryEntities()

  if (isLibraryLoading || !user) return <LibraryEntityListLoading />

  const filteredPlaylists = playlists.filter((playlist) => {
    if (libraryFilter === "artists") return false
    else
      return playlist.name.toLowerCase().includes(librarySearch.toLowerCase())
  })

  const filteredFollowedArtists = followedArtists.filter((artist) => {
    if (libraryFilter === "playlists") return false
    else return artist.name.toLowerCase().includes(librarySearch.toLowerCase())
  })

  const totalCount = filteredPlaylists.length + filteredFollowedArtists.length

  if (totalCount === 0) return <LibrarySearchNotFound />

  return (
    <ul className="flex flex-col">
      {filteredPlaylists.map((playlist) =>
        isLibraryCollapsed ? (
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
              className={cn(
                "relative flex h-16 items-center",
                isLibraryCollapsed ? "px-1" : "px-2"
              )}
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
            className="relative flex h-16 items-center px-2"
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

        return isLibraryCollapsed ? (
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
              className={cn(
                "relative flex h-16 items-center",
                isLibraryCollapsed ? "px-1" : "px-2"
              )}
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
          <li key={artist.id} className="relative flex h-16 items-center px-2">
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

function useLibraryEntities() {
  const { data: playlists } = trpc.playlistRouter.getPlaylists.useQuery()
  const { data: followedArtists } =
    trpc.playlistRouter.getFollowedArtists.useQuery()

  const isLoading = !playlists || !followedArtists

  if (!isLoading) {
    return {
      isLoading,
      playlists,
      followedArtists,
    }
  } else {
    return {
      isLoading,
      playlists,
      followedArtists,
    }
  }
}

export default LibraryEntityList
