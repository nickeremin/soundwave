import * as z from "zod"

import { simplifiedTrackSchema, trackSchema } from "../lib/validations/track"

export type TrackObject = z.infer<typeof trackSchema>
export type SimplifiedTrackObject = z.infer<typeof simplifiedTrackSchema>
