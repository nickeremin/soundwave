import { inferRouterOutputs } from "@trpc/server"

import { router } from "@/shared/trpc/trpc"

import { albumtRouter } from "./routers/album-router"
import { artistRouter } from "./routers/artist-router"
import { testRouter } from "./routers/protected/test"
import { searchRouter } from "./routers/search-router"
import { trackRouter } from "./routers/track-router"

export const appRouter = router({
  test: testRouter,
  trackRouter: trackRouter,
  artistRouter: artistRouter,
  albumRouter: albumtRouter,
  searchRouter: searchRouter,
})

export type AppRouter = typeof appRouter
export type AppRouterOutput = inferRouterOutputs<AppRouter>
