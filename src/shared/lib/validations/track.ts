import * as z from "zod"

import { albumShortSchema } from "./album"
import { artistShortSchema } from "./artist"

export const trackSchema = z.object({
  album: albumShortSchema,
  artists: artistShortSchema.array(),
  duration_ms: z.number(),
  id: z.string(),
  name: z.string(),
  popularity: z.number(),
  track_number: z.number(),
  type: z.string(),
  preview_url: z.string().nullable(),
})
