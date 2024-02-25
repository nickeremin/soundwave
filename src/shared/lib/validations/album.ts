import { z } from "zod"

import { simplifiedArtistSchema } from "./artist"
import { imageSchema } from "./image"
import { simplifiedTracksSchema } from "./track"

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
  artists: simplifiedArtistSchema.array(),
  tracks: simplifiedTracksSchema,
  copyrights: z
    .object({
      text: z.string(),
      type: z.string(),
    })
    .array(),
  genres: z.string().array(),
  label: z.string(),
  popularity: z.number(),
})

export const simplifiedAlbumSchema = z.object({
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
})

export const simplifiedAlbumsSchema = z.object({
  next: z.string().nullable(),
  previous: z.string().nullable(),
  total: z.number(),
  items: simplifiedAlbumSchema.array(),
})
