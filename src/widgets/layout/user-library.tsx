"use client"

import React from "react"
import { Headphones, HeadphonesIcon, PlusIcon } from "lucide-react"
import { TbHeadphonesFilled } from "react-icons/tb"

import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import { useLayoutStore } from "@/shared/stores/layout-store"
import { trpc } from "@/shared/trpc/client"

function UserLibrary() {
  const isCollapsed = useLayoutStore((state) => state.isCollapsed)
  const toggleIsCollapsed = useLayoutStore((state) => state.toggleIsCollapsed)

  const { mutateAsync: createPlaylist } =
    trpc.playlistRouter.createPlaylist.useMutation()
  const [isPending, startTransition] = React.useTransition()

  return (
    <div className="h-full rounded-lg bg-background-100 px-3.5 py-1">
      <div className="flex h-12 items-center justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleIsCollapsed}
              variant="none"
              size="none"
              className="gap-2 text-lg font-semibold text-tertiary hover:text-primary"
            >
              <HeadphonesIcon className="size-7" />
              {!isCollapsed && "Your library"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isCollapsed ? "Expand library" : "Collapse library"}
          </TooltipContent>
        </Tooltip>

        {!isCollapsed && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-tertiary hover:text-primary disabled:bg-transparent disabled:ring-0"
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
            </TooltipTrigger>
            <TooltipContent>Create playlist</TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  )
}

export default UserLibrary
