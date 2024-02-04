"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"

import { trpc } from "@/shared/trpc/client"

import { transformer } from "../../trpc/transformer"

interface TRPCQueryProviderProps {
  children: React.ReactNode
}

const TRPCReactQueryProvider = ({ children }: TRPCQueryProviderProps) => {
  const [queryClient] = React.useState(() => new QueryClient({}))
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
      transformer,
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

export default TRPCReactQueryProvider
