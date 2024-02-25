import { inferRouterOutputs } from "@trpc/server"

import { router } from "@/shared/trpc/trpc"

import { albumRouter } from "../_spotify/routers/albums"
import { artistRouter } from "../_spotify/routers/artists"
import { searchRouter } from "../_spotify/routers/search"
import { trackRouter } from "../_spotify/routers/tracks"

export const appRouter = router({
  albumRouter: albumRouter,
  artistRouter: artistRouter,
  searchRouter: searchRouter,
  trackRouter: trackRouter,
})

export type AppRouter = typeof appRouter
export type AppRouterOutput = inferRouterOutputs<AppRouter>
