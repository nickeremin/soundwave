import { z } from "zod"

import { catchAxiosError } from "@/shared/lib/utils"
import { trackSchema } from "@/shared/lib/validations/track"
import { publicProcedure, router } from "@/shared/trpc/trpc"

import { spotifyApi } from ".."

export const trackRouter = router({
  getTrack: publicProcedure
    .input(
      z.object({
        trackId: z.string(),
      })
    )
    .query(async ({ input: { trackId } }) => {
      try {
        const { data } = await spotifyApi.get(`/tracks/${trackId}`)
        const track = trackSchema.parse(data)
        return track
      } catch (error) {
        catchAxiosError(error)
      }
    }),
  getRecommendations: publicProcedure
    .input(
      z
        .object({
          seed_artists: z.string().array().max(5, "Max 5 artist ids"),
          seed_genres: z.string().array().max(5, "Max 5 genres"),
          seed_tracks: z.string().array().max(5, "Max 5 track ids"),
        })
        .refine(
          (obj) => {
            for (const seeds of Object.values(obj)) {
              if (seeds.length > 0) return true
            }
            return false
          },
          { message: "Object must have at least one seed" }
        )
    )
    .query(async ({ input: { seed_artists, seed_genres, seed_tracks } }) => {
      try {
        const { data } = await spotifyApi.get("/recommendations", {
          params: {
            seed_artists: seed_artists.join(","),
            seed_genres: seed_genres.join(","),
            seed_tracks: seed_tracks.join(","),
          },
        })
        const recommendedTracks = trackSchema.parse(data.tracks)
        return recommendedTracks
      } catch (error) {
        catchAxiosError(error)
      }
    }),
})
