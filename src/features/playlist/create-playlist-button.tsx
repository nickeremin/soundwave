"use client"

import React from "react"

import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import { trpc } from "@/shared/trpc/client"

function CreatePlaylistButton() {
  const { mutateAsync: createPlaylist } =
    trpc.playlistRouter.createPlaylist.useMutation()
  const [isPending, startTransition] = React.useTransition()

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
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
            <LucideIcon name="Plus" className="size-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Create playlist</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CreatePlaylistButton
