import * as z from "zod"

import { imageSchema } from "../lib/validations/image"

export type ImageObject = z.infer<typeof imageSchema>
