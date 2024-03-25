import { createJSONStorage, persist } from "zustand/middleware"
import { createStore } from "zustand/vanilla"

import {
  createDiscographySlice,
  type DiscographyStore,
} from "./discography-store"
import { createLayoutSlice, type LayoutStore } from "./layout-store"
import { createLibrarySlice, type LibraryStore } from "./library-store"
import { createSearchSlice, type SearchStore } from "./search-store"

type HydrateState = {
  _hasHydrated: boolean
}

type HydrateActions = {
  setHasHydrated: (_hasHydrated: boolean) => void
}

type HydrateStore = HydrateState & HydrateActions

export type BoundStore = LayoutStore &
  LibraryStore &
  SearchStore &
  DiscographyStore &
  HydrateStore

export function createBoundStore() {
  return createStore<BoundStore>()(
    persist(
      (...a) => ({
        _hasHydrated: false,
        setHasHydrated: (_hasHydrated) => a[0](() => ({ _hasHydrated })),
        ...createLayoutSlice(...a),
        ...createLibrarySlice(...a),
        ...createSearchSlice(...a),
        ...createDiscographySlice(...a),
      }),
      {
        name: "search-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          isLibraryCollapsed: state.isLibraryCollapsed,
          recentSearches: state.recentSearches,
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true)
        },
      }
    )
  )
}
