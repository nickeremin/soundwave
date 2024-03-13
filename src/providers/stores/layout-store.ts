import { type StateCreator } from "zustand"

import { type BoundStore } from "./bound-store"

type LayoutState = {
  isLibraryCollapsed: boolean
  columnsCount: number
}

type LayoutActions = {
  toggleIsLibraryCollapsed: () => void
  setColumnsCount: (columnsCount: number) => void
}

export type LayoutStore = LayoutState & LayoutActions

export const createLayoutSlice: StateCreator<
  BoundStore,
  [],
  [],
  LayoutStore
> = (set) => ({
  isLibraryCollapsed: false,
  columnsCount: 0,
  toggleIsLibraryCollapsed: () =>
    set((state) => ({ isLibraryCollapsed: !state.isLibraryCollapsed })),
  setColumnsCount: (columnsCount) => set(() => ({ columnsCount })),
})
