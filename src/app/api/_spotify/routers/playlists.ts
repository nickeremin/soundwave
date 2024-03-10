import { db } from "@/database"
import { followedArtists } from "@/database/schema"
import { eq } from "drizzle-orm"

import { catchAxiosError } from "@/shared/lib/utils"
import { protectedProcedure, router } from "@/shared/trpc/trpc"

export const playlistRouter = router({
  getRecommendedPlaylists: protectedProcedure.query(
    async ({
      ctx: {
        auth: { userId },
      },
    }) => {
      try {
        const followedArtistIds = await db
          .select({ id: followedArtists.artistId })
          .from(followedArtists)
          .where(eq(followedArtists.userId, userId))
      } catch (error) {
        catchAxiosError(error)
      }
    }
  ),
})
