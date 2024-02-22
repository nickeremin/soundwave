import React from "react"
import { type Metadata } from "next"

import SearchHeader from "@/widgets/layout/headers/search/search-header"
import { Wrapper } from "@/shared/components/ui/wrapper"

export const metadata: Metadata = {
  title: "Search | Soundwave",
}

interface SearchLayoutProps {
  children: React.ReactNode
}

function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <div>
      <Wrapper as="header" variant="header" className="flex-col">
        <SearchHeader key="search-header" />
      </Wrapper>
      {children}
    </div>
  )
}

export default SearchLayout
