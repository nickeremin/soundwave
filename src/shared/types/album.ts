import * as z from "zod"

import { albumSchema, simplifiedAlbumSchema } from "../lib/validations/album"

export type AlbumObject = z.infer<typeof albumSchema>
export type SimplifiedAlbumObject = z.infer<typeof simplifiedAlbumSchema>
