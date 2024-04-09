import React from "react"
import { type Metadata } from "next"
import { notFound } from "next/navigation"

import { type DiscographyFilterType } from "@/shared/types/artist"
import DiscographyAllAlbums from "@/widgets/discography/discography-all-albums"
import DiscographyFilteredAlbums from "@/widgets/discography/discography-filtered-albums"
import { discographyFilterTypes } from "@/shared/constants/artist"

export const metadata: Metadata = {
  title: "Artist Discography | Soundwave",
}

interface DiscographyPageProps {
  params: {
    artistId: string
    discographyFilterType: DiscographyFilterType
  }
}

function DiscographyPage({
  params: { artistId, discographyFilterType },
}: DiscographyPageProps) {
  if (!discographyFilterTypes.includes(discographyFilterType)) {
    return notFound()
  }

  return (
    <React.Fragment>
      {discographyFilterType == "all" ? (
        <DiscographyAllAlbums artistId={artistId} />
      ) : (
        <DiscographyFilteredAlbums
          artistId={artistId}
          discographyFilterType={discographyFilterType}
        />
      )}
    </React.Fragment>
  )
}

export default DiscographyPage
