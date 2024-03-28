import { z } from "zod"

import { env } from "@/shared/components/env.mjs"
import { catchAxiosError } from "@/shared/lib/utils"
import { simplifiedAlbumsSchema } from "@/shared/lib/validations/album"
import { artistSchema } from "@/shared/lib/validations/artist"
import { trackSchema } from "@/shared/lib/validations/track"
import { publicProcedure, router } from "@/shared/trpc/trpc"

import { spotifyApi } from ".."

export const artistRouter = router({
  getArtist: publicProcedure
    .input(
      z.object({
        artistId: z.string(),
      })
    )
    .query(async ({ input: { artistId } }) => {
      try {
        const { data } = await spotifyApi.get(`/artists/${artistId}`)
        const artist = artistSchema.parse(data)
        return artist
      } catch (error) {
        catchAxiosError(error)
      }
    }),
  getArtistAlbums: publicProcedure
    .input(
      z.object({
        artistId: z.string(),
        include_groups: z
          .enum(["album", "single", "appears_on", "compilation"])
          .array(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input: { artistId, include_groups, cursor } }) => {
      try {
        const nextUrl = new URL(
          cursor ?? `${env.SPOTIFY_API_BASE_URL}/artists/${artistId}/albums`
        )
        // const limit = nextUrl.searchParams.get("limit")
        const offset = nextUrl.searchParams.get("offset")

        const { data } = await spotifyApi.get(`/artists/${artistId}/albums`, {
          params: {
            market: "ES",
            include_groups:
              include_groups.length > 0 ? include_groups.join(",") : undefined,
            limit: 5,
            offset,
          },
        })

        const artistAlbums = simplifiedAlbumsSchema.parse(data)

        const nextCursor = artistAlbums.next

        return {
          artistAlbums: artistAlbums.items,
          nextCursor,
        }
      } catch (error) {
        catchAxiosError(error)
      }
    }),
  getArtistTopTracks: publicProcedure
    .input(
      z.object({
        artistId: z.string(),
      })
    )
    .query(async ({ input: { artistId } }) => {
      try {
        const { data } = await spotifyApi.get(
          `/artists/${artistId}/top-tracks`,
          {
            params: {
              market: "ES",
            },
          }
        )
        const topTracks = trackSchema.array().parse(data.tracks)
        return topTracks
      } catch (error) {
        catchAxiosError(error)
      }
    }),
  getArtistRelatedArtists: publicProcedure
    .input(
      z.object({
        artistId: z.string(),
      })
    )
    .query(async ({ input: { artistId } }) => {
      try {
        const { data } = await spotifyApi.get(
          `/artists/${artistId}/related-artists`
        )
        const relatedArtists = artistSchema.array().parse(data.artists)
        return relatedArtists
      } catch (error) {
        catchAxiosError(error)
      }
    }),
})
