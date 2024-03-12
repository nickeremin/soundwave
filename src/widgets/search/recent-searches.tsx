"use client"

import React from "react"
import Link from "next/link"
import { useBoundStore } from "@/providers/bound-store-provider"

function RecentSearches() {
  const columns = useBoundStore((state) => state.columnsCount)

  const recentSearches = []

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        {recentSearches.length > columns ? (
          <Link
            href="/home/recommended-radio"
            className="select-none decoration-2 hover:underline"
          >
            <h2 className="text-2xl font-bold">Artists you like</h2>
          </Link>
        ) : (
          <h2 className="text-2xl font-bold">Artists you like</h2>
        )}

        {recentSearches.length > columns && (
          <Link
            href="/"
            className="select-none text-sm font-bold text-tertiary hover:underline"
          >
            Show all
          </Link>
        )}
      </div>
      <div>{/* TODO: Show recent searches tracks, albums, artists etc */}</div>
    </section>
  )
}

export default RecentSearches
