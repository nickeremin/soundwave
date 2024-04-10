import { NextRequest } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { createContextInner } from "@/shared/trpc/context"
import { appRouter } from "@/app/api/trpc/app"

async function handler(req: NextRequest) {
  if (req.method == "OPTIONS") {
    return handleCORSPreflight()
  }

  const response = await fetchRequestHandler({
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

  return addCORSHeaders(response)
}

const addCORSHeaders = (res: Response) => {
  const response = new Response(res.body, res)
  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Headers", "*")
  response.headers.set("Access-Control-Allow-Credentials", "true")
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

  return response
}

const handleCORSPreflight = () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
  })
}

export { handler as GET, handler as POST }
