"use client"

import React from "react"

type SearchContextData = {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
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
  const [search, setSearch] = React.useState("")

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export { SearchContextProvider, useSearchContext }
