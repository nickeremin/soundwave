import React from "react"
import { type Metadata } from "next"

import SearchHeader from "@/widgets/layout/headers/search/search-header"

export const metadata: Metadata = {
  title: "Search | Soundwave",
}

interface SearchLayoutProps {
  children: React.ReactNode
}

function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <div>
      <SearchHeader key="search-header" />
      {children}
    </div>
  )
}

export default SearchLayout
