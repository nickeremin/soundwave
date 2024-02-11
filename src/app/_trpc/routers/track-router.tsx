import axios, { type AxiosRequestConfig } from "axios"
import * as z from "zod"

import { env } from "@/shared/components/env.mjs"
import { catchAxiosError } from "@/shared/lib/utils"
import { trackSchema } from "@/shared/lib/validations/track"
import { publicProcedure, router } from "@/shared/trpc/trpc"
import { getRelatedArtists, getTrackArtists } from "@/app/_axios/artist"
import { getRelatedTracks, getTrack } from "@/app/_axios/track"

export const trackRouter = router({
  getTrack: publicProcedure
    .input(z.string())
    .query(async ({ input: trackId }) => {
      try {
        // const { data } = await spotifyApiAxios.get(`/tracks/${trackId}`)
        // const track = trackSchema.parse(data)
        // const artists: Artist[] = []
        // for (const trackArtist of track.artists) {
        //   const { data } = await spotifyApiAxios.get(
        //     `/artists/${trackArtist.id}`
        //   )
        //   const artist = artistSchema.parse(data)
        //   artists.push(artist)
        // }

        // return { track, artists }
        const track = await getTrack(trackId)
        const trackArtists = await getTrackArtists(track)
        const relatedTracks = await getRelatedTracks({ seed_tracks: trackId })
        const relatedArtists = await getRelatedArtists(track.artists)
        return {
          track,
          trackArtists,
          relatedTracks,
          relatedArtists,
        }
      } catch (error) {
        catchAxiosError(error)
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
