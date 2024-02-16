import * as z from "zod"

import { artistShortSchema } from "./artist"
import { imageSchema } from "./image"

export const albumTrackSchema = z.object({
  artists: artistShortSchema.array(),
  duration_ms: z.number(),
  id: z.string(),
  name: z.string(),
  preview_url: z.string().nullable(),
  track_number: z.number(),
})

export const albumSchema = z.object({
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
  tracks: z.object({
    total: z.number(),
    items: albumTrackSchema.array(),
  }),
  copyrights: z
    .object({
      text: z.string(),
      type: z.string(),
    })
    .array(),
  genres: z.string().array().optional(),
  label: z.string(),
  popularity: z.number(),
})

export const albumShortSchema = albumSchema.omit({
  tracks: true,
  copyrights: true,
  genres: true,
  label: true,
  popularity: true,
})

export const iterableAlbumSchema = z.object({
  next: z.string().nullable(),
  previous: z.string().nullable(),
  total: z.number(),
  items: albumShortSchema.array(),
})
