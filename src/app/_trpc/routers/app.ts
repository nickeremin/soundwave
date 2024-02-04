import { router } from "@/shared/trpc/trpc"

import { testRouter } from "./protected/test"

export const appRouter = router({
  test: testRouter,
})

export type AppRouter = typeof appRouter
