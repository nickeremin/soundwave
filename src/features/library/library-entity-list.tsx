"use client"

import React from "react"
import {
  useLayoutStore,
  useLibraryStore,
} from "@/providers/bound-store-provider"
import { useLibraryContext } from "@/providers/library-context-provider"
import { useUser } from "@clerk/nextjs"

import { ArtistObject } from "@/shared/types/artist"
import { FavoritePlaylistObject, PlaylistObject } from "@/shared/types/playlist"
import LibraryArtistEntity from "@/entities/library/library-artist-entity"
import LibraryCollapsedArtistEntity from "@/entities/library/library-collapsed-artist-enity"
import LibraryCollapsedFavoritePlaylistEntity from "@/entities/library/library-collapsed-favorite-playlist-entity"
import LibraryCollapsedPlaylistEntity from "@/entities/library/library-collapsed-playlist-entity"
import LibraryEmpty from "@/entities/library/library-empty"
import LibraryFavoritePlaylistEntity from "@/entities/library/library-favorite-playlist-entity"
import LibraryEntityListLoading from "@/entities/library/library-item-list-loading"
import LibrarySearchNotFound from "@/entities/library/library-not-found-results"
import LibraryPlaylistEntity from "@/entities/library/library-playlist-entity"

import LibraryCreatePlaylistButton from "./library-create-playlist-button"
import LibrarySearchBar from "./library-search-bar"

function LibraryEntityList() {
  const { isLoaded } = useUser()
  const isLibraryCollapsed = useLayoutStore((state) => state.isLibraryCollapsed)
  const librarySearch = useLibraryStore((state) => state.librarySearch)
  const libraryFilter = useLibraryStore((state) => state.libraryFilter)

  const {
    isLoading: isLibraryLoading,
    totalEntities,
    playlists,
    followedArtists,
    favoritePlaylist,
  } = useLibraryContext()

  if (isLibraryLoading || !isLoaded) return <LibraryEntityListLoading />

  const filteredPlaylists = playlists
    ? playlists.filter((playlist) => {
        if (libraryFilter === "artists") return false
        else
          return playlist.name
            .toLowerCase()
            .includes(librarySearch.toLowerCase())
      })
    : []

  const filteredFollowedArtists = followedArtists
    ? followedArtists.filter((artist) => {
        if (libraryFilter === "playlists") return false
        else
          return artist.name.toLowerCase().includes(librarySearch.toLowerCase())
      })
    : []

  const filteredEntitiesCount =
    filteredPlaylists.length + filteredFollowedArtists.length

  if (totalEntities == 0) {
    return isLibraryCollapsed ? (
      <div className="flex items-center justify-center">
        <LibraryCreatePlaylistButton />
      </div>
    ) : (
      <LibraryEmpty />
    )
  }

  return (
    <div className="flex flex-col gap-2 px-2">
      {!isLibraryCollapsed && <LibrarySearchBar />}

      <ul className="flex flex-col">
        {filteredEntitiesCount == 0 && librarySearch ? (
          <LibrarySearchNotFound />
        ) : (
          <React.Fragment>
            <LibraryPlaylistEntities
              favoritePlaylist={favoritePlaylist}
              playlists={filteredPlaylists}
            />
            <LibraryFollowedArtistEntities
              followedArtists={filteredFollowedArtists}
            />
          </React.Fragment>
        )}
      </ul>
    </div>
  )
}

function LibraryPlaylistEntities({
  favoritePlaylist,
  playlists,
}: {
  favoritePlaylist: FavoritePlaylistObject | null | undefined
  playlists: PlaylistObject[]
}) {
  const isLibraryCollapsed = useLayoutStore((state) => state.isLibraryCollapsed)

  if (isLibraryCollapsed) {
    return (
      <React.Fragment>
        {favoritePlaylist && (
          <LibraryCollapsedFavoritePlaylistEntity
            favoritePlaylist={favoritePlaylist}
          />
        )}
        {playlists.map((playlist) => (
          <LibraryCollapsedPlaylistEntity
            key={playlist.id}
            playlist={playlist}
          />
        ))}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        {favoritePlaylist && (
          <LibraryFavoritePlaylistEntity favoritePlaylist={favoritePlaylist} />
        )}
        {playlists.map((playlist) => (
          <LibraryPlaylistEntity key={playlist.id} playlist={playlist} />
        ))}
      </React.Fragment>
    )
  }
}

function LibraryFollowedArtistEntities({
  followedArtists,
}: {
  followedArtists: ArtistObject[]
}) {
  const isLibraryCollapsed = useLayoutStore((state) => state.isLibraryCollapsed)

  if (isLibraryCollapsed) {
    return followedArtists.map((artist) => (
      <LibraryCollapsedArtistEntity key={artist.id} artist={artist} />
    ))
  } else {
    return followedArtists.map((artist) => (
      <LibraryArtistEntity key={artist.id} artist={artist} />
    ))
  }
}

export default LibraryEntityList
