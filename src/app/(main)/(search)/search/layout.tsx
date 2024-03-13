import React from "react"
import { type Metadata } from "next"

import MainFooter from "@/widgets/layout/footers/main-footer"
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
      <div className="min-h-screen">
        <SearchHeader key="search-header" />
        <main>{children}</main>
      </div>
      <MainFooter />
    </div>
  )
}

export default SearchLayout
