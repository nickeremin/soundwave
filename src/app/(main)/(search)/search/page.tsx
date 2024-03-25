"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { useSearchStore } from "@/providers/bound-store-provider"

import PreviewSearch from "@/widgets/search/preview-search"
import RecentSearches from "@/widgets/search/recent-searches"

function SearchPage() {
  const query = useSearchParams().get("query")
  const recentSearches = useSearchStore((state) => state.recentSearches)

  return (
    <div className="p-6">
      <div className="flex flex-col gap-10">
        {query && query.length > 0 ? (
          <PreviewSearch />
        ) : (
          <React.Fragment>
            <RecentSearches preview />
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default SearchPage
