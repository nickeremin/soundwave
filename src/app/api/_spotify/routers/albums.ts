import { z } from "zod"

import { env } from "@/shared/components/env.mjs"
import { catchAxiosError } from "@/shared/lib/utils"
import { albumSchema } from "@/shared/lib/validations/album"
import { simplifiedTracksSchema } from "@/shared/lib/validations/track"
import { publicProcedure, router } from "@/shared/trpc/trpc"

import { spotifyApi } from ".."

const LIMIT = 50

export const albumRouter = router({
  getAlbum: publicProcedure
    .input(
      z.object({
        albumId: z.string(),
      })
    )
    .query(async ({ input: { albumId } }) => {
      try {
        const { data } = await spotifyApi.get(`/albums/${albumId}`)
        const album = albumSchema.parse(data)
        return album
      } catch (error) {
        catchAxiosError(error)
      }
    }),
  getAlbumTracks: publicProcedure
    .input(
      z.object({
        albumId: z.string(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input: { albumId, cursor } }) => {
      try {
        const nextUrl = new URL(
          cursor ?? `${env.SPOTIFY_API_BASE_URL}/albums/${albumId}/tracks`
        )

        const offset = nextUrl.searchParams.get("offset")

        const { data } = await spotifyApi.get(`/albums/${albumId}/tracks`, {
          params: {
            limit: LIMIT,
            offset,
          },
        })
        const albumTracks = simplifiedTracksSchema.parse(data)

        const nextCursor = albumTracks.next

        return {
          albumTracks: albumTracks.items,
          nextCursor,
        }
      } catch (error) {
        catchAxiosError(error)
      }
    }),
})
