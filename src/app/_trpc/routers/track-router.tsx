import axios, { type AxiosRequestConfig } from "axios"
import * as z from "zod"

import { env } from "@/shared/components/env.mjs"
import { trackSchema } from "@/shared/lib/validations/track"
import { publicProcedure, router } from "@/shared/trpc/trpc"
import { spotifyApiAxios } from "@/app/_axios"

export const trackRouter = router({
  getTrack: publicProcedure
    .input(z.string())
    .query(async ({ input: trackId }) => {
      try {
        const { data } = await spotifyApiAxios.get(`/tracks/${trackId}`)
        const track = trackSchema.parse(data)
        return track
      } catch (error) {
        console.log("getTrack this")
      }
    }),
  getTrackRecommendations: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        seedTracks: z.string().optional(),
        seedArtists: z.string().optional(),
        seedGenres: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const options: AxiosRequestConfig = {
        method: "get",
        url: `${env.NEXT_PUBLIC_SERVER_URL}/recommendations`,
        params: {
          limit: input.limit,
          seed_tracks: input.seedTracks,
          seed_artists: input.seedArtists,
          seed_genres: input.seedGenres,
        },
      }

      try {
        // This returns array of tracks but we need the first
        const { data } = await axios.request(options)
        const parsedData = trackSchema.array().safeParse(data)

        if (parsedData.success) {
          const track = parsedData.data[0]
          return track
        }
      } catch (error) {
        console.log(error)
      }
    }),
})
