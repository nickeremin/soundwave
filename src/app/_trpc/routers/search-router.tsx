import * as z from "zod"

import { env } from "@/shared/components/env.mjs"
import { catchAxiosError } from "@/shared/lib/utils"
import { iterableAlbumSchema } from "@/shared/lib/validations/album"
import { iterableArtistSchema } from "@/shared/lib/validations/artist"
import { iterableTrackSchema } from "@/shared/lib/validations/track"
import { publicProcedure, router } from "@/shared/trpc/trpc"
import { spotifyApiAxios } from "@/app/_axios"

export const searchRouter = router({
  search: publicProcedure
    .input(
      z.object({
        q: z.string(),
        // type: z
        //   .enum([
        //     "album",
        //     "artist",
        //     "playlist",
        //     "track",
        //     "show",
        //     "episode",
        //     "audiobook",
        //   ])
        //   .array(),
        //cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { q } = input

        // const url = new URL(cursor ?? env.SPOTIFY_API_BASE_URL)
        // const offset = url.searchParams.get("offset")
        // const limit = url.searchParams.get("limit")

        const { data } = await spotifyApiAxios.get("/search", {
          params: {
            q,
            type: "track,artist,album",
            // limit,
            // offset,
          },
        })

        const searchData = z
          .object({
            tracks: iterableTrackSchema,
            artists: iterableArtistSchema,
            albums: iterableAlbumSchema,
          })
          .parse(data)

        return searchData
      } catch (error) {
        catchAxiosError(error)
      }
    }),
  searchTracks: publicProcedure
    .input(
      z.object({
        q: z.string(),
        limit: z.number().optional(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { q, cursor } = input

        const nextUrl = new URL(cursor ?? `${env.SPOTIFY_API_BASE_URL}/search`)
        const limit = nextUrl.searchParams.get("limit")
        const offset = nextUrl.searchParams.get("offset")

        const { data } = await spotifyApiAxios.get("/search", {
          params: {
            q,
            type: "track",
            limit,
            offset,
          },
        })

        const trackData = iterableTrackSchema.parse(data.tracks)

        const nextCursor = trackData.next

        return {
          tracks: trackData.items,
          nextCursor,
        }
      } catch (error) {
        catchAxiosError(error)
      }
    }),
  searchAlbums: publicProcedure
    .input(
      z.object({
        q: z.string(),
        limit: z.number().optional(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { q, cursor } = input

        const nextUrl = new URL(cursor ?? `${env.SPOTIFY_API_BASE_URL}/search`)
        const limit = nextUrl.searchParams.get("limit")
        const offset = nextUrl.searchParams.get("offset")

        const { data } = await spotifyApiAxios.get("/search", {
          params: {
            q,
            type: "album",
            limit,
            offset,
          },
        })

        const albumData = iterableAlbumSchema.parse(data.albums)

        const nextCursor = albumData.next

        return {
          albums: albumData.items,
          nextCursor,
        }
      } catch (error) {
        catchAxiosError(error)
      }
    }),
  searchArtists: publicProcedure
    .input(
      z.object({
        q: z.string(),
        limit: z.number().optional(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { q, cursor } = input

        const nextUrl = new URL(cursor ?? `${env.SPOTIFY_API_BASE_URL}/search`)
        const limit = nextUrl.searchParams.get("limit")
        const offset = nextUrl.searchParams.get("offset")

        const { data } = await spotifyApiAxios.get("/search", {
          params: {
            q,
            type: "artist",
            limit,
            offset,
          },
        })

        const artistData = iterableArtistSchema.parse(data.artists)

        const nextCursor = artistData.next

        return {
          artists: artistData.items,
          nextCursor,
        }
      } catch (error) {
        catchAxiosError(error)
      }
    }),
})
