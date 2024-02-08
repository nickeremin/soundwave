import React from "react"

import { SearchHeader } from "@/widgets/layout"
import MainFooter from "@/widgets/layout/footers/main-footer"
import { SearchContextProvider } from "@/features/nav/search-context"
import SearchTabs from "@/features/nav/search-tabs"

interface SearchLayoutProps {
  children: React.ReactNode
}

function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <SearchContextProvider>
      <div className="relative">
        <SearchHeader />
        <main className="flex flex-col px-6">{children}</main>
        <MainFooter />
      </div>
    </SearchContextProvider>
  )
}

export default SearchLayout
