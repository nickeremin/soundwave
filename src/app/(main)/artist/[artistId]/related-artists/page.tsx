import React from "react"
import { type Metadata } from "next"

import MainFooter from "@/widgets/layout/footers/main-footer"
import MainHeader from "@/widgets/layout/headers/main-header"
import RelatedArtists from "@/widgets/pages/artist/related-artists"

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
            <RelatedArtists artistId={artistId} />
          </div>
        </main>
      </div>
      <MainFooter />
    </React.Fragment>
  )
}

export default RelatedArtistsPage
