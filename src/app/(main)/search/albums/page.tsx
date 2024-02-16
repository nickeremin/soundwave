import React from "react"

interface SearchAlbumsPageProps {
  params: {
    search: string
  }
}

function SearchAlbumsPage({ params: { search } }: SearchAlbumsPageProps) {
  return <div>SearchAlbumsPage</div>
}

export default SearchAlbumsPage
