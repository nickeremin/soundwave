import React from "react"

import SearchHeader from "@/widgets/layout/headers/search/search-header"
import { Wrapper } from "@/shared/components/ui/wrapper"

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
