import { type StateCreator } from "zustand"

import { RecentSearchEntity } from "@/shared/types/search"

import { type BoundStore } from "./bound-store"

type SearchState = {
  searchQuery: string
  recentSearches: RecentSearchEntity[]
}

type SearchActions = {
  setSearchQuery: (searchQuery: string) => void
  addRecentSearch: (entity: RecentSearchEntity) => void
  deleteRecentSearch: (entity: {
    id: string
    type: "artist" | "album" | "track"
  }) => void
  clearRecentSearches: () => void
}

export type SearchStore = SearchState & SearchActions

export const createSearchSlice: StateCreator<
  BoundStore,
  [],
  [],
  SearchStore
> = (set) => ({
  searchQuery: "",
  recentSearches: [],
  setSearchQuery: (searchQuery) => set(() => ({ searchQuery })),
  addRecentSearch: (recentSearch) =>
    set((state) => ({
      recentSearches: [
        recentSearch,
        ...state.recentSearches.filter((entity) => {
          if (
            entity.item.id === recentSearch.item.id &&
            entity.type === recentSearch.type
          ) {
            return false
          } else {
            return true
          }
        }),
      ],
    })),
  deleteRecentSearch: (recentSearch) =>
    set((state) => ({
      recentSearches: state.recentSearches.filter((entity) => {
        if (
          entity.item.id === recentSearch.id &&
          entity.type === recentSearch.type
        ) {
          return false
        } else {
          return true
        }
      }),
    })),
  clearRecentSearches: () => set(() => ({ recentSearches: [] })),
})
