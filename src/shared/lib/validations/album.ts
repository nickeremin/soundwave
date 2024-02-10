import * as z from "zod"

import { artistSchema, shortArtistSchema } from "./artist"
import { imageSchema } from "./image"

export const albumSchema = z.object({
  id: z.string(),
  name: z.string(),
  label: z.string(),
  type: z.enum(["album"]),
  release_date: z.string(),
  album_type: z.enum(["album", "single", "compilation"]),
  popularity: z.number(),
  total_tracks: z.number(),
  artists: shortArtistSchema.array(),
  images: imageSchema.array(),
})

export const shortAlbumSchema = albumSchema.omit({
  label: true,
  popularity: true,
})
