import * as z from "zod"

import { catchAxiosError } from "@/shared/lib/utils"
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
        catchAxiosError(error)
      }
    }),

  getRecommendedTracks: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        seedTracks: z.string().optional(),
        seedArtists: z.string().optional(),
        seedGenres: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { data } = await spotifyApiAxios.get("/recommendations", {
          params: {
            limit: input.limit,
            seed_tracks: input.seedTracks,
            seed_artists: input.seedArtists,
            seed_genres: input.seedGenres,
          },
        })
        const tracks = trackSchema.array().parse(data.tracks)
        return tracks
      } catch (error) {
        catchAxiosError(error)
      }
    }),
})
