import { createTRPCReact } from "@trpc/react-query"

import { AppRouter } from "@/app/_trpc/routers/app"

export const trpc = createTRPCReact<AppRouter>()
