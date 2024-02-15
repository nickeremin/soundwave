import * as z from "zod"

import { albumSchema, albumShortSchema } from "../lib/validations/album"
import { artistAlbumSchema } from "../lib/validations/artist"

export type Album = z.infer<typeof albumSchema>
export type AlbumShort = z.infer<typeof albumShortSchema>
export type ArtistAlbum = z.infer<typeof artistAlbumSchema>
