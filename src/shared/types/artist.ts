import * as z from "zod"

import { artistSchema, simplifiedArtistSchema } from "../lib/validations/artist"

export type ArtistObject = z.infer<typeof artistSchema>
export type SimplifiedArtistObject = z.infer<typeof simplifiedArtistSchema>

export type DiscographyFilterType = "all" | "album" | "single" | "compilation"

export type DiscographyFilter = {
  name: string
  type: DiscographyFilterType
}
