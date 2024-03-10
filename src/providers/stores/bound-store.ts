import { createJSONStorage, persist, PersistStorage } from "zustand/middleware"
import { createStore } from "zustand/vanilla"

import { createLayoutSlice, type LayoutStore } from "./layout-store"
import { createLibrarySlice, type LibraryStore } from "./library-store"
import { createMusicSlice, type MusicStore } from "./music-store"

type HydrateState = {
  _hasHydrated: boolean
}

type HydrateActions = {
  setHasHydrated: (_hasHydrated: boolean) => void
}

type HydrateStore = HydrateState & HydrateActions

export type BoundStore = LayoutStore & LibraryStore & MusicStore & HydrateStore

export function createBoundStore() {
  const store = createStore<BoundStore>()(
    persist(
      (...a) => ({
        _hasHydrated: false,
        setHasHydrated: (_hasHydrated) => a[0](() => ({ _hasHydrated })),
        ...createLayoutSlice(...a),
        ...createLibrarySlice(...a),
        ...createMusicSlice(...a),
      }),
      {
        name: "music-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          isCollapsed: state.isCollapsed,
          recentSearchs: state.recentSearches,
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true)
        },
      }
    )
  )

  return store
}

// name: "music-storage",
// storage: createJSONStorage(() => localStorage),
// partialize: (state) => ({ recentSearchs: state.recentSearches }),
