import * as dotenv from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "./schema"

dotenv.config({ path: ".env.local" })

const connectionString = process.env.DATABASE_CONNECTION_STRING as string
const client = postgres(connectionString)
export const db = drizzle(client, { schema })

export const projectId = "hmrgszwrhwzzxjkfcliz"
export function supabaseLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality: number
}) {
  return `https://${projectId}.supabase.co/storage/v1/render/image/public/${src}?width=${width}&quality=${
    quality || 75
  }`
}
