import { router } from "@/shared/trpc/trpc"
import { inferRouterOutputs } from "@trpc/server"

import { artistRouter } from "./routers/artist-router"
import { testRouter } from "./routers/protected/test"
import { trackRouter } from "./routers/track-router"

export const appRouter = router({
  test: testRouter,
  trackRouter: trackRouter,
  artistRouter: artistRouter,
})

export type AppRouter = typeof appRouter
export type AppRouterOutput = inferRouterOutputs<AppRouter>;
