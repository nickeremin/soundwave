import * as z from "zod"

import { type Artist } from "@/shared/types/artist"
import { catchAxiosError } from "@/shared/lib/utils"
import { albumShortSchema } from "@/shared/lib/validations/album"
import { artistSchema } from "@/shared/lib/validations/artist"
import { publicProcedure, router } from "@/shared/trpc/trpc"
import { spotifyApiAxios } from "@/app/_axios"

export const artistRouter = router({
  getArtist: publicProcedure
    .input(z.string())
    .query(async ({ input: artistId }) => {
      try {
        const { data } = await spotifyApiAxios.get(`/artists/${artistId}`)
        const artist = artistSchema.parse(data)
        return artist
      } catch (error) {
        catchAxiosError(error)
      }
    }),
  getArtistWithAlbums: publicProcedure
    .input(z.string())
    .query(async ({ input: artistId }) => {
      try {
        const artistPromise = spotifyApiAxios.get<Artist>(
          `/artists/${artistId}`
        )
        const artistAlbumsPromise = spotifyApiAxios.get(
          `/artists/${artistId}/albums`,
          {
            params: {
              include_groups: "album,single,compilation",
              limit: 50,
            },
          }
        )
        const [artistResponse, artistAlbumsResponse] = await Promise.all([
          artistPromise,
          artistAlbumsPromise,
        ])

        const artist = artistSchema.parse(artistResponse.data)
        const albums = albumShortSchema
          .array()
          .parse(artistAlbumsResponse.data.items)
        return { artist, albums }
      } catch (error) {
        catchAxiosError(error)
      }
    }),
  getRelatedArtists: publicProcedure
    .input(z.string())
    .query(async ({ input: artistId }) => {
      try {
        const { data } = await spotifyApiAxios.get(
          `/artists/${artistId}/related-artists`
        )
        const relatedArtists = artistSchema.array().parse(data.artists)
        return relatedArtists
      } catch (error) {
        catchAxiosError(error)
      }
    }),
})
