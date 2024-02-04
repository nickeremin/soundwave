import { NextRequest } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { createContextInner } from "@/shared/trpc/context"
import { appRouter } from "@/app/_trpc/routers/app"

function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext() {
      const auth = getAuth(req)
      return createContextInner({
        auth,
        req,
      })
    },
    onError({ error }) {
      if (error.code === "INTERNAL_SERVER_ERROR") {
        console.error("Caught TRPC error:", error)
      }
    },
  })
}
export { handler as GET, handler as POST }
