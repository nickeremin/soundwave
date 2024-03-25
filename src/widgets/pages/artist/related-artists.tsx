"use client"

import React from "react"
import Link from "next/link"
import { useLayoutStore } from "@/providers/bound-store-provider"

import ArtistPreviewCard from "@/entities/artist/artist-preview-card"
import ArtistPreviewCardLoading from "@/entities/artist/artist-preview-card-loading"
import { cn } from "@/shared/lib/utils"
import { trpc } from "@/shared/trpc/client"

interface RelatedArtistsProps {
  artistId: string
  isPreview?: boolean
}

function RelatedArtists({ artistId, isPreview }: RelatedArtistsProps) {
  const columns = useLayoutStore((state) => state.columnsCount)
  const { data: relatedArtists } =
    trpc.artistRouter.getArtistRelatedArtists.useQuery({ artistId })

  if (relatedArtists && relatedArtists.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "flex items-baseline font-bold",
          isPreview && "justify-between"
        )}
      >
        {isPreview ? (
          <React.Fragment>
            <Link
              href={`/artist/${artistId}/related-artists`}
              className="text-2xl decoration-2 hover:underline"
            >
              <h2 className="text-2xl">Fans also like</h2>
            </Link>
            <Link
              href={`/artist/${artistId}/related-artists`}
              className="text-sm text-tertiary hover:underline"
            >
              Show all
            </Link>
          </React.Fragment>
        ) : (
          <h2 className="text-2xl">Fans also like</h2>
        )}
      </div>
      <div
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
        className="grid"
      >
        {relatedArtists
          ? relatedArtists
              .slice(0, isPreview ? columns : relatedArtists.length)
              .map((artist) => (
                <ArtistPreviewCard key={artist.id} artist={artist} />
              ))
          : Array.from({ length: isPreview ? columns : 20 }, (_, i) => i).map(
              (_, i) => <ArtistPreviewCardLoading key={i} />
            )}
      </div>
    </div>
  )
}

export default RelatedArtists
