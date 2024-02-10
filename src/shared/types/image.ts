import * as z from "zod"

import { imageSchema } from "../lib/validations/image"

export type Image = z.infer<typeof imageSchema>
