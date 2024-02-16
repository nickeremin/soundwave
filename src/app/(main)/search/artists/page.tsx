import React from "react"

interface SearchArtistsPageProps {
  params: {
    search: string
  }
}

function SearchArtistsPage({ params: { search } }: SearchArtistsPageProps) {
  return <div>SearchArtistsPage</div>
}

export default SearchArtistsPage
