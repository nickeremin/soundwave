"use client"

import React from "react"

import { useBoundStore } from "./bound-store-provider"

interface BoundStoreHydrationProviderProps {
  children?: React.ReactNode
}

function BoundStoreHydrationProvider({
  children,
}: BoundStoreHydrationProviderProps) {
  const hasHydrated = useBoundStore((state) => state._hasHydrated)

  if (!hasHydrated) return null

  return <React.Fragment>{children}</React.Fragment>
}

export default BoundStoreHydrationProvider
