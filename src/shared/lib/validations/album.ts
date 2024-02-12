import * as z from "zod"

import { artistShortSchema } from "./artist"
import { imageSchema } from "./image"

export const albumSchema = z.object({
  id: z.string(),
  name: z.string(),
  label: z.string(),
  type: z.enum(["album"]),
  release_date: z.string(),
  album_type: z.enum([
    "album",
    "single",
    "compilation",
    "ALBUM",
    "SINGLE",
    "COMPILATION",
  ]),
  popularity: z.number(),
  total_tracks: z.number(),
  artists: artistShortSchema.array(),
  images: imageSchema.array(),
})

export const albumShortSchema = albumSchema.omit({
  label: true,
  popularity: true,
})
