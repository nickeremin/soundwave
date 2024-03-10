import { type StateCreator } from "zustand"

import { type BoundStore } from "./bound-store"

type RecentSearch = {
  type: "track" | "artist" | "album"
  id: string
}

type MusicState = {
  recentSearches: RecentSearch[]
}

type MusicActions = {
  setRecentSearches: (recentSearch: RecentSearch) => void
}

export type MusicStore = MusicState & MusicActions

export const createMusicSlice: StateCreator<BoundStore, [], [], MusicStore> = (
  set
) => ({
  recentSearches: [],
  setRecentSearches: (recentSearch) =>
    set((state) => ({
      recentSearches: [...state.recentSearches, recentSearch],
    })),
})
