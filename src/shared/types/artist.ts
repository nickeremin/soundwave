import * as z from "zod"

import { artistSchema, artistShortSchema } from "../lib/validations/artist"

export type Artist = z.infer<typeof artistSchema>
export type ArtistShort = z.infer<typeof artistShortSchema>
