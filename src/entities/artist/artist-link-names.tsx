import React from "react"
import Link from "next/link"

import { ArtistShort } from "@/shared/types/artist"
import { cn } from "@/shared/lib/utils"

interface ArtistNamesLinksProps<TArtist> {
  artists: TArtist[]
  className?: string
}

function ArtistLinksNames<TArtist extends ArtistShort>({
  artists,
  className,
}: ArtistNamesLinksProps<TArtist>) {
  return (
    <p
      className={cn("flex gap-1 text-sm font-medium text-tertiary", className)}
    >
      {artists.map((artist, i) => (
        <span key={artist.id}>
          <Link href={`/artist/${artist.id}`} className="hover:underline">
            {artist.name}
          </Link>
          {i !== artists.length - 1 && ","}
        </span>
      ))}
    </p>
  )
}

export default ArtistLinksNames
