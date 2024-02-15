import * as z from "zod"

import { catchAxiosError } from "@/shared/lib/utils"
import { albumSchema } from "@/shared/lib/validations/album"
import { publicProcedure, router } from "@/shared/trpc/trpc"
import { spotifyApiAxios } from "@/app/_axios"

export const albumtRouter = router({
  getAlbum: publicProcedure
    .input(z.string())
    .query(async ({ input: albumId }) => {
      try {
        const { data } = await spotifyApiAxios.get(`/albums/${albumId}`)
        const album = albumSchema.parse(data)
        return album
      } catch (error) {
        catchAxiosError(error)
      }
    }),
})
