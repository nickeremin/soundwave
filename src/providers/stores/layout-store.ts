import React from "react"
import { type StateCreator } from "zustand"

import { type BoundStore } from "./bound-store"

type DiscographyLayout = "list" | "grid"

type LayoutState = {
  columnsCount: number
  isLibraryCollapsed: boolean
  discographyLayout: DiscographyLayout
  mainContainerRef: React.MutableRefObject<HTMLDivElement | null>
}

type LayoutActions = {
  setColumnsCount: (columnsCount: number) => void
  toggleIsLibraryCollapsed: () => void
  setDiscographyLayout: (discographyLayout: DiscographyLayout) => void
  setMainContainerRef: (
    mainContainerRef: React.MutableRefObject<HTMLDivElement | null>
  ) => void
}

export type LayoutStore = LayoutState & LayoutActions

export const createLayoutSlice: StateCreator<
  BoundStore,
  [],
  [],
  LayoutStore
> = (set) => ({
  columnsCount: 0,
  isLibraryCollapsed: false,
  discographyLayout: "list",
  mainContainerRef: React.createRef(),
  setColumnsCount: (columnsCount) => set(() => ({ columnsCount })),
  toggleIsLibraryCollapsed: () =>
    set((state) => ({ isLibraryCollapsed: !state.isLibraryCollapsed })),
  setDiscographyLayout: (discographyLayout) =>
    set(() => ({ discographyLayout })),
  setMainContainerRef: (mainContainerRef) => set(() => ({ mainContainerRef })),
})
