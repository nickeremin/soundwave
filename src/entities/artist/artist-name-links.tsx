import React from "react"
import Link from "next/link"

import { ArtistShort } from "@/shared/types/artist"
import { cn } from "@/shared/lib/utils"

interface ArtistNamesLinksProps<TArtist> {
  artists: TArtist[]
  className?: string
}

function ArtistNameLinks<TArtist extends ArtistShort>({
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
            className={cn("hover:underline", className)}
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
