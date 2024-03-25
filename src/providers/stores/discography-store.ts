import { type StateCreator } from "zustand"

import { type BoundStore } from "./bound-store"

type DiscographyType = "album" | "single" | "compilation"

type DiscographyState = {}

type DiscographyActions = {}

export type DiscographyStore = DiscographyState & DiscographyActions

export const createDiscographySlice: StateCreator<
  BoundStore,
  [],
  [],
  DiscographyStore
> = (set) => ({})
