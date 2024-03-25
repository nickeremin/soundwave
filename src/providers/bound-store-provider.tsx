"use client"

import React from "react"
import { useStore, type StoreApi } from "zustand"

import { BoundStore, createBoundStore } from "./stores/bound-store"
import { DiscographyStore } from "./stores/discography-store"
import { LayoutStore } from "./stores/layout-store"
import { LibraryStore } from "./stores/library-store"
import { SearchStore } from "./stores/search-store"

const BoundStoreContext = React.createContext<StoreApi<BoundStore> | null>(null)

interface BoundStoreProviderProps {
  children: React.ReactNode
}

export function BoundStoreProvider({ children }: BoundStoreProviderProps) {
  const storeRef = React.useRef<StoreApi<BoundStore>>()
  if (!storeRef.current) {
    storeRef.current = createBoundStore()
  }

  return (
    <BoundStoreContext.Provider value={storeRef.current}>
      {children}
    </BoundStoreContext.Provider>
  )
}

export function useBoundStore<T>(selector: (store: BoundStore) => T) {
  const boundStoreContext = React.useContext(BoundStoreContext)

  if (!boundStoreContext) {
    throw new Error(`useBoundStore must be use within BoundStoreProvider`)
  }

  return useStore(boundStoreContext, selector)
}

export function useLayoutStore<T>(selector: (store: LayoutStore) => T) {
  const boundStoreContext = React.useContext(BoundStoreContext)

  if (!boundStoreContext) {
    throw new Error(`useLayoutStore must be use within BoundStoreProvider`)
  }

  return useStore(boundStoreContext, selector)
}

export function useLibraryStore<T>(selector: (store: LibraryStore) => T) {
  const boundStoreContext = React.useContext(BoundStoreContext)

  if (!boundStoreContext) {
    throw new Error(`useLibraryStore must be use within BoundStoreProvider`)
  }

  return useStore(boundStoreContext, selector)
}

export function useSearchStore<T>(selector: (store: SearchStore) => T) {
  const boundStoreContext = React.useContext(BoundStoreContext)

  if (!boundStoreContext) {
    throw new Error(`useSearchStore must be use within BoundStoreProvider`)
  }

  return useStore(boundStoreContext, selector)
}
