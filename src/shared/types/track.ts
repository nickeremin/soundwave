import * as z from "zod"

import { trackSchema } from "../lib/validations/track"

export type Track = z.infer<typeof trackSchema>
