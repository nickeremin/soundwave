import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
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
  return createStore<BoundStore>()(
    persist(
      (...a) => ({
        _hasHydrated: false,
        setHasHydrated: (_hasHydrated) => a[0](() => ({ _hasHydrated })),
        ...createLayoutSlice(...a),
        ...createLibrarySlice(...a),
        ...createMusicSlice(...a),
      }),
      {
        name: "music-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          isCollapsed: state.isCollapsed,
          recentSearchs: state.recentSearches,
        }),
        skipHydration: true,
        onRehydrateStorage: () => (state) => {
          console.log({
            searches: state?.recentSearches,
          })
          state?.setHasHydrated(true)
        },
      }
    )
  )
}

export const useStore = create<BoundStore>()(
  persist(
    (...a) => ({
      _hasHydrated: false,
      setHasHydrated: (_hasHydrated) => a[0](() => ({ _hasHydrated })),
      ...createLayoutSlice(...a),
      ...createLibrarySlice(...a),
      ...createMusicSlice(...a),
    }),
    {
      name: "search-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isCollapsed: state.isCollapsed,
        recentSearchs: state.recentSearches,
      }),
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        console.log({
          searches: state?.recentSearches,
        })
        state?.setHasHydrated(true)
      },
    }
  )
)
