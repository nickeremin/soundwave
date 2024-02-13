import React from "react"
import Link from "next/link"

import ArtistPreviewCard from "@/entities/artist/artist-preview-card"
import { trpc } from "@/shared/trpc/client"

interface RelatedArtistsProps {
  artistId: string
}

function RelatedArtists({ artistId }: RelatedArtistsProps) {
  const { data: relatedArtists } =
    trpc.artistRouter.getRelatedArtists.useQuery(artistId)

  if (!relatedArtists) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-col gap-2 px-6">
      <div className="flex items-baseline justify-between font-bold">
        <Link href={"/"} className="text-2xl hover:underline">
          <h2>Fans also like</h2>
        </Link>
        <Link href={"/"} className="text-sm text-secondary hover:underline">
          <span>Show all</span>
        </Link>
      </div>
      <ul className="grid grid-cols-4 gap-4">
        {relatedArtists.slice(0, 4).map((artist) => (
          <ArtistPreviewCard key={artist.id} artist={artist} />
        ))}
      </ul>
    </div>
  )
}

export default RelatedArtists
