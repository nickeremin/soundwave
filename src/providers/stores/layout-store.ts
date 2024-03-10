import { type StateCreator } from "zustand"

import { type BoundStore } from "./bound-store"

type LayoutState = {
  isCollapsed: boolean
  columnsCount: number | undefined
}

type LayoutActions = {
  toggleIsCollapsed: () => void
  setColumnsCount: (columnsCount: number) => void
}

export type LayoutStore = LayoutState & LayoutActions

export const createLayoutSlice: StateCreator<
  BoundStore,
  [],
  [],
  LayoutStore
> = (set) => ({
  isCollapsed: false,
  columnsCount: undefined,
  toggleIsCollapsed: () =>
    set((state) => ({ isCollapsed: !state.isCollapsed })),
  setColumnsCount: (columnsCount) => set(() => ({ columnsCount })),
})
