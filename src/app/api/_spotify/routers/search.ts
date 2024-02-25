import { z } from "zod"

import { env } from "@/shared/components/env.mjs"
import { catchAxiosError } from "@/shared/lib/utils"
import { simplifiedAlbumsSchema } from "@/shared/lib/validations/album"
import { artistsSchema } from "@/shared/lib/validations/artist"
import { tracksSchema } from "@/shared/lib/validations/track"
import { publicProcedure, router } from "@/shared/trpc/trpc"

import { spotifyApi } from ".."

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
      })
    )
    .query(async ({ input: { q, type } }) => {
      try {
        const { data } = await spotifyApi.get("/search", {
          params: {
            q,
            type: type.join(","),
          },
        })

        const searchData = z
          .object({
            tracks: tracksSchema,
            artists: artistsSchema,
            albums: simplifiedAlbumsSchema,
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
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input: { q, cursor } }) => {
      try {
        const nextUrl = new URL(cursor ?? `${env.SPOTIFY_API_BASE_URL}/search`)
        const limit = nextUrl.searchParams.get("limit")
        const offset = nextUrl.searchParams.get("offset")

        const { data } = await spotifyApi.get("/search", {
          params: {
            q,
            type: "track",
            limit,
            offset,
          },
        })

        const tracks = tracksSchema.parse(data.tracks)

        const nextCursor = tracks.next

        return {
          tracks: tracks.items,
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
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input: { q, cursor } }) => {
      try {
        const nextUrl = new URL(cursor ?? `${env.SPOTIFY_API_BASE_URL}/search`)
        const limit = nextUrl.searchParams.get("limit")
        const offset = nextUrl.searchParams.get("offset")

        const { data } = await spotifyApi.get("/search", {
          params: {
            q,
            type: "artist",
            limit,
            offset,
          },
        })

        const artists = artistsSchema.parse(data.artists)

        const nextCursor = artists.next

        return {
          artists: artists.items,
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
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input: { q, cursor } }) => {
      try {
        const nextUrl = new URL(cursor ?? `${env.SPOTIFY_API_BASE_URL}/search`)
        const limit = nextUrl.searchParams.get("limit")
        const offset = nextUrl.searchParams.get("offset")

        const { data } = await spotifyApi.get("/search", {
          params: {
            q,
            type: "album",
            limit,
            offset,
          },
        })

        const albums = simplifiedAlbumsSchema.parse(data.albums)

        const nextCursor = albums.next

        return {
          albums: albums.items,
          nextCursor,
        }
      } catch (error) {
        catchAxiosError(error)
      }
    }),
})
