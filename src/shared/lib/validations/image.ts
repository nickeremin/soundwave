import * as z from "zod"

export const imageSchema = z.object({
  height: z.number(),
  width: z.number(),
  url: z.string(),
})
