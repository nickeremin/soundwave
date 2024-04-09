import React from "react"
import { type StateCreator } from "zustand"

import { type BoundStore } from "./bound-store"

type DiscographyLayout = "list" | "grid"
type PlaylistViewType = "list" | "compact"

type LayoutState = {
  mainContainerRef: React.MutableRefObject<HTMLDivElement | null>
  columnsCount: number
  isLibraryCollapsed: boolean
  discographyLayout: DiscographyLayout
  playlistView: PlaylistViewType
}

type LayoutActions = {
  setMainContainerRef: (
    mainContainerRef: React.MutableRefObject<HTMLDivElement | null>
  ) => void
  setColumnsCount: (columnsCount: number) => void
  toggleIsLibraryCollapsed: () => void
  setDiscographyLayout: (discographyLayout: DiscographyLayout) => void
  setPlaylistView: (playlistView: PlaylistViewType) => void
}

export type LayoutStore = LayoutState & LayoutActions

export const createLayoutSlice: StateCreator<
  BoundStore,
  [],
  [],
  LayoutStore
> = (set) => ({
  mainContainerRef: React.createRef(),
  columnsCount: 0,
  isLibraryCollapsed: false,
  discographyLayout: "list",
  playlistView: "list",
  setMainContainerRef: (mainContainerRef) => set(() => ({ mainContainerRef })),
  setColumnsCount: (columnsCount) => set(() => ({ columnsCount })),
  toggleIsLibraryCollapsed: () =>
    set((state) => ({ isLibraryCollapsed: !state.isLibraryCollapsed })),
  setDiscographyLayout: (discographyLayout) =>
    set(() => ({ discographyLayout })),
  setPlaylistView: (playlistView) => set(() => ({ playlistView })),
})
