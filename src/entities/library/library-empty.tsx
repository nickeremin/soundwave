"use client"

import React from "react"

import useCreatePlaylist from "@/features/playlist/hooks/useCreatePlaylist"
import { Button } from "@/shared/components/ui/button"

function LibraryEmpty() {
  const [isPending, startTransition] = React.useTransition()

  const { mutateAsync: createPlaylist } = useCreatePlaylist()

  return (
    <div className="my-2 px-2">
      <div className="flex flex-col items-start gap-4 rounded-lg bg-muted p-4">
        <div className="flex flex-col gap-1">
          <p className="font-bold">Create your first playlist</p>
          <p className="text-sm font-medium">
            It&apos;s easy, we&apos;ll help you
          </p>
        </div>
        <Button
          onClick={() => {
            startTransition(async () => {
              try {
                // To avoid multiple actions to create playlist
                if (isPending) return
                else await createPlaylist()
              } catch (error) {
                console.log(error)
              }
            })
          }}
          className="rounded-full font-extrabold"
        >
          Create playlist
        </Button>
      </div>
    </div>
  )
}

export default LibraryEmpty
