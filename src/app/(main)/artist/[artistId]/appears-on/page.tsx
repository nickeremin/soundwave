import React from "react"
import { type Metadata } from "next"

import ArtistAppearsOnAlbums from "@/widgets/artist/artist-appears-on-albums"
import MainHeader from "@/widgets/layout/headers/main-header"
import MainFooter from "@/widgets/layout/main-footer"

export const metadata: Metadata = {
  title: "Appears On | Soundwave",
}

interface AppearsOnPageProps {
  params: {
    artistId: string
  }
}

function AppearsOnPage({ params: { artistId } }: AppearsOnPageProps) {
  return (
    <React.Fragment>
      <div className="min-h-screen">
        <MainHeader />
        <main>
          <div className="p-6">
            <ArtistAppearsOnAlbums artistId={artistId} />
          </div>
        </main>
      </div>
      <MainFooter />
    </React.Fragment>
  )
}

export default AppearsOnPage
