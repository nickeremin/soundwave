import { z } from "zod"

import { imageSchema } from "./image"

export const artistSchema = z.object({
  followers: z.object({
    total: z.number(),
  }),
  genres: z.string().array(),
  id: z.string(),
  images: imageSchema.array(),
  name: z.string(),
  popularity: z.number(),
  type: z.enum(["artist"]),
})

export const simplifiedArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const artistsSchema = z.object({
  next: z.string().nullable(),
  previous: z.string().nullable(),
  total: z.number(),
  items: artistSchema.array(),
})
