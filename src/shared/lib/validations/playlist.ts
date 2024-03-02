import { z } from "zod"

export const editPlaylistDetailsSchema = z.object({
  playlistId: z.string(),
  name: z.string(),
  description: z.string().optional(),
})
