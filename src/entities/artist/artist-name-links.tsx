import React from "react"
import Link from "next/link"

import { SimplifiedArtistObject } from "@/shared/types/artist"
import { cn } from "@/shared/lib/utils"

interface ArtistNamesLinksProps<TArtist> {
  artists: TArtist[]
  className?: string
}

function ArtistNameLinks<TArtist extends SimplifiedArtistObject>({
  artists,
  className,
}: ArtistNamesLinksProps<TArtist>) {
  return (
    <React.Fragment>
      {artists.map((artist, i) => (
        <React.Fragment key={artist.id}>
          <Link
            key={artist.id}
            href={`/artist/${artist.id}`}
            className={cn(
              "outline-none hover:underline focus-visible:underline focus-visible:decoration-ring",
              className
            )}
          >
            {artist.name}
          </Link>
          {i !== artists.length - 1 && ", "}
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default ArtistNameLinks
