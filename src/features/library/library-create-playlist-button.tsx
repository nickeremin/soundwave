"use client"

import React from "react"
import { useLayoutStore } from "@/providers/bound-store-provider"
import { PlusIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Tooltip } from "@/shared/components/ui/tooltip"

import useCreatePlaylist from "../playlist/hooks/useCreatePlaylist"

function LibraryCreatePlaylistButton() {
  const isLibraryCollapsed = useLayoutStore((state) => state.isLibraryCollapsed)

  const { mutateAsync: createPlaylist } = useCreatePlaylist()

  const [isPending, startTransition] = React.useTransition()

  return (
    <Tooltip
      content="Create playlist"
      side={isLibraryCollapsed ? "right" : "top"}
    >
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full text-tertiary hover:text-primary disabled:bg-transparent disabled:ring-0"
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
        <PlusIcon className="size-5" />
      </Button>
    </Tooltip>
  )
}

export default LibraryCreatePlaylistButton
