import React from "react"
import { type Metadata } from "next"

import SearchHeader from "@/widgets/layout/headers/search-header"
import MainFooter from "@/widgets/layout/main-footer"

export const metadata: Metadata = {
  title: "Search | Soundwave",
}

interface SearchLayoutProps {
  children: React.ReactNode
}

function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <React.Fragment>
      <div className="flex min-h-[calc(100vh-16px)] flex-col">
        <SearchHeader />
        <main className="relative flex flex-1 flex-col">{children}</main>
      </div>
      <MainFooter />
    </React.Fragment>
  )
}

export default SearchLayout
