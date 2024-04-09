import { db } from "@/database"
import {
  favoritePlaylists,
  followedArtists,
  playlists,
  playlistTracks,
} from "@/database/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { catchAxiosError } from "@/shared/lib/utils"
import { artistSchema } from "@/shared/lib/validations/artist"
import { editPlaylistDetailsSchema } from "@/shared/lib/validations/playlist"
import { trackSchema } from "@/shared/lib/validations/track"
import { protectedProcedure, router } from "@/shared/trpc/trpc"

import { spotifyApi } from ".."

export const playlistRouter = router({
  updatePlaylist: protectedProcedure.input(editPlaylistDetailsSchema).mutation(
    async ({
      input: { playlistId, name, description },
      ctx: {
        auth: { userId },
      },
    }) => {
      try {
        await db
          .update(playlists)
          .set({
            name,
            description,
          })
          .where(
            and(eq(playlists.id, playlistId), eq(playlists.user_id, userId))
          )
      } catch (error) {
        console.log(error)
      }
    }
  ),

  getFavoritePlaylist: protectedProcedure.query(
    async ({
      ctx: {
        auth: { userId },
      },
    }) => {
      try {
        const favoritePlaylist = await db.query.favoritePlaylists.findFirst({
          where: eq(favoritePlaylists.user_id, userId),
        })

        if (!favoritePlaylist) {
          return null
        } else {
          return favoritePlaylist
        }
      } catch (error) {
        console.log(error)
      }
    }
  ),

  getPlaylist: protectedProcedure
    .input(
      z.object({
        playlistId: z.string(),
      })
    )
    .query(
      async ({
        input: { playlistId },
        ctx: {
          auth: { userId },
        },
      }) => {
        try {
          const playlist = (
            await db.query.playlists.findMany({
              where: and(
                eq(playlists.id, playlistId),
                eq(playlists.user_id, userId)
              ),
              with: {
                tracks: true,
              },
            })
          )[0]
          if (!playlist) return null
          return playlist
        } catch (error) {
          catchAxiosError(error)
        }
      }
    ),
  getPlaylists: protectedProcedure.query(
    async ({
      ctx: {
        auth: { userId },
      },
    }) => {
      try {
        const userPlaylists = await db
          .select()
          .from(playlists)
          .where(eq(playlists.user_id, userId))

        return userPlaylists
      } catch (error) {
        catchAxiosError(error)
      }
    }
  ),
  getplaylistTracks: protectedProcedure
    .input(
      z.object({
        playlistId: z.string(),
        cursor: z
          .object({
            offset: z.number().default(0),
          })
          .nullish(),
      })
    )
    .query(async ({ input: { playlistId, cursor } }) => {
      try {
        const limit = 50
        const offset = cursor?.offset

        const trackIds = await db.query.playlistTracks.findMany({
          where: eq(playlistTracks.playlist_id, playlistId),
          columns: {
            track_id: true,
          },
          limit,
          offset,
        })

        const { data } = await spotifyApi.get("/tracks", {
          params: {
            ids: trackIds.map((track) => track.track_id).join(","),
          },
        })

        const tracks = trackSchema.array().parse(data.tracks)

        const nextCursor =
          trackIds.length == 50
            ? {
                offset: Number(offset) + limit,
              }
            : null

        return {
          tracks,
          cursor: nextCursor,
        }
      } catch (error) {
        console.log(error)
      }
    }),

  createPlaylist: protectedProcedure.mutation(
    async ({
      ctx: {
        auth: { userId },
      },
    }) => {
      try {
        const userPlaylists = await db
          .select()
          .from(playlists)
          .where(eq(playlists.user_id, userId))

        await db.insert(playlists).values({
          user_id: userId,
          name: `My Playlist #${userPlaylists.length + 1}`,
          description: null,
          image_url: null,
        })
      } catch (error) {
        console.log(error)
      }
    }
  ),
  addTrack: protectedProcedure
    .input(
      z.object({
        trackId: z.string(),
        playlistId: z.string(),
      })
    )
    .mutation(
      async ({
        input: { trackId, playlistId },
        ctx: {
          auth: { userId },
        },
      }) => {
        try {
          const playlist = await db.query.playlists.findFirst({
            where: and(
              eq(playlists.id, playlistId),
              eq(playlists.user_id, userId)
            ),
          })

          if (!playlist)
            throw new Error("You can only add a track to your playlist!")

          await db.insert(playlistTracks).values({
            track_id: trackId,
            playlist_id: playlistId,
          })
        } catch (error) {
          console.log(error)
        }
      }
    ),
  removeTrack: protectedProcedure
    .input(
      z.object({
        trackId: z.string(),
        playlistId: z.string(),
      })
    )
    .mutation(
      async ({
        input: { trackId, playlistId },
        ctx: {
          auth: { userId },
        },
      }) => {
        const playlist = await db.query.playlists.findFirst({
          where: and(
            eq(playlists.id, playlistId),
            eq(playlists.user_id, userId)
          ),
        })

        if (!playlist)
          throw new Error("You can only remove a track from your playlist!")

        try {
          await db
            .delete(playlistTracks)
            .where(
              and(
                eq(playlistTracks.track_id, trackId),
                eq(playlistTracks.playlist_id, playlistId)
              )
            )
        } catch (error) {
          console.log(error)
        }
      }
    ),

  // Library
  getFollowedArtists: protectedProcedure.query(
    async ({
      ctx: {
        auth: { userId },
      },
    }) => {
      try {
        const followedArtistIds = await db
          .select({ artistId: followedArtists.artist_id })
          .from(followedArtists)
          .where(eq(followedArtists.user_id, userId))

        if (followedArtistIds.length > 0) {
          const { data } = await spotifyApi.get("/artists", {
            params: {
              ids: followedArtistIds.map((item) => item.artistId).join(","),
            },
          })

          const artists = artistSchema.array().parse(data.artists)
          return artists
        } else {
          return []
        }
      } catch (error) {
        console.log(error)
      }
    }
  ),
})
