import * as z from "zod"

import { simplifiedArtistSchema } from "./artist"
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
    artists: simplifiedArtistSchema.array(),
  }),
  artists: simplifiedArtistSchema.array(),
  duration_ms: z.number(),
  id: z.string(),
  name: z.string(),
  popularity: z.number(),
  track_number: z.number(),
  preview_url: z.string().nullable(),
})

export const simplifiedTrackSchema = z.object({
  artists: simplifiedArtistSchema.array(),
  duration_ms: z.number(),
  id: z.string(),
  name: z.string(),
  track_number: z.number(),
})

export const tracksSchema = z.object({
  next: z.string().nullable(),
  previous: z.string().nullable(),
  total: z.number(),
  items: trackSchema.array(),
})

export const simplifiedTracksSchema = z.object({
  next: z.string().nullable(),
  previous: z.string().nullable(),
  total: z.number(),
  items: simplifiedTrackSchema.array(),
})
