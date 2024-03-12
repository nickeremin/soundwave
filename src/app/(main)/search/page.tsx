"use client"

import React from "react"
import { useSearchParams } from "next/navigation"

import PreviewSearch from "@/widgets/search/preview-search"
import RecentSearches from "@/widgets/search/recent-searches"

function SearchPage() {
  const query = useSearchParams().get("query")

  return (
    <div className="p-6">
      <div className="flex flex-col">
        {query && query.length > 0 ? <PreviewSearch /> : <RecentSearches />}
      </div>
    </div>
  )
}

export default SearchPage
