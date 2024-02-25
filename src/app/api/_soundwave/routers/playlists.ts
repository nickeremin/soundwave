import { db } from "@/database"
import { playlists, playlistTracks } from "@/database/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { generateId } from "@/shared/lib/utils"
import { protectedProcedure, router } from "@/shared/trpc/trpc"

export const playlistRouter = router({
  createPlaylist: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(async ({ input: { name, description, imageUrl }, ctx }) => {
      try {
        await db.insert(playlists).values({
          id: generateId(),
          userId: ctx.auth.userId,
          name,
          description,
          imageUrl,
        })
      } catch (error) {
        console.log(error)
      }
    }),
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
