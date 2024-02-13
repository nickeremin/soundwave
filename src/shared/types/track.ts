import * as z from "zod"

import { albumTrackSchema } from "../lib/validations/album"
import { trackSchema } from "../lib/validations/track"

export type Track = z.infer<typeof trackSchema>
export type AlbumTrack = z.infer<typeof albumTrackSchema>
