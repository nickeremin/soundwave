import React from "react"

function ArtistEmptyDiscography() {
  return (
    <div className="flex flex-col items-center gap-4 p-8 pt-16">
      <h1 className="text-2xl font-bold">Results Not Found</h1>
      <p className="text-secondary">
        There are no albums in the artist&apos;s discography.
      </p>
    </div>
  )
}

export default ArtistEmptyDiscography
