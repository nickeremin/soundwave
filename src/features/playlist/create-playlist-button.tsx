"use client"

import React from "react"
import { PlusIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Tooltip } from "@/shared/components/ui/tooltip"
import { trpc } from "@/shared/trpc/client"

function CreatePlaylistButton() {
  const { mutateAsync: createPlaylist } =
    trpc.playlistRouter.createPlaylist.useMutation()
  const [isPending, startTransition] = React.useTransition()

  return (
    <Tooltip content="Create playlist">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full disabled:bg-transparent disabled:ring-0"
        // disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            try {
              await createPlaylist()
            } catch (error) {
              console.log(error)
            }
          })
        }}
      >
        <PlusIcon className="size-6" />
      </Button>
    </Tooltip>
  )
}

export default CreatePlaylistButton
