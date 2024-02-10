import * as z from "zod"

import { artistSchema } from "@/shared/lib/validations/artist"
import { publicProcedure, router } from "@/shared/trpc/trpc"
import { spotifyApiAxios } from "@/app/_axios"

export const artistRouter = router({
  gerArtist: publicProcedure
    .input(z.string())
    .query(async ({ input: artistId }) => {
      try {
        const { data } = await spotifyApiAxios.get(`/artists/${artistId}`)
        const artist = artistSchema.parse(data)
        return artist
      } catch (error) {
        console.log("getArtist this")
      }
    }),
})
