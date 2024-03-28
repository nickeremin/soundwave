import { type StateCreator } from "zustand"

import { DiscographyFilterType } from "@/shared/types/artist"

import { type BoundStore } from "./bound-store"

type DiscographyState = {
  discographyFilter: DiscographyFilterType
}

type DiscographyActions = {
  setDiscographyFilter: (discographyFilter: DiscographyFilterType) => void
}

export type DiscographyStore = DiscographyState & DiscographyActions

export const createDiscographySlice: StateCreator<
  BoundStore,
  [],
  [],
  DiscographyStore
> = (set) => ({
  discographyFilter: "all",
  setDiscographyFilter: (discographyFilter) =>
    set(() => ({ discographyFilter })),
})
