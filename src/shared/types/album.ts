import * as z from "zod"

import { albumSchema, albumShortSchema } from "../lib/validations/album"

export type Album = z.infer<typeof albumSchema>
export type AlbumShort = z.infer<typeof albumShortSchema>
