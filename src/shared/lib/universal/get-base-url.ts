import { env } from "@/shared/components/env.mjs"

export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return ""
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  const webAppUrl = env.NEXT_PUBLIC_APP_URL

  if (webAppUrl) {
    return webAppUrl
  }

  return `http://localhost:${process.env.PORT ?? 3000}`
}
