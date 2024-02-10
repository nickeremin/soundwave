import { createTRPCReact } from "@trpc/react-query"

import { AppRouter } from "@/app/_trpc/app"

export const trpc = createTRPCReact<AppRouter>()
