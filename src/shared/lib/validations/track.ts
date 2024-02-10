import * as z from "zod"

import { shortAlbumSchema } from "./album"
import { shortArtistSchema } from "./artist"

export const trackSchema = z.object({
  album: shortAlbumSchema,
  artists: shortArtistSchema.array(),
  duration_ms: z.number(),
  id: z.string(),
  name: z.string(),
  popularity: z.number(),
  track_number: z.number(),
  type: z.string(),
  preview_url: z.string().nullable(),
})
