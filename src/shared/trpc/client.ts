import { createTRPCReact } from "@trpc/react-query"

import { AppRouter } from "@/app/api/trpc/app"

export const trpc = createTRPCReact<AppRouter>()
