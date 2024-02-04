import * as dotenv from "dotenv"
import { type Config } from "drizzle-kit"

dotenv.config({ path: ".env.local" })

export default {
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_CONNECTION_STRING as string,
  },
} satisfies Config
