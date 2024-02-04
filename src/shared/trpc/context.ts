import { GetServerSidePropsContext } from "next"
import { NextRequest } from "next/server"
import {
  getAuth,
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/server"
import * as trpcNext from "@trpc/server/adapters/next"

type CreateContextOptions = {
  auth: SignedInAuthObject | SignedOutAuthObject | null
  req: NextRequest | GetServerSidePropsContext["req"] | null
}

export async function createContextInner({ auth, req }: CreateContextOptions) {
  return {
    auth,
    req,
  }
}

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const auth = getAuth(opts.req)

  return await createContextInner({ auth, req: opts.req })
}

export type Context = Awaited<ReturnType<typeof createContext>>
