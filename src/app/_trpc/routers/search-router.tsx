import * as z from "zod"

import { env } from "@/shared/components/env.mjs"
import { catchAxiosError } from "@/shared/lib/utils"
import { iterableTrackSchema } from "@/shared/lib/validations/track"
import { publicProcedure, router } from "@/shared/trpc/trpc"
import { spotifyApiAxios } from "@/app/_axios"

const values = ["one", "two", "third", "fourth", "fith"]

export const searchRouter = router({
  search: publicProcedure
    .input(
      z.object({
        q: z.string(),
        type: z
          .enum([
            "album",
            "artist",
            "playlist",
            "track",
            "show",
            "episode",
            "audiobook",
          ])
          .array(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { q, type, cursor } = input

        const url = new URL(cursor ?? env.SPOTIFY_API_BASE_URL)
        const offset = url.searchParams.get("offset")
        const limit = url.searchParams.get("limit")

        const { data } = await spotifyApiAxios.get("/search", {
          params: {
            q,
            type: type.join(","),
            limit,
            offset,
          },
        })

        const searchData = iterableTrackSchema.parse(data.tracks)

        let nextCursor: typeof cursor | undefined = undefined
        if (searchData.next) {
          nextCursor = searchData.next
        }

        return {
          searchData,
          nextCursor,
        }
      } catch (error) {
        catchAxiosError(error)
      }
    }),
  searchTracks: publicProcedure
    .input(
      z.object({
        q: z.string(),
        limit: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { q } = input
        const { data } = await spotifyApiAxios.get("/search", {
          params: {
            q,
            type: "track",
          },
        })
        const tracks = iterableTrackSchema.parse(data.tracks)
        return tracks
      } catch (error) {
        catchAxiosError(error)
      }
    }),
})
