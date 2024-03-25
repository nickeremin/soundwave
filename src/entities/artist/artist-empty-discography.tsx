import React from "react"

import { type DiscographyType } from "@/shared/types/artist"

interface ArtistEmptyDiscography {
  discographyType: DiscographyType
}

function ArtistEmptyDiscography({ discographyType }: ArtistEmptyDiscography) {
  return (
    <div className="flex flex-col items-center gap-4 p-8 pt-16">
      <h1 className="text-2xl font-bold">Results Not Found</h1>
      <p className="text-secondary">
        There are no {discographyType} in the artist's discography.
      </p>
    </div>
  )
}

export default ArtistEmptyDiscography
