import { db } from "@/database"
import { playlists, playlistTracks } from "@/database/schema"
import { and, count, eq } from "drizzle-orm"
import { z } from "zod"

import { catchAxiosError, generateId } from "@/shared/lib/utils"
import { editPlaylistDetailsSchema } from "@/shared/lib/validations/playlist"
import { protectedProcedure, router } from "@/shared/trpc/trpc"

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
            and(eq(playlists.id, playlistId), eq(playlists.userId, userId))
          )
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
            await db
              .select()
              .from(playlists)
              .where(
                and(eq(playlists.id, playlistId), eq(playlists.userId, userId))
              )
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
          .where(eq(playlists.userId, userId))
        if (!userPlaylists) return null
        return userPlaylists
      } catch (error) {
        catchAxiosError(error)
      }
    }
  ),
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
          .where(eq(playlists.userId, userId))

        await db.insert(playlists).values({
          id: generateId(),
          userId: userId,
          name: `My Playlist #${userPlaylists.length + 1}`,
          description: null,
          imageUrl: null,
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
    .mutation(async ({ input: { trackId, playlistId }, ctx }) => {
      try {
        await db.insert(playlistTracks).values({
          trackId,
          playlistId,
        })
      } catch (error) {
        console.log(error)
      }
    }),
  removeTrack: protectedProcedure
    .input(
      z.object({
        trackId: z.string(),
        playlistId: z.string(),
      })
    )
    .mutation(async ({ input: { trackId, playlistId }, ctx }) => {
      try {
        await db
          .delete(playlistTracks)
          .where(
            and(
              eq(playlistTracks.trackId, trackId),
              eq(playlistTracks.playlistId, playlistId)
            )
          )
      } catch (error) {
        console.log(error)
      }
    }),
})
