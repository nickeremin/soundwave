import { z } from "zod"

import { AlbumObject } from "@/shared/types/album"
import { ArtistObject } from "@/shared/types/artist"
import { TrackObject } from "@/shared/types/track"
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
  getRecentSearches: publicProcedure
    .input(
      z.object({
        recentSearches: z
          .object({
            id: z.string(),
            type: z.enum(["artist", "album", "track"]),
          })
          .array(),
      })
    )
    .query(async ({ input: { recentSearches } }) => {
      try {
        const artistRequestPromise = makeRequestPromise<{
          artists: ArtistObject[]
        }>({
          recentSearches,
          type: "artist",
        })

        const albumRequestPromise = makeRequestPromise<{
          albums: AlbumObject[]
        }>({
          recentSearches,
          type: "album",
        })

        const trackRequestPromise = makeRequestPromise<{
          tracks: TrackObject[]
        }>({
          recentSearches,
          type: "track",
        })

        const res = await Promise.all([
          artistRequestPromise,
          albumRequestPromise,
          trackRequestPromise,
        ])

        let entities: EntityType[] = []

        if (!!res[0]) {
          entities.push(
            ...res[0].data.artists.map(
              (item) => ({ type: "artist", item }) satisfies EntityType
            )
          )
        }
        if (!!res[1]) {
          entities.push(
            ...res[1].data.albums.map(
              (item) => ({ type: "album", item }) satisfies EntityType
            )
          )
        }
        if (!!res[2]) {
          entities.push(
            ...res[2].data.tracks.map(
              (item) => ({ type: "track", item }) satisfies EntityType
            )
          )
        }

        return entities
      } catch (error) {
        catchAxiosError(error)
      }
    }),
})

// TODO
type EntityType =
  | {
      type: "artist"
      item: ArtistObject
    }
  | {
      type: "album"
      item: AlbumObject
    }
  | {
      type: "track"
      item: TrackObject
    }

type RecentSearch = {
  id: string
  type: "artist" | "album" | "track"
}

function makeRequestPromise<T>({
  recentSearches,
  type,
}: {
  recentSearches: RecentSearch[]
  type: RecentSearch["type"]
}) {
  const apiPath = {
    artist: "/artists",
    album: "/albums",
    track: "/tracks",
  }

  const ids = recentSearches
    .filter((item) => item.type === type)
    .map((item) => item.id)

  if (ids.length > 0) {
    return spotifyApi.get<T>(apiPath[type], {
      params: {
        ids: ids.join(","),
      },
    })
  } else {
    return null
  }
}
