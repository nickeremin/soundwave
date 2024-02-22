"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { useDebounceValue } from "usehooks-ts"

type SearchContextData = {
  query: string | null
  search: string | null
  setSearch: React.Dispatch<React.SetStateAction<string | null>>
}

const SearchContext = React.createContext<SearchContextData | null>(null)

function useSearchContext() {
  const context = React.useContext(SearchContext)

  if (!context) {
    throw new Error("Use useSearchContext inside SearchContext boundary!")
  }

  return context
}

interface SearchContextProviderProps {
  children: React.ReactNode
}

function SearchContextProvider({ children }: SearchContextProviderProps) {
  const searchParams = useSearchParams()
  const [search, setSearch] = React.useState<string | null>(null)
  const [debouncedValue] = useDebounceValue(search, 500)

  React.useEffect(() => {
    const query = searchParams.get("query")
    setSearch(query)
  }, [])

  return (
    <SearchContext.Provider
      value={{ search, setSearch, query: debouncedValue }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export { SearchContextProvider, useSearchContext }
