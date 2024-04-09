"use client"

import { useRouter } from "next/navigation"

import { trpc } from "@/shared/trpc/client"

function useCreatePlaylist() {
  const router = useRouter()

  const utils = trpc.useUtils()

  const mutation = trpc.playlistRouter.createPlaylist.useMutation({
    onSuccess() {
      utils.playlistRouter.invalidate()
    },
    onError(error) {
      if (error.data?.code == "UNAUTHORIZED") {
        router.push("/signin")
      }
    },
  })

  return mutation
}

export default useCreatePlaylist
