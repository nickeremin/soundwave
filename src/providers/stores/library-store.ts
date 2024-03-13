import { type StateCreator } from "zustand"

import { type LibraryFilterType } from "@/shared/types/library"

import { type BoundStore } from "./bound-store"

type LibraryState = {
  librarySearch: string
  libraryFilter: LibraryFilterType
}

type LibraryAction = {
  setLibrarySearch: (librarySearch: string) => void
  setLibraryFilter: (libraryFilter: LibraryFilterType) => void
}

export type LibraryStore = LibraryState & LibraryAction

export const createLibrarySlice: StateCreator<
  BoundStore,
  [],
  [],
  LibraryStore
> = (set) => ({
  librarySearch: "",
  libraryFilter: undefined,
  setLibrarySearch: (librarySearch) => set(() => ({ librarySearch })),
  setLibraryFilter: (libraryFilter) => set(() => ({ libraryFilter })),
})
