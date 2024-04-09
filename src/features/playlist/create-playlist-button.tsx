"use client"

import React from "react"
import { PlusIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Tooltip } from "@/shared/components/ui/tooltip"

import useCreatePlaylist from "./hooks/useCreatePlaylist"

function CreatePlaylistButton() {
  const [isPending, startTransition] = React.useTransition()

  const { mutateAsync: createPlaylist } = useCreatePlaylist()

  return (
    <Tooltip content="Create playlist">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full disabled:bg-transparent disabled:ring-0"
        onClick={() => {
          startTransition(async () => {
            try {
              if (!isPending) {
                await createPlaylist()
              }
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
