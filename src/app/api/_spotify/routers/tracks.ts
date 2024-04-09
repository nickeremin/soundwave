import { db } from "@/database"
import { favoritePlaylists, favoriteTracks } from "@/database/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { catchAxiosError } from "@/shared/lib/utils"
import { trackSchema } from "@/shared/lib/validations/track"
import { protectedProcedure, publicProcedure, router } from "@/shared/trpc/trpc"

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
          seed_artists: z
            .string()
            .array()
            .max(5, "Max 5 artist ids")
            .optional(),
          seed_genres: z.string().array().max(5, "Max 5 genres").optional(),
          seed_tracks: z.string().array().max(5, "Max 5 track ids").optional(),
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
            seed_artists: seed_artists?.join(","),
            seed_genres: seed_genres?.join(","),
            seed_tracks: seed_tracks?.join(","),
          },
        })
        const recommendedTracks = trackSchema.array().parse(data.tracks)
        return recommendedTracks
      } catch (error) {
        catchAxiosError(error)
      }
    }),
  getFavoriteTracks: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            limit: z.number(),
            offset: z.number(),
          })
          .nullish()
          .default({
            offset: 0,
            limit: 50,
          }),
      })
    )
    .query(
      async ({
        input: { cursor },
        ctx: {
          auth: { userId },
        },
      }) => {
        if (!cursor) {
          return {
            tracks: [],
            cursor: null,
          }
        } else {
          const { limit, offset } = cursor

          try {
            const trackIds = await db.query.favoriteTracks.findMany({
              where: eq(favoriteTracks.user_id, userId),
              columns: {
                track_id: true,
              },
              limit,
              offset,
            })

            const { data } = await spotifyApi.get("/tracks", {
              params: {
                ids: trackIds.map((item) => item.track_id).join(","),
              },
            })

            const tracks = trackSchema.array().parse(data.tracks)

            const nextCursor =
              trackIds.length == limit
                ? {
                    limit,
                    offset: offset + limit,
                  }
                : null

            return {
              tracks,
              cursor: nextCursor,
            }
          } catch (error) {
            console.log(error)
          }
        }
      }
    ),
  addTrackToFavorite: protectedProcedure
    .input(
      z.object({
        trackId: z.string(),
        trackDuration: z.number(),
      })
    )
    .mutation(
      async ({
        input: { trackId, trackDuration },
        ctx: {
          auth: { userId },
        },
      }) => {
        try {
          const favoritePlaylist = await db.query.favoritePlaylists.findFirst({
            where: eq(favoriteTracks.user_id, userId),
          })

          console.log()

          if (favoritePlaylist) {
            // If favorite playlist has created before
            const updatePlaylist = db
              .update(favoritePlaylists)
              .set({
                total_tracks: favoritePlaylist.total_tracks + 1,
                duration_ms: String(
                  Number(favoritePlaylist.duration_ms) + trackDuration
                ),
              })
              .where(eq(favoritePlaylists.user_id, userId))

            const addTrack = db.insert(favoriteTracks).values({
              track_id: trackId,
              user_id: userId,
            })

            await Promise.all([updatePlaylist, addTrack])
          } else {
            // If favorite playlist has not created before
            const createPlaylist = db.insert(favoritePlaylists).values({
              user_id: userId,
              total_tracks: "1",
              duration_ms: trackDuration.toString(),
            })

            const addTrack = db.insert(favoriteTracks).values({
              track_id: trackId,
              user_id: userId,
            })

            await Promise.all([createPlaylist, addTrack])
          }
        } catch (error) {
          console.log(error)
        }
      }
    ),
  removeTrackFromFavorite: protectedProcedure
    .input(
      z.object({
        trackId: z.string(),
      })
    )
    .mutation(
      async ({
        input: { trackId },
        ctx: {
          auth: { userId },
        },
      }) => {
        try {
          await db
            .delete(favoriteTracks)
            .where(
              and(
                eq(favoriteTracks.track_id, trackId),
                eq(favoriteTracks.user_id, userId)
              )
            )
        } catch (error) {
          console.log(error)
        }
      }
    ),
})
