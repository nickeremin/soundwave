import * as z from "zod"

import { imageSchema } from "./image"

export const artistSchema = z.object({
  followers: z.object({
    total: z.number(),
  }),
  genres: z.string().array().optional(),
  id: z.string(),
  images: imageSchema.array(),
  name: z.string(),
  popularity: z.number(),
  type: z.enum(["artist"]),
})

export const artistShortSchema = artistSchema.pick({
  id: true,
  name: true,
  type: true,
})

export const artistAlbumSchema = z.object({
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
})

export const artistAlbumsSchema = z.object({
  total: z.number(),
  items: artistAlbumSchema.array(),
})
