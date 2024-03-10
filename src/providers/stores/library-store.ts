import { type StateCreator } from "zustand"

import { type BoundStore } from "./bound-store"

export type FilterType = "playlists" | "artists" | undefined

type LibraryState = {
  search: string
  filter: FilterType
}

type LibraryAction = {
  setSearch: (search: string) => void
  setFilter: (filter: FilterType) => void
}

export type LibraryStore = LibraryState & LibraryAction

export const createLibrarySlice: StateCreator<
  BoundStore,
  [],
  [],
  LibraryStore
> = (set) => ({
  search: "",
  filter: undefined,
  setSearch: (search) => set(() => ({ search })),
  setFilter: (filter) => set(() => ({ filter })),
})
