import { protectedProcedure, router } from "@/shared/trpc/trpc"

export const testRouter = router({
  testMessage: protectedProcedure.query(({ ctx }) => {
    return ctx.auth.userId
  }),
})
