import * as z from "zod"

import { artistShortSchema } from "./artist"
import { imageSchema } from "./image"

export const trackSchema = z.object({
  album: z.object({
    album_type: z.enum([
      "album",
      "single",
      "compilation",
      "ALBUM",
      "SINGLE",
      "COMPILATION",
    ]),
    total_tracks: z.number(),
    id: z.string(),
    images: imageSchema.array(),
    name: z.string(),
    release_date: z.string(),
    type: z.enum(["album"]),
    artists: artistShortSchema.array(),
  }),
  artists: artistShortSchema.array(),
  duration_ms: z.number(),
  id: z.string(),
  name: z.string(),
  popularity: z.number(),
  track_number: z.number(),
  type: z.enum(["track"]),
  preview_url: z.string().nullable(),
})

export const iterableTrackSchema = z.object({
  next: z.string().nullable(),
  previous: z.string().nullable(),
  total: z.number(),
  items: trackSchema.array(),
})
