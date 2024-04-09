"use client"

import React from "react"
import { useUser } from "@clerk/nextjs"

import { type ArtistObject } from "@/shared/types/artist"
import {
  type FavoritePlaylistObject,
  type PlaylistObject,
} from "@/shared/types/playlist"
import { trpc } from "@/shared/trpc/client"

type LibraryContextData = {
  isLoading: boolean
  totalEntities: number
  totalPlaylists: number
  totalFollowedArtists: number
  favoritePlaylist: FavoritePlaylistObject | null | undefined
  playlists: PlaylistObject[] | undefined
  followedArtists: ArtistObject[] | undefined
}

const LibraryContext = React.createContext<LibraryContextData | null>(null)

interface LibraryContextProviderProps {
  children: React.ReactNode
}

function LibraryContextProvider({ children }: LibraryContextProviderProps) {
  const { isLoaded, isSignedIn } = useUser()

  const isEnabled = isLoaded && isSignedIn

  const { data: favoritePlaylist, isLoading: isFavoritePlaylistLoading } =
    trpc.playlistRouter.getFavoritePlaylist.useQuery(undefined, {
      enabled: isEnabled,
    })

  const { data: playlists, isLoading: isPlaylistsLoading } =
    trpc.playlistRouter.getPlaylists.useQuery(undefined, { enabled: isEnabled })

  const { data: followedArtists, isLoading: isArtistsLoading } =
    trpc.playlistRouter.getFollowedArtists.useQuery(undefined, {
      enabled: isEnabled,
    })

  const isLoading =
    isPlaylistsLoading || isArtistsLoading || isFavoritePlaylistLoading

  const hasFavoritePlaylist = Number(favoritePlaylist?.total_tracks) > 0 ? 1 : 0
  const totalPlaylists = playlists
    ? playlists.length + hasFavoritePlaylist
    : hasFavoritePlaylist

  const totalFollowedArtists = followedArtists ? followedArtists.length : 0

  const totalEntities = totalPlaylists + totalFollowedArtists

  return (
    <LibraryContext.Provider
      value={{
        isLoading,
        totalEntities,
        totalPlaylists,
        totalFollowedArtists,
        favoritePlaylist,
        playlists,
        followedArtists,
      }}
    >
      {children}
    </LibraryContext.Provider>
  )
}

export function useLibraryContext() {
  const context = React.useContext(LibraryContext)

  if (!context) {
    throw new Error("useLibrary must be use within LibraryContextProvider")
  }

  return context
}

export default LibraryContextProvider
