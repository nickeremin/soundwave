import React from "react"

import SearchHeader from "@/widgets/layout/headers/search/search-header"
import { SearchContextProvider } from "@/features/search/search-context"
import { Wrapper } from "@/shared/components/ui/wrapper"

interface SearchLayoutProps {
  children: React.ReactNode
}

function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <SearchContextProvider>
      <div>
        <Wrapper as="header" variant="header" className="flex-col">
          <SearchHeader key="search-header" />
        </Wrapper>
      </div>
      {children}
    </SearchContextProvider>
  )
}

export default SearchLayout
