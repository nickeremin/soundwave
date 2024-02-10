import React from "react"

import { SearchContextProvider } from "@/features/nav/search-context"

interface SearchLayoutProps {
  children: React.ReactNode
}

function SearchLayout({ children }: SearchLayoutProps) {
  return <SearchContextProvider>{children}</SearchContextProvider>
}

export default SearchLayout
