import React from "react"
import { type Metadata } from "next"

import ArtistRelatedArtists from "@/widgets/artist/artist-related-artists"
import MainHeader from "@/widgets/layout/headers/main-header"
import MainFooter from "@/widgets/layout/main-footer"

export const metadata: Metadata = {
  title: "Related Artists | Soundwave",
}

interface RelatedArtistsPageProps {
  params: {
    artistId: string
  }
}

function RelatedArtistsPage({ params: { artistId } }: RelatedArtistsPageProps) {
  return (
    <React.Fragment>
      <div className="min-h-screen">
        <MainHeader />
        <main>
          <div className="p-6">
            <ArtistRelatedArtists artistId={artistId} />
          </div>
        </main>
      </div>
      <MainFooter />
    </React.Fragment>
  )
}

export default RelatedArtistsPage
