"use client"

import React from "react"
import { useBoundStore } from "@/providers/bound-store-provider"
import { HeadphonesIcon, PlusIcon } from "lucide-react"

import LibraryFilters from "@/features/library/library-filters"
import LibraryItemList from "@/features/library/library-item-list"
import LibrarySearchBar from "@/features/library/library-search-bar"
import { Button } from "@/shared/components/ui/button"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Tooltip } from "@/shared/components/ui/tooltip"
import { trpc } from "@/shared/trpc/client"

function UserLibrary() {
  const isCollapsed = useBoundStore((state) => state.isCollapsed)
  const toggleIsCollapsed = useBoundStore((state) => state.toggleIsCollapsed)

  // This height based on left menu layout for scroll area
  const REMAIN_HEIGHT = isCollapsed ? 240 : 288

  const [isPending, startTransition] = React.useTransition()
  const { mutateAsync: createPlaylist } =
    trpc.playlistRouter.createPlaylist.useMutation()

  // const listRef = React.useRef<HTMLUListElement | null>(null)
  // const listItemRefs = React.useRef<(HTMLLIElement | null)[]>([])

  // React.useEffect(() => {
  //   let currentItemIndex = -1

  //   function handleKeyDown(e: globalThis.KeyboardEvent) {
  //     if (
  //       e.key === "ArrowDown" &&
  //       currentItemIndex < listItemRefs.current.length - 1
  //     ) {
  //       currentItemIndex++
  //       console.log({ currentItemIndex })
  //       listItemRefs.current[currentItemIndex]?.focus()
  //     } else if (e.key === "ArrowUp" && currentItemIndex > 0) {
  //       currentItemIndex--
  //       console.log({ currentItemIndex })
  //       listItemRefs.current[currentItemIndex]?.focus()
  //     }
  //   }

  //   if (listRef.current) {
  //     console.log({ listItemRefs: listItemRefs.current })
  //     listRef.current.addEventListener("keydown", handleKeyDown)
  //   }

  //   return () => {
  //     if (listRef.current) {
  //       listRef.current.removeEventListener("keydown", handleKeyDown)
  //     }
  //   }
  // }, [])

  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null)
  const scrollBoundaryRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    function handleScroll() {
      if (!scrollAreaRef.current) return

      const scrollTop = scrollAreaRef.current.scrollTop

      if (scrollTop !== 0) {
        scrollBoundaryRef.current?.classList.add(
          "shadow-[0_6px_10px_rgba(0,0,0,.6)]"
        )
      } else {
        scrollBoundaryRef.current?.classList.remove(
          "shadow-[0_6px_10px_rgba(0,0,0,.6)]"
        )
      }
    }

    if (scrollAreaRef.current) {
      scrollAreaRef.current.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return (
    <div className="flex flex-1 flex-col rounded-lg bg-background-100">
      <div ref={scrollBoundaryRef} className="transition-shadow">
        <div className="flex items-center px-4 py-2">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <Tooltip
                content={
                  isCollapsed ? "Expand Your Library" : "Collapse Your Library"
                }
                side={isCollapsed ? "right" : "top"}
              >
                <Button
                  onClick={toggleIsCollapsed}
                  variant="none"
                  size="none"
                  className="h-10 gap-3 rounded-full px-2 font-bold text-tertiary hover:text-primary"
                >
                  <HeadphonesIcon className="size-6" />
                  {!isCollapsed && "Your library"}
                </Button>
              </Tooltip>
            </div>

            {!isCollapsed && (
              <div className="flex items-center">
                <Tooltip content="Create playlist">
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
                    <PlusIcon className="size-5" />
                  </Button>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
        {!isCollapsed && <LibraryFilters />}
      </div>

      <div className="relative h-full">
        <ScrollArea
          ref={scrollAreaRef}
          style={{ height: `calc(100vh - ${REMAIN_HEIGHT}px)` }}
        >
          <div className="flex flex-col gap-2 px-2">
            {!isCollapsed && <LibrarySearchBar />}
            <LibraryItemList />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default UserLibrary
